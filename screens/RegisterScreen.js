import React from 'react';
import { TextInput, TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';

import {observer} from 'mobx-react';
import {action, runInAction,observable} from 'mobx';

import { firebase } from '../utilities/firebase_api'

@observer
export default class RegisterScreen extends React.Component {

	@observable firstName = '';
	@observable lastName = '';
	@observable email = '';
	@observable phone_num = '';
	@observable password = '';
  @observable password2 = '';

  @observable passwordIsVisible = false;

  checkIfUserExists () {
    debugger
  }

  focusNextField (nextField) {
    this.refs[nextField].focus()
  }

	createUser = () => {
		firebase.register(this.email, this.password)
		let data = {
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			phone_num: this.phone_num,
		}

		firebase.insertFB('users', data)

		let settings = {
			arrival_notifs: true,
			auto_reports: true,
			car_reports: true,
			location_share: true,
			push_notifs: true,
			shop_notifs: true,
			user: this.email,
		}

		firebase.insertFB('settings', settings)
	}

	phoneMasker(e){
		if((e.length>14 || e.indexOf('.')>-1)){
			return
		}

		let areacode = second.substr(0, 3);
		let first3 = second.substring(3, 6);
		let last4 = second.slice(6, 10);

		if(areacode){
			areacode = '('+areacode+') ';
		}

		if(last4){
			last4 = '-'+last4;
		}

		let phone_num = areacode+first3+last4;

		this.phone_num = phone_num;
	}

  render() {
    const styles = this.props.style;

		const navBack = (
			<TouchableOpacity>
				<Image
					style={{width: 30, height: 30,tintColor:'#fff'}}
					source={require('../assets/icons/arrow_left_white.png')} />
			</TouchableOpacity>
		);

		let passwordVisibilityIcon = (
      <Image
        style={styles.eye}
        source={require('../assets/icons/eye.png')} />
		);

    if (this.passwordIsVisible) {
      passwordVisibilityIcon = (
        <Image
          style={styles.eye}
          source={require('../assets/icons/eye-off.png')} />
      );
    }

    return (
      <View style={styles.container}>

        <View style={{flex:0.3}} />

        <View style={styles.personalInfo}>

          <View style={styles.inputRows}>
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={'First Name'}
              autoCorrect={false}
              style={styles.input}
              returnKeyType={'next'}
              autoCapitalize={'words'}
              onChangeText={e => this.firstName = e}
              placeholderTextColor={'#83a1d5'}
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField('LastNameInput')}
              />
          </View>

          <View style={styles.inputRows}>
            <TextInput
              ref={'LastNameInput'}
              placeholder={'Last Name'}
              autoCorrect={false}
              style={styles.input}
              returnKeyType={'next'}
              autoCapitalize={'words'}
              placeholderTextColor={'#83a1d5'}
              onChangeText={e => this.lastName = e}
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField('PhoneNumInput')} />
          </View>

					<View style={styles.inputRows}>
						<TextInput
							ref={'PhoneNumInput'}
							placeholder={'Phone Number'}
							autoCorrect={false}
							style={styles.input}
							keyboardType={'phone-pad'}
							returnKeyType={'next'}
							autoCapitalize={'words'}
							placeholderTextColor={'#83a1d5'}
							onChangeText={(e) => phoneMasker(e)}
							blurOnSubmit={false}
							onSubmitEditing={() => this.focusNextField('EmailInput')} />
					</View>

          <View style={styles.inputRows}>
            <TextInput
              ref={'EmailInput'}
              placeholder={'Email'}
              onBlur={this.checkIfUserExists}
              autoCorrect={false}
              style={styles.input}
              returnKeyType={'next'}
              autoCapitalize={'none'}
              placeholderTextColor={'#83a1d5'}
              keyboardType={'email-address'}
              onChangeText={e => this.email = e}
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField('PinInput')} />
          </View>

          <View style={styles.inputRows}>
              <TextInput
                ref={'PasswordInput'}
                placeholder={'Password'}
                autoCorrect={false}
                style={styles.input}
                secureTextEntry={!this.passwordIsVisible}
                returnKeyType={'next'}
                autoCapitalize={'none'}
                placeholderTextColor={'#83a1d5'}
                onChangeText={e => this.password = e}
                blurOnSubmit={false}
                onSubmitEditing={() => this.focusNextField('Password2Input')} />

          </View>

          <View style={styles.inputRows}>
              <TextInput
                ref={'Password2Input'}
                placeholder={'Re-enter Password'}
                autoCorrect={false}
                style={styles.input}
                secureTextEntry={!this.passwordIsVisible}
                returnKeyType={'done'}
                autoCapitalize={'none'}
                placeholderTextColor={'#83a1d5'}
                onChangeText={e => this.password2 = e}
                blurOnSubmit={true} />

          </View>

        </View>
{
        // <View style={styles.accounts}>
				//
        //   <TouchableOpacity
        //     style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#4ea981',padding:10,width:150}}
        //     onPress={() => this.passwordIsVisible = !this.passwordIsVisible}>
        //     <Text style={{width:'100%',fontFamily:'quicksand',textAlign:'center',fontSize:18,top:-1,paddingLeft:5,color:'#ddf1e8'}}>Add Account</Text>
        //   </TouchableOpacity>
				//
				//
        // </View>
			}

        <View style={styles.buttonsView}>
          <TouchableOpacity disabled={false} style={styles.finishButton} onPress={this.createUser}>
            <Text style={styles.finishText}>Finish</Text>
          </TouchableOpacity>
        </View>

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
