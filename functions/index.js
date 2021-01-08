// import { https } from "firebase-functions";
// import { initializeApp, auth } from "firebase-admin";
// const axios = require('axios')
const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addValidCustomer = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
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

const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});


let transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: 'smtp.gmail.com',
    port: 567,
    secure: false,
  auth: {
    user: '',
    pass: '' 
  }
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {

      const mailOptions = {
          from: 'Smaa Test <smaatest@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
          to: req.body.dest,
          subject: req.body.subject, // email subject
          html: req.body.html, // email content in HTML
          text: req.body.text
      };

      // returning result
      return transporter.sendMail(mailOptions, (erro, info) => {
          if(erro){
              return res.send(erro.toString());
          }
          return res.send('Sent');
      });
  });    
});