import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51K84PtSGPMJ99FNgX57aaoX5J5UACm4MVzTxzs46ldk9LP9sbnEX6prObXtDcPf9baInJKUMj5uYBEUwERbwo82b00oolvcUS9";
const SECRET_KEY = "sk_test_51K84PtSGPMJ99FNgU57xPXcabv5IcGnheGUcNzDiDLAdcgAJFBfNkES48FqaPNvfqxcn1zGEHH9Ui1Y9F5DBWeZk00wyEo7VWR";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://192.168.1.4:${port}`);
});

app.post("/pay", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "inr",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});