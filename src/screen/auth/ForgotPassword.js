import React, {useState} from 'react';
import {
  Keyboard,
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
import {Button} from 'react-native-paper';

const ForgotPassword: () => React$Node = props => {
  const [email, setEmail] = useState('');
  const [isFetch, setFetch] = useState(false);
  const forget = async () => {
    try {
      setFetch(true);
      const response = await firebase.auth().sendPasswordResetEmail(email);
      setFetch(false);

      Alert.alert('Please check your email');
      props.navigation.goBack();
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
              loading={isFetch}>
              Forget Password
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
ForgotPassword.navigationOptions = {
  title: 'Forget Password',
};
export default ForgotPassword;
