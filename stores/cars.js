import {http, baseURL} from './index'
import { extendObservable, observable, action } from 'mobx'
import { firebase } from '../utilities/firebase_api'

class CarsStore {

  @observable loadingCars = false;
  @observable firebase_keys = [];

  @observable cars = [];

  @action get(){
    this.loadingCars = true;
    firebase.getUserCars();

  }

  @action post() {
    debugger
  }

}

var store = new CarsStore();

export default store
