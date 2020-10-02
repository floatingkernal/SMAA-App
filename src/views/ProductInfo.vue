<template>
<div>
  <p>This is Product Information Page</p>
  <div> Product ID: {{$route.params.prodId}} </div>
  <v-card height="1000" class="mx-1">
    <v-card-title> Title </v-card-title>
    <v-card class="mx-2 pa-6" max-width="350"> 
      <ImageMagnifier :src="image"
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
  </v-card>
</div>
</template>

<script>
import {ImageMagnifier} from "vue-image-magnifier"
export default {
  name: "ProductInfo",
  components: {
    ImageMagnifier,
  },
  data: () => ({
    image:"https://picsum.photos/500/500?image=250",
    zoomSize: 50
  }),
  created () {
    // ImageMagnifier.addEventListener('scroll', this.onImgScroll);
    window.addEventListener('keydown', this.keydown);
  },
  destroyed () {
  //   ImageMagnifier.removeEventListener('scroll', this.onImgScroll);
  window.removeEventListener('keydown', this.keydown);
  },
  methods: {
    keydown(e) {
if (e.key == 'ArrowUp') this.imgZoomIn();
      if (e.key == 'ArrowDown') this.imgZoomOut();
    },
    imgZoomIn() {
      const maxHeight = 300
      if (this.zoomSize + .1 * maxHeight < maxHeight) this.zoomSize += 0.1 * maxHeight
    },
    imgZoomOut() {
      const maxHeight = 300
      if (this.zoomSize - .1 * maxHeight > .1 * maxHeight) this.zoomSize -= 0.1 * maxHeight

    },
    onImgScroll(e) {
      console.log("Scrolling", e)
    } 
  }
};
</script>

<style>
</style>