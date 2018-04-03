const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const request = require('request');

const app = express();

app.use(cors({
    origin: true
}));
app.use(bodyParser.json());

app.get("/player", (req, res) => {
    getRotoWorld(req, res);
});


// lol we're going to use a stupid ass hack for this
// rotoworld searches dont show you the URL unless you fuck it up
// last name, first name
// ex: deandre+hopkins
function getRotoWorld(req, res) {
    if (req.query.q) {
        let playerName = req.query.q;
        let lastName = playerName.split(' ')[1];
        let firstName = playerName.split(' ')[0];
        res.send("Roto String is: ?searchname=" + lastName + ",%20" + firstName + "&sport=nfl");
    } else {
        res.send("No player parameter. Usage: fantasynewsaggregator.com/player?q=firstname+lastname");
    }
}

const api = functions.https.onRequest(app);

module.exports = {
    api
};