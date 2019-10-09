/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/screen/Home';
import Camera from './src/screen/Camera';
import SignedIn from './src/screen/auth/SignedIn';
import SignedUp from './src/screen/auth/SignedUp';
import AuthLoading from './src/screen/auth/AuthLoading';

const AuthStack = createStackNavigator({
  SignedIn,
  ForgotPassword: SignedUp,
});

const AppStack = createStackNavigator({
  Home: {screen: Home},
  Profile: {screen: Camera},
});

export default createAppContainer(
    createSwitchNavigator(
        {AuthLoading: AuthLoading, App: AppStack, Auth: AuthStack},
        {initialRouteName: 'AuthLoading'},
    ),
);
