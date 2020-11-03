<template>
  <v-card max-width="280" height="550" class="ma-1">
    <v-img
      class="img"
      :src="img"
      contain
      @click="moreInfo"
      height="350"
      width="500"
    />
    <v-divider />
    <v-card-title>${{ pricePerUnit }}/unit</v-card-title>
    <v-card-subtitle>{{ title }}</v-card-subtitle>
    <v-card-text>{{ itemNo }}</v-card-text>
    <v-divider />

    <v-card-actions v-if="!doNotSell || doNotSell === ''">
      <v-btn  @click="addItem">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn v-if="quantity > 0"  @click="remItem">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-spacer />
      <v-card-text v-if="quantity > 0">Quantity:{{ quantity }}</v-card-text>
      <v-btn icon @click="wishItem">
        <v-icon v-if="wished">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart-outline</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-actions v-else> Currently out of Stock </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "ProductCard",
  props: {
    img: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    itemNo: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    doNotSell: {
      type: String,
      default: "",
    },
    pricePerUnit: {
      type: Number,
      default: 0,
    },
    pricePerCase: {
      type: Number,
      default: 0,
    },
    itemPerPack: {
      type: Number,
      default: 0,
    },
    wished: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    quantity: 0,
  }),

  mounted() {
    this.updateQty()
  },
  watch: {
    itemNo: function() {
      this.updateQty()
    }
  },
  methods: {
    updateQty() {
      this.quantity = this.$store.getters.shoppingCartQty(this.itemNo)
    },
    addItem() {
      const newqty = this.quantity + this.itemPerPack
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
      const newqty = this.quantity - this.itemPerPack
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