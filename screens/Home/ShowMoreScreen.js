import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StatusBar,
  FlatList,
  TouchableHighlight,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import {firebase, auth, db, firestore} from '../../firebase';

const ShowMoreScreen = ({ navigation }) => {

  const [users, setUsers] = useState([]);
    useEffect(() => {
      const userData = db.collection('Labs').doc()
      db.collection('instantrelief').onSnapshot((querySnapshot)=>{
        const users = [];
        querySnapshot.docs.forEach((doc)=>{
          const {id,name,image} = doc.data();
          users.push({
            id:id,
            name,
            image,
          });
        });
        setUsers(users);
      });
  },[]);
  console.log(users);

  function header() {
    return (
      <View style={styles.headerStyle}>
        <View style={styles.headerTitleContainerStyle}>
          <AntDesign
            name="arrowleft"
            size={18}
            // color="#E8E2E9"
            color={Colors.primary}
            onPress={() => navigation.navigate("BottomTabScreen")}
          />
          <Text
            style={{ ...Fonts.black15Regular, marginLeft: Sizes.fixPadding * 2.0 }}
          >
            Instant Treatment
          </Text>
        </View>
      
      </View>
    );
  }

  const specialistsList = [
    {
      id: "1",
      image: require("../../assets/specialistImg/RCT.png"),
    },
    {
      id: "2",
      image: require("../../assets/specialistImg/DentalAidn.png"),
    },
    {
      id: "3",
       image: require("../../assets/specialistImg/Frequently_coughing.png"),
    },
    // {
    //   id: "4",      
    //   image: require("../../assets/specialistImg/RCT.png"),
    // },
    // {
    //   id: "5",      
    //   image: require("../../assets/specialistImg/DentalAidn.png"),
    // },
    // {
    //   id: "6",
    //   image: require("../../assets/specialistImg/Frequently_coughing.png"),
    // },
  ];


  function aidnCureBanner() {
    return (
      <TouchableWithoutFeedback onPress={ ()=> Linking.openURL('https://forms.gle/pXqgFRceVe2AuUjG9') }>
       <View style={{ alignItems:'center', justifyContent:'center', backgroundColor:"#fff"}}>
        <Image
        // source={require("../../assets/frequentMigranes.png")}
        // source={require("../../assets/specialistImg/chest_pain.jpeg")}
        source={require("../../assets/images/Standard_Insurance.png")}
        resizeMode="contain"
        style={{
          height: 200,
          // width:'100%', 
          width:'95%', 
          borderWidth:1,
          // marginRight:30      
        }}
        // borderRadius={30}
      ></Image>
     </View>
     </TouchableWithoutFeedback>
    );
  }
  function migranes() {
    return (
      // <TouchableOpacity onPress={() => navigation.navigate("ViewAll")}>
      <TouchableWithoutFeedback onPress={ ()=> Linking.openURL('https://forms.gle/pXqgFRceVe2AuUjG9') }>
       <View style={{ alignItems:'center', justifyContent:'center', backgroundColor:"#fff"}}>
        <Image
        // source={require("../../assets/frequentMigranes.png")}
        source={require("../../assets/images/premiumInsurance.png")}
        resizeMode="contain"
        style={{
          height: 200,
          width:'95%', 
          borderWidth:1,
          marginBottom:20      
        }}
        // borderRadius={30}
      ></Image>
     </View>
     </TouchableWithoutFeedback>
    );
  }
    function healthBanner() {
    return (
      <TouchableWithoutFeedback 
      onPress={ ()=> Linking.openURL('https://forms.gle/sc6VXstoN3TsddoT7') }>
      <View style={{ alignItems:'center', justifyContent:'center', width:'100%'}}>
      <Image
        // source={require("../../assets/specialistImg/healthCoverageAidn.png")}
        source={require("../../assets/specialistImg/coverage.jpg")}
        style={{
          height: 400,
          // marginTop:2,
          marginBottom:20,
        //   width:'100%',
        width:"95%",
          // marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        borderRadius={10}
      ></Image>
      </View>
      </TouchableWithoutFeedback>
    );
  }
  //   function healthBanner() {
  //   return (
  //     <TouchableOpacity 
  //     onPress={ ()=> Linking.openURL('https://forms.gle/sc6VXstoN3TsddoT7') }>
  //     <View style={{ alignItems:'center', justifyContent:'center', width:'100%'}}>
  //     <Image
  //       source={require("../../assets")}
  //       style={{
  //         height: 400,
  //         // marginTop:2,
  //         marginBottom:20,
  //       //   width:'100%',
  //       width:"95%",
  //         // marginHorizontal: Sizes.fixPadding * 2.0,
  //       }}
  //       borderRadius={10}
  //     ></Image>
  //     </View>
  //     </TouchableOpacity>
  //   );
  // }
//    function coughBanner() {
//     return (
//        <View style={{ alignItems:'center', justifyContent:'center'}}>
//         <Image
//         source={require("../../assets/frequent_migranes.png")}
//         resizeMode="contain"
//         style={{
//           height: 125,
//           // marginTop: Sizes.fixPadding + 2.0,
//           // marginTop: 2,
//           width:'90%',
//           marginHorizontal: Sizes.fixPadding * 2.0,          
//         }}
//         borderRadius={5}
//       ></Image>
//       {/* Covid Test Banner */}
//         <Image
//         source={require("../../assets/frequentMigranes.png")}
//         resizeMode="contain"
//         style={{
//           height: 125,
//           // marginTop: Sizes.fixPadding + 2.0,
//           // marginTop: 2,
//           width:'90%',
//           marginHorizontal: Sizes.fixPadding * 2.0,          
//         }}
//         borderRadius={5}
//       ></Image>
//       {/* Dental CheckUp Banner */}
//         <Image
//         source={require("../../assets/frequentChestPain.png")}
//         resizeMode="contain"
//         style={{
//           height: 125,
//           // marginTop: Sizes.fixPadding + 2.0,
//           // marginTop: 2,
//           width:'90%',
//           marginHorizontal: Sizes.fixPadding * 2.0,          
//         }}
//         borderRadius={5}
//       ></Image>
//      </View>
//     );
//   }

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        underlayColor="white"
        activeOpacity={0.9}
        style={{ flex: 1 }}
        onPress={() => navigation.navigate("Specialist", { name: item.name })}
      >
        <View style={styles.specialistStyle}>
          <Image
            source={{uri:item.image}}
            resizeMode="contain"
            style={{ height: 128, width: "100%", borderRadius:10}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
 
  function specialities() {
    return (
      <View
        style={{
          backgroundColor: "#FFF",
          flex: 1,
          paddingTop: Sizes.fixPadding,
        }}
      >
        <FlatList
          // data={specialistsList}
          data={users}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor:'#fff'}}>
      <StatusBar backgroundColor="rgba(0,0,0,0)" />
     <ScrollView>
      {header()}
      {aidnCureBanner()}
      {specialities()}
      {migranes()}
      {/* {aidnCureBanner()} */}
      {healthBanner()}
     </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSearchStyle: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: Sizes.fixPadding,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    // width:200,
    paddingHorizontal: Sizes.fixPadding,
    alignItems: "center",
    // paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 1,
    // paddingVertical:10,
    // paddingHorizontal: fixPadding * 20
  },
  specialistStyle: {
    // height: 170,
    // width:"100%",
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 45,
    // marginVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 0 },
    // // shadowOpacity: 0.5,
    // shadowRadius: Sizes.fixPadding,
    // elevation: 5.0,
  },
  headerStyle: {
    backgroundColor: "white",
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom: Sizes.fixPadding,
  },
  headerTitleContainerStyle: {
    flexDirection: "row",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding + 10.0,
  },
  specialistTextStyle: {
    // ...Fonts.black16Bold,
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    textAlign: "center",
  },
});

ShowMoreScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default ShowMoreScreen;
