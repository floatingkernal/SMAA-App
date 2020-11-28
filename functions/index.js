import { https } from "firebase-functions";
import { initializeApp, auth } from "firebase-admin";
initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


export const addValidCustomer = https.onCall((data, context) => {
  return auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return auth().setCustomUserClaims(user.uid, {
        validCustomer: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been verified`,
      };
    })
    .catch((err) => {
      return err;
    });
});
