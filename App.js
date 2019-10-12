/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/screen/Home';
import Camera from './src/screen/Camera';
import SignedIn from './src/screen/auth/SignedIn';
import ForgotPassword from './src/screen/auth/ForgotPassword';
import AuthLoading from './src/screen/auth/AuthLoading';
import Frends from './src/screen/Frends';
import History from './src/screen/History';
import Check from './src/screen/Check';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider as PaperProvider} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CropScreen from './src/screen/CropScreen';

Icon.loadFont('AntDesign.ttf');
Icon.loadFont('Entypo.ttf');
Icon.loadFont('EvilIcons.ttf');
Icon.loadFont('Feather.ttf');
Icon.loadFont('FontAwesome.ttf');
Icon.loadFont('FontAwesome5_Brands.ttf');
Icon.loadFont('FontAwesome5_Regular.ttf');
Icon.loadFont('FontAwesome5_Solid.ttf');
Icon.loadFont('Foundation.ttf');
Icon.loadFont('Ionicons.ttf');
Icon.loadFont('MaterialIcons.ttf');
Icon.loadFont('MaterialCommunityIcons.ttf');
Icon.loadFont('SimpleLineIcons.ttf');
Icon.loadFont('Octicons.ttf');
Icon.loadFont('Zocial.ttf');

const AuthStack = createStackNavigator({
  SignedIn,
  ForgotPassword: ForgotPassword,
});

const TabNavigator = createBottomTabNavigator({
  Frends: {
    screen: Frends,
    navigationOptions: {
      title: 'Люди',

      tabBarIcon: ({tintColor}) => (
        <Icon
          name="users"
          size={25}
          style={{paddingTop: 8}}
          color={tintColor}
        />
      ),
    },
  },
  Check: {
    screen: Check,
    navigationOptions: {
      title: 'Чек',
      tabBarIcon: ({tintColor}) => (
        <FontAwesome5
          name="receipt"
          style={{paddingTop: 8}}
          size={25}
          color={tintColor}
        />
      ),
    },
  },
  Wallet: {
    screen: Check,
    navigationOptions: {
      title: 'Счет',

      tabBarIcon: ({tintColor}) => (
        <FontAwesome5
          name="wallet"
          style={{paddingTop: 8}}
          size={25}
          color={tintColor}
        />
      ),
    },
  },
});
const AppStack = createStackNavigator({
  History: {screen: History},
  CropScreen: {screen: CropScreen},
  Check: {screen: TabNavigator},
});

const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack,
      Main: TabNavigator,
    },
    {initialRouteName: 'AuthLoading'},
  ),
);

const Main: () => React$Node = () => {
  return (
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  );
};
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack,
      Main: TabNavigator,
      // Main: TabNavigator,
    },
    {initialRouteName: 'AuthLoading'},
  ),
);
