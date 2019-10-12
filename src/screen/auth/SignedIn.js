import React, {useState} from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import styles from './style';

// import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';

import {validateEmail} from '../../util';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignIn: () => React$Node = props => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const login = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  const register = async () => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
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
      const credential = auth.FacebookAuthProvider.credential(data.accessToken);
      console.log('credential', credential);

      // login with credential
      const firebaseUserCredential = await auth().signInWithCredential(
        credential,
      );

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
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                buttonStyle={styles.authButton}
                disabled={
                  !(password && password.length > 3) || !validateEmail(email)
                }
                onPress={() => login()}>
                Login
              </Button>

              <Button
                buttonStyle={styles.fbAuthButton}
                onPress={() => register()}
                color="#3897f1">
                SignUp
              </Button>
            </View>
            <Icon.Button
              style={{marginLeft: 15, marginRight: 15}}
              name="facebook"
              backgroundColor="#3b5998"
              onPress={() => facebookLogin()}>
              Login with Facebook
            </Icon.Button>
            <Button
              buttonStyle={styles.fbAuthButton}
              onPress={() => props.navigation.navigate('ForgotPassword')}
              color="#3897f1">
              <Text style={{fontFamily: 'Arial', fontSize: 15}}>
                Login with Facebook
              </Text>
            </Button>
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
