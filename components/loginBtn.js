import { tsConstructorType } from '@babel/types';
import React, { Component, useState } from 'react';
import {View, SafeAreaView,StyleSheet, TouchableOpacity, Keyboard, TextInput,TouchableWithoutFeedback} from 'react-native';
import {Button,Text} from 'react-native-elements';
import SocialLogin from '../components/socialLogin';
import { useNavigation } from '@react-navigation/native';

const LoginBtn = ({navigation}) =>{
    // const navigation = useNavigation();
    
    const[text, setText] = useState('Let\'s Go');

    const handlePress = () => {
        setText('Verified')
    };
    return(
      <View>
        <View style={styles.btnContainer}>
        <Text style={styles.textBtnContainer}
        // onPress={handlePress}
        onPress={() =>{navigation.navigate('BottomTabScreen')}}
        > {text} </Text>
       </View>
       <View style={styles.textContainer}>
        <Text style={styles.textContext}>New over here? Let's gets registered</Text>
       </View>
       <SocialLogin/>
      </View>

    );
};
const styles = StyleSheet.create({
    btnContainer:{
        width:100,
        backgroundColor:'#1e90ff',
        borderRadius:100,
    },
    textBtnContainer:{
        width:60,
        height:25,
        fontSize:15,
        color:'#fff',
        borderRadius:100,
        borderWidth:0,
        marginHorizontal:20,
        marginVertical:8,
        paddingTop:2,
    },
    textContainer:{
        paddingLeft: 10,
        paddingTop: 4,
        flexDirection: 'row',
        // justifyContent:'center',
        // alignItems:'center'
    },
    textContext:{
        color:'#1e90ff',
        flexDirection: 'row'
    }
});
export default LoginBtn;