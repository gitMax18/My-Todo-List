import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

  // Initialize Firebase----------------------------------------------------

var firebaseConfig = {
    apiKey: "AIzaSyCttjBFdMK56I1pVZ5HHmhCZavPm7CUPHw",
    authDomain: "my-todo-app-e6296.firebaseapp.com",
    projectId: "my-todo-app-e6296",
    storageBucket: "my-todo-app-e6296.appspot.com",
    messagingSenderId: "227302059038",
    appId: "1:227302059038:web:6773f2ffdb41c69b2d920f"
  };

  firebase.initializeApp(firebaseConfig);

  // fonction de gestion de l'authentification de firebase ------------------------------

  export const createNewUser = (email, password) => {
      return new Promise((resolve, reject)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => resolve(user))
        .catch((error) => reject(error));
      })
    }

    export const signUpUser = (email, password)=>{
        return new Promise((resolve, reject)=>{
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => resolve(user))
            .catch((error) => reject(error));
        })
    }

    export const logOutUser = ()=> {
      return firebase.auth().signOut()
       .then(()=>{
           console.log("user déconnecter");
       })
       .catch(error=>{
           console.log(error);
       })
    }

    export const reinitializePwd = (email) => {
      return new Promise((resolve, reject)=>{
        firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
          return resolve("Un email vous a été envoyé")
        }).catch(function(error) {
          return reject(error)
        });
      })
    }

    // Fonction de gestion de la base de donnée firetore

    const db = firebase.firestore()

    export const addData = (userId, object)=>{
      db.collection("users").doc(userId).collection("Todos").doc(Object.keys(object)[0]).set(object)
    .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }

    export const deleteData = (userId,todoId) =>{
      db.collection("users").doc(userId).collection("Todos").doc(todoId).delete()
      .then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }

    export const getData = (userId) => {
      return new Promise((resolve, reject)=>{
        db.collection("users").doc(userId).collection("Todos").get()
        .then(function(querySnapshot) {
          let Todos = {}
          querySnapshot.forEach(function(doc) {
            Todos = {...Todos, ...doc.data()}
          });
         return resolve(Todos)
      });
      })
    }

    export default firebase;

    