// install express with `npm install express`
import env from "dotenv";
import PocketBase from "pocketbase";
import express from "express";
import { Stripe } from "stripe";
import cors from "cors";

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

const stripe = Stripe(STRIP_SK);

const POCKETBASE_URL = DEBUG
  ? "https://presidential-game.pockethost.io"
  : "http://127.0.0.1:8090";

const pb = new PocketBase(POCKETBASE_URL);

/**
 *
 * @param {int} amount
 * @returns
 */
const convertCurrrency = (amount) => {
  // return parseInt(amount / 700);
  return amount;
};

app.post("/make-payment", async (req, res) => {
  const { stake } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: convertCurrrency(stake),
      automatic_payment_methods: {
        enabled: true,
      },
    });

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

const PORT = 8200;
app.listen(PORT, () => console.log("Started at port 8200"));

// export 'app'
// export default app;
