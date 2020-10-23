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
    <v-card-text>{{ desc }}</v-card-text>
    <v-divider />

    <v-card-actions>
      <v-btn icon @click="addItem">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn v-if="quantity > 0" icon @click="remItem">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-spacer />
      <v-card-text v-if="quantity > 0">Quantity:{{ quantity }}</v-card-text>
      <v-btn icon @click="wishItem">
        <v-icon v-if="wished">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart-outline</v-icon>
      </v-btn>
    </v-card-actions>
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
    desc: {
      type: String,
      default: "",
    },
    to: {
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
  methods: {
    addItem() {
      this.quantity += this.itemPerPack;
    },
    remItem() {
      this.quantity -= this.itemPerPack;
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