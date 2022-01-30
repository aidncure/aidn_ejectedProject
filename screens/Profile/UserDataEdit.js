import React, { Component, useState, useEffect } from 'react';
import {View, Text, Button, SafeAreaView,StatusBar, StyleSheet,TouchableOpacity,TextInput,Image,Keyboard,TouchableWithoutFeedback,ScrollView} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { fetchUser, newUser, } from "../../apiServices";
// import firebase from '../../firebase';
import {firebase, auth, db, firestore} from '../../firebase';


const UserDataEdit = ({navigation}) => {


    const [state , setState] = useState({
        name:'',
        gender:'',
        age:'',
        occupation:'',
        from:'',
        blood:'',
        emergency:'',
        uid:' ', 
        phone:'',     
    });
    const handleChangeText = (name, value) =>{
        setState({...state, [name]:value})
    }
    // const appointment = firebase.firestore().collection('users');
    const userData = firebase.auth().currentUser;
    const db = firebase.firestore()
    const saveUsers = async () => {
        if (state.name === ''){
            alert('Please fill the details')
        }else{
           await db.collection('usersProfile').doc('user'+ userData.uid).set({
                name : state.name,
                gender: state.gender,
                age: state.age,
                occupation: state.occupation,
                from: state.from,
                blood:state.blood,
                emergency:state.emergency,
                phone:state.phone,
                uid:userData.uid,
            })
            // alert("Saved")
            navigation.navigate('Home',{
              username : state.name
            })
            navigation.navigate('BottomTabScreen')

        }
    }

    return(
    <ScrollView
      showsVerticalScrollIndicator={false}
        style={{
            flex: 1,
        }}
        contentContainerStyle={{
            flexGrow: 1,
        }}
    >
    <SafeAreaView style={styles.mainContainer}>
    {/* <StatusBar backgroundColor={Colors.primary} /> */}
    
      <View style={styles.topContainer}>
      <View style={styles.backArrowAndSaveContainerStyle}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
        //   color={Colors.dodgerBlue}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
      </View>
      </View>
      
      <View style={styles.bottomProfileContainer}>
      {/* <View style={styles.imageContainer}> */}
      <Image source={require('../../assets/imagesvtr/buddy-97.png')}
          style={styles.imageContainer}
      />
      {/* </View> */}
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.nameContainer}>
          <TextInput        
            placeholderTextColor= {Colors.primary}
            // placeholderTextColor= "#fff"
            placeholder='Full name'
            // value={fullName}
            onChangeText={(value) => handleChangeText('name', value)}
            />
      </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.genderDOBContainer}>
          <TextInput        
            placeholderTextColor= {Colors.primary}
            // placeholderTextColor= "#fff" 
            placeholder='Gender'
            // value={gender}
            // onChangeText={(text) => setGender(text)}
            onChangeText={(value) => handleChangeText('gender', value)}
            // autoCompleteType = {'email'}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.AgeOrDOBContainer}>
          <TextInput        
            placeholderTextColor= {Colors.primary}
            // placeholderTextColor= "#fff" 
            placeholder='Age'
            // value={age}
            // onChangeText={(text) => setAge(text)}
            onChangeText={(value) => handleChangeText('age', value)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            placeholderTextColor= {Colors.primary}
            // placeholderTextColor= "#fff" 
            placeholder='Occupation'
            // onChangeText={(text) => setOccupation(text)}
            // value={occupation}
            onChangeText={(value) => handleChangeText('occupation', value)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput  
          maxLength={60}      
            placeholderTextColor= {Colors.primary}
            // placeholderTextColor= "#fff" 
            placeholder='Where are you from?'
            // onChangeText={(text) => setFrom(text)}
            // value={from}
            onChangeText={(value) => handleChangeText('from', value)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            placeholderTextColor= {Colors.primary}
            // placeholderTextColor= "#fff" 
            placeholder='Blood group'
            // onChangeText={(text) => setFrom(text)}
            // value={from}
            onChangeText={(value) => handleChangeText('blood', value)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            placeholderTextColor= {Colors.primary}
            // placeholderTextColor= "#fff" 
            placeholder='Emergency number'
            // onChangeText={(text) => setFrom(text)}
            // value={from}
            onChangeText={(value) => handleChangeText('emergency', value)}
            />
      </View>
      </TouchableWithoutFeedback>

      {/* User Personal phone number */}

      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            placeholderTextColor= {Colors.primary}
            placeholder='Phone number'
            onChangeText={(value) => handleChangeText('phone', value)}
            />
      </View>
      </TouchableWithoutFeedback>

      {/* User information save button ---
      Saves user data to the firebase firestore */}

      <TouchableWithoutFeedback
      // onPress={() => navigation.goBack()}
      onPress={() => navigation.navigate('BottomTabScreen')}
      >
        <View style={styles.buttonMain}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={saveUsers}
      >
      <View>
        <View style={styles.buttonContainer}>
        <Text style={{ ...Fonts.black16Bold, color:'#fff' }}>Save</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
      </TouchableWithoutFeedback>
    </View>
      {/* <View style={styles.buttonMain}>
      <TouchableOpacity
        activeOpacity={0.9}
        // onPress={fetchUser}
      >
      <View>
        <View style={styles.buttonContainer}>
        <Text style={{ ...Fonts.white16Bold, color:'#000' }}>Let's Change</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View> */}
    </SafeAreaView>
    </ScrollView>
    );
   
}
UserDataEdit.navigationOptions = () => {
  return {
    header: () => null,
  };
};

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"#fff"
    },
    backArrowAndSaveContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: Sizes.fixPadding * 2.0,
    marginRight: Sizes.fixPadding,
    marginTop: Sizes.fixPadding + 15.0,
  },
  nameContainer:{
    // color:'#fff',
    color:'#000',
    borderBottomColor:Colors.primary,
    paddingLeft:5,
    // borderBottomColor:"#fff",
    marginLeft: Sizes.fixPadding * 3.0,
    marginRight: Sizes.fixPadding,
    marginTop:100,
    borderBottomWidth:1,
    width:"80%"
    
  },
  emailContainer:{
    color:'#000',
    borderBottomColor:Colors.primary,
    paddingLeft:5,
    // borderBottomColor:"#fff",
    marginLeft: Sizes.fixPadding * 3.0,
    marginRight: Sizes.fixPadding,
    marginTop:40,
    borderBottomWidth:1,
    width:"80%" 
  },
   buttonContainer:{
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 10.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    backgroundColor:Colors.primary,
    width:102,
    // marginHorizontal:92
  },
  buttonMain:{
      alignItems:'center',
      justifyContent:'center',
      marginTop:50,
  },
    topContainer:{
      width:'100%',
      height:'40%',
      borderBottomLeftRadius:100,
      backgroundColor:Colors.primary,
  },
   bottomProfileContainer:{
      width:'100%',
      height:'72%',
      marginVertical:-100,
      borderTopRightRadius:90,
      backgroundColor:"#fff",
  },
   imageContainer:{
      width:150,
      height:150,
      marginVertical:-110,
      marginBottom:-95,
      marginHorizontal:122,
      borderRadius:100,
      backgroundColor:"#fff"
  },
  genderDOBContainer:{
    color:'#000',
    borderBottomColor:Colors.primary,
    paddingLeft:5,
    // borderBottomColor:"#fff",
    marginLeft: Sizes.fixPadding * 3.0,
    marginRight: Sizes.fixPadding,
    marginTop:40,
    borderBottomWidth:1,
    width:"40%" 
  },
  AgeOrDOBContainer:{
    color:'#000',
    borderBottomColor:Colors.primary,
    // borderBottomColor:'red',
    paddingLeft:5,
    // borderBottomColor:"#fff",
    // marginLeft: Sizes.fixPadding * 3.0,
    marginRight: Sizes.fixPadding,
    marginTop:-29,
    marginLeft:239,
    borderBottomWidth:1,
    width:"30%" 
  },
})
export default UserDataEdit;