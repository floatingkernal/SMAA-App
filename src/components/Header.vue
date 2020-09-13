<template>
  <v-app-bar color="gray darken-4" dark max-height="70">
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
  </v-app-bar>
</template>

<script>
export default {
    name:"Header"
};
</script>

<style>
</style>