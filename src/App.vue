<template>
  <v-app class="app">
    <Header />
    <v-sheet
      max-height="600"
    >
      <v-container style="height: 120px"></v-container>
    </v-sheet>
    <router-view />
    <v-main>
      <!-- <HelloWorld /> -->
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import Header from "./components/Header"

export default {
  name: "App",

  components: {
    // HelloWorld,
    Header,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.app {
  max-width: 1180px;
  margin:auto;
  
}
.app * {
  background-color: #fff3e6;
}
</style>