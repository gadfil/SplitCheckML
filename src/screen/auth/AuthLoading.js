import React, {useEffect} from 'react';
import firebase from 'react-native-firebase';
import {saveUser} from '../../api';

const AuthLoading: () => React$Node = props => {
  console.log('AuthLoading');
  useEffect(() => {
    console.log('AuthLoading:useEffect');
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }, []);

  return <></>;
};
export default AuthLoading;
