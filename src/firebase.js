import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBXQssJrIHK5J3RknndM6S6vJOovRwSTt4",
    authDomain: "slack-c6b4d.firebaseapp.com",
    databaseURL: "https://slack-c6b4d.firebaseio.com",
    projectId: "slack-c6b4d",
    storageBucket: "slack-c6b4d.appspot.com",
    messagingSenderId: "855722941330",
    appId: "1:855722941330:web:d04472e456bf325e03bf4b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();

  export const signinWithGoogle=()=>{
      const googleProvider=new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(googleProvider);
  };

  export const createOrGetUserProfileDocument=async(user)=>{
    if (!user) {
        return null;
    }
    const UserRef=firestore.doc(`users/${user.uid}`);
    const snapshot=await UserRef.get();

    if(!snapshot.exists){
        const{displayName,email,photoURL}=user;
        
        try {
            const user={
                display_name:displayName,
                email,
                photo_url:photoURL,
                created_at:new Date()
            };
            await UserRef.set(user)
        } catch (error) {
            console.log("Error", error)
        }
    }

    return GetUserDocument(user.uid);
  }

  export const SignOut=()=>{
      auth.signOut();
  }

  export const GetUserDocument=async (uid)=>{
    if (!uid) {
        return null;
    }

    try {
        const UserDocument=await firestore.collection('users').doc(uid);
        return UserDocument;
    } catch (error) {
        console.log(error.message)
    }
  }