import React, { Component, useState, useEffect } from 'react';
import {View, Text, Button, SafeAreaView,StatusBar, StyleSheet,TouchableOpacity,TextInput,Image, Keyboard,TouchableWithoutFeedback,ScrollView} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { fetchUser, newUser, } from "../../apiServices";
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../.././utilities/Userpermission'
import Fire from '../../Fire'
import {firebase, auth, firestore, db} from '../../firebase'
import { fonts } from 'react-native-elements/dist/config';

const ProfileUpload = ({navigation}) => {
// export default function ProfileUpload() {
  const [image, setImage] = useState(null)
  useEffect(() => {
   UserPermissions.getPermissionAsync()
  }, [])
  const upload = () => {
    Fire.shared.addPhoto(image).then(()=>{
      setImage(null)

    })
    // .then(    )
    .catch(err=>{
      alert(err.message)
    })
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Choose Pictures" onPress={pickImage}/>
      <View style={{marginHorizontal:32, marginTop:32, height:150}}>
        {image === null? <Text>No image is selected</Text>: <View>
        <Image source={{uri:image}} style={{
            // width:'100%', height:'100%'
            // New Code
            width:150,
            height:150,
            // marginVertical:-110,
            marginBottom:20,
            marginHorizontal:122,
            borderRadius:100,
            backgroundColor:"#eee"
            }}>
            </Image>
        <Button title="Upload" onPress={upload}/>
        <Text
        style={{
        //  ...Fonts.black16Regular,
         color:"red"
        }}
        >Please return back to the form filling part after the upload</Text>
        </View>}
      </View>
    </SafeAreaView>
  );
}

ProfileUpload.navigationOptions = () => {
  return {
      header: () => null,
  };
};

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    // New Code
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
      
    },
});
export default ProfileUpload;