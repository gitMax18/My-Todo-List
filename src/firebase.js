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
        })
        .catch(function(error) {
          return reject(error)
        });
      })
    }

    // Fonction de gestion de la base de donnée firetore pour Todo

    const db = firebase.firestore()

    export const addDataTodo = (userId, object)=>{
      db.collection("users").doc(userId).collection("Todos").doc(Object.keys(object)[0]).set(object)
    .then(function() {
        console.log("Todos succesfuly written !");
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

    export const getDataTodos = (userId) => {
      return new Promise((resolve)=>{
        db.collection("users").doc(userId).collection("Todos").get()
        .then(function(querySnapshot) {
          let Todos = {}
          querySnapshot.forEach(function(doc) {
            Todos = {...Todos, ...doc.data()}
          })
         return resolve(Todos)
      })
      .catch(()=> console.log("Probleme rencontrer avec la récupération des données"))
      })
    }

    // Fonction de gestion de la base de donnée firetore pour Movie


    export const addDataMovies = (userId, moviesId) =>{
      db.collection("users").doc(userId).collection("Movies").doc("moviesId").set({movies : moviesId})
    .then(function() {
        console.log("MoviesId succesfuly written ");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }

    export const getDataMovies = (userId) => {
      return new Promise((resolve)=>{
        db.collection("users").doc(userId).collection("Movies").doc("moviesId").get()
        .then(function(doc) {
          return resolve(doc.data().movies)
      })
      .catch(()=> console.log("Probleme rencontrer avec la récupération des données"))
      })
    }


    export default firebase;

    