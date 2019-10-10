// @flow
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import {List, Paragraph, Dialog, Button, TextInput} from 'react-native-paper';

const mock = [
  {title: 'Вася', uid: '1', date: '10.06.2019'},
  {title: 'Петя', uid: '12', date: '10.10.2019'},
];
const Frends: () => React$Node = () => {
  return (
    <>
      <FlatList
        data={mock}
        keyExtractor={item => item.uid}
        renderItem={({item}) => (
          <List.Item
            onPress={() => {}}
            title={item.title}
            left={props => <List.Icon {...props} icon="person" />}
          />
        )}
      />
    </>
  );
};
export default Frends;
