import React, { useRef, useState, useEffect } from "react";
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
  ScrollView,
  // Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import RBSheet from "react-native-raw-bottom-sheet";
import {firebase, auth, db, firestore} from '../../firebase';

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {


  const [users, setUsers] = useState([]);
    useEffect(() => {
      const userData = db.collection('Labs').doc()
      db.collection('Labs').onSnapshot((querySnapshot)=>{
        const users = [];
        querySnapshot.docs.forEach((doc)=>{
          const {facility, labName, labAddress,key} = doc.data();
          users.push({
            id:userData.id,
            key,
            facility,
            labName,
            labAddress,
          });
        });
        setUsers(users);
      });
    },[]);
    console.log(users);


// For Doctors Firebase

  // const [doctors, setDoctors] = useState([]);
  //   useEffect(() => {
  //     const userData = firebase.auth().currentUser;
  //     db.collection('doctors').onSnapshot((querySnapshot)=>{
  //       const doctors = [];
  //       querySnapshot.docs.forEach((doc)=>{
  //         const {name,yearsOfExperience,rating,reviews,type} = doc.data();
  //         doctors.push({
  //           id:doc.id,
  //           name,
  //           reviews,
  //           rating,
  //           yearsOfExperience,
  //           type,
  //         });
  //       });
  //       setUsers(doctors);
  //     });
  //   },[]);
  //   console.log(doctors);

  const specialistsList = [
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

  const diseases = [
    {
      id: "1",
      image: require("../../assets/specialistImg/anxiety.png"),
    },
    {
      id: "2",
      image: require("../../assets/specialistImg/dental.png"),
    },
    {
      id: "3",
      image: require("../../assets/specialistImg/ent.png"),
    },
    {
      id: "4",
      image: require("../../assets/specialistImg/eye.png"),
    },
    {
      id: "5",
      image: require("../../assets/specialistImg/hypertension.png"),
    },
    {
      id: "6",
      image: require("../../assets/specialistImg/lungs.png"),
    },
    {
      id: "7",
      image: require("../../assets/specialistImg/pedia.png"),
    },
    {
      id: "7",
      image: require("../../assets/specialistImg/ortho.png"),
    },
  ];

  const labAndCheckUpList = [
    {
      id: "1",
      labName: "ZYX",
      labAddress: "455 1st Avenue, New York, NY 10016, United States",
      // labAddress: "455 1st Avenue, New York, NY 10016, United States",
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

  function search() {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <View style={styles.searchStyle}>
          <Ionicons name="search" size={20} color={Colors.primary} style={{ marginBottom:-10 }} />
          <Text
            style={{ ...Fonts.black16Regular ,marginLeft: Sizes.fixPadding,marginBottom:-10 }}
          >
            Search doctors, medicines, catergory..
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function newlyLanched() {
    return (
     <View style={{ alignItems:'center', justifyContent:'center'}}>
        <Image
        source={require("../../assets/images/homeBanner.jpg")}
        resizeMode="contain"
        style={{
          height: 100,
          marginTop: Sizes.fixPadding + 5.0,
          width:'90%',
          marginHorizontal: Sizes.fixPadding * 2.0,          
        }}
        borderRadius={5}
      ></Image>
     </View>
    );
  }
  function basicInsurance() {
    return (
      <View style={{ alignItems:'center', justifyContent:'center', width:'100%'}}>
      <Image
        source={require("../../assets/images/Basic_Insurance.png")}
        // resizeMode="contain"
        style={{
          height: 202,
          marginTop: Sizes.fixPadding + 5.0,
          // paddingBottom:100,
          marginBottom:20,
          // width:370,
          width:'95%',
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        borderRadius={5}
      ></Image>
      </View>
    );
  }
  function standardInsurance() {
    return (
      <View style={{ alignItems:'center', justifyContent:'center', width:'100%'}}>
      <Image
        source={require("../../assets/images/Standard_Insurance.png")}
        style={{
          height: 202,
          marginTop:2,
          marginBottom:20,
          width:'95%',
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        borderRadius={5}
      ></Image>
      </View>
    );
  }
  function premiumInsurance() {
    return (
      <View style={{ alignItems:'center', justifyContent:'center', width:'100%'}}>
       <Image
        source={require("../../assets/images/premiumInsurance.png")}
        style={{
          height: 202,
          marginTop:2,
          marginBottom:20,
          width:'95%',
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        borderRadius={5}
      ></Image>
      </View>
    );
  }

  function title({ title }) {
    return (
      <Text
        style={{
          ...Fonts.black14Bold,
          marginVertical: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom:-15
        }}
      >
        {title}
      </Text>
    );
  }

  function specialists() {
    const renderItem = ({ item }) => (
      <TouchableHighlight
        underlayColor="white"
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Specialist", { name: item.name })}
      >
        <View style={styles.specialistInfoContainer}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={{ height: 80.0, width: 80.0 }}
          />
          <Text
            style={{
              ...Fonts.black2Bold,
              marginTop: Sizes.fixPadding,
              marginHorizontal: Sizes.fixPadding,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableHighlight>
    );

    return (
      // <View style={{flexDirection:'column'}}>
        <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={specialistsList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ marginHorizontal: Sizes.fixPadding }}
        
      />
      // </View>
    );
  }
  function pharmasList() {
    const renderItem = ({ item, index }) => (
      <View>
    <TouchableOpacity
    // style={{alignItems:'center', justifyContent:'center'}}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("LabTestAndCheckUp", {
          image: item.image,
          name: item.labName,
          address: item.labAddress,
          facility:item.facility,
        })
      }
      style={styles.labAndCheckUpContainer}
    >
      <Image
        source={item.image}
        style={{
          height: 125,
          width:150,
        }}
      />      
    </TouchableOpacity>
        {/* {disease()}
        {diseasesList()}
        {aidnCureBanner()}
        {instantRelief()}
        {coughBanner()}
        {aidnCureViewAll()} */}
    </View>
    );

    return (
      // <View style={{flexDirection:'column'}}>
      <FlatList
        data={users}
        keyExtractor={(item) => `item-${item.id}`}
        key={(item) => `item-${item.id}`}
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
      />
      // </View>
    );
  }
  function diseasesList() {
    const renderItem = ({ item }) => (
      <TouchableHighlight
        underlayColor="white"
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Specialist", { name: item.name })}
      >
        <View style={styles.diseaseInfoContainer}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={{ height: 100.0, width: 100.0, borderRadius:10 }}
          />
          <Text
            style={{
              ...Fonts.black2Bold,
              marginTop: Sizes.fixPadding,
              marginHorizontal: Sizes.fixPadding,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableHighlight>
    );

    return (
      // <View style={{flexDirection:'column'}}>
        <FlatList
        // horizontal
        showsHorizontalScrollIndicator={false}
        data={diseases}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={{ marginHorizontal: Sizes.fixPadding }}
        
      />
      // </View>
    );
  }

  function viewAll() {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("ViewAll")}>
        <View style={styles.viewAllStyle}>
          <Text
            style={{
              // ...Fonts.orangeColorBold18Regular,
              ...Fonts.primaryColor16Regular,
              // ...Fonts.primaryColor17Bold,
              // ...Fonts.black18Bold,
              marginRight: Sizes.fixPadding - 8.0,
            }}
          >
            View All
          </Text>
          {/* <Ionicons name="chevron-forward" size={18} color="dodgerblue" /> */}
        </View>
      </TouchableOpacity>
    );
  }
  function aidnCureViewAll() {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("ShowMore")}>
        <View style={styles.aidnCureViewAll}>
          <Text
            style={{
              ...Fonts.primaryColor16Regular,
              marginRight: Sizes.fixPadding - 8.0,
            }}
          >
            Show more
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  function pharma() {
    return (
        <View style={styles.viewAllStyle}>
          <Text
            style={{
              // ...Fonts.orangeColorBold18Regular,
              // ...Fonts.primaryColor16Regular,
              // ...Fonts.primaryColor24Bold,
              ...Fonts.black24Bold,
              marginRight: Sizes.fixPadding - 8.0,
              marginTop:15,
              marginBottom:2,
              // paddingBottom:5,
              // borderBottomWidth:1,
              // borderBottomColor:"#eee"
            }}
          >
            Pharmacy
          </Text>
        </View>
    );
  }
  function disease() {
    return (
        <View style={styles.viewAllStyle}>
          <Text
            style={{
              // ...Fonts.orangeColorBold18Regular,
              // ...Fonts.primaryColor16Regular,
              // ...Fonts.primaryColor24Bold,
              ...Fonts.black24Bold,
              marginRight: Sizes.fixPadding - 8.0,
              marginTop:15,
              marginBottom:2,
              // paddingBottom:5,
              // borderBottomWidth:1,
              // borderBottomColor:"#eee"
            }}
          >
            Common symptoms
          </Text>
        </View>
    ); 
  }
  function instantRelief() {
    return (
        <View style={styles.viewAllStyle}>
          <Text
            style={{
              // ...Fonts.orangeColorBold18Regular,
              // ...Fonts.primaryColor16Regular,
              // ...Fonts.primaryColor24Bold,
              ...Fonts.black24Bold,
              marginRight: Sizes.fixPadding - 8.0,
              marginTop:15,
              marginBottom:2,
            }}
          >
            Get instant treatments
          </Text>
        </View>
    ); 
  }

   function pharmacyBanner() {
    return (
      <View style={{ alignItems:'center', justifyContent:'center', width:'100%'}}>
      <Image
        source={require("../../assets/frequent_migranes.png")}
        style={{
          height: 202,
          // marginTop:2,
          marginBottom:20,
          width:'98%',
          // marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        borderRadius={5}
      ></Image>
      </View>
    );
  }
   function aidnCureBanner() {
    return (
       <View style={{ alignItems:'center', justifyContent:'center'}}>
        <Image
        source={require("../../assets/specialistImg/AidnCureServices.png")}
        resizeMode="contain"
        style={{
          height: 125,
          // marginTop: Sizes.fixPadding + 2.0,
          // marginTop: 2,
          width:'90%',
          marginHorizontal: Sizes.fixPadding * 2.0,          
        }}
        borderRadius={5}
      ></Image>
     </View>
    );
  }
   function coughBanner() {
    return (
       <View style={{ alignItems:'center', justifyContent:'center'}}>
        <Image
        source={require("../../assets/specialistImg/Frequently_coughing.png")}
        resizeMode="contain"
        style={{
          height: 125,
          // marginTop: Sizes.fixPadding + 2.0,
          // marginTop: 2,
          width:'90%',
          marginHorizontal: Sizes.fixPadding * 2.0,          
        }}
        borderRadius={5}
      ></Image>
      {/* Covid Test Banner */}
        <Image
        source={require("../../assets/specialistImg/RCT.png")}
        resizeMode="contain"
        style={{
          height: 125,
          // marginTop: Sizes.fixPadding + 2.0,
          // marginTop: 2,
          width:'90%',
          marginHorizontal: Sizes.fixPadding * 2.0,          
        }}
        borderRadius={5}
      ></Image>
      {/* Dental CheckUp Banner */}
        <Image
        source={require("../../assets/specialistImg/DentalAidn.png")}
        resizeMode="contain"
        style={{
          height: 125,
          // marginTop: Sizes.fixPadding + 2.0,
          // marginTop: 2,
          width:'90%',
          marginHorizontal: Sizes.fixPadding * 2.0,          
        }}
        borderRadius={5}
      ></Image>
     </View>
    );
  }

  const renderItem = ({ item, key }) => (
    <View>
    <TouchableOpacity
    // style={{alignItems:'center', justifyContent:'center'}}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("LabTestAndCheckUp", {
          image: item.image,
          name: item.labName,
          address: item.labAddress,
          // facility:item.facility,
        })
      }
      style={styles.labAndCheckUpContainer}
    >
      <Image
        source={item.image}
        style={{
          height: 125,
          width:150,
        }}
      />      
    </TouchableOpacity>
        {disease()}
        {diseasesList()}
        {aidnCureBanner()}
        {instantRelief()}
        {coughBanner()}
        {aidnCureViewAll()}
    </View>
  );


  function header() {
    const refRBSheet = useRef();
    const [city, setCity] = useState("Bangalore");
    const cityList = ["Bangalore", "Mumbai", "Chennai"];

    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity 
        onPress={() => refRBSheet.current.open()}

        >
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={200}
            openDuration={250}
            customStyles={{
              container: {
              paddingHorizontal: Sizes.fixPadding * 2.0,
              },
            }}
          >
            <View>
              <Text style={{ ...Fonts.black16Regular, alignSelf: "center" }}>
                Choose City
              </Text>
              {cityList.map((city) => (
                <TouchableOpacity
                  key={city}
                  onPress={() => {
                    setCity(city);
                    refRBSheet.current.close();
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.black16Regular,
                      marginVertical: Sizes.fixPadding,
                    }}
                  >
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </RBSheet>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Ionicons name="location-sharp" size={16} color={Colors.bumbleYellow} style={{marginLeft: -5.0 }}/>
            <Text style={{ ...Fonts.black16Regular, marginLeft: 9.0 }}>
              {city}
            </Text>
          </View>
        </TouchableOpacity>
        <Ionicons
          name="notifications"
          size={20}
          color={Colors.primary}
          onPress={() => navigation.navigate("Notification")}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} backgroundColor="rgba(0,0,0,0)" />
      <FlatList
        // ListHeaderComponent={
        //   <>
        //     {header()}
        //     {search()}
        //     {newlyLanched()}
        //     {title({ title: "Find doctor by speciality" })}
        //     {specialists()}
        //     {viewAll()}
        //     {basicInsurance()}
        //     {standardInsurance()}
        //     {premiumInsurance()}
        //     {pharma()}
        //     {pharmacyBanner()}
        //     {/* {disease()} */}
        //   </>
          
        // }
        // data={users}
        // keyExtractor={(item) => `${item.key}`}
        // listKey={(item) => item.key}
        // key={users.key}
        // numColumns={2}
        // renderItem={renderItem}
        // showsVerticalScrollIndicator={false}
      />
    <View>
    <ScrollView>
      {header()}
      {search()}
      {newlyLanched()}
      {title({ title: "Find doctor by speciality" })}
      {specialists()}
      {viewAll()}
      {basicInsurance()}
      {standardInsurance()}
      {premiumInsurance()}
      {pharma()}
      {pharmacyBanner()}
      {pharmasList()}
      {disease()}
      {diseasesList()}
      {aidnCureBanner()}
      {instantRelief()}
      {coughBanner()}
      {aidnCureViewAll()}
    </ScrollView>
    </View>
    {/* <FlatList
        data={users}
        keyExtractor={(item) => `${item.key}`}
        listKey={(item) => item.key}
        key={users.key}
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
    /> */}
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10.0,
    marginHorizontal: 20.0,
  },
  searchStyle: {
    height: 50.0,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: "center",
    // borderRadius: Sizes.fixPadding - 3.0,
    flexDirection: "row",
    // paddingLeft: 6,
    marginTop: -5,
    marginVertical:-5,
    marginHorizontal: 17.0,
    // paddingBottom:-15
  },
  viewAllStyle: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent:'center',
    marginHorizontal: Sizes.fixPadding * 1.5,
    // marginVertical: Sizes.fixPadding,
    marginTop:-10,
    marginBottom:10
  },
  aidnCureViewAll: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    marginHorizontal: Sizes.fixPadding * 1.5,
    // marginVertical: Sizes.fixPadding,
    marginTop:1,
    marginBottom:10,
    borderWidth:1,
    height:30,
    borderRadius:30,
    borderColor:Colors.primary,
    // width:300
  },
  callNowButtonStyle: {
    width: 80.0,
    height: 40.0,
    borderColor: Colors.primary,
    borderRadius: Sizes.fixPadding,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 10.0,
  },
  labAndCheckUpContainer: {
    // flexDirection: "row",
    // height: 200.0,
    width:150,
    marginLeft:35,
    // paddingRight:100,
    // alignSelf: "center",
    // justifyContent:'center',
    borderRadius:8,
    backgroundColor: "white",
    borderColor: Colors.lightGray,
    borderWidth: 1,
    shadowColor: '#eee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20.0,
    overflow: "hidden",
  },
  labInformationContainer: {
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    width: width - 220,
    marginTop: Sizes.fixPadding + 5.0,
  },
  specialistInfoContainer: {
    height: 160.0,
    // width: 200.0,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
    borderColor: Colors.lightGray,
    // borderWidth: 1.0,
    marginHorizontal: 10.0,
    marginVertical: 10.0,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    // elevation: 5.0,
  },
  diseaseInfoContainer: {
    flexDirection:'row',
    height: 120.0,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
    // borderColor: Colors.lightGray,
    // borderWidth: 1.0,
    marginHorizontal: 9.0,
    marginVertical: 8.0,
    marginTop:-10,
    paddingLeft:5,
    // padding:8,
    // borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,  
    // elevation: 2.0,
  },
});

export default HomeScreen;
