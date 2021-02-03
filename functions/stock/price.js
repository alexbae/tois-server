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
    const today = new Date()
    const currentDate = new Date(today)
    let backDate = 0

    currentDate.setDate(currentDate.getDate() - backDate)

    const date = currentDate.toISOString().split('T')[0]

    const request = await fetch(
        `https://api.polygon.io/v1/open-close/${ticker}/${date}?apiKey=${process.env.POLYGON_API_KEY}`
    )

    const data = await request.json();

    if (data.status === 'OK') {
        res.json(data);
    } else {
        backDate + 1
    }
});

module.exports = price;