import React,{useState} from "react";
import CalendarStrip from "react-native-calendar-strip";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  LogBox
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import {firebase, auth, firestore} from '../../firebase';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";




const morningSlots = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
];

const afternoonSlots = [
  "12:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
];

const eveningSlots = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30"];

const { width } = Dimensions.get("screen");

const TimeSlotScreen = ({ navigation }) => {
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  const image = navigation.getParam("image");
  const name = navigation.getParam("name");
  const experience = navigation.getParam("experience");
  const type = navigation.getParam("type");
  const rating = navigation.getParam("rating");
  const datesBlacklistFunction = navigation.getParam("datesBlacklist")

  const [selectedSlot, setSelectedSlot] = React.useState("");

  const [book, setBook] = React.useState(false);



   const [booking, setBooking] = useState ({
      // nonOnlineBookings: 'Book appointment',
      // onlineBookings: 'Video Consultation',
      uid:' ',
      key:'',
      // date:'',
      // timeSelected,
  });

   const userData = firebase.auth().currentUser;
    const db = firebase.firestore()
  const saveTimeSlot = async () => {
      await db.collection('users').doc('Appointments Booked' + userData.uid).set({
      // nonOnlineBookings:booking.nonOnlineBookings,
      uid:userData.uid,
      key:Math.random(),
      date: new Date().toUTCString(),
      timeSelected : selectedSlot + '  /  ' + 'Users choice of time',
      Doctor_name:name,
      User_Booking_Date : new Date().toDateString(),
      // id:key      
    })
    // .then(()=>setSelectedSlot(`${item} ${time}`))
  } 
  const handleUsersTime = async () => {
    await db.collection('users').doc('Appointments Booked' + userData.uid).set({
    // onlineBookings:booking.onlineBookings,
    uid:userData.uid,
    Doctor_name:name,
    key:Math.random(),
    date: new Date().toUTCString(),   
    timeSelected : selectedSlot + '  /  ' + 'Users choice of time',
    User_Booking_Date : new Date().toDateString(),
    }).then(() => navigation.navigate("Consultation"))
  }


  function doctorInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <View style={styles.doctorImageContainerStyle}>
          <Image
            source={image}
            resizeMode="contain"
            style={{
              height: 90.0,
              width: 90.0,
              borderRadius: 45.0,
            }}
          />
        </View>
        <View style={{ justifyContent: "center", marginTop: Sizes.fixPadding }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width - 140.0,
            }}
          >
            <View style={{ width: width / 3.0 }}>
              <Text style={{ ...Fonts.black16Bold }}>{name}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DoctorProfile", {
                  image,
                  name,
                  type,
                  rating,
                  experience,
                  datesBlacklistFunction,
                })
              }
            >
              <Text style={{ ...Fonts.primaryColor13Bold }}>View Profile</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              ...Fonts.gray17Regular,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            {type}
          </Text>
          <Text
            style={{
              ...Fonts.primaryColor16Regular,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            {experience} Years Experience
          </Text>
          <Text
            style={{ ...Fonts.black20Bold, marginTop: Sizes.fixPadding - 2.0 }}
          >
            $39
          </Text>
        </View>
      </View>
    );
  }

  function slotsInfo({ image, data }) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Image
          source={image}
          style={{ height: 40.0, width: 40.0 }}
          resizeMode="contain"
        />
        <Text style={{ ...Fonts.black18Bold, marginLeft: Sizes.fixPadding }}>
          {data.length} Slots
        </Text>
      </View>
    );
  }

  function slotsTime({ slots, time }) {
    const renderItem = ({ item }) => {
      return (
        <TouchableWithoutFeedback
        onPress={saveTimeSlot}
        >
        <TouchableOpacity
          onPress={() => {
            setSelectedSlot(`${item} ${time}`);
            setBook(true);
          }}
        >
          <View
            style={{
              backgroundColor:
                selectedSlot == `${item} ${time}` ? Colors.primary : "white",
              borderColor:
                selectedSlot == `${item} ${time}` ? Colors.primary : "#CDCDCD",
              ...styles.slotContainerStyle,
            }}
          >
            <Text
              style={
                selectedSlot == `${item} ${time}`
                  ? { ...Fonts.white16Regular }
                  : { ...Fonts.primaryColor16Regular }
              }
            >
              {item} {time}
            </Text>
          </View>
        </TouchableOpacity>
        </TouchableWithoutFeedback>
      );
    };

    return (
      <View>
        <FlatList
          data={slots}
          keyExtractor={(index) => `${index}`}
          renderItem={renderItem}
          scrollEnabled={false}
          numColumns={3}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedSlot(`${item} PM`);
          setBook(true);
        }}
      >
        <View
          style={{
            backgroundColor:
              selectedSlot == `${item} PM` ? Colors.primary : "white",
            borderColor:
              selectedSlot == `${item} PM` ? Colors.primary : "#CDCDCD",
            ...styles.slotContainerStyle,
          }}
        >
          <Text
            style={
              selectedSlot == `${item} PM`
                ? { ...Fonts.white16Regular }
                : { ...Fonts.primaryColor16Regular }
            }
          >
            {item} PM
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  function bookingInfo() {
    return book ? (
      <View style={styles.bookNowContainerStyle}>
      <TouchableWithoutFeedback
      onPress={handleUsersTime}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Consultation", {
              image,
              name,
              experience,
              type,
              selectedSlot,
              rating,
              datesBlacklistFunction,
            })
          }
        >
          <View style={styles.bookButtonStyle}>
            <Text style={{ ...Fonts.white20Regular }}>Book now</Text>
          </View>
        </TouchableOpacity>
      </TouchableWithoutFeedback>
      </View>
    ) : null;
  }

  const datesBlacklistFunc = (date) => {
    return date.isoWeekday() === 7;
  };

  function calendar() {
    //const result=await <CalendarStrip/>
    return (
      <View>
        <TouchableWithoutFeedback
        // onPress={saveTimeSlot}
        >
          <View style={{}}>
          <CalendarStrip
            style={{
              height: 100,
              paddingTop: Sizes.fixPadding * 2.0,
              paddingBottom: Sizes.fixPadding,
            }}
            highlightDateContainerStyle={{
              backgroundColor: Colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
            dateNumberStyle={{ color: "black", fontSize: 17.0 }}
            dateNameStyle={{ color: "black", fontSize: 15.0 }}
            highlightDateNameStyle={{ color: "white", fontSize: 15.0 }}
            highlightDateNumberStyle={{ color: "white", fontSize: 17.0 }}
            datesBlacklist={datesBlacklistFunc}
            disabledDateOpacity={0.6}
            disabledDateNameStyle={{ color: "gray", fontSize: 15.0 }}
            disabledDateNumberStyle={{ color: "gray", fontSize: 17.0 }}
            useIsoWeekday={false}
            scrollable={true}
            upperCaseDays={false}
            styleWeekend={true}
          />
        </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function divider() {
    return <View style={styles.dividerStyle}></View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="rgba(0,0,0,0)" />
      {
        <View style={{ flex: 1 }}>
          {doctorInfo()}
          {calendar()}
          {divider()}
          <FlatList
            ListHeaderComponent={
              <>
                {slotsInfo({
                  image: require("../../assets/images/icons/sunrise.png"),
                  data: morningSlots,
                })}
                {slotsTime({ slots: morningSlots, time: "AM" })}
                {slotsInfo({
                  image: require("../../assets/images/icons/sun.png"),
                  data: afternoonSlots,
                })}
              </>
            }
            data={afternoonSlots}
            renderItem={renderItem}
            keyExtractor={(index) => `${index}`}
            numColumns={3}
            ListFooterComponent={
              <>
                {slotsInfo({
                  image: require("../../assets/images/icons/sun-night.png"),
                  data: eveningSlots,
                })}
                {slotsTime({ slots: eveningSlots, time: "PM" })}
              </>
            }
            contentContainerStyle={{
              paddingHorizontal: Sizes.fixPadding,
              paddingBottom: book
                ? Sizes.fixPadding * 8.0
                : Sizes.fixPadding * 2.0,
            }}
          />
          {bookingInfo()}
        </View>
      }
    </View>
  );
};

TimeSlotScreen.navigationOptions = {
  title: "Time Slots",
  headerTitleStyle: {
    ...Fonts.black16Regular,
    marginLeft: -Sizes.fixPadding * 2.0,
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
};

const styles = StyleSheet.create({
  doctorImageContainerStyle: {
    height: 90.0,
    width: 90.0,
    borderRadius: 45.0,
    backgroundColor: "white",
    borderColor: "#B3BCFC",
    borderWidth: 1.0,
    marginRight: Sizes.fixPadding,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 20.0,
    overflow: "hidden",
  },
  slotContainerStyle: {
    alignItems: "center",
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    marginBottom: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    borderWidth: 1.0,
    marginRight: Sizes.fixPadding * 2.0,
    height: 45.0,
    width: 100.0,
  },
  bookButtonStyle: {
    backgroundColor: Colors.primary,
    paddingVertical: Sizes.fixPadding + 3.0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding + 5.0,
  },
  bookNowContainerStyle: {
    backgroundColor: "white",
    height: 75.0,
    position: "absolute",
    bottom: 0.0,
    width: "100%",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
  },
  dividerStyle: {
    backgroundColor: Colors.lightGray,
    height: 0.9,
    width: "100%",
    marginBottom: Sizes.fixPadding,
  },
});

export default TimeSlotScreen;
