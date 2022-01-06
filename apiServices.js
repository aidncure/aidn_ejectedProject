import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
// import database from './firebase';
// import firebase from './firebase'
// import { getDatabase, ref, onValue, set } from 'firebase/database';

export const handleLogin = async() =>{
  // const [Email , setEmail] = useState('')
  // const [Password , setPassword] = useState('')
  await fetch('https://aidn.in/api/login',{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify({"email":Email, "password":Password})
  }).then(res => res.json())
  .then(resData => {
    
    if(resData.msg === 'successfully login'){
     navigation.navigate('BottomTabScreen')
     Shredpref.setitm("token",resData["token"])
     Shredpref.setitm("email",Email )
     Shredpref.setitm("password",Password)
      console.log(resData)
      {handleHome}
    }else{
      // Alert.alert(JSON.stringify(resData));
      Alert.alert('Invalid email or password');
    }
  });
  const handleHome = () =>{
  navigation.navigate('Home')
  }
}
// }

// export const newUser = () => {
//   export default function newUser (Id, fullName, gender, age, occupation, from){
//   const db = getDatabase();
//   const reference = ref(db, 'users/' + Id);
//   set(reference, {
//     Id: key,
//     FullName: fullName,
//     Gender:gender,
//     Age:age,
//     Occupation:occupation,
//     From:from
//   });
// }
// }

// export const writeUserData = async (Id, fullName, gender, age, occupation, from) => {
//   const db = await getDatabase();
//   set(ref(db, 'users/' + Id), {
//         FullName: fullName,
//         Gender:gender,
//         Age:age,
//         Occupation:occupation,
//         From:from
//   });
// }

 export const newUser = async (fullName, gender, age, occupation, from) => {
   const response = await fetch('https://aidnpro-7c2db-default-rtdb.firebaseio.com/newUsers.json', {
   method: 'POST',
   Headers:{
     'Content-Type' : 'application/json'
   },
   body: JSON.stringify({
    fullName,
    gender, 
    age, 
    occupation, 
    from
   })
   });
   const resData = await response.json();
   console.log(resData);
}
export const fetchUser = async () => {
    const userDataUrl = "https://aidnpro-7c2db-default-rtdb.firebaseio.com/newUsers.json"

    useEffect(() => {
     fetch(userDataUrl)
     .then((response)=>response.json())
     .then((json) => {
      setUserData(json);
      console.log(json)
      // setFullName(json.fullName);
    })
     .catch((error) => alert(error))
    //  .finally(setLoading(false))
    },[]);
}