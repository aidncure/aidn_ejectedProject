import React, { Component, useState, useEffect } from 'react';
import {View, Text, Button, SafeAreaView,StatusBar, StyleSheet,TouchableOpacity,TextInput,Image,Keyboard,TouchableWithoutFeedback,ScrollView} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { fetchUser, newUser, } from "../../apiServices";
// import firebase from '../../firebase';
import {firebase, auth, db, firestore} from '../../firebase';


const Generate = ({navigation}) => {

  


    const [state , setState] = useState({
        Codename:'',
        Codegender:'',
        Codeage:'',
        fullAddress:'',
        Codefrom:'',
        Codeblood:'',
        Codeemergency:'',
        Codeuid:' ', 
        Codephone:'',     
    });
    const handleChangeText = (Codename, value) =>{
        setState({...state, [Codename]:value})
    }
    // const appointment = firebase.firestore().collection('users');
    const userData = firebase.auth().currentUser;
    const db = firebase.firestore()
    const saveUsers = async () => {
        if (state.Codename === ''){
            alert('Please fill the details')
        }else{
           await db.collection('usersProfile').doc('user'+ userData.uid).update({
                Codename : state.Codename,
                Codegender: state.Codegender,
                Codeage: state.Codeage,
                fullAddress: state.fullAddress,
                Codefrom: state.Codefrom,
                Codeblood:state.Codeblood,
                Codeemergency:state.Codeemergency,
                Codephone:state.Codephone,
                Codeuid:userData.uid,
            })
            // alert("Saved")
            navigation.navigate('Home',{
              username : state.Codename
            })
            navigation.navigate('BottomTabScreen')

        }
    }

    return(
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
        <View
        style={{
          justifyContent:'center',
          alignItems:'center',
          marginRight:120,
        }}
        >
        <Image source={require('../../assets/icons8-qr-code-64.png')}
          style={styles.imageContainer}
        />
        </View>
      </View>
      </View>
      
      <View style={styles.bottomProfileContainer}>
      {/* <View style={styles.imageContainer}> */}
      <ScrollView
      // style={{
      //   borderWidth:1,
      //   // marginTop:-80
      // }}
      >
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.nameContainer}>
          <TextInput        
            placeholderTextColor= {Colors.primary}
            // placeholderTextColor= "#fff"
            placeholder='Full name'
            // value={fullName}
            onChangeText={(value) => handleChangeText('Codename', value)}
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
            onChangeText={(value) => handleChangeText('Codegender', value)}
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
            onChangeText={(value) => handleChangeText('Codeage', value)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.fullAddressContainer}>
          <TextInput   
            numberOfLines={2}  
            multiline={true}   
            placeholderTextColor= {Colors.primary}
            placeholder='Full address'
            onChangeText={(value) => handleChangeText('fullAddress', value)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.fullAddressContainer}>
          <TextInput  
          numberOfLines={2}  
          multiline={true} 
          // maxLength={60}      
            placeholderTextColor= {Colors.primary}
            // placeholderTextColor= "#fff" 
            placeholder='Emergency contact address'
            // onChangeText={(text) => setFrom(text)}
            // value={from}
            onChangeText={(value) => handleChangeText('Codefrom', value)}
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
            onChangeText={(value) => handleChangeText('Codeblood', value)}
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
            onChangeText={(value) => handleChangeText('Codeemergency', value)}
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
            onChangeText={(value) => handleChangeText('Codephone', value)}
            />
      </View>
      </TouchableWithoutFeedback>

      {/* User Health documents upload */}
{/* ___________________________________________________________________________________________________________  */}
        <TouchableWithoutFeedback>
          <View
          style={{
            marginTop:30,
            marginLeft:30,
            // borderWidth:1,
            width:'80%',
            paddingLeft:10,

          }}
          onPress={() => navigation.navigate('UploadPic')}
          >
          <Ionicons
          name="cloud-upload-outline"
          size={28}
          color={Colors.dodgerBlue}
          onPress={() => navigation.navigate('UploadPic')}
          />
          <Text
          style={{
            // borderWidth:1,
            width:'70%',
            marginTop:-25,
            marginLeft:40,
            ...Fonts.black16Bold,
            paddingLeft:5
          }}
          onPress={() => navigation.navigate('UploadPic')}
          >Upload Health Reports</Text>
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
      </ScrollView>
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
    );
   
}
Generate.navigationOptions = () => {
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
    marginTop:20,
    // marginTop:100,
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
    // borderWidth:1,
    width:"80%" 
  },
  fullAddressContainer:{
    color:'#000',
    borderColor:Colors.primary,
    paddingLeft:5,
    marginLeft: Sizes.fixPadding * 3.0,
    marginRight: Sizes.fixPadding,
    marginTop:40,
    borderWidth:1,
    width:"80%" ,
    height:80,
    borderRadius:10
  },
   buttonContainer:{
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 10.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    backgroundColor:Colors.primary,
    width:102,
    marginBottom:15
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
      justifyContent:'center',
      alignItems:'center',
      borderRadius:100,
      backgroundColor:"#fff",
      marginRight:10
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
export default Generate;