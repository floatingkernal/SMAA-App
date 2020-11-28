<template>
  <div>    <v-alert v-if="error" type="error"> {{ error }} </v-alert>
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
        <!-- <v-btn color="primary" @click="makeAdmin">Make Admin</v-btn> -->
        <v-spacer />
        <v-btn color="error" to="/registration">Register</v-btn>
      </v-card-actions>
    </v-card>
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
import firebase, { functions } from "firebase/app";

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
  }),
  methods: {
    async submit(e) {
      e.preventDefault();
      this.error = ""
      const valid = await this.$refs.observer.validate();
      if (!valid) {
        this.error = "Validation error";
        return;
      }
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => (this.error = error.message));
      if (this.error) return;
      const userToken = await firebase.auth().currentUser.getIdTokenResult()
      if (!userToken.claims.validCustomer) {
        this.error = "Account Not Authorized"
        await firebase.auth().signOut()
        return
      }
      this.$router.replace({name: 'Home'})
    },
    makeAdmin(e) {
      e.preventDefault()
      const f = functions();
      const addValidCustomer = f.httpsCallable('addValidCustomer')
      addValidCustomer({email: 'test@test.ca'}).then(res => console.log("adding valid customer", res))
        
    }
  },
};
</script>

<style>
</style>