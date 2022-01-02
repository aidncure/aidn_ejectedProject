import React,{useState} from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import AwesomeAlert from "react-native-awesome-alerts";
import { Ionicons } from "@expo/vector-icons";
import { CheckBox, Icon } from 'react-native-elements';
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import StripePay from "../../stripePay";
import { StripeProvider } from "@stripe/stripe-react-native";

const { width } = Dimensions.get("screen");

const paymentMethosList = [
  {
    id: "1",
    icon: require("../../assets/images/payment_icon/cash_on_delivery.png"),
    name: "Pay on Visit",
  },
  {
    id: "2",
    icon: require("../../assets/images/payment_icon/amazon_pay.png"),
    name: "Debit or Credit card",
  },
  // {
  //   id: "3",
  //   icon: require("../../assets/images/payment_icon/card.png"),
  //   name: "Card",
  // },
  // {
  //   id: "4",
  //   icon: require("../../assets/images/payment_icon/paypal.png"),
  //   name: "PayPal",
  // },
  // {
  //   id: "5",
  //   icon: require("../../assets/images/payment_icon/skrill.png"),
  //   name: "Skrill",
  // },
];

const PaymentMethodScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  // const [selectedMethod, setSelectedMethod] = React.useState("");
  // CHECK BOX FOR PAYMENTS 
   const [check, setCheck] = useState(false);
   const [cashMode, setCashMode] = useState(false);

  function payInfo() {
    return (
      <View style={styles.payInfoContainerStyle}>
        <Text style={{ ...Fonts.black20Bold }}>Pay:$39</Text>
      </View>
    );
  }
  function paymentModeStripe() {
    return (
      <View>
          <Image
          source={require('../../assets/imagesvtr/crayon-1523.png')}
          resizeMode="contain"
          style={{ width: 300.0,
          height: 300.0,
          marginTop:30,
          marginLeft:50,
          alignItems:'center',
          justifyContent:'center'
          }}
        />
      <TouchableOpacity
          onPress={() => setCheck(true)}
          activeOpacity={0.9}
        >
        <View
        style={{
          marginVertical:30,
          marginHorizontal:25,
          marginLeft:80,
          height:'25%',
          width:'60%',
          borderWidth:check !== true ? 1 : 2 ,
          borderColor: check === true ? '#5df58d' : '#eee',
          borderRadius:5,
          marginBottom:-10
        }}
        >
          <Image
          source={require('../../assets/imagesvtr/icons8-credit-card-58.png')}
          resizeMode="contain"
          style={{ width: 30.0,
          height: 30.0,
          // marginTop:-25,
          marginLeft:10
          }}
        />
          <Text
          style={{
          ...Fonts.black16Regular,
          marginTop:-25,
          marginLeft:50
          }}
          >Debit or Credit card</Text>
        </View>
        </TouchableOpacity>
         <StripeProvider publishableKey="pk_test_51K84PtSGPMJ99FNgX57aaoX5J5UACm4MVzTxzs46ldk9LP9sbnEX6prObXtDcPf9baInJKUMj5uYBEUwERbwo82b00oolvcUS9">
          <StripePay/>
        </StripeProvider>
      </View>
    );
  }
  function paymentModeCash() {
    return (
      <View
      style={{
        marginTop:-20,
      }}
      >
      <TouchableOpacity
          onPress={() => setCashMode(true)}
          activeOpacity={0.9}
        >
        <View
        style={{
          paddingTop:3,
          marginTop:-100,
          marginLeft:80,
          width:'60%',
          borderWidth:cashMode === true ? 2 : 1 ,
          borderColor: cashMode === true ? '#5df58d' : '#eee',
          borderRadius:5,
          marginBottom:60
        }}
        >
          <Image
          source={require('../../assets/imagesvtr/icons8-cash-in-hand-48.png')}
          resizeMode="contain"
          style={{ width: 30.0,
          height: 30.0,
          marginLeft:10
          }}
        />
          <Text
          style={{
          ...Fonts.black16Regular,
          marginTop:-25,
          marginLeft:50
          }}
          >Pay on visit</Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  }

  // function paymentMethod() {
  //   const renderItem = ({ item }) => {
  //     return (
  //       <TouchableOpacity
  //         onPress={() => setSelectedMethod(item.id)}
  //         activeOpacity={0.9}
  //       >
  //         <View
  //           style={{
  //             ...styles.paymentMethodContainerStyle,
  //             borderColor:
  //               selectedMethod === item.id ? Colors.primary : Colors.lightGray,
  //           }}
  //         >
  //           <View style={{ flexDirection: "row", alignItems: "center" }}>
  //             <Image
  //               source={item.icon}
  //               resizeMode="contain"
  //               style={{ width: 50.0, height: 50.0 }}
  //             />
  //             <Text
  //               style={{
  //                 ...Fonts.primaryColor17Bold,
  //                 marginLeft: Sizes.fixPadding + 5.0,
  //               }}
  //             >
  //               {item.name}
  //             </Text>
  //           </View>
  //           {selectedMethod === item.id ? (
  //             <View style={styles.radioButtonContainerStyle}>
  //               <View style={styles.radioButtonInnerContainerStyle}></View>
  //             </View>
  //           ) : (
  //             <View style={styles.withoutRadioButtonContainerStyle}></View>
  //           )}
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   };

  //   return (
  //     <FlatList
  //       data={paymentMethosList}
  //       keyExtractor={(item) => `${item.id}`}
  //       renderItem={renderItem}
  //       contentContainerStyle={{
  //         paddingBottom: 200.0,
  //         paddingTop: Sizes.fixPadding,
  //       }}
  //     />
  //   );
  // }

  function payButton() {
    return (
      <View style={styles.payButtonContainerStyle}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          activeOpacity={0.9}
        >
          <View style={styles.payButtonStyle}>
            <Text style={{ ...Fonts.white20Regular }}>Pay</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function successModal() {
    return (
      <AwesomeAlert
        show={modalVisible}
        contentContainerStyle={{ borderRadius: Sizes.fixPadding }}
        customView={
          <View style={styles.successModalStyle}>
            <View style={styles.successIconContainerStyle}>
              <Ionicons
                name="md-checkmark-sharp"
                size={40}
                color={Colors.primary}
              />
            </View>
            <Text
              style={{ ...Fonts.gray14Bold, marginTop: Sizes.fixPadding * 2.0 }}
            >
              Success!
            </Text>
          </View>
        }
        closeOnTouchOutside={true}
        onDismiss={() => navigation.navigate("BottomTabScreen")}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <StatusBar backgroundColor={Colors.primary} />
      <View>
        {payInfo()}
        {paymentModeStripe()}
      </View>
      <View>
      {/* {paymentModeCash()} */}
      </View>
      {/* {payButton()} */}
      {successModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  payInfoContainerStyle: {
    height: 70.0,
    backgroundColor: "#D2D5EE",
    justifyContent: "center",
    paddingHorizontal: 20.0,
  },
  paymentMethodContainerStyle: {
    height: 100.0,
    borderWidth: 1.0,
    borderRadius: 7.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  radioButtonContainerStyle: {
    height: 20.0,
    width: 20.0,
    borderColor: Colors.primary,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInnerContainerStyle: {
    height: 11.0,
    width: 11.0,
    borderRadius: 6.0,
    backgroundColor: Colors.primary,
  },
  withoutRadioButtonContainerStyle: {
    height: 20.0,
    width: 20.0,
    borderRadius: Sizes.fixPadding,
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
  },
  payButtonContainerStyle: {
    backgroundColor: "white",
    height: 75.0,
    position: "absolute",
    bottom: 0.0,
    width: "100%",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.8,
  },
  payButtonStyle: {
    backgroundColor: Colors.primary,
    paddingVertical: Sizes.fixPadding + 3.0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding + 5.0,
  },
  successIconContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.0,
    borderColor: Colors.primary,
    height: 70.0,
    width: 70.0,
    borderRadius: 35.0,
    backgroundColor: "white",
  },
  successModalStyle: {
    height: 150.0,
    width: width * 0.6,
    backgroundColor: "white",
    borderRadius: 40.0,
    alignItems: "center",
    justifyContent: "center",
  },
});

PaymentMethodScreen.navigationOptions = {
  title: "Select Payment Method",
  headerTitleStyle: {
    ...Fonts.white20Bold,
    marginLeft: -Sizes.fixPadding * 2.0,
  },
  headerStyle: {
    backgroundColor: Colors.primary,
    elevation: 0,
  },
  headerTintColor: "white",
};

export default PaymentMethodScreen;
