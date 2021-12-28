import { tsConstructorType } from '@babel/types';
import React, { Component, useState } from 'react';
import {View, SafeAreaView,StyleSheet, TouchableOpacity, Keyboard, TextInput,TouchableWithoutFeedback} from 'react-native';
import {Button,Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SocialLogin(){
const facebookButton = (
  <Icon.Button name="facebook" backgroundColor="#1e90fe" style={styles.myButtonContainer}>
    <Text style={styles.myButtonTxtContainer}>
      Login with Facebook
    </Text>
  </Icon.Button>
);
const googleButton = (
  <Icon.Button name="google" backgroundColor="#fe3c72" style={styles.myButtonContainer}>
    <Text style={styles.googleButtonTxtContainer}>
      Login with Google
    </Text>
  </Icon.Button>
);
    return(
        <View style={styles.container}>
            <View>
               {facebookButton}
            </View>
            <View style={styles.btnsContainer}>
               {googleButton}
            </View>
        </View>
        
    );
};
const styles = StyleSheet.create({
    container:{
        marginVertical:30,        
    },
    btnsContainer:{
        marginVertical:18,        
    },
    myButtonContainer:{
        marginHorizontal:95,
        borderRadius:50,
        marginVertical: 2
    },
    googleButtonTxtContainer:{
        color:'#fff'
    },
    myButtonTxtContainer:{
        color:'#fff'
    }
});