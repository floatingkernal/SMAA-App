<template>
  <div>
    <v-alert v-if="error" type="error"> {{ error }} </v-alert>
    <v-alert v-if="success" type="success">
      New User Created in backend
    </v-alert>
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
                    v-model="item.value"
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
        <Recaptcha :verify='verified = true' :expired='verified = false'/>
      </v-card-actions>
      <v-card-actions>
        <v-btn dark color="red" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
const db = firebase.firestore();

import { extend, ValidationObserver } from "vee-validate";
import { email } from "vee-validate/dist/rules";
import TextInput from "@/components/TextInput";
import Recaptcha from "@/components/Recaptcha"
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
    Recaptcha,
  },
  mounted() {
    this.verified = false
  },
  data: () => ({
    verified: false,
    error: "",
    success: false,
    showPass: false,
    rowNames: [
      "Account Information",
      "Personal Information",
      "Contact Information",
      "Location Information",
    ],
    info: {
      Account: [
        { label: "Email", value: "", rules: "required|email", type: "email" },
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
        { label: "Phone", value: "", rules: "required", type: "tel" },
        { label: "Cell Phone", value: "", rules: "", type: "tel" },
        { label: "Fax", value: "", rules: "", type: "tel" },
      ],
      Location: [
        { label: "Business Name", value: "", rules: "required" },
        { label: "Address", value: "", rules: "required" },
        { label: "City", value: "", rules: "required" },
        { label: "Postal Code", value: "", rules: "required" },
      ],
    },
  }),
  methods: {
    async submit(e) {
      e.preventDefault();
      this.error = "";
      const valid = await this.$refs.observer.validate();
      if (!valid) {
        console.log("Validation Error");
        this.error = "Validation Error";
        return;
      }
      if (!this.verified) {
        this.error = "reCAPTCHA not verified"
        return
      }
      const newEmail = this.info.Account[0].value;
      const newPass = this.info.Account[1].value;
      const newCustomer = {
        title: this.info.Personal[0].value,
        firstName: this.info.Personal[1].value,
        lastName: this.info.Personal[2].value,
        mainPhone: this.info.Contact[0].value,
        cellPhone: this.info.Contact[1].value,
        fax: this.info.Contact[2].value,
        businessName: this.info.Location[0].value,
        address: this.info.Location[1].value,
        city: this.info.Location[2].value,
        postalCode: this.info.Location[3].value,
        validCustomer: false,
      };
      // console.log(newEmail, newPass, newCustomer);
      await firebase
        .auth()
        .createUserWithEmailAndPassword(newEmail, newPass)
        .then(() => firebase.auth().signOut())
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              console.log(`Email address ${newEmail} already in use.`);
              this.error = `Email address ${newEmail} already in use.`
              break;
            case "auth/invalid-email":
              console.log(`Email address ${newEmail} is invalid.`);
              this.error = `Email address ${newEmail} is invalid.`
              break;
            case "auth/operation-not-allowed":
              console.log(`Error during sign up.`)
              this.error = `Error during sign up.`
              break;
            case "auth/weak-password":
              console.log(
                "Password must be at least 6 characters."
              );
                this.error = "Password must be at least 6 characters."
              break;
            default:
              this.error = error.message
              console.log(error.message);
              break;
          }
        });
      if (this.error) return
      await db
        .collection("customers")
        .doc(newEmail)
        .set(newCustomer)
        .catch(() => {
          console.log("Error occured when adding new customer");
          this.error = "Error occured when adding new customer";
        });
      if (this.error) return
      this.success = true;
      
    },
  },
};
</script>

<style>
</style>