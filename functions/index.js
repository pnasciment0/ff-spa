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
    if (!req.query.q) {
        res.send("No player parameter. Endpoint usage: fantasynewsaggregator.com/player?q=firstname+lastname");
    } else {
        // getRotoworld(req, res);
        getFantasyPros(req, res);
    }
});

// lol we're going to use a stupid ass hack for this
// rotoworld searches dont show you the URL unless you fuck it up
// last name, first name
// ex: deandre+hopkins
function getRotoworld(req, res) {
    let player = getPlayerName(req);
    let lastName = player.last;
    let firstName = player.first;
    let url = "http://www.rotoworld.com/content/playersearch.aspx?searchname=" + lastName + ",%20" + firstName + "&sport=nfl";
    request.get(url, (err, response, body) => {
        if (err) {
            throw err;
        }
        console.log(body);
        let $ = cheerio.load(body);

        // res.send("Roto string is: " + body);
        res.send($('.playernews .report')[0].children[0].data);
    });
}

function getFantasyPros(req, res) {
    let player = getPlayerName(req);
    let lastName = player.last;
    let firstName = player.first;
    let url = `http://www.fantasypros.com/nfl/players/${firstName}-${lastName}.php`;
    request.get(url, (err, response, body) => {
        if (err) {
            throw err;
        }
        let $ = cheerio.load(body);
        let tmp = $('.inner .body-row .content p');
        tmp.each(function() {
            console.log($(this).text());
            res.write($(this).text() + "\n");
        });
        res.end();
        // res.send($('.inner .body-row .content p')[0].children.data);
    })
}

function getPlayerName(req) {
    let playerName = req.query.q;
    let lastName = playerName.split(' ')[1];
    let firstName = playerName.split(' ')[0];
    return {
        last: lastName,
        first: firstName
    }
}

const api = functions.https.onRequest(app);

module.exports = {
    api
};