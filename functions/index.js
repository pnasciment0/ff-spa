const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const cheerio = require('cheerio');

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
        let url = "http://www.rotoworld.com/content/playersearch.aspx?searchname=" + lastName + ",%20" + firstName + "&sport=nfl";
        request.get(url, (err, response, body) => {
           if (err) {
               throw err;
           }
           console.log(body);
           let $ = cheerio.load(body);

            res.send($('.playernews .report')[0].children[0].data);
        });
    } else {
        res.send("No player parameter. Endpoint usage: fantasynewsaggregator.com/player?q=firstname+lastname");
    }
}

const api = functions.https.onRequest(app);

module.exports = {
    api
};