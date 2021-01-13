const functions = require("firebase-functions");
const price = require("./stock/price");

exports.api = functions.https.onRequest(price);
