<template>
  <div>
    <v-pagination
      class="my-4 mx-auto"
      v-model="pageNum"
      :length="Math.ceil(sheetRows.length / itemsPerPage)"
      :total-visible="totalVisible"
      color="red"
      @input="changePage"
    />
    <div class="d-flex flex-wrap mx-auto justify-center justify-sm-start">
      <div v-for="item in items" :key="item.id">
        <ProductCard
          :title="item.name"
          :itemNo="item.itemNo"
          :img="item.img"
          :to="item.to"
          :pricePerUnit="item.pricePerUnit"
          :pricePerCase="item.pricePerCase"
          :itemPerPack="item.itemPerPack"
          :doNotSell="item.doNotSell"
        />
      </div>
      <v-pagination
        class="my-4 mx-auto"
        v-model="pageNum"
        :length="Math.ceil(sheetRows.length / itemsPerPage)"
        :total-visible="totalVisible"
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
    ProductCard: () =>
      import(/* webpackChunkName: "ProductCard" */ "@/components/ProductCard"),
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
    totalVisible: () => {
      if (window.outerWidth < 500) return 5;
      else return 9;
    },
  },
  mounted() {
    this.sheetRows = this.$store.state.sheetRows;
    this.loadData();
  },
  watch: {
    "$route.params.pageNum"() {
      this.loadData();
    },
    sheetRows: function () {
      this.loadData();
    },
  },
  methods: {
    async changePage(e) {
      this.$vuetify.goTo(0);
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
            itemNo: row.Item,
            img: "",
            to: "/product-info/" + row.Item,
            pricePerUnit: Number(row["STD Price"]),
            pricePerCase: 0,
            itemPerPack: Number(row.QtyPerPack),
            doNotSell:"",
          };
          row.Img ? (item.img = row.Img) : (item.img = "");
          row.DoNotSell ? (item.doNotSell = row.DoNotSell) : (item.doNotSell = "");

          this.items.push(item);
          this.setImgUrl(item);
        });
        // this.saveImgs()
    },
    async setImgUrl(item) {
      if (!item.img) {
        const itemUrl = "products/" + item.itemNo + ".jpg";
        firebase
          .storage()
          .ref()
          .child(itemUrl)
          .getDownloadURL()
          .then((u) => {
            item.img = u;
            // this.$store.dispatch("imgUrlSetter", {url:u, itemNo:item.itemNo});
            // this.$store.commit("setImg", { url: u, itemNo: item.itemNo });
            // this.$store.commit("setImg", { url: u, itemNo: item.itemNo});
          })
          .catch(() => (item.img = ""));
      }
    },
    // async saveImgs() {
    //   this.items.forEach((item) => (this.$store.dispatch("imgUrlSetter", {url: item.img, itemNo: item.itemNo})))
    // }
  },
};
</script>
