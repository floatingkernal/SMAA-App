<template>
  <keep-alive>
  <v-card max-width="280" height="575" >
    <v-img
      class="img"
      :src="img"
      contain
      @click="moreInfo"
      height="350"
      width="500"
    />
    <v-divider />

    <v-card-actions v-if="!doNotSell || doNotSell === ''">
      <v-btn icon @click="addItem">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon v-if="quantity > 0"  @click="remItem">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <!-- <v-spacer /> -->
      <div>{{ quantity > 0 ? "Quantity in Cart: " + quantity : "" }} </div>
      <!-- <v-btn icon @click="wishItem">
        <v-icon v-if="wished">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart-outline</v-icon>
      </v-btn> -->
    </v-card-actions>
    <v-card-actions v-else> Currently out of Stock </v-card-actions>
    <v-divider />
    <v-card-title>${{ stdPrice }}/unit</v-card-title>
    <v-card-subtitle>{{ desc }}</v-card-subtitle>
    <v-card-text>{{ itemNo }}</v-card-text>
  </v-card>
  </keep-alive>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage"

export default {
  name: "ProductCard",
  props: {
    rowNum: {
      type: Number,
      default: -1,
    }
    // img: {
    //   type: String,
    //   default: "",
    // },
    // title: {
    //   type: String,
    //   default: "",
    // },
    // itemNo: {
    //   type: String,
    //   default: "",
    // },
    // to: {
    //   type: String,
    //   default: "",
    // },
    // doNotSell: {
    //   type: String,
    //   default: "",
    // },
    // pricePerUnit: {
    //   type: Number,
    //   default: 0,
    // },
    // pricePerCase: {
    //   type: Number,
    //   default: 0,
    // },
    // itemPerPack: {
    //   type: Number,
    //   default: 0,
    // },
    // wished: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data: () => ({
    quantity: 0,

    img: '',
    desc: '',
    itemNo: '',
    to: '',
    doNotSell: '',
    stdPrice: 0,
    ordMultiple: 0,
    wished: false,
  }),

  mounted() {
    this.loadData()
    this.updateQty()
  },
  watch: {
    itemNo: function() {
      this.updateQty()
    },
    rowNum: function() {
      this.resetData()
      this.loadData()
    }
  },
  methods: {
    resetData() {
      this.img = ''
      this.desc = ''
      this.itemNo = ''
      this.to = ''
      this.doNotSell = ''
      this.stdPrice = 0
      this.ordMultiple = 0
      this.wished = false
    },
    loadData() {
      // console.log(this.$store.state);
      const item = this.$store.state.sheetRows[this.rowNum]

      this.desc = item.Description
      this.itemNo = item.Item
      this.stdPrice = Number(item['STD Price'])
      this.ordMultiple = Number(item.OrdMultiple)
      this.doNotSell = item.DoNotSell

      this.to = "/product-info/" + this.itemNo

      if (item.img) this.img = item.img 
      else this.loadImg()

    },
    async loadImg() {
      if (!this.img || this.img === '') {
        const imgUrl1 = "products/" + this.itemNo + ".jpg";
        firebase
          .storage()
          .ref()
          .child(imgUrl1)
          .getDownloadURL()
          .then((url) => {
            this.img = url;
            this.$store.dispatch("imgUrlSetter", {url:url, itemNo:this.itemNo});
          }).catch(() => this.img = '');
      }
    },
    updateQty() {
      this.quantity = this.$store.getters.shoppingCartQty(this.itemNo)
    },
    addItem() {
      const newqty = this.quantity + this.ordMultiple
      this.quantity = newqty
      const today = new Date()
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      const item = {itemNo: this.itemNo, qty: newqty, time: dateTime}
      this.$store.commit('updateCart', item)
      // setTimeout(this.$store.commit('updateCart', item),1)
      // this.$store.dispatch('loadCart')
    },
    remItem() {
      const newqty = this.quantity - this.ordMultiple
      this.quantity = newqty
      const today = new Date()
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      const item = {itemNo: this.itemNo, qty: newqty, time: dateTime}
      this.$store.commit('updateCart', item)
    },
    wishItem() {
      this.wished = !this.wished;
    },
    moreInfo() {
      this.$router.push(this.to);
    },
  },
};
</script>

<style scoped>
.img {
  cursor: pointer;
}
</style>