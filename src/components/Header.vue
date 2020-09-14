<template>
  <!-- <v-card class="overflow-hidden"> -->
    <div>
    <v-app-bar
      app
      color="#1c1c1c"
      dark
      shrink-on-scroll
      prominent

      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(236,55,55,.7), rgba(28,28,28,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon to='/'></v-app-bar-nav-icon>

      <v-toolbar-title v-if="!mobileView" >SMAA CORPORATION</v-toolbar-title>
      <v-toolbar-title v-else >SMAA</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon to='/about'>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon to='/product-info'>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    <v-btn icon to="/shopping-cart">
      <v-badge content="0" color="red">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>

      <v-btn icon to='/login'>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    
    </div>
  <!-- </v-card> -->
  <!-- <v-app-bar color="gray darken-4" dark max-height="70">
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img src="@/assets/logo.png" position="center" alt="Smaa" />
      </router-link>
    </div>
    <v-tabs centered>
      <v-tab to="/">Home</v-tab>
      <v-tab to="/catalog">Catalog</v-tab>
      <v-tab to="/product-info">Productinfo</v-tab>
      <v-tab to="/about">About</v-tab>
    </v-tabs>
    <v-btn to="/shopping-cart">
      <v-badge content="0" color="red">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn to="/login" color="red">Signin/Signup</v-btn>
  </v-app-bar> -->
</template>

<script>
export default {
    name:"Header",
    data: () => ({
      mobileView: true,
      logo: require("@/assets/logo.png")
    }),
    methods: {
      handleView() {
        this.mobileView = window.innerWidth <= 500;
      }
    },
    created() {
      this.handleView();
      window.addEventListener('resize', this.handleView);
    }
};
</script>

<style>
</style>