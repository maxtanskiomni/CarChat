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

import {UserStore,CarsStore} from '../stores';
import { firebase } from '../utilities/firebase_api';

import {observer} from 'mobx-react';
import {observable} from 'mobx';

import { MonoText } from '../components/StyledText';

@observer
export default class SettingsScreen extends React.Component {

  @observable user_prof = this.props.route.params.user_prof
  @observable cars = [];

  static route = {
    navigationBar: {
      title: 'Profile',
      backgroundColor: '#365488',
      tintColor: '#fff',
      visible: true,
    },
  };

  componentWillMount(){
    firebase.carsRef.orderByChild('owner')
    .equalTo(this.user_prof.email)
    .once('value', (snapshot) => {
      cars = snapshot.val();
      if(!cars){
        return
      }
      var cars_array = Object.values(cars);
      this.cars = cars_array;

      firebase.getDTCs(this.cars);
    });
  }

  render() {
    var on = (<Image source={require('../assets/icons/check-outline.png')} style={{height:30,width:30,tintColor:'#83a1d5'}} />);
    var off = (<Image source={require('../assets/icons/outline.png')} style={{height:30,width:30,tintColor:'#83a1d5'}} />);

    var navigation = this.props.navigator;
    var garage= false;

    if(this.cars){
     garage = this.cars.map((car,idx) => {
        return(<TouchableOpacity key={idx} style={styles.carButton} onPress={()=>navigation.push('car', {car: car, idx: idx})}>
          <View style={{backgroundColor:'#fff',height:76,width:76,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
            <Image source={require('../assets/icons/avatar_holder.png')} style={{height:76,width:76}} />
          </View>
            <View style={{flexDirection:'column'}}>
              <Text style={[styles.buttonText]}>{car.year} {car.make} {car.model}</Text>
              <Text style={[styles.buttonText,{fontFamily:'quicksand'}]}>Last update: {car.last_update}</Text>
            </View>
          <View />
        </TouchableOpacity>
        );
      });
    }

    let garage_section = <View/>;
    if(garage){
      garage_section = (<View style={styles.section}>
        <Text style={styles.sectionTitle}>Cars</Text>
        {garage}
      </View>);
      }

    let shop = <View/>
    if(this.user_prof.organization){
        shop = (<TouchableOpacity style={styles.rowButton}>
          <TextInput
            underlineColorAndroid={'transparent'}
            autoCorrect={false}
            style={styles.input}
            keyboardType={'email-address'}
            value={this.user_prof.organization}
            autoCapitalize={'none'}
            editable={false}
            placeholderTextColor={'#000000'}/>
        </TouchableOpacity>)
        }

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
                value={this.user_prof.first_name}
                autoCapitalize={'none'}
                editable={false}
                placeholderTextColor={'#000000'}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton}>
              <TextInput
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                style={styles.input}
                value={this.user_prof.last_name}
                autoCapitalize={'none'}
                editable={false}
                placeholderTextColor={'#000000'}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton}>
              <TextInput
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                style={styles.input}
                keyboardType={'phone-pad'}
                value={this.user_prof.phone_num}
                autoCapitalize={'none'}
                editable={false}
                placeholderTextColor={'#000000'}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton}>
              <TextInput
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                style={styles.input}
                keyboardType={'email-address'}
                value={this.user_prof.email}
                autoCapitalize={'none'}
                editable={false}
                placeholderTextColor={'#000000'}/>
            </TouchableOpacity>
            {shop}
          </View>

          <View style={styles.section}>

            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Text</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Assign to car</Text>
            </TouchableOpacity>
          </View>

          {garage_section}

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

  rowButton:{
    width:'100%',
    height:76,
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
