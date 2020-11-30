<template>
  <div>
    <v-alert v-if="error" type="error"> {{ error }} </v-alert>
    <v-progress-linear v-if="loading" indeterminate color="red" />
    <v-card class="mx-5">
      <v-list>
        <v-list-item
          v-for="(order, i) in orders"
          :key="i"
          link
          @click="showItems(i)"
        >
          <v-icon color="red"> mdi-file-document </v-icon>

          <v-list-item-content>
            <v-list-item-title v-text="order.timeStamp" />
            <v-list-item-subtitle v-text="`$${order.totalCost}`" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog v-model="showOrderItems"> 
        <Cart :data='orders[itemNo]' />
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  name: "Orders",
  components: {
    Cart: () => import(/* webpackChunkName: "Cart" */ "@/components/Cart"),
  },
  data: () => ({
    showOrderItems: false,
    itemNo: -1,
    error: "",
    loading: true,
    orders: [],
  }),
  created() {
    this.initialize();
  },
  methods: {
    showItems(index) {
      this.itemNo = index;
      this.showOrderItems = true;
    },
    async initialize() {
      this.error = "";
      const email = firebase.auth().currentUser.email;
      const docs = await firebase
        .firestore()
        .collection("orders")
        .where("email", "==", email)
        .get()
        .catch((err) => {
          console.error(err);
          this.error = "Opps an error occured";
        });
      if (this.error) return;
      docs.forEach((doc) => {
        const data = doc.data();
        this.orders.push(data);
      });
      this.loading = false;
    },
  },
};
</script>

<style>
</style>