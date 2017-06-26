import {http, baseURL} from './index'
import { extendObservable, observable, action } from 'mobx'
import { firebase } from '../utilities/firebase_api'

class DTCStore {

  @observable loadingDTCs = false;

  //{accountNumber:1, bank:'Bank of America'},{accountNumber:2, bank:'Wells Fargo'}
  @observable DTCs = {};

  @action get(){
    this.loadingDTCs = true;
    firebase.getDTCs();
    debugger
  }

  @action post() {
    debugger
  }

}

var store = new DTCStore()

export default store
