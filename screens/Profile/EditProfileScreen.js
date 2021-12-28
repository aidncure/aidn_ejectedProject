import React, { useState , useEffect} from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather } from "@expo/vector-icons";
import Dialog from "react-native-dialog";
import { Dimensions } from "react-native";
import { BottomSheet, ListItem, Button, colors } from "react-native-elements";
import { Avatar } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons";
import { submitUser } from "../../apiServices";
import {Auth, database} from '../../firebase';
import ProfileEditScreen from "./profileAddScreen";
// import fetchUser from '../../apiServices'
import { fetchUser, newUser } from "../../apiServices";
import ProfileScreen from "./ProfileScreen";
// import { Item } from "react-native-paper/lib/typescript/components/List/List";

// import { auth } from "../../firebase";
import {firebase, auth, db, firestore} from '../../firebase';

import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get("screen");
 

const EditProfileScreen = ({ navigation }) => {


  
  // const [Id, setId] = useState();  
  // const [test, setTest] = useState('');  
  // const [fullNameDialog, setFullnameDialog] = useState(false);
  // const [fullName, setFullName] = useState("");
  // const [changeText, setChangeText] = useState(fullName);
  
  // const [passwordDialog, setPasswordDialog] = useState(false);
  // const [password, setPassword] = useState("");
  // const [changePassword, setChangePassword] = useState(password);
  
  // const [phoneDialog, setPhoneDialog] = useState(false);
  // const [phone, setPhone] = useState("");
  // const [changePhone, setChangePhone] = useState(phone);
  
  // const [emialDialog, setEmailDialog] = useState(false);
  // const [email, setEmail] = useState("");
  // const [changeEmail, setChangeEmail] = useState(email);
  
    const [isBottomSheet, setIsBottomSheet] = useState(false);
    // const [fullName , setFullName] = useState([]);
    // const [gender , setGender] = useState([]);
    // const [age , setAge] = useState([]);
    // const [occupation , setOccupation] = useState([]);
    // const [from , setFrom] = useState([]);
    // const [isLoading , setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    // console.log(userData);
    // alert();
    const [pickedImagePath, setPickedImagePath] = useState('');
    // const [userProfileImg, setUserProfileImg ] = useState('../../assets/imagesvtr/buddy-97.png');

  

    const userDataUrl = "https://aidnpro-7c2db-default-rtdb.firebaseio.com/newUsers.json" 

    // useEffect(() => {
    //  fetch(userDataUrl)
    //  .then((response)=>response.json())
    //  .then((json) => setUserData(json))
    //  .catch((error) => console.log(error))
    //  .finally(() => setLoading(false));
    // },[]);
    // console.log(userData);

    // userData.map=(item,id) => {
    //   {item.fullName}
    // }
    

    useEffect(() => {
      const userData = firebase.auth().currentUser;
      db.collection('users' + userData.uid).onSnapshot((querySnapshot)=>{
        const users = [];
        querySnapshot.docs.forEach((doc)=>{
          const {name,gender,age,occupation,from, email} = doc.data();
          users.push({
            id:userData.uid,
            name,
            gender,
            age,
            occupation,
            from,
            email: userData.email,
          });
        });
        setUsers(users);
      });
    },[]);
    console.log(users);

  //   const genderHadler = () =>{

  //   if(users.gender !== 'Male'){
  //     <Avatar
  //       rounded
  //       source={require("../../assets/imagesvtr/icons8-id-brunette-girl-100.png")}
  //     />
  //   }else{
  //      <Avatar
  //       rounded
  //       source={require("../../assets/imagesvtr/icons8-id-male-student-100.png")}
  //     />
  //   }

  // }

  // const saveUsers = () => {
  //   submitUser(Id, fullName, phone, email, test)
  //     .then((result) => {
  //       setId(null);
  //       setFullName('');
  //       setPhone('');
  //       setEmail('');
  //       setTest('');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // console.log(submitUser, 'data passed?')


  
  // const userData = () => {
  //     useEffect(() => {
  //   const fetchUser = async () => {
  //   const response = await fetch('https://aidnpro-7c2db-default-rtdb.firebaseio.com/newUsers.json');
  //   const resData = await response.json();
  //   console.log(resData);
  //   }}, [])

  //   }



// This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }


  function backArrowAndSave() {
    return (
      <View style={styles.backArrowAndSaveContainerStyle}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('UserProfile')}
          // onPress={() => navigation.navigate('UserEditNow')}
          // onPress={saveUsers}
        >
          <Text style={{ ...Fonts.primaryColor17Bold }}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function profilePhoto() {
    return (
      <View style={styles.photoContainerStyle}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Avatar
            rounded
            // source={require('../../assets/imagesvtr/buddy-97.png') ? {uri:pickedImagePath}:null}
            source={{uri:pickedImagePath}}
            style={{
              height: 80,
              width: 80,
              borderRadius:50,
              borderWidth:1,
              borderColor:Colors.bumbleYellow
            }}
            resizeMode="cover"
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsBottomSheet(true)}
            // onPress={showImagePicker}
            style={styles.addPhotoContainerStyle}
          >
            <Ionicons name="ios-add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function formData({ title, value }) {
    return (
      <View style={styles.formDataContainerStyle}
        onPress={()=>navigation.navigate('EditProfileNow')}
      >
        <View style={{ width: width / 3.0 }}>
          <Text style={{ ...Fonts.gray16Regular }}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: width / 1.85,
          }}
        >
          <Text style={{ ...Fonts.black16Regular }}>{value}</Text>
          <Feather name="chevron-right" size={24} color={Colors.lightGray} />
        </View>
      </View>
    );
  }

  function editFullNameDialog() {
    return (
      <Dialog.Container
        // visible={fullNameDialog}
        // onPress={()=>navigation.navigate('ProfileEditScreen')}
        contentStyle={styles.dialogContainerStyle}
      >
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...Fonts.black18Bold,
              paddingBottom: Sizes.fixPadding * 3.0,
            }}
          >
            Change FullName
          </Text>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1.0,
              width: "100%",
            }}
          >
            <TextInput
              value={changeText}
              onChangeText={(text) => setChangeText(text)}
              style={{
                ...Fonts.black18Regular,
                paddingBottom: Sizes.fixPadding,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              // onPress={() => setFullnameDialog(false)}
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.black20Regular }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                // setFullnameDialog(false);
                // setFullName(changeText);
                saveUsers
              }}
              style={styles.okButtonStyle}
            >
              <Text style={{ ...Fonts.white20Regular }}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }

  function editPasswordDialog() {
    const [color, setColor] = useState(false);

    return (
      <Dialog.Container
        visible={passwordDialog}
        contentStyle={styles.dialogContainerStyle}
      >
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...Fonts.black18Bold,
              paddingBottom: Sizes.fixPadding * 3.0,
            }}
          >
            Change Your Password
          </Text>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
              width: "100%",
            }}
          >
            <TextInput
              style={{
                ...Fonts.black18Regular,
                paddingBottom: Sizes.fixPadding,
              }}
              placeholder="Old Password"
              secureTextEntry={true}
            />
          </View>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
              width: "100%",
              marginTop: Sizes.fixPadding,
            }}
          >
            <TextInput
              onChangeText={(value) => setChangePassword(value)}
              style={{
                ...Fonts.black18Regular,
                paddingBottom: Sizes.fixPadding,
              }}
              placeholder="New Password"
              secureTextEntry={true}
            />
          </View>
          <View
            style={{
              borderBottomColor: color ? "blue" : "gray",
              borderBottomWidth: 0.5,
              width: "100%",
              marginTop: Sizes.fixPadding,
            }}
          >
          <TextInput placeholder="test here" onChangeText={(text)=>setTest(text)}/>
          <Text>Okay</Text>
            <TextInput
              style={{
                ...Fonts.black18Regular,
                paddingBottom: Sizes.fixPadding,
              }}
              placeholder="Confirm New Password"
              secureTextEntry={true}
              onFocus={() => setColor(true)}
              onEndEditing={() => setColor(false)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setPasswordDialog(false)}
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.black20Regular }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setPasswordDialog(false);
                setPassword(changePassword);
              }}
              style={styles.okButtonStyle}
            >
              <Text style={{ ...Fonts.white20Regular }}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }

  function editPhoneDialog() {
    return (
      <Dialog.Container
        visible={phoneDialog}
        contentStyle={styles.dialogContainerStyle}
      >
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...Fonts.black18Bold,
              paddingBottom: Sizes.fixPadding * 3.0,
            }}
          >
            Change Phone Number
          </Text>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1.0,
              width: "100%",
            }}
          >
            <TextInput
              value={changePhone}
              onChangeText={(value) => setChangePhone(value)}
              style={{
                ...Fonts.black18Regular,
                paddingBottom: Sizes.fixPadding,
              }}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20.0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setPhoneDialog(false)}
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.black20Regular }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setPhoneDialog(false);
                setPhone(changePhone);
              
              }}
              style={styles.okButtonStyle}
            >
              <Text style={{ ...Fonts.white20Regular }}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }

  function editEmailDialog() {
    return (
      <Dialog.Container
        visible={emialDialog}
        contentStyle={styles.dialogContainerStyle}
      >
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...Fonts.black18Bold,
              paddingBottom: Sizes.fixPadding * 3.0,
            }}
          >
            Change Email
          </Text>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1.0,
              width: "100%",
            }}
          >
            <TextInput
              value={changeEmail}
              onChangeText={(value) => setChangeEmail(value)}
              style={{
                ...Fonts.black18Regular,
                paddingBottom: Sizes.fixPadding,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setEmailDialog(false)}
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.black20Regular }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setEmailDialog(false);
                setEmail(changeEmail);
                saveUsers
              }}
              style={styles.okButtonStyle}
            >
              <Text style={{ ...Fonts.white20Regular }}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }
  
  function showBottomSheet() {

  //   const initialemail = () => {
  //   {auth.currentUser?.email}
  // }
    return (
      <BottomSheet
        isVisible={isBottomSheet}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.50, 0, 0.50)" }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsBottomSheet(false)}
          style={styles.bottomSheetStyle}
        >
           <View>
            <Text
              style={{
                ...Fonts.black20Bold,
                textAlign: "center",
                marginBottom: Sizes.fixPadding * 2.0,
                paddingRight:20
              }}
            >
            Choose Option
          </Text>
           </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="ios-camera" size={20} color="#4C4C4C" />
            <Text
              style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding }}
              onPress={openCamera}
            >
              Camera
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", marginTop: Sizes.fixPadding * 2.0 }}
          >
            {
            pickedImagePath !== '' && <Image
              source={{ uri: pickedImagePath }}
              style={styles.image}
            />
            }
            <MaterialIcons name="photo-album" size={20} color="#4C4C4C" />
            <Text
              style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding }}
              onPress={showImagePicker}
            >
              Upload from Gallery
            </Text>
          </View>
        </TouchableOpacity>
      </BottomSheet>

    );
  }


  return (
    
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
    
      <StatusBar backgroundColor={Colors.dodgerBlue} />
      {backArrowAndSave()}
      {profilePhoto()}

      

      {users.map((user) => {
        return(
        <View
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserEditNow", {
                userId: user.id,
              });
            }}
          >
            {/* <ListItem.Chevron /> */}
            {/* <Avatar
              source={require("../../assets/imagesvtr/buddy-97.png")}
              rounded
            /> */}
            {/* <ListItem.Content>
              <ListItem.Title  style={{ ...Fonts.black24Bold}}>
                <Text>
                  {'Hello, '}
                </Text>
                {user.name}
              </ListItem.Title>
              <ListItem.Subtitle>{user.gender}</ListItem.Subtitle>
            </ListItem.Content> */}
            {/* <View style={styles.userNameContainer}>
                <Text style={styles.userName}>
                {'Hello, '}
                {user.name}
                </Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.details}>
                  {'Gender: '}
                </Text>
              </View>
              <View style={styles.userGenderInfo}>
                <Text style={styles.userGender}>{user.gender}</Text>
              </View> */}
                <View style={styles.greeting}>
                  <Text style={{ ...Fonts.orangeColorBold18Bold, marginLeft:10}}>Hey Hooman!! Howya doin today?</Text>
                </View>
                <ListItem>
                <View>
                  <View style={{paddingBottom:12}}>
                  <Avatar source={require("../../assets/imagesvtr/icons8-id-male-student-100.png")} 
                  style={{
                  height: 50,
                  width: 50,
                  }}/>
                  </View>
                  <View style={{paddingBottom:12}}>
                  <Avatar source={require("../../assets/imagesvtr/icons8-id-male-student-100.png")} 
                  style={{
                  height: 50,
                  width: 50,
                  }}/>
                 </View>
                  <View >
                  <Avatar source={require("../../assets/imagesvtr/icons8-id-male-student-100.png")} 
                  style={{
                  height: 50,
                  width: 50,
                  }}/>
                 </View>
                </View>
                  <ListItem.Content>
                    <ListItem.Title style={{ ...Fonts.black20Bold}}>{user.name}</ListItem.Title>
                    <ListItem.Subtitle style={{ ...Fonts.black12Bold, borderBottomWidth:1, borderBottomColor:"#eee", paddingBottom:8,paddingTop:8, width:'100%'}}>{user.gender}</ListItem.Subtitle>
                  {/* Secondary List */}
                    <ListItem.Title style={{ ...Fonts.black20Bold,paddingTop:8}}>{user.occupation}</ListItem.Title>
                    <ListItem.Subtitle style={{ ...Fonts.black12Bold,borderBottomWidth:1,width:'100%',borderBottomColor:"#eee",paddingBottom:8,paddingTop:8}}>{user.age}</ListItem.Subtitle>
                    {/* Third List */}
                    <ListItem.Title style={{ ...Fonts.black20Bold,paddingTop:8}}>{user.from}</ListItem.Title>
                    <ListItem.Subtitle style={{ ...Fonts.black12Bold,borderBottomWidth:1,width:'100%',borderBottomColor:"#eee",paddingBottom:8,paddingTop:8}}>{user.email}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
                 <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text onPress={() => navigation.navigate('Home')} style={{ ...Fonts.orangeColorBold18Bold, paddingLeft:10}}><Icon
                      name="arrow-left"
                      size={15}
                      color='orange'
                    />  Jump to Home</Text>
                 </View>
          </View>
        )
      })}

      {/* {isLoading ?( <ActivityIndicator/>) :(
        <FlatList
          data = {userData}
          keyExtractor={({id},index)=>id}
          renderItem={({data})=>(
            <Text style={{alignItems:"center", justifyContent:"center"}}>
              {data.age}
            </Text>
          )}
        />
      )}
       */}

      {/* <FlatList
        data = {userData}
        keyExtractor = {({id},index)=>id}
        renderItem = {({datauser})=>(
          <Text style={{alignItems:"center", justifyContent:"center"}}>
            {datauser.fullName}
          </Text>
        )}
      /> */}
       {/* <View style={styles.backArrowAndSaveContainerStyle}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
        //   color={Colors.dodgerBlue}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
      </View> */}
      {/* <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.nameContainer}>

          <TextInput
            // placeholderTextColor= {Colors.dodgerBlue}
            // placeholder='Full name'
            // value={fullName}
            // onChangeText={(text) => setfullName(text)}
            style={{ ...Fonts.black24Bold}}
            />
      </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            // placeholderTextColor= {Colors.dodgerBlue}
            placeholderTextColor= {Colors.dodgerBlue}
            placeholder='Gender'
            value={gender}
            onChangeText={(text) => setGender(text)}
            // autoCompleteType = {'email'}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            // placeholderTextColor= {Colors.dodgerBlue}
            placeholderTextColor= {Colors.dodgerBlue}
            placeholder='Age'
            value={age}
            onChangeText={(text) => setAge(text)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            // placeholderTextColor= {Colors.dodgerBlue}
            placeholderTextColor= {Colors.dodgerBlue} 
            placeholder='Occupation'
            onChangeText={(text) => setOccupation(text)}
            value={occupation}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            // placeholderTextColor= {Colors.dodgerBlue}
            placeholderTextColor= {Colors.dodgerBlue} 
            placeholder='Where are you from?'
            onChangeText={(text) => setFrom(text)}
            value={from}
            />
      </View>
      </TouchableWithoutFeedback>
      <View style={styles.buttonMain}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={fetchUser}
      >
      <View>
        <View style={styles.buttonContainer}>
        <Text style={{  ...Fonts.white16Regular, color:'#fff' }}>Save</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View> */}
      {/* <View style={styles.buttonMain}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={fetchUser}
      >
      <View>
        <View style={styles.buttonContainer}>
        <Text style={{ ...Fonts.white16Bold, color:'#000' }}>Let's Change</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View> */}
      {/* <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => {
        //   setFullnameDialog(true);
        //   setChangeText(fullName);
        //   // navigation.navigate('ProfileEditScreen')
        // }}
        onPress={()=>navigation.navigate('EditProfileNow')}
      >
        {formData({ title: "Full Name", value: fullName })}
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => {
        //   setPasswordDialog(true);
        //   setChangePassword(password);
        // }}
        onPress={()=>navigation.navigate('EditProfileNow')}
      >
        {formData({ title: "Password", value: "******" })}
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => {
        //   setChangePhone(phone);
        //   setPhoneDialog(true);
        // }}
        onPress={()=>navigation.navigate('EditProfileNow')}
      >
        {formData({ title: "Phone", value: phone })}
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => {
        //   setChangeEmail(email);
        //   setEmailDialog(true);
        // }}
        onPress={()=>navigation.navigate('EditProfileNow')}
      >
        {formData({ title: "Email", value:email })}
      </TouchableOpacity> */}
      {/* {editFullNameDialog()}
      {editPasswordDialog()}
      {editPhoneDialog()}
      {editEmailDialog()} */}
      {showBottomSheet()}
    </View>
  );
};

