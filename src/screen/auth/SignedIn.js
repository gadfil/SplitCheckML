import React, {useState} from 'react';
import {
  Keyboard,
  Button,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';

import firebase from 'react-native-firebase';
import {validateEmail} from '../../util';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

const SignIn: () => React$Node = props => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const login = async () => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  const register = async () => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (err) {
      Alert.alert(err.message);
    }
  };
  // Calling the following function will open the FB login dialogue:
  const facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      //
      // if (result.isCancelled) {
      //   // handle this however suites the flow of your app
      //   throw new Error('User cancelled request');
      // }

      console.log(
        `Login success with permissions: ${result.grantedPermissions.toString()}`,
      );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        Alert.alert('Something went wrong obtaining the users access token');
        return;
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      console.log('credential', credential);

      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (err) {
      // console.error(err);
      Alert.alert(err.message);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Split Check</Text>
            <TextInput
              placeholder="Email"
              placeholderColor="#c4c3cb"
              value={email}
              autoFocus
              onChangeText={email => setEmail(email)}
              style={styles.authFormTextInput}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.authFormTextInput}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
            <Button
              buttonStyle={styles.authButton}
              disabled={
                !(password && password.length > 3) || !validateEmail(email)
              }
              onPress={() => login()}
              title="Login"
            />
            <Button
              buttonStyle={styles.fbAuthButton}
              onPress={() => facebookLogin()}
              title="Login with Facebook"
              color="#3897f1"
            />
            <Button
              buttonStyle={styles.fbAuthButton}
              onPress={() => register()}
              title="SignUp"
              color="#3897f1"
            />
            <Button
              buttonStyle={styles.fbAuthButton}
              onPress={() => props.navigation.navigate('ForgotPassword')}
              title="Forgot Password"
              color="#3897f1"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
SignIn.navigationOptions = {
  title: 'Login',
};
export default SignIn;
