import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Camera: () => React$Node = () => {
  return (
    <>
      <Text>Camera</Text>
    </>
  );
};
Camera.navigationOptions = {
  title: 'Camera',
};
export default Camera;
