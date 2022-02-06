import firebaseConfig from './firebase'
// import * as firebase from 'firebase'
import {firebase, auth, db, firestore} from './firebase';
import 'firebase/firestore'

class Fire {
    constructor() {
        if (!firebase.apps.length) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
        }
    }

    uploadPhotoAsync = async uri => {
        const path = `usersH_d/${Date.now()}.jpg`
        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()
            let upload = firebase.storage().ref(path).put(file)
            upload.on('state_changed', snapshot => {

            }, err => {
                rej(err)
            }, async () => {
                const url = await upload.snapshot.ref.getDownloadURL()
                res(url)
            })
        })

    }
    addPhoto = async (localUri) => {
        const useruid = firebase.auth().currentUser
        const remoteUri = await this.uploadPhotoAsync(localUri)
        return new Promise((res,rej)=>{
            firebase.database().ref('/usersH_d').push({
                timestamp:this.timestamp,
                image:remoteUri,
                uid:useruid.uid
            })
            this.firestore.collection('usersProfile').doc('user'+ useruid.uid).update({
                timestamp:this.timestamp,
                image:remoteUri,
                uid:useruid.uid
            })
            .then(ref=>{
                res(ref)
            })
            .catch(err=>{
                rej(err)
            })
        })
    }

    get firestore() {
        return firebase.firestore()
    }

    get timestamp() {
        return Date.now()
    }
}

Fire.shared = new Fire()
export default Fire;