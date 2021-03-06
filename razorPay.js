import React, { useEffect, useState } from "react";
import ConsultaionScreen from "./screens/Home/ConsultationDetailScreen";
import axios from "axios";
import {firebase, auth, db, firestore} from '../../firebase';


export default function PaymentMethodRay () {

    const [orderId, setOrderId] = useState();
    useEffect(() => {
    // This will generate the Order Id
    axios({
      method: "POST",
      url: "https://api.razorpay.com/v1/orders",
      headers: {
        "content-type": "application/json",
        Authorization: "Basic cnpwX3Rlc3RfNlJ0WDNBb3FhT1FUcEE6U3FBaWs0TkhIUWNZNjFHRjBWUmZjSWtJ" // Generate your Auth code by using key id and key secret in postman
      },
      data: JSON.stringify({
        amount: 100,
        currency: "INR",
        receipt: "receipt81",
        payment_capture: 1
      })
    })
      .then(res => {
        console.warn(res);
        setOrderId({
          orderId: res.data.id, // Extracting the OrderId from razorpay response data
        });
      })
      .catch(err => {
        console.log("Theres an error with the code", err);
      }); 
    }, [])  
}
