<template>
  <div>
    <v-pagination
      class="my-4 mx-auto"
      v-model="pageNum"
      :length="Math.ceil(sheetRows.length / itemsPerPage)"
      :total-visible="7"
      color="red"
      @input="changePage"
    />
    <div class="d-flex flex-wrap mx-auto justify-center justify-sm-start">
      <div v-for="item in items" :key="item.id">
        <ProductCard
          :title="item.name"
          :desc="item.desc"
          :img="item.img"
          :to="item.to"
          :pricePerUnit="item.pricePerUnit"
          :pricePerCase="item.pricePerCase"
          :itemPerPack="item.itemPerPack"
        />
      </div>
      <v-pagination
        class="my-4 mx-auto"
        v-model="pageNum"
        :length="Math.ceil(sheetRows.length / itemsPerPage)"
        :total-visible="7"
        color="red"
        @input="changePage"
      />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";

export default {
  name: "Catalog",

  components: {
    ProductCard: () => import(/* webpackChunkName: "ProductCard" */ "@/components/ProductCard")
  },
  data: () => ({
    items: [],
    pageNum: 0,
    itemsPerPage: 20,
    sheetRows: [],
  }),
  computed: {
    lengthOfPages: () => {
      return this.sheetRows.length / this.itemsPerPage;
    },
  },
  mounted() {
    this.sheetRows = this.$store.state.sheetRows;
    this.loadData();
  },
  watch: {
    "$route.params.pageNum"() {
      // this.changePage(to)
      this.loadData();
    },
  },
  methods: {
    async changePage(e) {
      this.$vuetify.goTo(0);
      // this.pageNum = e
      this.$router.push("/catalog/" + e);
      this.loadData();
    },
    async loadData() {
      this.items = [];
      this.pageNum = parseInt(this.$route.params.pageNum);

      this.sheetRows
        .slice(
          (this.pageNum - 1) * this.itemsPerPage,
          this.itemsPerPage * this.pageNum
        )
        .forEach((row) => {
          const item = {
            name: row.Description,
            desc: row.Item,
            img: "",
            to: "/product-info/" + row.Item,
            pricePerUnit: Number(row["STD Price"]),
            pricePerCase: 0,
            itemPerPack: Number(row.QtyPerPack),
          };
          this.items.push(item);
          this.setImgUrl(item);
        });
    },
    setImgUrl: async (item) => {
      const itemUrl = "products/" + item.desc + ".jpg";
      await firebase
        .storage()
        .ref()
        .child(itemUrl)
        .getDownloadURL()
        .then((u) => (item.img = u))
        .catch(() => (item.img = ""));
    },
  },
};
</script>

<style>
body {
  background-color: #fff3e6;
}
</style>