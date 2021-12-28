import React,{useState, useEffect} from "react";
import { SafeAreaView } from "react-native";
import {
  Text,
  View,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import {firebase, auth, db, firestore} from '../../firebase';
// import { useEffect } from "react";


const facilitiesList = [
  {
    id: "1",
    facility: "Parking available",
  },
  {
    id: "2",
    facility: "E-Reports available",
  },
  {
    id: "3",
    facility: "Card accepted",
  },
  {
    id: "4",
    facility: "Prescription pick up available",
  },
  {
    id: "5",
    facility: "Report doorstep drop available",
  },
];

const LabTestAndHealthCheckUpScreen = ({ navigation }) => {
  const image = navigation.getParam("image");
  const name = navigation.getParam("name");
  const address = navigation.getParam("address");
  const facility = navigation.getParam("facility");
  // const address = navigation.getParam(users.labAddress);

  const [users, setUsers] = useState([]);
    useEffect(() => {
      const userData = db.collection('Labs').id
      db.collection('Labs').onSnapshot((querySnapshot)=>{
        const users = [];
        querySnapshot.docs.forEach((doc)=>{
          const {facility, labName, labAddress} = doc.data();
          users.push({
            id:userData.id,
            facility,
            labName,
            labAddress,
          });
        });
        setUsers(users);
      });
    },[]);
    console.log(users);

  function labInfo() {
    return (
      <View style={styles.labInfoContainerStyle}>
        <Image
          source={image}
          style={{
            height: 90.0,
            width: 90.0,
            borderRadius: Sizes.fixPadding + 5.0,
          }}
          resizeMode="cover"
        />
        <View style={{ marginRight: 100.0, marginLeft: Sizes.fixPadding }}>
          <Text numberOfLines={2} style={{ ...Fonts.black15Bold }}>
            {name}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.gray15Regular,
              marginVertical: Sizes.fixPadding - 5.0,
            }}
          >
            {address}
            {/* {users.labAddress} */}
            {/* {user} */}
          </Text>
          <Text style={{ ...Fonts.primaryColorRegular }}>Timing:</Text>
          <Text style={{ ...Fonts.blackRegular, ...styles.labTimeStyle }}>
            9:00 AM to 8:00 PM
          </Text>
        </View>
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGray,
          height: 1.0,
          elevation: 2.0,
        }}
      ></View>
    );
  }

  function titleInfo({ title }) {
    return (
      <Text
        style={{
          ...Fonts.primaryColor20Bold,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 2.0,
        }}
      >
        {title}
      </Text>
    );
  }

  function addressInfo() {
    return (
      <Text
        numberOfLines={2}
        style={{ ...Fonts.blackBold, ...styles.addressTextStyle }}
      >
        {address}
        {/* {users.labAddress} */}
      </Text>
    );
  }
  function facilityInfo() {
    return (
      <Text
        // numberOfLines={2}
        style={{ ...Fonts.blackRegular, ...styles.addressTextStyle }}
      >
        {facility}
        {/* {users.labAddress} */}
      </Text>
    );
  }

  function mapInfo() {
    return (
      <View style={styles.mapContainerStyle}>
        <MapView
          style={{ height: 270.0 }}
          initialRegion={{
            latitude: 37.33233141,
            longitude: -122.0312186,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.33233141, longitude: -122.0312186 }}
            pinColor={"red"}
          />
        </MapView>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          ...styles.facilitiesContainerStyle,
          marginTop: item.id == users.id ? Sizes.fixPadding + 1.0 : 0.0,
          // paddingRight:10
        }}
      >
        {/* <Feather name="check" size={17} color={Colors.bumbleYellow} /> */}
        <Text style={{ ...Fonts.blackRegular}}>
          {/* {item.facility} */}
          {facility}
        </Text>
      </View>
    );
  };

  function massageAndCallNowButton() {
    return (
      <View
        style={{
          position: "absolute",
          height: 75.0,
          backgroundColor: "white",
          bottom: 0.0,
          left: 0.0,
          right: 0.0,
          flexDirection: "row",
          flex: 1,
          borderTopColor: Colors.lightGray,
          borderTopWidth: 0.5,
          paddingVertical: Sizes.fixPadding,
          paddingHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          style={{
            flex: 0.5,
            borderColor: Colors.lightGray,
            borderWidth: 1.0,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: Sizes.fixPadding,
            elevation: 2.0,
            backgroundColor: "white",
            marginRight: Sizes.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.black20Regular }}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          style={{
            flex: 0.5,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: Sizes.fixPadding,
            elevation: 2.0,
            backgroundColor: Colors.primary,
            marginLeft: Sizes.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.white20Regular }}>Call Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="rgba(0,0,0,0)" />
      {/* <FlatList
        data={users}
        // keyExtractor={(item) => `${item.id}`}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
        paddingBottom: Sizes.fixPadding * 9.0,
        }}
        ListHeaderComponent={
          <> */}
            {labInfo()}
            {divider()}
            {titleInfo({ title: "Address" })}
            {addressInfo()}
            {mapInfo()}
            {titleInfo({ title: "Description" })}
            {facilityInfo()}
          {/* </>
        }
     
      /> */}
      
      {/* <Text style={{alignItems:'center', justifyContent:'center'}}>{users.labAddress} Hello</Text> */}
      {massageAndCallNowButton()}
    </SafeAreaView>
  );
};

LabTestAndHealthCheckUpScreen.navigationOptions = {
  title: "Lab tests & health checkup",
  headerTitleStyle: {
    ...Fonts.primaryColor16Regular,
    marginLeft: -Sizes.fixPadding * 2.0,
  },
  headerStyle: {
    elevation: 0,
  },
};

const styles = StyleSheet.create({
  labInfoContainerStyle: {
    flexDirection: "row",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  labTimeStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 3.0,
  },
  addressTextStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  mapContainerStyle: {
    borderRadius: Sizes.fixPadding + 5.0,
    marginTop: 5,
    overflow: "hidden",
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  facilitiesContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding - 3.0,
  },
});

export default LabTestAndHealthCheckUpScreen;
