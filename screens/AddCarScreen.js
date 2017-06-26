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
  Alert,
} from 'react-native';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

import { Constants, BarCodeScanner, Permissions, ImagePicker } from 'expo';
import { firebase } from '../utilities/firebase_api';

import {observer} from 'mobx-react';
import {observable} from 'mobx';

import { MonoText } from '../components/StyledText';

@observer
export default class AddCarScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Add Car',
      backgroundColor: '#365488',
      tintColor: '#fff',
      visible: true,
    },
  };

  state = {
    hasCameraPermission: null
  };

  @observable vin = '';
  @observable dongle = '';
  @observable avatar = (<Image source={require('../assets/icons/avatar_holder.png')} style={{height:108,width:108}} />);
  image_uri='';

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data)
    );

    let bc_data = data.data;
    if(bc_data.length===15){
      this.dongle = bc_data;
    }else if(bc_data.length===17){
      this.vin = bc_data;
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.image_uri = result.uri;
      this.avatar = (<Image source={{uri:result.uri}} style={{height:108,width:108,borderRadius:50,}} />);
    }
  };


  submit = () => {
    update_object = {};
    update_object[this.dongle] = this.vin
    firebase.database.ref('scanners').update(update_object);
    Alert.alert('Success!', 'Your car has been added.');
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>

        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.scrollView}>

          <View style={{height:160, backgroundColor:'#365488',justifyContent:'center', alignItems:'center',}}>
            <TouchableOpacity style={{height:108,width:108,flexDirection:'column',justifyContent:'center',alignItems:'center'}} onPress={this._pickImage}>
              {this.avatar}
            </TouchableOpacity>
          </View>

          <View style={styles.section}>

          {this.state.hasCameraPermission === null ?
            <Text>Requesting for camera permission</Text> :
            this.state.hasCameraPermission === false ?
              <Text>Camera permission is not granted</Text> :
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={{ height: 150, width: 300, padding:15, }}
              />
          }

          <Text style={styles.sectionTitle}>Enter of Scan the Vehcile Information</Text>

            <TouchableOpacity style={styles.rowButton} onPress={()=>console.log('pressed')}>
              <TextInput
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                editable={true}
                style={styles.input}
                placeholder={'Enter or Scan VIN'}
                value={this.vin}
                onChangeText={text => this.vin = text}
                autoCapitalize={'none'}
                placeholderTextColor={'#000000'}/>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.rowButton} onPress={()=>console.log('pressed')}>
              <TextInput
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                style={styles.input}
                placeholder={'Scan dongle QR'}
                value={this.dongle}
                autoCapitalize={'none'}
                editable={false}
                placeholderTextColor={'#000000'}/>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.button} onPress={this.submit}>
              <Text style={styles.buttonThemeText}>Submit</Text>
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
