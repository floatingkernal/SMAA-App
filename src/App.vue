<template>
  <v-app>
    <Header />
    <v-sheet
      max-height="600"
    >
      <v-container style="height: 120px;"></v-container>
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
