<template>
  <div>
    <v-carousel cycle hide-delimiters show-arrows-on-hover height="auto">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        aspect-ratio="1.5"
      >
        <h1>
          {{ item.title }}
          <v-btn color="red" :to="item.link">Shop Now</v-btn>
        </h1>
      </v-carousel-item>
    </v-carousel>
    <v-row justify="center">
      <h2>Shop By Categories</h2>
    </v-row>
    <v-container fluid>
      <v-row justify="center">
        <template v-for="(category, i) in categories">
          <v-col :key="i">
            <v-card :key="i" max-width :to="category.to">
              <v-card-text class="text-center">
                <v-img height="300" width="300" :src="category.src" contain />
              </v-card-text>
              <v-card-title>{{ category.name }}</v-card-title>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          title: "See our full Catalog",
          link: "/catalog/",
          src: require("@/assets/home_slider/full.jpg"),
        },
        {
          title: "Our Fall Collection",
          link: "/catalog/",
          src: require("@/assets/home_slider/fall.jpg"),
        },
        {
          title: "Our Winter Collection",
          link: "/catalog/",
          src: require("@/assets/home_slider/winter.jpg"),
        },
        {
          title: "Our New Arivals",
          link: "/catalog/",
          src: require("@/assets/home_slider/new.jpg"),
        },
      ],
      categories: [
        {
          name: "Winter items",
          src:
            "https://www.dollarama.com/media/1fc0697c-94d3-4a79-b3e6-b68ca5b9dccd/VC5b5g/Composer/HomePage/Dollarama/Departments/BTS%20Dept%20Tile.jpg",
          to: "/catalog/",
        },
        {
          name: "Houseware Line",
          src:
            "https://www.dollarama.com/media/1fc0697c-94d3-4a79-b3e6-b68ca5b9dccd/VC5b5g/Composer/HomePage/Dollarama/Departments/BTS%20Dept%20Tile.jpg",
          to: "/catalog/",
        },
        {
          name: "Starionary Line",
          src:
            "https://www.dollarama.com/media/1fc0697c-94d3-4a79-b3e6-b68ca5b9dccd/VC5b5g/Composer/HomePage/Dollarama/Departments/BTS%20Dept%20Tile.jpg",
          to: "/catalog/",
        },
        {
          name: "Cell Phone",
          src:
            "https://www.dollarama.com/media/1fc0697c-94d3-4a79-b3e6-b68ca5b9dccd/VC5b5g/Composer/HomePage/Dollarama/Departments/BTS%20Dept%20Tile.jpg",
          to: "/catalog/",
        },
        {
          name: "Summer Items",
          src:
            "https://www.dollarama.com/media/1fc0697c-94d3-4a79-b3e6-b68ca5b9dccd/VC5b5g/Composer/HomePage/Dollarama/Departments/BTS%20Dept%20Tile.jpg",
          to: "/catalog/",
        },
        {
          name: "Bathroom & Kitchen",
          src:
            "https://www.dollarama.com/media/1fc0697c-94d3-4a79-b3e6-b68ca5b9dccd/VC5b5g/Composer/HomePage/Dollarama/Departments/BTS%20Dept%20Tile.jpg",
          to: "/catalog/",
        },
        {
          name: "Hardware",
          src:
            "https://www.dollarama.com/media/1fc0697c-94d3-4a79-b3e6-b68ca5b9dccd/VC5b5g/Composer/HomePage/Dollarama/Departments/BTS%20Dept%20Tile.jpg",
          to: "/catalog/",
        },
        {
          name: "Party Stuff",
          src:
            "https://www.dollarama.com/media/1fc0697c-94d3-4a79-b3e6-b68ca5b9dccd/VC5b5g/Composer/HomePage/Dollarama/Departments/BTS%20Dept%20Tile.jpg",
          to: "/catalog/",
        },
        {
          name: "Health & Beuty",
          src:
            "https://www.dollarama.com/media/1fc0697c-94d3-4a79-b3e6-b68ca5b9dccd/VC5b5g/Composer/HomePage/Dollarama/Departments/BTS%20Dept%20Tile.jpg",
          to: "/catalog/",
        },
      ],
    };
  },
};
</script>
<style scoped>
h1 {
  color: red;
  font-size: 5vw;
  text-align: right;
  font-weight: bolder;
  margin: 2vw 0vw 0vw 0vw;
}
h3 {
  text-align: center;
}
a {
  margin: 0vw 1vw 0vw 0vw;
}
</style>