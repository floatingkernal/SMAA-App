<template>
  <div>
    <v-card width="400" class="mx-auto mt-10">
      <v-card-title>
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <ValidationObserver ref="observer">
          <v-form @keyup.native.enter="submit">
            <ValidationProvider
              v-slot="{ errors }"
              name="Email"
              rules="required"
            >
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Email"
                required
                prepend-icon="mdi-account-circle"
                type="email"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Password"
              rules="required"
            >
              <v-text-field
                v-model="password"
                :error-messages="errors"
                label="Password"
                :type="showPass ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
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
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline"> Error occured </v-card-title>

        <v-card-text>
          {{ error }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Okay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import * as firebase from "firebase/app";
import "firebase/auth";

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
    email: "",
    password: "",
    error: "",
    dialog: false,
  }),
  methods: {
    submit() {
      this.$refs.observer.validate().then((res) => {
        if (res) {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then((data) => {
              console.log(data);
              this.$router.replace({ name: "Home" });
            })
            .catch((error) => {
              this.dialog = true;
              this.error = error.message;
            });
        }
      });
    },
  },
};
</script>

<style>
</style>