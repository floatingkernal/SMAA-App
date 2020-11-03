import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Vuetify from "vuetify";
// import 'vuetify/dist/vuetify.min.css'
import vuetify from "./plugins/vuetify";

import firebase from "firebase/app";
// import fbConfig from "./secrets/fb";



import axios from "axios";
// import Vuetify from "vuetify/lib";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


// firebase.initializeApp(fbConfig.config);


let app;
firebase.auth().onAuthStateChanged(() => {
  // console.log(user)
  if (app) return;

  app = new Vue({
    store,
    router,
    vuetify,
    // vuetify: new Vuetify(),
    render: (h) => h(App),
  }).$mount("#app");
});

// new Vue({
//   router,
//   store,
//   vuetify,
//   render: (h) => h(App),
// }).$mount("#app");
