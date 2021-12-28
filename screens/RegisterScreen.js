import React,{ useState }  from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts, Colors, Sizes } from "../constant/styles";
// import { Auth } from 'aws-amplify';
// import Amplify, { Auth } from 'aws-amplify';
// import awsconfig from '../src/aws-exports';
// Amplify.configure(awsconfig);
import { Ionicons } from "@expo/vector-icons";
// import Register from './Register'
// import { Value } from "react-native-reanimated";
// import Amplify from 'aws-amplify'
// import config from '../src/aws-exports'
// Amplify.configure(config)
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  // const {userName, email, password} = []
  // const initialValue = {
  //   initUsername : '',
  //   initEmail : '',
  //   initPassword : ''
  // }
  // const [initial, setInitial] = useState(initialValue)

//   const initialStates = () =>{
//     username: username
//     email: userEmail
//     password: userPassword
//   }
//   async function SignUp() {
//     const {username, email, password} = initial
//     try {
//         const { user } = await Auth.signUp({
//             username: username,
//             password: password,
//             attributes: {
//               email:email
//             }
//         });
//         console.log(user);
//     } catch (error) {
//         console.log('wait error signing up:', error);
//     }
// }
// const SignUp = () => {
//   Auth.signUp({
//     username:initial.initUsername,
//     password:initial.initPassword,
//     attributes:{
//       email:initial.initEmail
//     }
//   })
//   .then(() => console.log('Signup success!'))
//   .catch(err => console.log('error signup failed!:', err))
// }
// async function SignUp() {
//     try {
//         const { user } = await Auth.signUp({
//             username,
//             password,
//             attributes: {
//                 email,          // optional
//                 // phone_number,   // optional - E.164 number convention
//                 // other custom attributes 
//             }
//         });
//         console.log(user);
//     } catch (error) {
//         console.log('error signing up:', error);
//     }
// }

// const handleRegister = () => {
//   auth
//   .createUserWithEmailAndPassword(initial, initial.initPassword)
//   .then(userCredentials => {
//     const user = userCredentials.user;
//     console.log(user.initEmail);
//   })
//   .catch(error => alert(error.message))
// }
// const onChangeHandler = (key,value) => {
//   setInitial({
//     [key]:value
//   })
//   console.log('hello', value)
// }


// const RegisterScreen = () => {
const [Email , setEmail] = useState('')
const [Password , setPassword] = useState('')

const handleRegister = () => {
  auth
  .createUserWithEmailAndPassword(Email, Password)
  .then(userCredentials => {
    const user = userCredentials.user;
    // console.log(user.Email);
    navigation.navigate('BottomTabScreen')
  })
  .catch(error => alert(error.message))
}
// }

  function userName() {
    return (
      <View
        style={{
          // backgroundColor: "rgba(255,255,255,0.25)",
          // borderRadius: 25.0,
          borderBottomColor:"#eee",
          borderBottomWidth:1,
          marginTop: Sizes.fixPadding * 5.0,
          // paddingVertical: Sizes.fixPadding + 3.0,
          // paddingHorizontal: 25.0,
        }}
      >
        <TextInput
        value = {username}
          onChangeText={text => setUsername(text)}
          placeholder="Username"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="#fff"
        />
      </View>
    );
  }

  function password() {
 
    return (
      <View
        style={{
          // backgroundColor: "rgba(255,255,255,0.25)",
          borderBottomColor:"#eee",
          borderBottomWidth:1,
          // borderRadius: Sizes.fixPadding + 15.0,
          marginTop: Sizes.fixPadding * 4.0,
          // paddingVertical: Sizes.fixPadding + 3.0,
          // paddingHorizontal: Sizes.fixPadding + 15.0,

        }}
      >
        <TextInput
          value={Password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          secureTextEntry={true}
        />
      </View>
    );
  }

  function email() {
  
    return (
      <View
        style={{
          borderBottomWidth:1,
          borderBottomColor:"#eee",
          marginTop: Sizes.fixPadding * 4.0,
        }}
      >
        <TextInput
         value={Email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
        />
      </View>
    );
  }

  const registerUser = () => {    
    if(!continueButton === handleRegister) {
      console.log('error signing user')
    }else{
      navigation.navigate('BottomTabScreen')
    }
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        // onPress={()=>{SignUp}}
        onPress={handleRegister} //BottomTabScreen
      >
        <View
          style={{
            paddingVertical: Sizes.fixPadding + 5.0,
            borderRadius: Sizes.fixPadding * 3.0,
            alignItems: "center",
            justifyContent: "center",
            marginTop: Sizes.fixPadding * 5.0,
            backgroundColor:Colors.bumbleYellow,
            width:175,
            marginHorizontal:92
          }}
        >
          <Text>Countinue</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function confirmPassword() {
    //   const handleChange = (key, value) => {
    //   setUserConfirmPassword({
    //     [key]:value
    //   })
    //   console.log(value)
    // }
    return (
      <View
        style={{
          // backgroundColor: "rgba(255,255,255,0.25)",
          borderBottomWidth:1,
          borderBottomColor:"#eee",
          // borderRadius: Sizes.fixPadding + 15.0,
          marginTop: Sizes.fixPadding * 4.0,
          // paddingVertical: Sizes.fixPadding + 3.0,
          // paddingHorizontal: Sizes.fixPadding + 15.0,
        }}
      >
        <TextInput
        onChangeText={value => {handleChange('userConfirmPassword', value)}}
          placeholder="Confirm Password"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          secureTextEntry={true}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />

      <ImageBackground

        style={styles.imageContainer}
        // source={require("../assets/imagesvtr/clip-1072.png")}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={[Colors.dodgerBlue,"rgba(0,0,0,0.0)", "rgba(0,0,0,0.0)"]}
          style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
        >
          <ScrollView style={{ paddingBottom: Sizes.fixPadding * 2.0 }}>
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color="white"
              style={{ marginTop: Sizes.fixPadding * 6.0 }}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                ...Fonts.white30Bold,
                marginTop: Sizes.fixPadding * 4.0,
              }}
            >
              Register
            </Text>
            <Text
              style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding }}
            >
              Create account
            </Text>
            {/* {userName()} */}
            {email()}
            {password()}
            {/* {confirmPassword()} */}
            {continueButton()}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

RegisterScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};


const styles=({
  imageContainer:{
     flex: 1,
     backgroundColor:Colors.dodgerBlue
  }
});

export default RegisterScreen;



// export default class RegisterScreen extends React.Component{
//   render(){
//     return(
//       <View>
//         <Register/>
//       </View>
//     )
//   }
// }