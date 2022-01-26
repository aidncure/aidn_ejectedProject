import React,{useState, useEffect} from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {firebase, auth, db, firestore} from '../../firebase';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

const SpecialistScreen = ({ navigation }) => {
  const type = navigation.getParam("name");
  const name = navigation.getParam("name");
  const data = navigation.getParam(saveUsers);
  const dataOnline = navigation.getParam(saveOnlineUsers);
  // const patientname = navigation.getParam("patientname");



  const [booking, setBooking] = useState ({
      nonOnlineBookings: 'Book appointment',
      onlineBookings: 'Video Consultation',
      uid:' ',
      key:'',
      id:'',
      name:'',
  });

  const userData = firebase.auth().currentUser;
    const db = firebase.firestore()
    // const docType = db.collection('SpecialistsList')
    const docType = db.collection('specialities')
  const saveUsers = async () => {
      await db.collection('users').doc('Appointments Booked' + userData.uid).set({
      // nonOnlineBookings:booking.nonOnlineBookings,
      uid:userData.uid,
      key:Math.random(),
      date: new Date().toUTCString(),
      // name:docType.name,
      // patient_name : patientname
      // id:key      
    }).then(() => navigation.navigate("TimeSlots"))
  } 
  const saveOnlineUsers = async () => {
    const docType = db.collection('SpecialistsList')
    await db.collection('users').doc('Appointments Booked' + userData.uid).update({
    onlineBookings:booking.onlineBookings,
    uid:userData.uid,
    key:Math.random(),
    date: new Date().toUTCString(),    
    // patient_name : patientname
    })
  }

  const [patientName, setpatientName] = useState([]);
    useEffect(() => {
      const userData = firebase.auth().currentUser;
      db.collection('users' + userData.uid).onSnapshot((querySnapshot)=>{
        const patientName = [];
        querySnapshot.docs.forEach((doc)=>{
          const {name,email,phone} = doc.data();
          patientName.push({
            id:userData.uid,
            name,
            email: userData.email,
            phone,
          });
        });
        setpatientName(patientName);
      });
    },[]);
    console.log(patientName);


  const [users, setUsers] = useState([]);
    useEffect(() => {
      const userData = firebase.auth().currentUser;
      const docType = db.collection('SpecialistsList')
      db.collection('doctors').where('type','==', type).onSnapshot((querySnapshot)=>{
        const users = [];
        querySnapshot.docs.forEach((doc)=>{
          const {name,yearsOfExperience,rating,reviews,type,description,image,price,uid,ext} = doc.data();
          users.push({
            id:doc.id,
            name,
            reviews,
            rating,
            yearsOfExperience,
            description,
            type,
            image,
            price,
            uid,
            ext,
          });
        });
        setUsers(users);
      });
    },[]);
    console.log(users);

  // const [filterData, setFilterData] = useState([]);

  const doctorsList = [
    {
      id: "1",
      name: "Dr.Ronan Peiterson",
      yearsOfExperience: 8,
      rating: 4.9,
      reviews: 135,
      image: require("../../assets/images/doctor/doctor-1.png"),
    },
    {
      id: "2",
      name: "Dr.Brayden Trump",
      yearsOfExperience: 10,
      rating: 4.7,
      reviews: 235,
      image: require("../../assets/images/doctor/doctor-2.png"),
    },
    {
      id: "3",
      name: "Dr.Appollonia Ellison",
      yearsOfExperience: 7,
      rating: 4.8,
      reviews: 70,
      image: require("../../assets/images/doctor/doctor-3.png"),
    },
    {
      id: "4",
      name: "Dr.Beatriz Watson",
      yearsOfExperience: 5,
      rating: 5.0,
      reviews: 50,
      image: require("../../assets/images/doctor/doctor-4.png"),
    },
    {
      id: "5",
      name: "Dr.Diego Williams",
      yearsOfExperience: 15,
      rating: 4.9,
      reviews: 512,
      image: require("../../assets/images/doctor/doctor-5.png"),
    },
    {
      id: "6",
      name: "Dr.Shira Gates",
      yearsOfExperience: 4,
      rating: 4.4,
      reviews: 15,
      image: require("../../assets/images/doctor/doctor-6.png"),
    },
    {
      id: "7",
      name: "Dr.Antonia Warner",
      yearsOfExperience: 7,
      rating: 4.6,
      reviews: 99,
      image: require("../../assets/images/doctor/doctor-7.png"),
    },
    {
      id: "8",
      name: "Dr.Linnea Bezos",
      yearsOfExperience: 2,
      rating: 4.5,
      reviews: 9,
      image: require("../../assets/images/doctor/doctor-8.png"),
    },
  ];

  function header() {
    return (
      <View style={styles.headerContainerStyle}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => navigation.navigate("BottomTabScreen")}
        />
        <Text
          style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding * 2.0 }}
        >
          {type}
        </Text>
      </View>
    );
  }

  function search() {
    return (
    <View style={styles.headerSearchStyle}>
      <Ionicons name="search" size={20} color={Colors.primary} />
      <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search Specialities"
        style={{ ...Fonts.gray8Regular, marginLeft: Sizes.fixPadding }}
      />
      </View>
    </View>
    );
  }



  function doctors() {
    // const filterDoc = filterData.filter((doctype)) => {
    //   return (
    //     doctype
    //   )
    // }
    const renderItem = ({ item }) => {
      return (
        <View style={{ justifyContent: "center", marginTop: 15.0 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.doctorImageContainerStyle}>
              <Image
                source={{uri:item.image}}
                resizeMode="contain"
                style={{
                  height: 109.0,
                  width: 109.0,
                  borderRadius: 75.0,
                  overflow: "hidden",
                }}
              />
            </View>
            <View>
              <Text style={{ ...Fonts.black16Bold }}>{item.name}</Text>
              {/* <Text style={{ ...Fonts.black16Bold }}>{users.name}</Text> */}
              <Text
                style={{
                  ...Fonts.gray17Regular,
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                {/* {type} */}
                {item.type}
              </Text>
              <Text
                style={{
                  ...Fonts.primaryColor16Regular,
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                {item.yearsOfExperience} Years of experience
                {/* {users.yearsOfExperience} */}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                <FontAwesome name="star" size={20} color="#CDDC39" />
                <Text
                  style={{
                    ...Fonts.black16Regular,
                    marginLeft: Sizes.fixPadding,
                    marginRight: Sizes.fixPadding * 2.0,
                  }}
                >
                  {item.rating}
                  {/* {users.rating} */}
                </Text>
                <MaterialIcons name="rate-review" size={24} color="gray" />
                <Text
                  style={{
                    ...Fonts.black16Regular,
                    marginLeft: Sizes.fixPadding,
                  }}
                >
                  {item.reviews} Reviews
                  {/* {users.reviews} */}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bookContainerStyle}>
            <View>
              <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("TimeSlots", {
                  image: item.image,
                  name: item.name,
                  uid:item.uid,
                  type: type,
                  experience: item.yearsOfExperience,
                  rating: item.rating,
                  price:item.price,
                  ext:item.ext,
                  patientname : patientName.name,
                })
              }
              >
              <TouchableOpacity
              onPress={saveOnlineUsers}
              >
              <View style={styles.bookVideoConsultButtonStyle}>
                <Text style={{ ...Fonts.orangeColorBold }}
                >
                  {/* Book Video Consult */}
                  {booking.onlineBookings}
                </Text>
              </View>
            </TouchableOpacity>
              </TouchableWithoutFeedback>
            </View>
            <View>
              <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("TimeSlots", {
                  image: item.image,
                  name: item.name,
                  uid:item.uid,
                  type: type,
                  experience: item.yearsOfExperience,
                  rating: item.rating,
                  description:item.description,
                  price:item.price,
                  ext:item.ext,
                  patientname : patientName.name,
                })
              }
              >
              <TouchableOpacity
              onPress={saveUsers}
              >
              <View style={styles.bookAppointmentButtonStyle}>
                <Text style={{ ...Fonts.primaryColorBold }}>
                  {/* Book Appointment */}
                  {booking.nonOnlineBookings}
                </Text>
              </View>
            </TouchableOpacity>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={styles.dividerStyle}></View>
        </View>
      );
    };

    return (
      <FlatList
        data={users}
        // keyExtractor={(item) => `${item.id}`}
        keyExtractor={(item) => `item-${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="rgba(0,0,0,0)">
      <StatusBar backgroundColor="rgba(0,0,0,0)" />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {header()}
        {search()}
        {doctors()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerSearchStyle: {
    // flexDirection: "row",
    // backgroundColor: "white",
    // borderRadius: Sizes.fixPadding,
    // borderColor: "#E0E0E0",
    // borderWidth: 1,
    // paddingHorizontal: Sizes.fixPadding * 2.0,
    // alignItems: "center",
    // paddingVertical: Sizes.fixPadding,
    // marginHorizontal: Sizes.fixPadding * 2.0,
    // marginTop: Sizes.fixPadding,
    // marginBottom: Sizes.fixPadding,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: Sizes.fixPadding,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingHorizontal: Sizes.fixPadding,
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 1,
    marginTop:10,
    marginBottom:8
  },
  headerContainerStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 40.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
    alignItems: "center",
  },
  doctorImageContainerStyle: {
    height: 110.0,
    width: 110.0,
    borderRadius: 75.0,
    // backgroundColor: "#eee",
    borderColor: "#eee",
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    // elevation: 2.0,
    overflow: "hidden",
  },
  bookContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  bookVideoConsultButtonStyle: {
    width: width / 2 - 30,
    borderColor: "#FF9B07",
    borderWidth: 1.0,
    backgroundColor: "#FFEDD2",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  bookAppointmentButtonStyle: {
    width: width / 2 - 30,
    borderColor: Colors.primary,
    borderWidth: 1.0,
    backgroundColor: "#E3E6FE",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  dividerStyle: {
    backgroundColor: Colors.lightGray,
    height: 0.8,
    marginTop: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
});

SpecialistScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default SpecialistScreen ;
