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

const SignUp: () => React$Node = props => {
  const [email, setEmail] = useState('');
  const forget = async () => {
    try {
      const response = await firebase.auth().sendPasswordResetEmail(email);
      if (response) {
        Alert.alert('Please check your email');
      }
    } catch (err) {
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
            <Button
              buttonStyle={styles.authButton}
              disabled={!validateEmail(email)}
              onPress={() => forget()}
              title="Forget Password"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
SignUp.navigationOptions = {
  title: 'Forget Password',
};
export default SignUp;
