import React, { useRef, useState, useEffect , useCallback} from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  ImageBackground,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import RBSheet from "react-native-raw-bottom-sheet";
import {firebase, auth, db, firestore} from '../../firebase';
import { fonts } from "react-native-elements/dist/config";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");


const QrScreen = ({ navigation }) => {
return(
  <SafeAreaView style={styles.mainContainer}>
  {/* <StatusBar translucent={false} backgroundColor="#ffff" /> */}
      <StatusBar backgroundColor={Colors.bumbleYellow} />
      <View style={styles.topContainer}>
            <View style={styles.backArrowAndSaveContainerStyle}>
                <Ionicons
                name="arrow-back-outline"
                size={24}
                color='#FFF'
                onPress={() => navigation.goBack()}
                // onPress={ ()=> Linking.openURL('https://aidn.in/') }
                />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:50}}>
              <Text style={{...Fonts.blackRegular, fontSize:24}}>
              {/* Aidn auxiliary */}
              Aidn pulse coming soon
            </Text>
            </View>
        </View>
        <View style={styles.bottomProfileContainer}>
        <View style={styles.imageContainer}
        onPress={ ()=> Linking.openURL('https://aidn.in/') }
        >
        <Image source={require('../../assets/imagesvtr/aidn_pulse.png')}
          style={{
            width:200,
            height:200
          }}
          onPress={ ()=> Linking.openURL('https://aidn.in/') }
        />
        </View>
        <View style={styles.secondContainer}
        onPress={ ()=> Linking.openURL('https://aidn.in/') }
        >
        <Image source={require('../../assets/imagesvtr/QRtiger.png')}
          style={{
            width:150,
            height:150
          }}
          onPress={ ()=> Linking.openURL('https://aidn.in/') }
        />
        </View>
        <View style={styles.thirdContainer}
        onPress={ ()=> Linking.openURL('https://aidn.in/') }
        >
        <Image source={require('../../assets/imagesvtr/QRtiger.png')}
        style={{
          width:150,
          height:150
          }}
          onPress={ ()=> Linking.openURL('https://aidn.in/') }
        />
        </View>
        </View>
  </SafeAreaView>
)
}
QrScreen.navigationOptions = () => {
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
  topContainer:{
    width:'100%',
    height:'40%',
    borderBottomRightRadius:100,
    backgroundColor:Colors.bumbleYellow,
  },
  bottomProfileContainer:{
    width:'100%',
    height:'72%',
    // marginVertical:-100,
    // borderTopLeftRadius:90,
    // backgroundColor:"#fff",
  },
   imageContainer:{
      width:200,
      height:200,
      marginVertical:-120,
      marginHorizontal:110,
      borderRadius:100,
      backgroundColor:"#fff",
      borderWidth:2,
      borderColor:Colors.bumbleYellow,
  },
   secondContainer:{
      width:150,
      height:150,
      marginVertical:160,
      marginHorizontal:20,
      borderRadius:100,
      backgroundColor:"#fff",
      // borderWidth:2,
      // borderColor:Colors.primary,
  },
   thirdContainer:{
      width:150,
      height:150,
      marginVertical:-312,
      marginHorizontal:240,
      borderRadius:100,
      backgroundColor:"#fff",
      // borderWidth:2,
      // borderColor:Colors.dodgerBlue,
  },
})

export default QrScreen;