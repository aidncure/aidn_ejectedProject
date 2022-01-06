import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Keyboard,
  Alert,
} from "react-native";
// import {FloatingLabelInput} from 'react-native-floating-label-input';
import {Button} from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import { Fonts, Sizes, Colors } from "../constant/styles";
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Button } from "react-native-paper";
import RegisterScreen from "./RegisterScreen";
import { color } from "react-native-reanimated";
import { auth } from "../firebase";
// import {auth} from "../database/config"
// import * as firebase from 'firebase';




const { width } = Dimensions.get("screen");
const WelcomeScreen = ({ navigation }) => {
  // const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [areas, setAreas] = useState([]);
  const [Email , setEmail] = useState('')
  const [Password , setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
    if (user) {
      navigation.replace('BottomTabScreen')
    }
  })
  return unsubscribe
  }, [])

  const handleRegister = () => {
  auth
  .signInWithEmailAndPassword(Email, Password)
  .then(userCredentials => {
    const user = userCredentials.user;
    console.log(user.Email);
    // navigation.navigate('BottomTabScreen')
  })
  .catch(error => alert(error.message))
}

const handleLogin = async() =>{
  await fetch('https://aidn.in/api/login',{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify({"email":Email, "password":Password})
  }).then(res => res.json())
  .then(resData => {
    
    if(resData.msg === 'successfully login'){
     navigation.navigate('BottomTabScreen')
      console.log(resData)
      {handleHome}
    }else{
      // Alert.alert(JSON.stringify(resData));
      Alert.alert(JSON.stringify(resData));
      Alert.alert('Invalid email or password');
    }
  });
}

  function renderAreaCodesModal() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: Sizes.fixPadding,
            flexDirection: "row",
          }}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}
        >
          <Image
            source={{ uri: item.flag }}
            style={{
              width: 30.0,
              height: 30.0,
              marginRight: Sizes.fixPadding,
            }}
          />
          <Text style={{ fontSize: 14.0, lineHeight: 22 }}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 400.0,
                width: width * 0.8,
                // backgroundColor: "#E6FEF0",
                backgroundColor: "#fff",
                borderRadius: Sizes.fixPadding * 2.0,
              }}
            >
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: Sizes.fixPadding * 2.0,
                  marginBottom: Sizes.fixPadding * 2.0,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  function emailAddressInput() {
    return (
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
        <View style={styles.emailContainerStyle}>
          <TextInput
           value={Email}
          //  onChangeText={text => setEmail(text)}
           onChangeText={value => setEmail(value)}
            placeholder="Email"
            placeholderTextColor="dodgerblue"
            keyboardType='email-address'
            
          />
        </View>
        </TouchableWithoutFeedback>
    );
  }
  function PasswordEntryInput() {
    return (
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
        <View style={styles.emailContainerStyle}>
          <TextInput
           value={Password}
            // onChangeText={text => setPassword(text)}
            onChangeText={value => setPassword(value)}
            placeholder="Password"
            placeholderTextColor="dodgerblue"
            // keyboardType= 'default'
            secureTextEntry={true}
            
          />
        </View>
        </TouchableWithoutFeedback>
    );
  }
  const handleHome = () =>{
    navigation.navigate('Home')
  }
  function continueButton() {
    return (
      <TouchableOpacity
        // style={styles.buttonContainer}
        activeOpacity={0.9}
        onPress={handleRegister}
        // onPress={handleLogin}
      >
      <View>
        <View onPress={handleHome}  style={styles.buttonContainer}>
        <Text style={{ ...Fonts.white16Bold, color:'#000' }}>Proceed</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
  function registerButton() {
    return (
      <TouchableOpacity
        style={styles.registerButton}
        activeOpacity={0.9}
        // onPress={() => navigation.navigate("Register")}
      >
      <View
      style={styles.registerButton}>
        <Text
        style={styles.registerButton}
        // title="New over here? Register Now"
        onPress={() => navigation.navigate("Register")}
        >New over here? Register Now</Text>
      </View>
      </TouchableOpacity>
    );
  }

  function otpText() {
    return (
      <Text
        style={{
          ...Fonts.white16Regular,
          textAlign: "center",
          marginTop: Sizes.fixPadding * 2.0,
        }}
      >
        We'll send OTP for Verification
      </Text>
    );
  }

  function facebookButton() {
    return (
      <View style={styles.faceBookButtonContainerStyle}>
        <Image
          source={require("../assets/images/facebook.png")}
          style={{ height: 30.0, width: 30.0 }}
          resizeMode="contain"
        />
        <Text style={{ ...Fonts.white16Regular, marginLeft: Sizes.fixPadding, color:'#000' }}>
          Log in with Facebook
        </Text>
      </View>
    );
  }

  function googleButton() {
    return (
      <View style={styles.googleButtonContainerStyle}>
        <Image
          source={require("../assets/images/google.png")}
          style={{ height: 30.0, width: 30.0 }}
          resizeMode="contain"
        />
        <Text style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}>
          Log in with Google
        </Text>
      </View>
    );
  }
  function dataThief() {
    return (
      <View style={styles.dataContainer}>
        <Image 
          source={require("../assets/imagesvtr/mellow-data-theft.png")}
          resizeMode="contain"
          style={{height:375, width:375}}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#fff'}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        // source={require("../assets/images/doctor_bg.jpg")}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["#fff", "rgba(0,0.0,0,0.0)", "rgba(0,0,0,0.0)"]}
          style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
        >
          <Text style={{ ...Fonts.white30Bold, marginTop: 100.0, color:'dodgerblue'}}>
            Welcome back
          </Text>
          <Text
            style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding, color:'dodgerblue' }}
          >
            Login in your account
          </Text>
          {/* {phoneNumberInput()} */}
          {emailAddressInput()}
          {PasswordEntryInput()}
          {continueButton()}
          {registerButton()}
          {/* {otpText()} */}
          {/* <Text style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding, color:'dodgerblue', marginVertical:-20, marginHorizontal:8}}>Social Login</Text> */}
          {facebookButton()}
          {googleButton()}
          {dataThief()}
        </LinearGradient>
      </ImageBackground>
      {renderAreaCodesModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  phoneNumberContainerStyle: {
    flexDirection: "row",
    paddingVertical: Sizes.fixPadding - 8.0,
  },
  emailContainerStyle: {
  marginVertical:25,
  borderBottomColor:'dodgerblue',
  borderBottomWidth:1
  },
  faceBookButtonContainerStyle: {
    paddingVertical: Sizes.fixPadding + 1.0,
    // paddingLeft:90,
    // marginHorizontal:-80,
    borderRadius: Sizes.fixPadding * 20.0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: Sizes.fixPadding * 5.0,
    // backgroundColor: "#3B5998",
    // borderColor: "#3B5998",
    borderColor: Colors.dodgerBlue,
    borderWidth:1
    // width: 250
  },
  googleButtonContainerStyle: {
    // paddingVertical: Sizes.fixPadding + 1.0,
    borderRadius: Sizes.fixPadding * 3.0,
    marginVertical:-29,
    // marginHorizontal:-80,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // marginHorizontal
    // backgroundColor: "white",
    marginTop: Sizes.fixPadding * 1.0,
    //   borderColor: "#3B5998",
    // // borderColor: Colors.dodgerBlue,
    // borderWidth:1
  },
  buttonContainer:{
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: Sizes.fixPadding * 5.0,
    backgroundColor:Colors.bumbleYellow,
    width:125,
    // marginHorizontal:92
  },
  registerButton:{
    flexDirection: "row",
    color:"dodgerblue",
    // color:"dodgerblue",
    fontSize:14,
    paddingLeft:2,
    marginVertical:3,
    
  },
   dataContainer:{
     height: 100, 
     width: 100,
     marginHorizontal:-22,
     marginVertical:-12,
     elevation:-84
  }
});

WelcomeScreen.navigationOption = () => {
  return {
    header: () => null,
  };
};

export default WelcomeScreen;
