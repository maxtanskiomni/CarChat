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

import {CarsStore,UserStore,DTCStore} from '../stores';

import {observer} from 'mobx-react';
import {observable} from 'mobx';

import { MonoText } from '../components/StyledText';

@observer
export default class CarScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Car Report',
      backgroundColor: '#365488',
      tintColor: '#fff',
      visible: true,
    },
  };

  render() {
    const idx = this.props.route.params.idx;
    const car = this.props.route.params.car;
    const dtcs = car.dtcs;
    const dtc_dict = DTCStore.DTCs;
    //console.log(dtc_dict);

    var navigation = this.props.navigator;

    //Need images for each of these
    const urgent = (<Image source={require('../assets/icons/check-outline.png')} style={{height:30,width:30,tintColor:'#83a1d5'}} />);
    const cautionary = (<Image source={require('../assets/icons/outline.png')} style={{height:30,width:30,tintColor:'#83a1d5'}} />);
    const good = (<Image source={require('../assets/icons/outline.png')} style={{height:30,width:30,tintColor:'#83a1d5'}} />);


    let DTCs = dtcs.map((dtc,idx) => {
      return(<TouchableOpacity key={idx} style={styles.rowButton} onPress={()=>navigation.push('dtc', {dtc: dtc_dict[dtc], idx: idx})}>
        <View style={{backgroundColor:'#fff',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
          {dtc_dict[dtc].status === 'urgent' ? urgent : cautionary}
        </View>
          <Text style={styles.buttonText}>{dtc}: {dtc_dict[dtc].name}</Text>
        <View />
      </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>

        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.scrollView}>

          <View style={{height:160, backgroundColor:'#365488',justifyContent:'center', alignItems:'center',}}>
            <TouchableOpacity style={{height:108,width:108,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <Image source={{uri: car.image}} style={{height:108,width:108}} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Car Information</Text>

            <TouchableOpacity style={styles.rowButton} onPress={()=>console.log('pressed')}>
              <View style={{backgroundColor:'#365488',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
                <Text style={{fontSize:16,color:'#fff'}}>Make</Text>
              </View>
              <Text style={styles.buttonText}>{car.make}</Text>
              <View />
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton} onPress={()=>console.log('pressed')}>
              <View style={{backgroundColor:'#365488',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
                <Text style={{fontSize:16,color:'#fff'}}>Model</Text>
              </View>
              <Text style={styles.buttonText}>{car.model}</Text>
              <View />
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton} onPress={()=>console.log('pressed')}>
              <View style={{backgroundColor:'#365488',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
                <Text style={{fontSize:16,color:'#fff'}}>Year</Text>
              </View>
              <Text style={styles.buttonText}>{car.year}</Text>
              <View />
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton} onPress={()=>console.log('pressed')}>
              <View style={{backgroundColor:'#365488',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
                <Text style={{fontSize:16,color:'#fff'}}>Dongle Number</Text>
              </View>
              <Text style={styles.buttonText}>{car.dongle}</Text>
              <View />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Problems Detected</Text>
            {DTCs}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Update Car Report</Text>

            <TouchableOpacity style={styles.rowButton} onPress={()=>console.log('pressed')}>
              <View style={{backgroundColor:'#fff',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
                <Image source={require('../assets/icons/check-outline.png')} style={{height:30,width:30,tintColor:'#83a1d5'}} />
              </View>
              <Text style={styles.buttonText}>Last update: {car.last_update}</Text>
              <View />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Scan car</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Service Provider</Text>

            <TouchableOpacity style={styles.rowButton} onPress={this.logout}>
              <View style={{backgroundColor:'#fff',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
                <Image source={require('../assets/icons/avatar_holder.png')} style={{height:76,width:76}} />
              </View>
              <Text style={styles.buttonText}>{car.service_provider}</Text>
              <View />
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton} onPress={()=>console.log('pressed')}>
              <View style={{backgroundColor:'#365488',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
                <Text style={{fontSize:16,color:'#fff'}}>Shop</Text>
              </View>
              <Text style={styles.buttonText}>{car.dongle}</Text>
              <View />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Text</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Delete car</Text>
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
    paddingBottom:'5%'
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
