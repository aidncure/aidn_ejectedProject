/* eslint-disable camelcase */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const key_id = "rzp_test_6RtX3AoqaOQTpA";
const key_secret = "SqAik4NHHQcY61GF0VRfcIkI";
const request = require("request");
const cors = require("cors")({origin: true});
const instance = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
});

exports.createOrder = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: req.body.receipt,
    };
    instance.orders.create(options, (err, order) => {
      order ? res.status(200).send(order) : res.status(500).send(err);
    });
  });
});

exports.capturePayments = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    request(
        {
          method: "POST",
          url: `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${
            req.body.payment_id
          }/capture`,
          form: {
            amount: req.body.amount,
          },
        },
        (error, response, body) => {
        response ?
          res.status(200).send({
            res: response,
            req: req.body,
            body: body,
          }) :
          res.status(500).send(error);
        }
    );
  });
});
