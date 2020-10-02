import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import firebase from "firebase/app";
import fbConfig from "./fb";

import axios from "axios";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


firebase.initializeApp(fbConfig.config);

let app;
firebase.auth().onAuthStateChanged(() => {
  // console.log(user)
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

// new Vue({
//   router,
//   store,
//   vuetify,
//   render: (h) => h(App),
// }).$mount("#app");
