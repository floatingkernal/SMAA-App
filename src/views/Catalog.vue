<template>
  <div class="d-flex flex-wrap mx-auto justify-center justify-sm-end">
    <div v-for="item in items" :key="item.id">
      <!-- {{ item }} -->
      <ProductCard :title="item.name" :desc="item.desc" :img="item.img" :to="item.to" :pricePerUnit="item.pricePerUnit" :pricePerCase="item.pricePerCase" :itemPerPack="item.itemPerPack" />
    </div>
    <!-- <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />-->
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
export default {
  name: "Catalog",

  components: {
    ProductCard,
  },
  data: () => ({
    items: [
      {
        name: "Item1",
        desc: "Discription of Item 1",
        img: "https://picsum.photos/500/500?image=1",
        to: "/product-info/TestProd",
        pricePerUnit: 0.01,
        pricePerCase: 1,
        itemPerPack: 1,
      },
      {
        name: "Item2",
        desc: "Discription of Item 2",
        img: "https://picsum.photos/500/500?image=2",
        to: "/",
        pricePerUnit: 0.02,
        pricePerCase: 2,
        itemPerPack: 2,
      },
      {
        name: "Item3",
        desc: "Discription of Item 3",
        img: "https://picsum.photos/500/500?image=3",
        to: "/",
        pricePerUnit: 0.10,
        pricePerCase: 3,
        itemPerPack: 3,
      },
      {
        name: "Item4",
        desc: "Discription of Item 4",
        img: "https://picsum.photos/500/500?image=4",
        to: "/",
        pricePerUnit: 0.4,
        pricePerCase: 4,
        itemPerPack: 6,
      },
      {
        name: "Item5",
        desc: "Discription of Item 5",
        img: "https://picsum.photos/500/500?image=5",
        to: "/",
        pricePerUnit: 0.75,
        pricePerCase: 5,
        itemPerPack: 12,
      },
      {
        name: "Item6",
        desc: "Discription of Item 6",
        img: "https://picsum.photos/500/500?image=6",
        to: "/",
        pricePerUnit: 1.0,
        pricePerCase: 6,
        itemPerPack: 124,
      },
    ],
  }),
};
</script>

<style>
body {
  background-color: #fff3e6;
}
</style>