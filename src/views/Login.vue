<template>
  <v-card width="400" class="mx-auto mt-10">
    <v-card-title>
      <h1>Login</h1>
    </v-card-title>
    <v-card-text>
      <ValidationObserver ref="observer">
        <v-form>
          <ValidationProvider v-slot="{ errors }" name="Username" rules="required">
            <v-text-field
              v-model="username"
              :error-messages="errors"
              label="Username"
              required
              prepend-icon="mdi-account-circle"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Password" rules="required">
            <v-text-field
              v-model="password"
              :error-messages="errors"
              label="Password"
              :type="showPass? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPass? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPass = !showPass"
            />
          </ValidationProvider>
        </v-form>
      </ValidationObserver>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="success" @click="submit">Login</v-btn>
      <v-spacer />
      <v-btn color="error" to="/registration">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

export default {
  name: "Login",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    showPass: false,
    username: "",
    password: "",
  }),
  methods: {
    submit() {
      this.$refs.observer.validate().then((res) => {
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