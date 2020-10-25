<template>
  <div>
    <div class="about-sign">
      <v-row justify="center">
        <h1>Contact Us</h1>
      </v-row>
    </div>
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-card min-height="438" class="align-center">
            <v-card-text>
              <v-card-title class="headline">SMAA Corporation</v-card-title>
              <v-card-subtitle>
                <p>
                  <v-icon color="red">mdi-map-marker</v-icon>5250 Finch Ave
                  East, Unit 7 Scarborough, ON, M1S 5A4
                </p>
                <p>
                  <v-icon color="red">mdi-email</v-icon>
                  <a href="mailto:smaacorp@yahoo.com">smaacorp@yahoo.com</a>
                </p>
                <p>
                  <v-icon color="red">mdi-deskphone</v-icon>Office:
                  416-849-(SMAA) 7622
                </p>
                <p>
                  <v-icon color="red">mdi-cellphone</v-icon>Cell: 416-274-8256
                </p>
                <p><v-icon color="red">mdi-printer</v-icon>Fax: 416-849-0282</p>
              </v-card-subtitle>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-text class="text-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d46065.94950764091!2d-79.253951!3d43.811832!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d12a4cafc8fb%3A0x47fd05a185562450!2s7-5320%20Finch%20Ave%20E%2C%20Scarborough%2C%20ON%20M1S%205G3%2C%20Canada!5e0!3m2!1sen!2sus!4v1599987321364!5m2!1sen!2sus"
                width="300"
                height="400"
                frameborder="0"
                style="border: 0"
                allowfullscreen
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <ContactForm />
    </v-container>
  </div>
</template>

<script>
import ContactForm from "../components/ContactForm";
export default {
  name: "About",
  components: {
    ContactForm,
  },
};
</script>

<style scoped>
.about-sign {
  padding-top: 1vw;
}
</style>