const styles = StyleSheet.create({
  backArrowAndSaveContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: Sizes.fixPadding * 2.0,
    marginRight: Sizes.fixPadding,
    marginTop: Sizes.fixPadding + 5.0,
  },
  addPhotoContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "white",
    // borderWidth: 1.0,
    backgroundColor: Colors.dodgerBlue,
    height: 25.0,
    width: 25.0,
    borderRadius: 50,
    position: "absolute",
    bottom: 5.0,
    right: -11.0,
  },
  photoContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    marginRight:15,
    // marginRight:280,
    marginBottom: Sizes.fixPadding * 3.0,
  },
  formDataContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: Sizes.fixPadding - 5.0,
    height: 65.0,
    borderColor: "#F6F6F6",
    elevation: 1,
    marginHorizontal: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding + 5.0,
    borderWidth: 1.0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
  },
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 90,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  cancelButtonStyle: {
    flex: 0.5,
    backgroundColor: Colors.lightGray,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
    marginRight: Sizes.fixPadding + 5.0,
  },
  okButtonStyle: {
    flex: 0.5,
    backgroundColor: Colors.primary,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Sizes.fixPadding + 5.0,
  },
  bottomSheetStyle: {
    backgroundColor: "white",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 2.0,
  },
  // mainContainer:{
  //       flex:1,
  //       backgroundColor:Colors.dodgerBlue
  //   },
    backArrowAndSaveContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: Sizes.fixPadding * 2.0,
    marginRight: Sizes.fixPadding,
    marginTop: Sizes.fixPadding + 15.0,
  },
  greeting:{
    alignItems:'center',
    justifyContent:'center',
    marginVertical:5,
    marginLeft:18,
    color:Colors.dodgerBlue
  },
  nameContainer:{
    // color:'#fff',
    color:Colors.dodgerBlue,
    // borderBottomColor:Colors.dodgerBlue,
    paddingLeft:22,
    // borderBottomColor:"#fff",
    marginLeft:100,
    // marginRight: Sizes.fixPadding,
    marginTop:-88,
    // borderColor:'red',
    // borderWidth:1,
    // marginVertical:-100,
    // borderBottomWidth:1,
    width:"100%"
    
  },
  emailContainer:{
    // color:'#fff',
    color:Colors.dodgerBlue,
    borderBottomColor:Colors.dodgerBlue,
    paddingLeft:5,
    // borderBottomColor:"#fff",
    marginLeft: Sizes.fixPadding * 5.0,
    marginRight: Sizes.fixPadding,
    marginTop:50,
    borderBottomWidth:1,
    width:"80%" ,
    // fontSize:Fonts.white20Bold
    // fontSize:
  },
   buttonContainer:{
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 10.0,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: Sizes.fixPadding * 5.0,
    backgroundColor:Colors.dodgerBlue,
    width:102,
    // ...Fonts.primaryColor17Bold
    // marginHorizontal:92
  },
  buttonMain:{
      alignItems:'center',
      justifyContent:'center',
      marginTop:50,
  },
  details:{
    // flexDirection:'column'
    // marginLeft: 30,
    ...Fonts.black18Regular,
    // marginTop:30,
    // marginVertical:300
    // marginRight:200,
    // borderWidth:1,
    // borderColor:'red',
    // textAlign:'right',
    // width:'100%'
   
  },
  userGender:{
    // flexDirection:'column'
    // marginRight: 300,
    ...Fonts.black18Regular,
    textAlign:'right'
    // alignSelf: 'flex-end'
    // marginTop:30,
    // marginVertical:300
    // marginRight:200,
    // borderWidth:1,
    // borderColor:'red',
    // textAlign:'right',
    // width:'100%'
   
  },
  userInfo:{
    // flexDirection:'column'
    // justifyContent:'space-between',
    marginLeft: 30,
    
    ...Fonts.black18Regular,
    borderBottomWidth:1,
    borderColor:'#eee',
    textAlign:'right',
    // backgroundColor:"#eee",
    width:'90%',
    marginTop:30
  },
  userGenderInfo:{
    // flexDirection:'column'
    // justifyContent:'space-between',
    marginLeft: '30%',

    // marginHorizontal:100,
    ...Fonts.black18Regular,
    //  borderWidth:1,
    //  borderLeftWidth:1,
    borderColor:'#eee',
    textAlign:'right',
    width:100,
    marginTop:-26,
    // textAlign:'right' 
  },
  userName:{
    // flexDirection:'column',
    // marginLeft: 100,
      alignItems:'center',
      justifyContent:'center',
    ...Fonts.black24Bold,
    borderBottomWidth:2,
    borderBottomColor:Colors.bumbleYellow
  },
  userNameContainer:{
    // flexDirection:'column',
    // marginLeft: 100,
      alignItems:'center',
      justifyContent:'center',
    ...Fonts.black24Bold,
    // borderBottomWidth:1,
    // borderBottomColor:'red'
  },
   image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  },
   
});

EditProfileScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default EditProfileScreen;
