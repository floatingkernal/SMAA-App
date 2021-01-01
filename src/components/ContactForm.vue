<template>
  <v-card>
    <ValidationObserver ref="observer">
      <v-form>
        <v-container>
          <ValidationProvider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:30"
          >
            <v-text-field
              filled
              v-model="name"
              :counter="30"
              :error-messages="errors"
              label="Name"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Email"
            rules="required|email"
          >
            <v-text-field
              filled
              v-model="email"
              :error-messages="errors"
              label="E-mail"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="subject">
            <v-text-field
              filled
              v-model="subject"
              label="Subject"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Message"
            rules="required"
          >
            <v-textarea
              filled
              v-model="message"
              :error-messages="errors"
              label="Message"
              required
            ></v-textarea>
          </ValidationProvider>
          <Recaptcha class='mb-4' :verify="verified = true" :expired="verified = false" />
          <v-btn color="error" class="mr-4" @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { required, email, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import Recaptcha from './Recaptcha.vue';

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Recaptcha,
  },
  data: () => ({
    name: "",
    email: "",
    subject: "",
    message: "",
    verified: false,
  }),
  created() {
    this.verified = false
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      const valid = await this.$refs.observer.validate()
      if (!valid) return; 
      if (!this.verified) {
        return
      }
      // this.$refs.observer.validate().then((res) => {
      //   console.log(res);
      //   if (res) {
      //     // TODO: submit form here
      //     alert("This feature is not Available yet.");
      //   }
      // });
      alert("This feature is not Available yet.")
    },
    clear() {
      this.name = "";
      this.email = "";
      this.subject = "";
      this.message = "";
      this.$refs.observer.reset();
    },
  },
};
</script>

<style>
</style>