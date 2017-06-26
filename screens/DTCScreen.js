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
export default class DTCScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Problem Insector',
      backgroundColor: '#365488',
      tintColor: '#fff',
      visible: true,
    },
  };

  render() {
    const idx = this.props.route.params.idx;
    const dtc = this.props.route.params.dtc;
    var urgent = (<Image source={require('../assets/icons/check-outline.png')} style={{height:30,width:30,tintColor:'#83a1d5'}} />);
    var cautionary = (<Image source={require('../assets/icons/outline.png')} style={{height:30,width:30,tintColor:'#83a1d5'}} />);

    var dtc_keys = Object.keys(dtc);

    let dtc_data = dtc_keys.map((key, idx)=>{
      if(key==='code' || key==='name' || key==='status'){
        return
      }
      return (<View style={styles.section}>
        <Text style={styles.sectionTitle}>{key}</Text>

        <View style={styles.rowButton}>
          <Text style={styles.buttonText}>{dtc[key]}</Text>
        </View>
      </View>);
    });

    return (
      <View style={styles.container}>

        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.scrollView}>

          <View style={styles.section}>
            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Call service provider</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={styles.buttonThemeText}>Text service provider</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Code Information</Text>

            <TouchableOpacity style={[styles.rowButton, {height:54}]} onPress={()=>console.log('pressed')}>
              <View style={{backgroundColor:'#365488',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
                <Text style={{fontSize:18,color:'#fff'}}>Code</Text>
              </View>
              <Text style={styles.buttonText}>{dtc.code}</Text>
              <View />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.rowButton, {height:54}]} onPress={()=>console.log('pressed')}>
              <View style={{backgroundColor:'#365488',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
                <Text style={{fontSize:18,color:'#fff'}}>Name</Text>
              </View>
              <Text numberOfLines={2} style={styles.buttonText}>{dtc.name}</Text>
              <View />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.rowButton, {height:54}]} onPress={()=>console.log('pressed')}>
              <View style={{backgroundColor:'#365488',height:54,width:54,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:3,borderColor:'#83a1d5',borderStyle:'solid',}}>
                {dtc.staus === 'urgent' ? ugent : cautionary}
              </View>
              <Text style={styles.buttonText}>Severity: {dtc.status}</Text>
              <View />
            </TouchableOpacity>
          </View>

          {dtc_data}

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
		flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
		backgroundColor:'#fff',
		marginBottom:5,
    paddingTop:5,
    paddingBottom:5,
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
