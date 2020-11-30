<template>
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

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <HeaderButton icon="mdi-home" tooltip="Home" to="/" />

      <v-spacer></v-spacer>
      <v-toolbar-title v-if="!mobileView">SMAA CORPORATION</v-toolbar-title>
      <v-toolbar-title v-else>SMAA</v-toolbar-title>

      <v-spacer></v-spacer>

      <HeaderButton icon="mdi-magnify" tooltip="About" to="/about" />
      <HeaderButton icon="mdi-file-cabinet" tooltip="Orders History" to="/orders" />
      <!-- <HeaderButton
        icon="mdi-heart"
        tooltip="Product Info"
        to="/product-info/headerProd"
        v-if="loggedIn"
      /> -->

      <template>
        <v-tooltip bottom v-if="loggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon to="/shopping-cart" v-bind="attrs" v-on="on">
            <div v-if="cartAmt > 0" >
              <v-badge :content="cartAmt" color="red" >
                <v-icon>mdi-cart</v-icon>
              </v-badge>
            </div>
            <div v-else>
                <v-icon>mdi-cart</v-icon>
            </div>
            </v-btn>
          </template>
          <span>Shopping Cart</span>
        </v-tooltip>
      </template>

      <HeaderButton
        icon="mdi-login"
        tooltip="Log In"
        to="/login"
        v-if="!loggedIn"
      />
      <v-tooltip bottom v-if="loggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="logout" v-bind="attrs" v-on="on">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Log Out</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
import HeaderButton from "./HeaderButton";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Header",
  components: {
    HeaderButton,
  },
  computed: {
    cartAmt() {
      const cart = this.$store.state.shoppingCart
      if (!cart) return 0
      return cart.length;
    },
  },
  data() {
    return {
      mobileView: true,
      logo: require("@/assets/logo.png"),
      loggedIn: false,
    };
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 500;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.loggedIn = false;
          this.$router.replace({ name: "Login" });
        });
    },
    setupFirebase() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) this.loggedIn = true;
        else this.loggedIn = false;
      });
    },
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  mounted() {
    this.setupFirebase();
  },
};
</script>

<style>
</style>