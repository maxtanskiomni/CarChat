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

import AddButton from '../components/AddButton';

import Router from '../navigation/Router';

import {CarsStore,UserStore} from '../stores';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

import {observer} from 'mobx-react';
import {observable} from 'mobx';

import { MonoText } from '../components/StyledText';

@observer
export default class GarageScreen extends React.Component {
   static route = {
    navigationBar: {
      title: 'Garage',
      backgroundColor: '#365488',
      tintColor: '#fff',
      visible: true,
      renderRight: () => <AddButton/>,
    },
  };

  render() {

    var navigation = this.props.navigator;

    let garage = CarsStore.cars.map((car,idx) => {
      return(<TouchableOpacity key={idx} style={styles.rowButton} onPress={()=>navigation.push('car', {car: car, idx: idx})}>
        <View style={{backgroundColor:'#fff',height:76,width:76,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
          <Image source={{uri: car.image}} style={{height:76,width:76}} />
        </View>
          <View style={{flexDirection:'column'}}>
            <Text style={[styles.buttonText]}>{car.year} {car.make} {car.model}</Text>
            <Text style={[styles.buttonText,{fontFamily:'quicksand'}]}>Last update: {car.last_update}</Text>
          </View>
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

          <View style={styles.section}>
            {garage}
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
		height:76,
		flexDirection:'row',
    justifyContent:'flex-start',
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
