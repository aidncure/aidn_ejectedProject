import React, { Component, useEffect } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import database from './firebase';
// import firebase from './firebase'
import { getDatabase, ref, onValue, set } from 'firebase/database';

// export const newUser = (Id, fullName, gender, age, occupation, from) => {
//   return new Promise(function(resolve, reject) {
//     let key;
//     if (Id != null) {
//       key = Id;
//     } else {
//       key = database()
//         .ref()
//         .push().key;
//     }
//     let dataToSave = {
//         Id: key,
//         FullName: fullName,
//         Gender:gender,
//         Age:age,
//         Occupation:occupation,
//         From:from
//     };
//     database()
//       .ref('newUsers/' + key)
//       .update(dataToSave)
//       .then(snapshot => {
//         resolve(snapshot);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
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