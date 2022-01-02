const functions = require("firebase-functions");
const stripe = require("stripe")("YOUR_SECRET_KEY");

exports.payWithStripe = functions.https.onRequest((request, response) => {
  stripe.charges.create({
    amount: request.body.amount,
    currency: request.body.currency,
    source: request.body.token,
  }).then((charge) => {
    // asynchronously called
    response.send(charge);
  })
      .catch((err) =>{
        console.log(err);
      });
});
