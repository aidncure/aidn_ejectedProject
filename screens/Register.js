import React from 'react';
import {View, SafeAreaView,StyleSheet, TouchableWithoutFeedback, Keyboard, Image} from 'react-native';
import {Button,Text} from 'react-native-elements';
import InputData from '../components/input';

export default class Login extends React.Component{



    render(){
    return(
       <SafeAreaView>
            <View style={styles.imageContainerTop}></View>
            <View style={styles.container}>
            <Text h3 style={styles.textContainer}>
                Welcome back Hooman!
            </Text>
            <Text style={styles.textLoginContainer}>
            Login to your account
            </Text>
            <InputData/>
        </View>
        {/* <View style={styles.imageContainer}></View> */}
       </SafeAreaView>
    );
}
}

const styles = StyleSheet.create({
    container:{
        marginVertical:180,
        marginHorizontal:30,
        // borderWidth:1,
        // borderColor: 'red',
    },
    imageContainer:{
        borderWidth:1,
        borderColor: 'red',
        borderRadius: 30,
        height: 300,
        elevation: 2,
        backgroundColor: '#fe3c72',
        marginVertical: -100
    },
    imageContainerTop:{
        // borderWidth:1,
        // borderColor: 'red',
        borderRadius: 30,
        height: 180,
        elevation: 8,
        backgroundColor: '#fe3c72',
        marginVertical: -100
    },
    textContainer:{
        fontSize: 30,
        color:'#1e90ff',
        fontWeight:'bold',
    },
    textLoginContainer:{
        fontSize:16,
        color:'#1e90ff',
        paddingTop: 6,
        paddingLeft:4,
    }
});
// export default Login;