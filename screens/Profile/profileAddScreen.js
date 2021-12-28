import React, { Component, useState, useEffect} from 'react';
import {View, Text, Button, SafeAreaView,StatusBar, StyleSheet,TouchableOpacity,TextInput, Keyboard,TouchableWithoutFeedback} from 'react-native';
// import { Fonts, Colors, Sizes } from "../../constant/styles";
// import { submitUser } from "../../apiServices";
// import { TextInput } from 'react-native-gesture-handler';
import {colors, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { fetchUser, newUser, } from "../../apiServices";
// import fire from '../../firebase'

// import firestore from '../../firebase'
// import { fetchUser } from "../../apiServices";
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const ProfileEditScreen = ({navigation}) => {

    // const [Id, setId] = useState();  
    const [fullName , setfullName] = useState();
    const [gender , setGender] = useState();
    const [age , setAge] = useState();
    const [occupation , setOccupation] = useState();
    const [from , setFrom] = useState();



  //    const saveUsers = () => {
  //   submitUser(Id, fullName, phone, email, test)
  //     .then((result) => {
  //       setId(null);
  //       setFullName('');
  //       setPhone('');
  //       setEmail('');
  //       setTest('');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // console.log(submitUser, 'data passed?')

    const saveUsers = () => {
        // if (setfullName =! null){
        //     alert('error sorry')
        // }
    newUser(fullName, gender, age, occupation, from)
      .then((result) => {
        // setId(null);
        setfullName('');
        setGender('');
        setAge('');
        setOccupation('');
        setFrom('');
      })
      .catch((error) => {
        console.log(error);
      });
  };
    // const fetchUser = async () => {
    // const response = await fetch('https://aidnpro-7c2db-default-rtdb.firebaseio.com/newUsers.json');
    // const resData = await response.json();
    // console.log(resData);
    // }
  // const usersCollectionRef = firestore().collection('Users');

  // const adduser = () => {
  //   usersCollectionRef.add({
  //     // Name: fullName,
  //     // // Location: new firestore.GeoPoint(53.483959, -2.244644),
  //     // age: age,
  //       FullName: fullName,
  //       Gender:gender,
  //       Age:age,
  //       Occupation:occupation,
  //       From:from,
  //     dateAdded: firestore.FieldValue.serverTimestamp(),
  //   });
  // };

    // useEffect(() => {
    // const fetchUser = async () => {
    // const response = await fetch('https://aidnpro-7c2db-default-rtdb.firebaseio.com/newUsers.json');
    // const resData = await response.json();
    // console.log(resData);
    // }
    // },[])

    return(
    <SafeAreaView style={styles.mainContainer}>
    <StatusBar backgroundColor={Colors.dodgerBlue} />
      <View style={styles.backArrowAndSaveContainerStyle}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
        //   color={Colors.dodgerBlue}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
      </View>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.nameContainer}>
          <TextInput        
            // placeholderTextColor= {Colors.dodgerBlue}
            placeholderTextColor= "#fff"
            placeholder='Full name'
            value={fullName}
            onChangeText={(text) => setfullName(text)}
            />
      </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            // placeholderTextColor= {Colors.dodgerBlue}
            placeholderTextColor= "#fff" 
            placeholder='Gender'
            value={gender}
            onChangeText={(text) => setGender(text)}
            // autoCompleteType = {'email'}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            // placeholderTextColor= {Colors.dodgerBlue}
            placeholderTextColor= "#fff" 
            placeholder='Age'
            value={age}
            onChangeText={(text) => setAge(text)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            // placeholderTextColor= {Colors.dodgerBlue}
            placeholderTextColor= "#fff" 
            placeholder='Occupation'
            onChangeText={(text) => setOccupation(text)}
            value={occupation}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            // placeholderTextColor= {Colors.dodgerBlue}
            placeholderTextColor= "#fff" 
            placeholder='Where are you from?'
            onChangeText={(text) => setFrom(text)}
            value={from}
            />
      </View>
      </TouchableWithoutFeedback>
      <View style={styles.buttonMain}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={saveUsers}
      >
      <View>
        <View style={styles.buttonContainer}>
        <Text style={{ ...Fonts.white16Bold, color:'#000' }}>Let's Go</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
      <View style={styles.buttonMain}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={fetchUser}
      >
      <View>
        <View style={styles.buttonContainer}>
        <Text style={{ ...Fonts.white16Bold, color:'#000' }}>Let's Change</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
    );
   
};
ProfileEditScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Colors.dodgerBlue
    },
    backArrowAndSaveContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: Sizes.fixPadding * 2.0,
    marginRight: Sizes.fixPadding,
    marginTop: Sizes.fixPadding + 15.0,
  },
  nameContainer:{
    color:'#fff',
    // borderBottomColor:Colors.dodgerBlue,
    paddingLeft:5,
    borderBottomColor:"#fff",
    marginLeft: Sizes.fixPadding * 5.0,
    marginRight: Sizes.fixPadding,
    marginTop:100,
    borderBottomWidth:1,
    width:"80%"
    
  },
  emailContainer:{
    color:'#fff',
    // borderBottomColor:Colors.dodgerBlue,
    paddingLeft:5,
    borderBottomColor:"#fff",
    marginLeft: Sizes.fixPadding * 5.0,
    marginRight: Sizes.fixPadding,
    marginTop:50,
    borderBottomWidth:1,
    width:"80%" 
  },
   buttonContainer:{
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 10.0,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: Sizes.fixPadding * 5.0,
    backgroundColor:Colors.bumbleYellow,
    width:102,
    // marginHorizontal:92
  },
  buttonMain:{
      alignItems:'center',
      justifyContent:'center',
      marginTop:50,
  }
});
export default ProfileEditScreen;