import {http, baseURL} from './index'
import { extendObservable, observable, action } from 'mobx'
import { firebase } from '../utilities/firebase_api'

class SettingsStore {

  @observable loadingSettings = false;

  @observable firebase_key = null;

  @observable settings = {location_autodetect:true, facebook_checkin:true, push_notifs:true, location_notifs:true};

  @action get(){
    this.loadingSettings = true;
    firebase.getUserSettings();
    debugger
  }

  @action post() {
    debugger
  }

}

var store = new SettingsStore()

export default store
