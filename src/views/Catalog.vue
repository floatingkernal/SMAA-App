<template>
  <v-container fluid>
    <v-progress-linear v-if="loading" indeterminate color="red" />
    <v-pagination
      class="my-4 mx-auto"
      v-model="pageNum"
      :length="lengthOfPages"
      :total-visible="totalVisible"
      color="red"
      @input="changePage"
    />
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="pageNum"
      :search="search"
    >
      <template v-slot:header>
        <v-toolbar>
          <v-text-field
            v-model="search"
            clearable
            flat
            solo
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row align="center">
          <v-col
            v-for="item in props.items"
            :key="item.itemNo"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <ProductCard :rowNum="rowNum(item)" />
          </v-col>
        </v-row>
      </template>
      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ pageNum }} of {{ lengthOfPages }}
          </span>
          <v-btn fab dark color="red" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="red" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>

      <template v-slot:no-data>
        <v-btn color="error" @click="loadData"> Refresh </v-btn>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  name: "Catalog",

  components: {
    ProductCard: () =>
      import(/* webpackChunkName: "ProductCard" */ "@/components/ProductCard"),
  },
  data: () => ({
    loading: true,
    items: [],
    pageNum: 1,
    itemsPerPage: 20,
    pages: 0,
    search: "",
  }),
  computed: {
    lengthOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    totalVisible: () => {
      if (window.outerWidth < 500) return 5;
      else return 9;
    },
  },
  mounted() {
    this.loadData();
  },
  watch: {
    '$store.state.sheetsLoading'() {
      this.loadData()
    }
  },
  methods: {
    rowNum(item) {
      return this.$store.state.sheetItems[item.Item];
    },
    nextPage() {
      if (this.pageNum + 1 <= this.lengthOfPages) this.pageNum += 1;
    },
    formerPage() {
      if (this.pageNum - 1 >= 1) this.pageNum -= 1;
    },
    changePage(e) {
      this.pageNum = e;
    },
    loadData() {
      const loading = this.$store.state.sheetsLoading
      if (loading) return
      this.items = this.$store.state.sheetRows;
      this.$nextTick(() => this.$forceUpdate());
      this.loading = false;
    },
  },
};
</script>
