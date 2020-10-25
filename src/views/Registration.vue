<template>
  <div>
    <v-card class="mx-auto mt-10">
      <v-card-title>
        <h1>Registration Form</h1>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <ValidationObserver ref="observer">
          <v-form>
            <v-container>
              <div v-for="(row, i) in info" :key="i">
                <v-row>
                  <h3 class="mx-2">{{ i }}</h3>
                </v-row>
                <v-row class="d-flex">
                  <TextInput
                    class="mx-2 flex-grow-1"
                    v-for="(item, j) in row"
                    :key="j"
                    :v-model="item.value"
                    :name="item.label"
                    :rules="item.rules"
                    :type="item.type"
                  />
                </v-row>
              </div>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { extend, ValidationObserver } from "vee-validate";
import { email } from "vee-validate/dist/rules";

import TextInput from "@/components/TextInput";

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "Regestration",
  components: {
    ValidationObserver,
    TextInput,
  },
  data: () => ({
    showPass: false,
    rowNames: [
      "Account Information",
      "Personal Information",
      "Contact Information",
      "Location Information",
    ],
    info: {
      Account: [
        { label: "Username", value: "", rules: "required" },
        { label: "Password", value: "", rules: "required", type: "password" },
        {
          label: "Confirm Password",
          value: "",
          rules: "required|password:@Password",
          type: "password",
        },
      ],
      Personal: [
        { label: "Title", value: "", rules: "" },
        { label: "First Name", value: "", rules: "required" },
        { label: "Last Name", value: "", rules: "required" },
      ],
      Contact: [
        { label: "Email", value: "", rules: "required|email", type: "email" },
        { label: "Phone", value: "", rules: "required", type: "tel" },
        { label: "Cell Phone", value: "", rules: "", type: "tel" },
        { label: "Fax", value: "", rules: "", type: "tel" },
      ],
      Location: [
        { label: "Business Name", value: "", rules: "" },
        { label: "Address", value: "", rules: "required" },
        { label: "City", value: "", rules: "required" },
        { label: "Postal Code", value: "", rules: "required" },
      ],
    },
  }),
  methods: {
    submit() {
      this.$refs.observer.validate().then((res) => {
        console.log(res);
        if (res) {
          // TODO: submit form here
          console.log(this.username + this.password);
        }
      });
    },
  },
};
</script>

<style>
</style>