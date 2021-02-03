const express = require("express");
const price = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const cors = require("cors");
price.use(cors());
price.options('*', cors());

price.use(bodyParser.urlencoded({extended: true}));
price.use(bodyParser.json());

require("dotenv").config();

price.get('/stock/price', (req, res) => {
    res.end("price Received GET request!");  
});

price.post('/stock/price', cors(), async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    const { ticker } = body;
    console.log("stocks-api.js 14 | body", body.ticker);

    const request = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?unadjusted=true?apiKey=${process.env.POLYGON_API_KEY}`
    )

    const data = await request.json();

    res.json(data);
});

module.exports = price;