// @flow
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageEditor,
  Button,
} from 'react-native';
const Check: () => React$Node = () => {
  return (
    <>
      <Text>check</Text>
    </>
  );
};

Check.navigationOptions = {
  title: 'Чек',
};
export default Check;
