<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="data.items"
      class="elevation-1"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{data.timeStamp}} </v-toolbar-title>
          <v-spacer />
          <v-toolbar-title class="mx-3">Total: ${{ data.totalCost }}</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:[`item.img`]="{ item }">
        <v-img :src="item.img" width="50" height="50" contain />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "Cart",
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
  },
  data: () => ({
    headers: [
      { text: "Picture", value: "img" },
      { text: "Item Number", value: "ItemNo" },
      { text: "Description", value: "Desc" },
      { text: "$ Price/Item", value: "Price" },
      { text: "Quantity", value: "Qty" },
    ],
  }),
};
</script>

<style>
</style>