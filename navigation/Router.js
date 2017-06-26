import { createRouter } from '@expo/ex-navigation';

import SettingsScreen from '../screens/SettingsScreen';
import GarageScreen from '../screens/GarageScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import AddCarScreen from '../screens/AddCarScreen';
import CarScreen from '../screens/CarScreen';
import DTCScreen from '../screens/DTCScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotScreen from '../screens/ForgotScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  settings: () => SettingsScreen,
  garage: () => GarageScreen,
  connection: () => ConnectionScreen,
  addcar: () => AddCarScreen,
  car: () => CarScreen,
  dtc: () => DTCScreen,
  profile: () => ProfileScreen,
  login: () => LoginScreen,
  register: () => RegisterScreen,
  forgot: ()=> ForgotScreen,
  rootNavigation: () => RootNavigation,
}));
