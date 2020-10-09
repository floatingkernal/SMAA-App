<template>
  <div>
    <!-- <p>This is Product Information Page</p>
    <div>Product ID: {{ $route.params.prodId }}</div> -->
    <v-card class="mx-1 py-3" >
      <v-card-title> {{ desc }} </v-card-title>
      <div class="d-flex flex-wrap">

      <v-card class="mx-3 pa-6" max-width="350">
        <ImageMagnifier
          :src="image"
          :zoom-src="image"
          width="300"
          height="300"
          zoom-width="500"
          zoom-height="500"
          :maskWidth="zoomSize"
          :maskHeight="zoomSize"
          class="justify-center"
        />
      </v-card>
      <v-card class="flex-grow-1 ma-3" min-width="300">
        <v-card-title class="d-flex justify-space-between"> 
          ${{ StdPrice }}/item 
          <div class="d-flex justify-space-between" v-if="DoNotSell !== 'Y'">
            <v-btn icon> <v-icon> mdi-minus</v-icon></v-btn>
            {{shoppingCart}}
            <v-btn icon> <v-icon> mdi-plus</v-icon></v-btn>
            <v-btn color="error"> Add to Cart </v-btn>
          </div>
          <div v-else style="color:red"> Product Not in Stock </div>
        </v-card-title>
        <v-card-subtitle> {{ itemNo }} </v-card-subtitle>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <!-- <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
      </thead> -->
              <tbody>
                <tr>
                  <td>Quantity per Carton</td>
                  <td>{{ QtyPerCarton }}</td>
                </tr>
                <tr>
                  <td>Quantity per Inner</td>
                  <td>{{ QtyPerInner }}</td>
                </tr>
                <tr>
                  <td>Quantity per Pack</td>
                  <td>{{ QtyPerPack }}</td>
                </tr>
                <tr>
                  <td>Minimum Order Quantity</td>
                  <td>{{ MinOrdQty }}</td>
                </tr>
                <tr>
                  <td>Order Multiple</td>
                  <td>{{ OrdMultiple }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>
import { ImageMagnifier } from "vue-image-magnifier";
export default {
  name: "ProductInfo",
  components: {
    ImageMagnifier,
  },
  data: () => ({
    image: "https://picsum.photos/500/500?image=250",
    zoomSize: 50,

    itemNo: "SV-90588",
    desc: "Canada Key Chain Shoe silver",
    QtyPerCarton: 600,
    QtyPerInner: 12,
    QtyPerPack: 12,
    StdPrice: 0.75,
    MinOrdQty: 12,
    OrdMultiple: 12,
    DoNotSell: "Y",

    shoppingCart:12
  }),
  created() {
    // ImageMagnifier.addEventListener('scroll', this.onImgScroll);
    window.addEventListener("keydown", this.keydown);
  },
  destroyed() {
    //   ImageMagnifier.removeEventListener('scroll', this.onImgScroll);
    window.removeEventListener("keydown", this.keydown);
  },
  methods: {
    keydown(e) {
      if (e.key == "ArrowUp") this.imgZoomIn();
      if (e.key == "ArrowDown") this.imgZoomOut();
    },
    imgZoomIn() {
      const maxHeight = 300;
      if (this.zoomSize + 0.1 * maxHeight < maxHeight)
        this.zoomSize += 0.1 * maxHeight;
    },
    imgZoomOut() {
      const maxHeight = 300;
      if (this.zoomSize - 0.1 * maxHeight > 0.1 * maxHeight)
        this.zoomSize -= 0.1 * maxHeight;
    },
    onImgScroll(e) {
      console.log("Scrolling", e);
    },
  },
};
</script>

<style>
</style>