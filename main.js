import Expo from 'expo';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';

import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

import { firebase } from './utilities/firebase_api';
import {CarsStore,UserStore,DTCStore,SettingsStore} from './stores';

import {observer} from 'mobx-react';
import {observable} from 'mobx';

@observer
class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
    firebase.addAuthObserver();

  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          require('./assets/icons/clear_black.png'),
          require('./assets/icons/search_black.png'),
          require('./assets/images/expo-wordmark.png'),
          require('./assets/icons/history_white.png'),
          require('./assets/icons/person_white.png'),
          require('./assets/icons/backspace_white.png'),
          require('./assets/icons/arrow_left_white.png'),
          require('./assets/icons/eye-off.png'),
          require('./assets/icons/eye.png'),
          require('./assets/icons/plus.png'),
          require('./assets/icons/lock-outline.png'),
          require('./assets/icons/account-box-outline.png'),
          require('./assets/icons/alert-circle-outline.png'),
          require('./assets/icons/check.png'),
          require('./assets/icons/outline.png'),
          require('./assets/icons/check-outline.png')
      ],
      fonts: [
        { 'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf') },
        { 'rubicon-icon-font': require('./assets/fonts/rubicon-icon-font.ttf') },
        { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        { 'quicksand': require('./assets/fonts/Quicksand-Regular.ttf') },
        { 'quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf') },
        { 'yellowtail': require('./assets/fonts/Yellowtail-Regular.ttf') }
      ],
    });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    console.log(UserStore.logged_in)
    if (this.state.appIsReady) {

      var login = (<StackNavigation
                    id="login"
                    initialRoute={Router.getRoute('login')}/>);

      var root = (<StackNavigation
                    id="root"
                    initialRoute={Router.getRoute('rootNavigation')}/>);

      var theStack;

      console.log("the door", UserStore.logged_in, UserStore.checker);
      if(UserStore.logged_in && UserStore.checker){
        console.log('root');
        theStack = root;

      }else if(!UserStore.checker){
        console.log('loading');
        return <Expo.AppLoading />;

      }else{
        console.log('login');
        theStack = login;
      }

      return (
        <View style={styles.container}>
          <NavigationProvider router={Router}>
            {theStack}
          </NavigationProvider>

          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
        </View>
      );
    } else {
      return <Expo.AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

Expo.registerRootComponent(AppContainer);
