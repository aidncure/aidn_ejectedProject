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
  // Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import RBSheet from "react-native-raw-bottom-sheet";
import {firebase, auth, db, firestore} from '../../firebase';
import { fonts } from "react-native-elements/dist/config";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");


const UsersProfileScreen = ({ navigation }) => {

  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace("Welcome")
    })
    .catch(error => alert(error.message))
  }

    useEffect(() => {
      const userData = firebase.auth().currentUser;
      db.collection('users' + userData.uid).onSnapshot((querySnapshot)=>{
        const users = [];
        querySnapshot.docs.forEach((doc)=>{
          const {name,gender,age,occupation,from, email,blood,emergency,phone} = doc.data();
          users.push({
            id:userData.uid,
            name,
            gender,
            age,
            occupation,
            from,
            email: userData.email,
            blood,
            emergency,
            phone,
          });
        });
        setUsers(users);
      });
    },[]);
    console.log(users);

    // const user_profile = async() =>{
//     useEffect(() => {
//     const users = []
//     fetch('https://aidn.in/api/login',{
//         method:'POST',
//         headers:{
//         'Accept':'application/json',
//         'Content-Type':'application/json'
//         },
//         // body:JSON.stringify({"email":Email, "password":Password})
//     }).then(res => res.json())
//     .then(resData => {
//         users.push({
//             // name,
//             // gender,
//             // age,
//             resData
//         })
//         setUsers(users)
//         if((resData.msg === 'successfully login')){
//         // navigation.navigate('BottomTabScreen')
//         console.log(resData.name)
//         setUsers(resData)
//         // {handleHome}
//         }else{
//         Alert.alert(JSON.stringify(resData));
//         // Alert.alert('Invalid email or password');
//         }
//     });
// },[]);
// }

    function profileData (){
        return(
            <View>
                {users.map((user, key) => {
                    return(
                       <View>
                            <View
                            key={(key)}
                            bottomDivider
                            onPress={() => {
                            props.navigation.navigate("UserEditNow", {
                            // userId: user.id,
                            });
                            }}
                        >
                        </View>
                        {/* Users details code executed */}
                     {/*User Full Name  */}
                    <View style={{
                    marginVertical:150,
                    marginHorizontal:40,
                    // borderWidth:1,
                    height:25,
                    paddingLeft:6
                    }}>
                   
                    <Text
                    style={{
                    ...Fonts.black15Bold,
                    color:"gray"
                     }}>
                    Name :
                    </Text>
                    <View
                    style={{
                    marginVertical:-20,
                    marginHorizontal:80,
                    // borderWidth:1,
                }}
                    >
                        <Text
                        style={{
                    ...Fonts.black15Bold
                     }}
                        // >{user.name}</Text>
                        >{user.name}</Text>
                    </View>
                </View>
                {/* User Gender */}
                <View style={{
                    marginVertical:-145,
                    marginHorizontal:40,
                    // borderWidth:1,
                    height:25,
                    paddingLeft:6
                }}>
                    <Text
                    style={{
                    ...Fonts.black15Bold,
                    color:"gray"
                     }}>
                    Gender :
                    </Text>
                    <View
                    style={{
                    marginVertical:-20,
                    marginHorizontal:80
                }}
                    >
                        <Text
                        style={{
                    ...Fonts.black15Bold
                     }}
                        >{user.gender}</Text>
                    </View>
                </View>
                {/* User Age */}
                <View style={{
                    marginVertical:160,
                    marginHorizontal:40,
                    height:25,
                    paddingLeft:6
                    }}>
                    <Text
                    style={{
                    ...Fonts.black15Bold,
                    color:"gray"
                    }}>
                    DOB / Age :
                    </Text>
                    <View
                    style={{
                    marginVertical:-20,
                    marginHorizontal:100,
                    // paddingLeft:-60
                    }}
                    >
                    <Text
                        style={{
                    ...Fonts.black15Bold
                    }}
                    >{user.age} years</Text>
                    </View>
                </View>
                {/* User Emergency Number */}
                <View style={{
                    marginVertical:-145,
                    marginHorizontal:40,
                    height:25,
                    paddingLeft:6
                    }}>
                    <Text
                    style={{
                    ...Fonts.black15Bold,
                    color:"gray"
                    }}>
                    Phone Number :
                    </Text>
                    <View
                    style={{
                    marginVertical:-20,
                    marginHorizontal:130,
                    width:'100%',
                    }}
                    >
                    <Text
                        style={{
                    ...Fonts.black15Bold
                     }}
                        >{user.phone}</Text>
                    </View>
                </View>
                {/* User Email Id */}
                <View style={{
                    marginVertical:160,
                    marginHorizontal:40,
                    height:25,
                    paddingLeft:6
                }}>
                    <Text
                    style={{
                    ...Fonts.black15Bold,
                    color:"gray"
                     }}>
                    Email :
                    </Text>
                      <View
                    style={{
                    marginVertical:-20,
                    marginHorizontal:80,
                    width:'100%'
                }}
                    >
                        <Text
                        style={{
                    ...Fonts.black15Bold
                     }}
                        >{user.email}</Text>
                    </View>
                </View>
                {/* User Blood Group */}
                <View style={{
                    marginVertical:-145,
                    marginHorizontal:40,
                    height:25,
                    paddingLeft:6
                }}>
                    <Text
                    style={{
                    ...Fonts.black15Bold,
                    color:"gray"
                     }}>
                    Blood Group :
                    </Text>
                       <View
                    style={{
                    marginVertical:-20,
                    marginHorizontal:110,
                    width:'100%'
                }}
                    >
                        <Text
                        style={{
                    ...Fonts.black15Bold
                     }}
                        >{user.blood}</Text>
                    </View>
                </View>
                {/* User nominee or Emergency Number */}
                <View style={{
                    marginVertical:160,
                    marginHorizontal:40,
                    height:25,
                    paddingLeft:6
                }}>
                    <Text
                    style={{
                    ...Fonts.black15Bold,
                    color:"gray"
                     }}>
                    Emergency number :
                    </Text>
                       <View
                    style={{
                    marginVertical:-20,
                    marginHorizontal:150,
                    width:'100%'
                }}
                    >
                        <Text
                        style={{
                    ...Fonts.black15Bold
                     }}
                        >{user.emergency}</Text>
                    </View>
                </View>
                {/* User location */}
                <View style={{
                    marginVertical:-145,
                    marginHorizontal:40,
                    height:25,
                    paddingLeft:6
                }}>
                    <Text
                    style={{
                    ...Fonts.black15Bold,
                    color:"gray"
                     }}>
                    Location :
                    </Text>
                       <View
                    style={{
                    marginVertical:-20,
                    marginHorizontal:80,
                    width:'100%'
                }}
                    >
                        <Text
                        style={{
                    ...Fonts.black15Bold
                     }}
                        >{user.from}</Text>
                    </View>
                </View>
                {/* User Occuptaion */}
                <View style={{
                    marginVertical:178,
                    marginHorizontal:40,
                    height:25,
                    paddingLeft:6
                }}>
                    <Text
                    style={{
                    ...Fonts.black15Bold,
                    color:"gray"
                     }}>
                    Occupation :
                    </Text>
                       <View
                    style={{
                    marginVertical:-20,
                    marginHorizontal:80,
                    width:'100%',
                    paddingLeft:13
                }}
                    >
                        <Text
                        style={{
                    ...Fonts.black15Bold
                     }}
                        >{user.occupation}</Text>
                    </View>
                </View>
                </View>
                    )
                })}
            </View>

        )
    }

    return(
      <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.topContainer}>
            <View style={styles.backArrowAndSaveContainerStyle}>
                <Ionicons
                name="arrow-back-outline"
                size={24}
                color='#FFF'
                onPress={() => navigation.goBack()}
                />
            </View>
             <View style={styles.cog}
                onPress={() => navigation.navigate('UserEditNow')}
             >
               <Ionicons
                name="settings-outline"
                size={30}
                color="#fff"
                onPress={() => navigation.navigate('UserEditNow')}
                />  
            </View>
        </View>
            <View style={styles.bottomProfileContainer}>

                {/* Settings Container */}

                {/* <View style={styles.imageContainer}> */}
                <Image source={require('../../assets/imagesvtr/buddy-97.png')}
                style={styles.imageContainer}
                />
                {/* </View> */}
                {profileData()}
            </View>
           <TouchableWithoutFeedback
           onPress={handleLogout}
           >
                <TouchableOpacity>
                 <View style={{
                 alignItems:'center',
                 justifyContent:'center',
                 backgroundColor:Colors.primary,
                 width:'50%',
                 marginHorizontal:100,
                 height:40,
                 borderRadius:100,
                 marginVertical:60
             }}
             onPress={handleLogout}
             >
                <Text
                    style={{
                        ...Fonts.white17Bold
                    }}
                    // onPress={handleLogout}
                >Logout</Text>
                </View>
            </TouchableOpacity>
           </TouchableWithoutFeedback>
      </SafeAreaView>
    )
}
UsersProfileScreen.navigationOptions = () => {
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
      backgroundColor:Colors.primary,
  },
  bottomProfileContainer:{
      width:'100%',
      height:'72%',
      marginVertical:-100,
      borderTopLeftRadius:90,
      backgroundColor:"#fff",
  },
  imageContainer:{
      width:200,
      height:200,
       marginVertical:-120,
      marginHorizontal:110,
      borderRadius:100,
      backgroundColor:"#fff",
      borderWidth:2,
      borderColor:'#fff',
  },
  cog:{
     width:35,
     marginHorizontal:355,
     marginTop:-23,
     alignItems:'center',
     justifyContent:'center'
  },
  logout:{
     width:35,
     marginHorizontal:350,
     marginTop:40
  }
})
export default UsersProfileScreen;