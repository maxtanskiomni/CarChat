import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

import Router from '../navigation/Router';

import {UserStore,SettingsStore} from '../stores';

import { firebase } from '../utilities/firebase_api';

import {observer} from 'mobx-react';
import {observable} from 'mobx';

import { MonoText } from '../components/StyledText';

@observer
export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings',
      backgroundColor: '#365488',
      tintColor: '#fff',
      visible: true,
    },
  };

  @observable first_name = UserStore.user_data.first_name;
  @observable last_name = UserStore.user_data.last_name;
  @observable email = UserStore.user_data.email;
  @observable phone_num = UserStore.user_data.phone_num;


  logout = () =>{
    let method = () => {this.props.navigation.getNavigator(UserStore.correct_navigator).immediatelyResetStack([Router.getRoute('login')], 0)};
    firebase.signOut(method);

  }

  updatePreference(data){
    firebase.updateFB('settings', SettingsStore.firebase_key, data);
  }

  updateUser(data){
    //firebase.updateFB('users', UserStore.firebase_key, data);
  }

  phoneMasker(e){
    e = e.replace(/([\(||\)|| ||-])/g,'');

    if((e.length>14 || e.indexOf(',')>-1 || e.indexOf('*')>-1 || e.indexOf('#')>-1 || e.indexOf('+')>-1 || e.indexOf(';')>-1)){
      return
    }

    let areacode = e.substr(0, 3);
    let first3 = e.substring(3, 6);
    let last4 = e.slice(6, 10);

    if(areacode && e.length>3){
      areacode = '('+areacode+') ';
    }

    if(last4){
      last4 = '-'+last4;
    }

    let phone_num = areacode+first3+last4;

    this.phone_num = phone_num;
  }

  render() {
    const settings =SettingsStore.settings;
    var on = (<Image source={require('../assets/icons/check-outline.png')} style={{height:30,width:30,tintColor:'#83a1d5'}} />);
    var off = (<Image source={require('../assets/icons/outline.png')} style={{height:30,width:30,tintColor:'#83a1d5'}} />);

    return (
      <View style={styles.container}>

        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.scrollView}>

          <View style={{height:160, backgroundColor:'#365488',justifyContent:'center', alignItems:'center',}}>
            <TouchableOpacity style={{height:108,width:108,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../assets/icons/avatar_holder.png')} style={{height:108,width:108}} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <TouchableOpacity style={styles.rowButton}>
              <TextInput
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                style={styles.input}
                value={this.first_name}
                autoCapitalize={'none'}
                onEndEditing={(e)=>this.updateUser({first_name: e})}
                placeholderTextColor={'#000000'}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton}>
              <TextInput
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                style={styles.input}
                value={this.last_name}
                autoCapitalize={'none'}
                onEndEditing={(e)=>this.updateUser({last_name: e})}
                placeholderTextColor={'#000000'}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton}>
              <TextInput
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                style={styles.input}
                keyboardType={'phone-pad'}
                value={this.phone_num}
                autoCapitalize={'none'}
                onChangeText={(e)=>this.phoneMasker(e)}
                onEndEditing={(e)=>this.updateUser({phone_num: e})}
                placeholderTextColor={'#000000'}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton}>
              <TextInput
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                style={styles.input}
                keyboardType={'email-address'}
                value={this.email}
                autoCapitalize={'none'}
                onEndEditing={(e)=>this.updateUser({email: e})}
                placeholderTextColor={'#000000'}/>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>

            <TouchableOpacity style={styles.rowButton} onPress={()=>this.updatePreference({push_notifs: !settings.push_notifs})}>
              <Text style={styles.buttonText}>Push notifications</Text>
              <View />
              <View style={{backgroundColor:'#fff',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid'}}>
                {settings.push_notifs ? on : off}
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton} onPress={()=>this.updatePreference({shop_notifs: !settings.shop_notifs})}>
              <Text style={styles.buttonText}>Shop/Dealer notifications</Text>
              <View />
              <View style={{backgroundColor:'#fff',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid'}}>
                {settings.shop_notifs  ? on : off}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>

            <TouchableOpacity style={styles.rowButton} onPress={()=>this.updatePreference({location_share: !settings.location_share})}>
              <Text style={styles.buttonText}>Allow location share</Text>
              <View />
              <View style={{backgroundColor:'#fff',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid'}}>
                {settings.location_share  ? on : off}
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton} onPress={()=>this.updatePreference({arrival_notifs: !settings.arrival_notifs})}>
              <Text style={styles.buttonText}>Arrival alerts</Text>
              <View />
              <View style={{backgroundColor:'#fff',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid'}}>
                {settings.arrival_notifs  ? on : off}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Car Reports</Text>

            <TouchableOpacity style={styles.rowButton} onPress={()=>this.updatePreference({car_reports: !settings.car_reports})}>
              <Text style={styles.buttonText}>Share car reports</Text>
              <View />
              <View style={{backgroundColor:'#fff',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid'}}>
                {settings.car_reports  ? on : off}
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton} onPress={()=>this.updatePreference({auto_reports: !settings.auto_reports})}>
              <Text style={styles.buttonText}>Auto update car status</Text>
              <View />
              <View style={{backgroundColor:'#fff',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid'}}>
                {settings.auto_reports  ? on : off}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Sign Out</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#EDEDED",
    flex: 1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },

  scrollView: {
    flex:1,
		width:window.width
  },

	sectionTitle:{
    color:'#4A4A4A',
    fontSize:16,
		textAlign:'left',
		width:'100%',
		padding:5,
    fontFamily:'quicksand',
	},

	section:{
		width:'100%',
		flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
		borderBottomWidth:0,
		borderColor:'#abddc7',
		borderStyle:'solid',
		padding:10,
	},

	rowButton:{
		width:'100%',
		height:54,
		flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
		backgroundColor:'#fff',
		marginBottom:5
	},

  button:{
    height:54,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    marginBottom:8,
    width: '100%',
  },

  buttonText:{
		color:'#000',
		paddingLeft:15,
    fontSize:15,
    fontFamily:'quicksand-bold',
  },

  buttonThemeText:{
    color:'#365488',
    paddingLeft:15,
    fontSize:15,
    fontFamily:'quicksand-bold',
  },

  input:{
    height:45,
    paddingLeft:15,
    fontFamily:'quicksand-bold',
    backgroundColor:'#fff',
    marginBottom:2,
    color:'#000000',
    width:'100%',
    fontSize:15
  },
});
