<template>
  <ValidationProvider
    tag="div"
    :rules="rules"
    :name="name"
    :vid="vid"
    v-slot="{ errors }"
  >
    <v-text-field
      filled
      :type="type"
      v-model="currentValue"
      :label="name"
      :error-messages="errors[0]"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "TextInput",
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    rules: {
      type: [String, Object],
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    vid: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  data: () => ({
    currentValue: "",
  }),
  watch: {
    currentValue(val) {
      // allows us to use v-model on our input.
      this.$emit("input", val);
    },
  },
};
</script>
