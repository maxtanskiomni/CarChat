import {http, baseURL} from './index'
import { extendObservable, observable, action } from 'mobx'
import { firebase } from '../utilities/firebase_api'

class UserStore {

  correct_navigator = '';

  @observable loadingUser = false;

  @observable checker = false;

  @observable logged_in = false;

  @observable user_data = {};

  @observable user = {
    email:'',
    password:'',
    firstName:'Winston',
    lastName:'Tester',
    deafaultAccount: 0,
  }

  @action get(){
    this.loadingUser = true;
    firebase.getCurrentUser();
    debugger

  }

  @action post() {
    const {user} = this;
    debugger
  }

  @action sendPasswordRetreival(){
    const {user} = this;
    debugger
  }

  @action postNewPassword(password){
    const {user} = this;
    debugger
  }

  @action postNewUser(user) {
    console.log(user)
    debugger

  }

}

var store = new UserStore()

export default store
