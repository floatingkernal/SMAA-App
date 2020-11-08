<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="cart"
        class="elevation-1"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Order</v-toolbar-title>
            <v-spacer />
            <v-toolbar-title class="mx-3"
              >Total: ${{ getTotal }}</v-toolbar-title
            >
            <v-btn
              dark
              class="ma-1"
              color="red"
              @click="placeOrder"
              v-if="getTotal > 0"
            >
              Place order
            </v-btn>

            <!-- Delete Dialog -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.img`]="{ item }">
          <v-img :src="item.img" width="50" height="50" contain />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="incQty(item)"> mdi-plus </v-icon>
          <v-icon small class="mr-2" @click="decQty(item)"> mdi-minus </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="error" @click="initialize"> Refresh </v-btn>
        </template>
        <template slot="footer">
          <div class="d-flex justify-end">
            <v-btn class="ma-1" @click="continueShopping">
              Continue Shopping
            </v-btn>
            <v-spacer />
            <div class="ma-3">Total: ${{ getTotal }}</div>
            <v-btn
              dark
              class="ma-1"
              color="red"
              @click="placeOrder"
              v-if="getTotal > 0"
            >
              Place order
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";

export default {
  name: "ShoppingCart",
  data: () => ({
    dialogDelete: false,
    headers: [
      { text: "Picture", value: "img" },
      { text: "Item Number", value: "ItemNo" },
      { text: "Description", value: "Desc" },
      { text: "$ Price/Item", value: "Price" },
      { text: "Quantity", value: "Qty" },
      { text: "Actions", value: "actions", sortable: false },
      // { text: "Date & Time Added", value: "Time" },
    ],
    cart: [],
    editedIndex: -1,
    editedItem: {
      img: "",
      ItemNo: "",
      Desc: "",
      Price: 0,
      Qty: 0,
    },
    defaultItem: {
      img: "",
      ItemNo: "",
      Desc: "",
      Price: 0,
      Qty: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    getTotal() {
      let res = 0;
      this.cart.forEach((item) => (res += item.Qty * item.Price));
      return res;
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
    '$store.state.sheetsLoading'() {
      this.initialize()
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      if (this.$store.state.sheetsLoading) return
      this.cart = [];
      const cart = this.$store.state.shoppingCart;
      cart.forEach((item) => {
        const index = this.$store.state.sheetItems[item.itemNo];
        const itemInfo = this.$store.state.sheetRows[index];
        const elmt = {
          ItemNo: item.itemNo,
          Desc: itemInfo.Description,
          Price: itemInfo["STD Price"],
          Qty: item.qty,
          Time: item.time,
          OrderMultiple: Number(itemInfo.OrdMultiple),
        };
        itemInfo.Img ? (elmt["img"] = itemInfo.Img) : (elmt["img"] = "");
        this.cart.push(elmt);
      });
      this.cart.forEach((item) => this.loadImg(item));
      this.cart.forEach((item) => this.saveImg(item));
    },

    viewItem(val) {
      const to = "/product-info/" + val.ItemNo;
      this.$router.push(to);
    },
    saveImg(item) {
      // console.log(item);
      const rowNum = this.$store.state.sheetItems[item.ItemNo];
      const rowInfo = this.$store.state.sheetRows[rowNum];
      if (!rowInfo.img || rowInfo.img === "")
        this.$store.commit("setImg", { itemNo: item.ItemNo, url: item.img });
    },

    loadImg(item) {
      if (!item.img || item.img === "") {
        const itemUrl = "products/" + item.ItemNo + ".jpg";
        firebase
          .storage()
          .ref()
          .child(itemUrl)
          .getDownloadURL()
          .then((u) => (item.img = u))
          .catch(() => (item.img = ""));
      }
    },

    editItem(item) {
      console.log(item);
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
    },

    deleteItem(item) {
      // console.log(item);
      this.editedIndex = this.cart.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.cart.splice(this.editedIndex, 1);
      const item = { itemNo: this.editedItem.ItemNo, qty: 0 };
      this.$store.commit("updateCart", item);
      this.closeDelete();
    },

    close() {
      // this.dialog = false
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
      // } else {
      //   this.desserts.push(this.editedItem)
      // }
      // this.close()
    },
    incQty(item) {
      const cartItem = this.cart.find((x) => x.ItemNo == item.ItemNo);
      cartItem.Qty += cartItem.OrderMultiple;
      const updatedItem = { itemNo: item.ItemNo, qty: cartItem.Qty };
      this.$store.commit("updateCart", updatedItem);
      // this.$nextTick(this.initialize)
    },
    decQty(item) {
      const cartItem = this.cart.find((x) => x.ItemNo == item.ItemNo);
      cartItem.Qty -= cartItem.OrderMultiple;
      const updatedItem = { itemNo: item.ItemNo, qty: cartItem.Qty };
      this.$store.commit("updateCart", updatedItem);
      // this.$nextTick(this.initialize)
    },
    continueShopping() {
      this.$router.push("/catalog/");
    },
    placeOrder() {},
  },
};
</script>

<style>
</style>