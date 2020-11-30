import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import sheets from "@/secrets/g-sheets";
import firebase from "firebase/app";
import "firebase/firestore";
import fbConfig from "@/secrets/fb";

firebase.initializeApp(fbConfig.config);

const db = firebase.firestore();

export default new Vuex.Store({
  state: {
    sheetsLoading: true,

    // item row information
    sheetRows: null,
    // maps item number to row number
    sheetItems: null,

    shoppingCart: [],

  },
  getters: {
    shoppingCartQty: (state) => (itemNo) => {
      const cartItem = state.shoppingCart.find((x) => x.itemNo == itemNo);
      if (cartItem) return cartItem.qty;
      else return 0;
    },
  },
  mutations: {
    loadItems: (state, items) => {
      state.sheetItems = items;
    },
    loadRows: (state, rows) => {
      state.sheetRows = rows;
    },
    setLoading: (state, loading) => {
      state.sheetsLoading = loading;
    },
    setCart: (state, cart) => {
      state.shoppingCart = cart;
    },

    updateCart: (state, item) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) return;
        // const docRef = db.collection("shoppingCarts").doc(user.email)
        const cartItem = state.shoppingCart.find((x) => x.itemNo == item.itemNo);
        // db.runTransaction( function(t) {
          //   return t.get(docRef).then( function() {
            if (!cartItem && item.qty != 0) {
              state.shoppingCart.push(item);
            } 
            else if (item.qty == 0 && cartItem) {
              const itemIndex = state.shoppingCart.findIndex(x => cartItem.itemNo == x.itemNo)
              state.shoppingCart.splice(itemIndex, 1)
            }
            else {
              cartItem.qty = item.qty
            }
          db.collection("shoppingCarts").doc(user.email).set({cart: state.shoppingCart}, {merge:true})})
          
          // t.set(docRef, {cart: state.shoppingCart}, {merge:true})})
        // }).catch(console.log)
        
      // })
    },
    emptyCart: (state) => {
      const user = firebase.auth().currentUser
      db.collection("shoppingCarts").doc(user.email).set({cart:[]})
      state.shoppingCart = []
    },
    setImg: (state, data) => {
      const rownum = state.sheetItems[data.itemNo]
      state.sheetRows[rownum]['Img'] = data.url
    }
  },
  actions: {
    loadData: ({ commit }) => {
      sheets().then((res) => {
        if (!res.items || !res.rows) {
          console.log("Error occured when loading Sheets");
        } else {
          commit("loadItems", res.items);
          commit("loadRows", res.rows);
        }
        commit("setLoading", false);
      });
    },
    loadCart: ({ commit }) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("shoppingCarts")
            .doc(user.email)
            .get()
            .then((doc) => {
              const cart = doc.data().cart;
              if (cart) commit("setCart", cart);
              else commit("setCart", []);
            });
        }
      });
    },
    imgUrlSetter: ({commit}, data) => {
      commit('setImg', data)
    }
  },
  modules: {},
});
