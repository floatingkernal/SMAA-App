<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon :to="to" v-bind="attrs" v-on="on">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "HeaderButton",
  props: {
    tooltip: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>