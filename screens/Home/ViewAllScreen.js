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
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {firebase, auth, db, firestore} from '../../firebase';

const ViewAllScreen = ({ navigation }) => {
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
            Speciality
          </Text>
        </View>
        <View style={styles.headerSearchStyle}>
          <Ionicons name="search" size={20} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Search Specialities"
              style={{ ...Fonts.gray8Regular, marginLeft: Sizes.fixPadding }}
            />
          </View>
        </View>
      </View>
    );
  }

   const [specialistsList, setSpecialistsList] = useState([]);
    useEffect(() => {
      const userData = firebase.auth().currentUser;
      // db.collection('specialistsList').onSnapshot((querySnapshot)=>{
      db.collection('specialities').onSnapshot((querySnapshot)=>{
        const specialistsList = [];
        querySnapshot.docs.forEach((doc)=>{
          const {name, id,image} = doc.data();
          specialistsList.push({
            id:doc.id,
            name,
            image,
          });
        });
        setSpecialistsList(specialistsList);
      });
    },[]);
    console.log(specialistsList);

  const specialistsLists = [
    {
     id: "1",
      name: "Fever",
      image: require("../../assets/imagesvtr/icons8-coughing-100.png"),
    },
    {
      id: "2",
      name: "Homeopath",
      image: require("../../assets/imagesvtr/icons8-stethoscope-100.png"),
    },
    {
      id: "3",
      name: "Gynecologist",
      image: require("../../assets/imagesvtr/icons8-embryo-100.png"),
    },
    {
      id: "4",
      name: "Pediatrician",
      image: require("../../assets/imagesvtr/icons8-pacifier-100.png"),
    },
    {
      id: "5",
      name: "Physiotherapy",
      image: require("../../assets//imagesvtr/icons8-medical-doctor-100.png"),
    },
    {
      id: "6",
      name: "Nutritionist",
      image: require("../../assets/imagesvtr/icons8-dumbbell-100.png"),
    },
    {
      id: "7",
      name: "Psychiatrist",
      image: require("../../assets/imagesvtr/icons8-brain-100.png"),
    },
    {
      id: "8",
      name: "Lungs",
      image: require("../../assets/imagesvtr/icons8-lungs-100.png"),
    },
  ];

  const labAndCheckUpList = [
    {
      id: "1",
      labName: "New York City DOHMH Public Health Laboratory",
      labAddress: "455 1st Avenue, New York, NY 10016, United States",
      image: require("../../assets/images/lab/lab_1.jpg"),
    },
    {
      id: "2",
      labName: "Enzo Clinical Labs-Upper East Side (STAT Lab)",
      labAddress: "44 E 67th St, New York, NY 10022, United States",
      image: require("../../assets/images/lab/lab_2.jpg"),
    },
    {
      id: "3",
      labName: "New York Startup Lab LLC",
      labAddress: "244 5th Ave #2575, New York, NY 10001, United States",
      image: require("../../assets/images/lab/lab_3.jpg"),
    },
    {
      id: "4",
      labName: "MEDTRICS LAB LLC",
      labAddress: "138 W 25th St 10th floor, New York, NY 10001, United States",
      image: require("../../assets/images/lab/lab_4.jpg"),
    },
    {
      id: "5",
      labName: "Enzo Clinical Labs",
      labAddress: "15005 21st Ave ,Flushing, NY 11357, United States",
      image: require("../../assets/images/lab/lab_5.jpg"),
    },
    {
      id: "6",
      labName: "Shiel Medical",
      labAddress: "128 Mott St,New York, NY 10013,United States",
      image: require("../../assets/images/lab/lab_6.jpg"),
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor="white"
        activeOpacity={0.9}
        style={{ flex: 1 }}
        onPress={() => navigation.navigate("Specialist", { name: item.name })}
      >
        <View style={styles.specialistStyle}>
          <Image
            source={{uri:item.image}}
            resizeMode="contain"
            style={{ height: 80.0, width: 80.0 }}
          />
          <Text style={styles.specialistTextStyle}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  function specialities() {
    return (
      <View
        style={{
          // backgroundColor: "#ffff",
          backgroundColor: "#FFF",
          flex: 1,
          paddingTop: Sizes.fixPadding,
        }}
      >
        <FlatList
          data={specialistsList}
          keyExtractor={(item) => `${item.id}`}
          numColumns={2}
          // numColumns={3}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="rgba(0,0,0,0)" />
      {header()}
      {specialities()}
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
    height: 170.0,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
    // borderColor: Colors.lightGray,
    // borderWidth: 1.0,
    // marginHorizontal: 45,
    // marginVertical: Sizes.fixPadding,
    // borderRadius: Sizes.fixPadding,
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

ViewAllScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default ViewAllScreen;
