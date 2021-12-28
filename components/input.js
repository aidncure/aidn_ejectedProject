import React, { Component } from 'react';
import {View, SafeAreaView,StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput} from 'react-native';
import {Button,Text} from 'react-native-elements';
import LoginBtn from '../components/loginBtn';

export default function InputData(){
    return(
    <View>
      <TouchableWithoutFeedback
        onPress={()=>{
            Keyboard.dismiss();
        }}
      >
          <View style={styles.emailContainerStyle}>
            <TextInput 
                placeholder="Email"
                placeholderTextColor="#0005"
                keyboardType='email-address' 
            >
                
              </TextInput>
          </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={()=>{
            Keyboard.dismiss();
        }}
      >
          <View style={styles.passwordContainerStyle}>
            <TextInput 
                placeholder="Password"
                placeholderTextColor="#0005"
                secureTextEntry={true}
            >
              </TextInput>
          </View>
      </TouchableWithoutFeedback>
      <LoginBtn/>
    </View>
    );
};
const styles = StyleSheet.create({
emailContainerStyle: {
  marginVertical:25,
  borderBottomColor:'#1e90fe',
  borderBottomWidth:1
  },
passwordContainerStyle: {
  marginVertical:25,
  borderBottomColor:'#1e90fe',
  borderBottomWidth:1
  },
});