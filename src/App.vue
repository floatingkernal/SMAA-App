<template>
  <v-app class="app">
    <Header />
    <v-main class="mt-5">
      <keep-alive include="Catalog">
        <router-view />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",

  components: {
    Header,
  },
};
</script>

<style scoped>
.app {
  max-width: 1180px;
  margin: auto;
}
.app * {
  background-color: #fff3e6;
}
</style>

<style>
body {
  background-color: #fff3e6;
}
</style>
