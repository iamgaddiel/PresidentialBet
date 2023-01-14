// install express with `npm install express`
// import env from "dotenv";
// import PocketBase from "pocketbase";
// import express from "express";
// import { Stripe } from "stripe";
// import cors from "cors";

// import PocketBase from "pocketbase";
const env = require("dotenv");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

env.config({ path: "./.env" });

const DEBUG = true;

const STRIP_PK = DEBUG
  ? process.env.STRIPE_TEST_PK
  : process.env.STRIPE_LIVE_PK;
  const STRIP_SK = DEBUG
  ? process.env.STRIPE_TEST_SK
  : process.env.STRIPE_LIVE_SK;


  const FLUTTER_KY = DEBUG ? process.env.FLUTTER_WAVE_PK  :  process.env.FLUTTER_WAVE_SK
  
  // stripe(STRIP_SK);
  const stripe = require("stripe")(STRIP_SK);;
  
// const stripe = Stripe(STRIP_SK);

const POCKETBASE_URL = DEBUG
  ? "https://presidential-game.pockethost.io"
  : "http://127.0.0.1:8090";
  
// const pb = new PocketBase(POCKETBASE_URL);

/**
 *
 * @param {int} amount
 * @returns
 */
const convertCurrrency = (amount) => {
  return amount;
};

app.post("/make-payment", async (req, res) => {
  const { stake } = req.body;
  // "type": "module",

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: convertCurrrency(stake),
      automatic_payment_methods: {
        enabled: true,
      },
    });
    if (DEBUG) console.log("paymentIntent", paymentIntent);
    if (DEBUG) console.log("paymentIntent Key", paymentIntent.client_secret);

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    return res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "welcome" });
});

app.get("/config", (req, res) => {
  res.send({
    stripePublishableKey: STRIP_PK,
  });
});


app.get("/get-publishable-key", (req, res) => {
  res.send({
    fw_key: ""
  })
})


const PORT = 8200;
app.listen(PORT, () => console.log("Started at port 8200"));

// export 'app'
// export default app;
module.exports = app
