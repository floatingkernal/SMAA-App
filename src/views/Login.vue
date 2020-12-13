<template>
  <div>
    <v-alert v-if="error" type="error"> {{ error }} </v-alert>
    <v-alert v-if="success" type="success"> {{ success }} </v-alert>
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
              rules="required|email"
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
        <v-btn color="primary" @click="forgotPwd">Forgot Password?</v-btn>
        <v-spacer />
        <v-btn color="error" to="/registration">Register</v-btn>
      </v-card-actions>
    </v-card>

    <v-layout row justify-center>
      <v-dialog v-model="forgotPwdDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Password Reset Email</span>
          </v-card-title>
          <v-card-text>
            Please type in your email to be reset your passward
            <ValidationObserver ref="observer1">
              <v-form @keyup.native.enter="sendPwdReset">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="pwdResetEmail"
                    :error-messages="errors"
                    label="Email"
                    required
                    prepend-icon="mdi-account-circle"
                    type="email"
                  ></v-text-field>
                </ValidationProvider>
              </v-form>
            </ValidationObserver>
            <!-- <v-text-field label="Email*" required></v-text-field> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="close">Close</v-btn>
            <v-btn color="red darken-1" dark @click="sendPwdReset">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { required, email } from "vee-validate/dist/rules";
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
extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "Login",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    forgotPwdDialog: false,
    showPass: false,
    email: "",
    pwdResetEmail: "",
    password: "",
    error: "",
    success: "",
  }),
  methods: {
    async submit(e) {
      e.preventDefault();
      this.error = "";
      this.success = "";
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
      const userToken = await firebase.auth().currentUser.getIdTokenResult();
      if (!userToken.claims.validCustomer) {
        this.error = "Account Not Authorized";
        await firebase.auth().signOut();
        return;
      }
      this.$router.replace({ name: "Home" });
    },
    async sendPwdReset(e) {
      e.preventDefault();
      const valid = await this.$refs.observer1.validate();
      if (!valid) {
        return;
      }
      await firebase
        .auth()
        .sendPasswordResetEmail(this.pwdResetEmail)
        .catch((err) => {
          console.error(err);
          this.error =
            "An error occured when sending your password reset email";
        });
      this.close();
      if (this.error) return;
      this.success = "Passward Reset Email has been sent";
      this.pwdResetEmail = "";
    },
    forgotPwd() {
      this.forgotPwdDialog = true;
    },
    close() {
      this.forgotPwdDialog = false;
    },
    makeAdmin(e) {
      e.preventDefault();
      const f = functions();
      const addValidCustomer = f.httpsCallable("addValidCustomer");
      addValidCustomer({ email: "test@test.ca" }).then((res) =>
        console.log("adding valid customer", res)
      );
    },
  },
};
</script>

<style></style>
