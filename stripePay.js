import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import {firebase, auth, firestore} from './firebase';
import { Fonts, Colors, Sizes } from "./constant/styles";

//ADD localhost address of your server
const API_URL = "https://aidnexp.herokuapp.com";

const StripeApp = props => {
  const db = firebase.firestore()
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          const userData = firebase.auth().currentUser;
              await db.collection('users').doc('Appointments Booked' + userData.uid).update({
              stripe_payment_details : paymentIntent
            })   
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
    console.log(handlePayPress)
  };

  return (
    <View style={styles.container}>
     <ScrollView>
        <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        // postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        keyboardType="number"
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <View 
      style={{
        borderWidth:1,
        height:30,
        borderRadius:15,
        width:'20%',
        marginHorizontal:150,
        backgroundColor:Colors.primary,
        borderColor:Colors.primary,
        justifyContent:"center",
        alignItems:'center'
      }}
      disabled={loading} 
      >
        <Text
         onPress={handlePayPress} disabled={loading}
         style={{
          color:"#fff"
         }}       
         >
          Pay
        </Text>
      </View>
     </ScrollView>
      {/* <Button onPress={handlePayPress} title="Pay" disabled={loading} /> */}
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    // backgroundColor: "#efefefef",
  },
  input: {
    // backgroundColor: "#efefefef",
    borderBottomWidth:1,
    borderBottomColor:"#eeee",
    // borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 8,
  },
  card: {
    // backgroundColor: "#efefefef",
    borderRadius: 8,
    borderBottomWidth:1,
    borderBottomColor:"#eeee",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    // backgroundColor: "#efefefef",
  },
  pay:{
    borderRadius: 8,
  },
});