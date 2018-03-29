const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const request = require('request');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const app = express();

app.use(cors({
    origin: true
}));
app.get("/test", (req, res) => {
    res.send("test test test");
});

const api = functions.https.onRequest(app);

module.exports = {
    api
};