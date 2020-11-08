import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import firebase from "firebase/app";


import axios from "axios";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


let app;
firebase.auth().onAuthStateChanged(() => {
  if (app) return;
  
  store.dispatch("loadCart");
  store.dispatch("loadData");

  app = new Vue({
    store,
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
