import React from 'react';
import Modal from 'react-native-simple-modal';

import {observer} from 'mobx-react';
import {action, runInAction,observable} from 'mobx';

import {UserStore} from '../stores';

import { TextInput, TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';

import Router from '../navigation/Router';
import { firebase } from '../utilities/firebase_api'

@observer
export default class LoginScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  constructor (props) {
    super(props);
    this.checkIfUserExists = this.checkIfUserExists.bind(this);
  }

  @observable email = 'maxx.a.tanski@gmail.com'
  @observable password = ''
  @observable modalOpen = false;

  checkIfUserExists () {
    //debugger
  }

  focusNextField (nextField) {
    this.refs[nextField].focus()
  }

  login = () => {
    let method = () => {this.props.navigation.getNavigator(UserStore.correct_navigator).immediatelyResetStack([Router.getRoute('rootNavigation')], 0)};
    firebase.signIn(this, method);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.titleView}>
          <Text style={styles.title}>login</Text>
        </View>

        <View style={styles.fieldsView}>
          <TextInput
            onBlur={this.checkIfUserExists}
            underlineColorAndroid={'transparent'}
            autoCorrect={false}
            style={styles.input}
            placeholder={'Email'}
            returnKeyType={'next'}
            autoCapitalize={'none'}
            placeholderTextColor={'#83a1d5'}
            keyboardType={'email-address'}
            onChangeText={e => this.email = e}
            blurOnSubmit={false}
            onSubmitEditing={() => this.focusNextField('PasswordInput')} />

          <TextInput
            ref={'PasswordInput'}
            underlineColorAndroid={'transparent'}
            autoCorrect={false}
            style={styles.input}
            secureTextEntry={true}
            returnKeyType={'go'}
            autoCapitalize={'none'}
            placeholder={'Password'}
            placeholderTextColor={'#83a1d5'}
            onChangeText={e => this.password = e} />
        </View>

        <View style={styles.buttonsView}>

          <TouchableOpacity disabled={false} style={styles.loginButton} onPress={this.login} >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotButton} onPress={()=> this.props.navigator.push('forgot')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createButton} onPress={()=> this.props.navigator.push('register')}>
            <Text style={styles.createText}>Sign Up</Text>
          </TouchableOpacity>

        </View>

        <Modal
          modalStyle={styles.modal}
          open={this.modalOpen}>

          <View style={styles.modalContent}>
            <Text>The login credentials with this email and password failed.</Text>
            <Text>Please try again.</Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={{flex:1,padding:10,borderRadius:2}} onPress={() => {this.modalOpen = false}}>
              <Text style={{textAlign:'center'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex:1,backgroundColor:'#365488',padding:10,borderRadius:2}}
              onPress={() => {this.modalOpen = false}}>
              <Text style={{textAlign:'center',color:'#eef8f3'}}>Ok</Text>
            </TouchableOpacity>
          </View>

        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#365488",
    flex: 1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    padding:'10%',
  },

  titleView:{
    flex:0.7,
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    color:'#fff',
    fontSize:100,
    textAlign:'center',
    width:'100%',
    backgroundColor:'transparent'
  },

  fieldsView:{
    width:'100%',
    maxWidth:350,
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  input:{
    height:45,
    padding:10,
    fontFamily:'quicksand',
    backgroundColor:'#eef8f3',
    marginBottom:2,
    color:'#365488',
    width:'100%',
    fontSize:18
  },

  buttonsView:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    padding:10
  },
  loginButton:{
    borderWidth:2,
    borderColor:'#ecf0f1',
    borderStyle:'solid',
    alignItems:'center',
    width:'100%',
    backgroundColor:'transparent'
  },
  loginText:{
    fontFamily:'quicksand-bold',
    paddingLeft:40,
    paddingRight:40,
    paddingTop:10,
    paddingBottom:10,
    color:'#ecf0f1',
    fontSize:20,
  },
  forgotButton:{
    alignItems:'center',
    marginTop:10,
    backgroundColor:'transparent'
  },
  forgotText:{
    fontFamily:'quicksand',
    padding:20,
    color:'#ecf0f1',
    fontSize:20,
  },
  createButton:{
    alignItems:'center',
    backgroundColor:'transparent'
  },
  createText:{
    fontFamily:'quicksand',
    padding:20,
    color:'#ecf0f1',
    fontSize:20,
  },
  modal:{
    padding:0,
  },
  modalContent:{
    padding:20,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  modalButtons:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end'
  },
});
