
import Expo from 'expo';
import * as fb from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDKqIvmH6RtSW620Kq-3UCatGFdNJXaYOI",
  authDomain: "carchar-81ed2.firebaseapp.com",
  databaseURL: "https://carchar-81ed2.firebaseio.com",
  projectId: "carchar-81ed2",
  storageBucket: "carchar-81ed2.appspot.com",
  messagingSenderId: "770547282980"
  };
const firebaseApp = fb.initializeApp(firebaseConfig);

import {CarsStore,UserStore,DTCStore,SettingsStore} from '../stores';

class FirebaseAPI{
  constructor(){
    this.firebaseApp = firebaseApp;
    this.database = firebaseApp.database();
    this.usersRef = this.database.ref('users');
    this.carsRef = this.database.ref('cars');
    this.dtcsRef = this.database.ref('dtcs');
    this.settingsRef = this.database.ref('settings');
    this.auth = firebaseApp.auth();
  }

//Firebase Auth methods and observers
  register(email, password){
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
     .catch(function (err) {
       console.log(err)
     });
   }

   sendPasswordReset(email){
     firebaseApp.auth().sendPasswordResetEmail(email)
      .catch(function (err) {
        console.log(err)
      });
    }

  signIn(page, nav_method){
    firebaseApp.auth().signInWithEmailAndPassword(page.email, page.password)
      .then(nav_method)
      .catch(function(err) {
        console.log(err)
        page.modalOpen = true
      });
   }

  signOut(nav_method){
    firebaseApp.auth().signOut()
     .then(nav_method)
     .catch(function (err) {
       console.log(err)
     });
  }

  addAuthObserver(){
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        UserStore.user = user; // user is undefined if no user signed in
        UserStore.logged_in= true;
        UserStore.correct_navigator = 'root';
        UserStore.get();
        CarsStore.get();
        SettingsStore.get();

      }else{
        UserStore.user = null;
        UserStore.correct_navigator = 'login';
        UserStore.logged_in= false;
      }

      UserStore.checker = true;
    });;
  }

//Facebook login
  // async function logInwithFB(method) {
  //   const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
  //     '456672234679672', {
  //       permissions: ['public_profile'],
  //     });
  //   if (type === 'success') {
  //     // Get the user's name using Facebook's Graph API
  //     const response = await fetch(
  //       'https://graph.facebook.com/me?access_token=${token}');
  //       global.user = (await response.json())};
  //   }
  //
  //   method
  // }

//Firebase Database methods
  getUsers(parent){
    this.usersRef.orderByKey()
    .on('value', (users) => {
      parent.setState({users: users});
    });
  }

  getCurrentUser(){
    this.usersRef.orderByChild('email')
    .equalTo(UserStore.user.email)
    .on('value', (snapshot) => {
      user = snapshot.val();
      if(!user){
        return
      }
      snapshot.forEach(function(data) {
        UserStore.firebase_key = data.key;
      });

      var user_array = Object.values(user);
      UserStore.user_data = user_array[0];
      console.log(UserStore.user_data)
      UserStore.loadingUsers = false;
    });
  }

  getUserCars(){
    this.carsRef.orderByChild('owner')
    .equalTo(UserStore.user.email)
    .on('value', (snapshot) => {
      cars = snapshot.val();
      console.log(cars);
      if(!cars){
        return
      }
      var cars_array = Object.values(cars);
      CarsStore.cars = cars_array;
      CarsStore.firebase_keys = Object.keys(cars);
      CarsStore.loadingCars = false;

      this.getDTCs(CarsStore.cars);
    });
  }

  getDTCs(cars){
    
    cars.forEach((car, idx) =>{

      if(!car.dtcs){
        return
      }

      let dtcs_array = car.dtcs;

      dtcs_array.forEach((dtc_code, idx) => {
        //console.log(dtc_code)
        this.dtcsRef.orderByChild('code')
        .equalTo(dtc_code)
        .once('value', (snapshot) => {
          dtc_obj = snapshot.val();
          //console.log(dtc_obj);
          if(!dtc_obj){
            return
          }

          DTCStore.DTCs[dtc_code] = dtc_obj[dtc_code];

          //console.log(DTCStore.DTCs);

        });
      });
    });
    DTCStore.loadingDTCs = false;
  }

  getUserSettings(){
    this.settingsRef.orderByChild('user')
    .equalTo(UserStore.user.email)
    .on('value', (snapshot) => {
      settings = snapshot.val();
      if(!settings){
        return
      }
      snapshot.forEach(function(data) {
        SettingsStore.firebase_key = data.key;
      });

      var settings_array = Object.values(settings)
      SettingsStore.settings = settings_array[0];
      SettingsStore.loadingSettings = false;
    });
  }

  insertFB(table, data){
    if(['users', 'accounts', 'transactions', 'preferences', 'subscriptions'].indexOf(table)<0){
      console.log('incorrect table reference')
      return
    }
    var newKey = this.database.ref().child(table).push().key;
    this.database.ref(table + '/' + newKey).set(data);
    return newKey;
  }

  updateFB(table, key, updateObject){
    if(['users', 'cars', 'dtcs', 'settings'].indexOf(table)<0){
      console.log('incorrect table reference')
      return
    }
    this.database.ref(table + '/' + key).update(updateObject);
  }

  deleteRecord(table, key) {
    if(['users', 'accounts', 'transactions', 'subscriptions'].indexOf(table)<0){
      console.log('incorrect table reference')
      return
    }
    this.database.ref(table + '/' + key).remove();
  }
}

export let firebase = new FirebaseAPI()
