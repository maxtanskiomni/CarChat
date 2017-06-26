import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from '@expo/ex-navigation';

import Router from '../navigation/Router';

@withNavigation
export default class AddButton extends React.Component {

  render() {
    var navigation = this.props.navigator;

    return (
      <TouchableOpacity style={{paddingRight:15, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.push('addcar')}>
        <Image source={require('../assets/icons/plus.png')} style={{height:30,width:30}} />
      </TouchableOpacity>
    );
  }
}
