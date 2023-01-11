// install express with `npm install express` 
import {resolve} from 'path'
import env from "dotenv"
import PocketBase from 'pocketbase'
import express from 'express'
import stripe from "stripe"
const app = express()


env.config({ path: './.env'})

const DEBUG = process.env.DEBUG

const STRIP_PK = (DEBUG) ? process.env.STRIPE_TEST_PK : process.env.STRIPE_TEST_SK
const STRIP_SK = (DEBUG) ? process.env.STRIPE_LIVE_PK : process.env.STRIPE_LIVE_SK


stripe(STRIP_SK);


const POCKETBASE_URL = (DEBUG) ? "https://presidential-game.pockethost.io"  : "http://127.0.0.1:8090"
const pb = new PocketBase(POCKETBASE_URL)


const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return items;
};

app.post("/stake", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "ngn",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get('/', (req, res) => {
  res.json({ "status": "welcome"})
})


app.get('/config', (req, res) => {
  res.send({
    publishableKey: STRIP_PK
  })
})


app.listen(8000, () => console.log("Started at port 8000"))


// export 'app'
export default app
