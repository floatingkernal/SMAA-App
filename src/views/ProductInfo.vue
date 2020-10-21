<template>
  <div>
    <v-card class="mx-1 py-3" v-if="error">
      <v-card-title> Oops, an error occured </v-card-title>
      <v-card-actions>
        <v-btn color="error" @click="refresh"> Refresh </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-1 py-3" v-else-if="itemNotFound">
      <v-card-title>
        Oops, item {{ $route.params.prodId }} not found
      </v-card-title>
      <v-card-actions>
        <v-btn color="error" @click="$router.back()"> Go back </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-1 py-3" v-else>
      <v-card-title> {{ desc }} </v-card-title>
      <div class="d-flex flex-wrap">
        <v-card id="image" class="mx-3 pa-6" max-width="350" @wheel="wheelMove">
          <v-skeleton-loader v-if="image == ''" width="300" height="300" type="image"/>
          <ImageMagnifier
            v-else
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
              {{ shoppingCart }}
              <v-btn icon> <v-icon> mdi-plus</v-icon></v-btn>
              <v-btn color="error"> Add to Cart </v-btn>
            </div>
            <div v-else style="color: red">Product Not in Stock</div>
          </v-card-title>
          <v-card-subtitle> {{ itemNo }} </v-card-subtitle>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
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
import firebase from "firebase/app";
import 'firebase/storage'

export default {
  name: "ProductInfo",
  components: {
    ImageMagnifier,
  },
  data: () => ({
    image: "",
    zoomSize: 150,

    itemNo: "",
    desc: "",
    QtyPerCarton: 0,
    QtyPerInner: 0,
    QtyPerPack: 0,
    StdPrice: 0,
    MinOrdQty: 0,
    OrdMultiple: 0,
    DoNotSell: "Y",

    shoppingCart: 12,

    error: false,
    itemNotFound: false,
  }),
  created() {
    // ImageMagnifier.addEventListener('scroll', this.onImgScroll);
    // window.addEventListener("keydown", this.keydown);
    // window.addEventListener("wheel", this.wheelMove);

    this.loadData();
  },
  mounted() {
  },

  destroyed() {
    //   ImageMagnifier.removeEventListener('scroll', this.onImgScroll);
    // window.removeEventListener("keydown", this.keydown);
    // window.removeEventListener("wheel", this.wheelMove);
  },
  methods: {
    wheelMove(e) {
      if (e.wheelDeltaY < 0) this.imgZoomIn();
      if (e.wheelDeltaY > 0) this.imgZoomOut();
    },
    keydown(e) {
      if (e.key == "ArrowUp") this.imgZoomIn();
      if (e.key == "ArrowDown") this.imgZoomOut();
    },
    imgZoomIn() {
      const maxHeight = 300;
      if (this.zoomSize + 0.01 * maxHeight < maxHeight)
        this.zoomSize += 0.01 * maxHeight;
    },
    imgZoomOut() {
      const maxHeight = 300;
      if (this.zoomSize - 0.01 * maxHeight > 0.1 * maxHeight)
        this.zoomSize -= 0.01 * maxHeight;
    },
    onImgScroll(e) {
      console.log("Scrolling", e);
    },
    refresh() {
      this.error = false;
      this.loadData();
    },
    loadData() {
      const prodId = this.$route.params.prodId;
      const items = this.$store.state.sheetItems;
      if (!items) {
        this.error = true;
        console.log("Error occured when loading items");
      } else if (prodId in items) {
        const row = this.$store.state.sheetRows[items[prodId]];
        this.itemNo = row.Item;
        this.desc = row.Description;
        this.QtyPerCarton = row.QtyPerCarton;
        this.QtyPerInner = row.QtyPerInner;
        this.QtyPerPack = row.QtyPerPack;
        this.StdPrice = row["STD Price"];
        this.MinOrdQty = row.MinOrdQty;
        this.OrdMultiple = row.OrdMultiple;
        this.DoNotSell = row.DoNotSell;

        this.loadImage()
      } else {
        this.itemNotFound = true;
      }
    },
    loadImage() {
      const imgUrl = 'products/' + this.itemNo + '.jpg'
      firebase.storage().ref().child(imgUrl).getDownloadURL().then((url) => {
        this.image = url
        })
    }
  },
};
</script>

<style>
</style>