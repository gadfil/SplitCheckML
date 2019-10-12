import React, {useEffect} from 'react';
// import firebase from 'react-native-firebase';
import {saveUser} from '../../api';
import auth from '@react-native-firebase/auth';

const AuthLoading: () => React$Node = props => {
  console.log('AuthLoading');
  useEffect(() => {
    console.log('AuthLoading:useEffect');
    auth().onAuthStateChanged(user => {
      props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }, []);

  return <></>;
};
export default AuthLoading;
