const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const cheerio = require('cheerio');
let rp = require('request-promise');

const app = express();

app.use(cors({
    origin: true
}));
app.use(bodyParser.json());

app.get("/player", (req, res) => {
    if (!req.query.q) {
        res.send("No player parameter. Endpoint usage: fantasynewsaggregator.com/player?q=firstname+lastname");
    } else {
        getResponse(req, res)
    }
});

async function getResponse(req, res) {
    const cardTitle = await getCardTitle(req);
    const rotoString = await getRotoworld(req);
    const fpString = await getFantasyPros(req);
    let result = {
        title: cardTitle,
        roto: rotoString,
        fp: fpString
    };
    res.json(result);
}

async function getCardTitle(req) {
    let player = getPlayerName(req);
    let lastName = player.last;
    let firstName = player.first;
    let url = "http://www.rotoworld.com/content/playersearch.aspx?searchname=" + lastName + ",%20" + firstName + "&sport=nfl";
    try {
        const response = await rp(url);
        let $ = cheerio.load(response);
        return Promise.resolve($("title").text().trim().split(" - ")[0]);
    } catch (error) {
        return Promise.reject(error);
    }
}

// lol we're going to use a stupid ass hack for this
// rotoworld searches dont show you the URL unless you fuck it up
// last name, first name
// ex: deandre+hopkins
async function getRotoworld(req) {
    let player = getPlayerName(req);
    let lastName = player.last;
    let firstName = player.first;
    let url = "http://www.rotoworld.com/content/playersearch.aspx?searchname=" + lastName + ",%20" + firstName + "&sport=nfl";
    try {
        const response = await rp(url);
        let $ = cheerio.load(response);
        let rotoData = {
            report: $(".playernews .report")[0].children[0].data,
            impact: $(".playernews .impact")[0].children[0].data
        };
        return Promise.resolve(rotoData);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getFantasyPros(req, res) {
    let player = getPlayerName(req);
    let lastName = player.last;
    let firstName = player.first;
    let url = `http://www.fantasypros.com/nfl/players/${firstName}-${lastName}.php`;
    try {``
        const response = await rp(url);
        let $ = cheerio.load(response);
        let tmp = $('.inner .body-row .content p');
        let fpData = {
            headline: tmp[0].children[0].children[0].data,
            news: tmp[1].children[0].data,
            impact: tmp[3].children[0].data
        };
        return Promise.resolve(fpData);
    } catch (error) {
        return Promise.reject(error);
    }
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