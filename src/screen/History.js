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
  Button as NButton,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';

import {
  List,
  Paragraph,
  Dialog,
  Button,
  TextInput,
  FAB,
} from 'react-native-paper';
import {createEvent} from '../api';
const mock = [
  {title: 'Встреча выпускников', uid: '1', date: '10.06.2019'},
  {title: 'Настолки', uid: '12', date: '10.10.2019'},
  {title: 'Пятница', uid: '12', date: '13.10.2019'},
  {title: 'Настолки', uid: '13', date: '10.03.2019'},
];
const History: () => React$Node = props => {
  const [open, changeOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    console.log(currentUser);
    if (currentUser?._user.uid) {
      const ref = firebase
        .firestore()
        .collection('events')
        .doc('Elo5WipOHOkNr5RKxePN');

      ref.onSnapshot(doc => {
        console.log(doc);
        console.log(doc.data());
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={mock}
        keyExtractor={item => item.uid}
        renderItem={({item}) => (
          <List.Item
            onPress={() => props.navigation.navigate('Check')}
            title={item.title}
            description={item.date}
          />
        )}
      />
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="add"
        onPress={() => changeOpen(true)}
      />

      <Dialog
        visible={open}
        onDismiss={() => {
          changeOpen(false);
          setName('');
        }}>
        <Dialog.Title>Новый чек</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label={'Чек'}
            onChangeText={text => setName(text)}
            mode={'outlined'}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => console.log('Cancel')}>Cancel</Button>
          <Button onPress={() => createEvent(name)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

History.navigationOptions = {
  title: 'История',
  headerRight: (
    <TouchableOpacity
      onPress={() => {
        firebase.auth().signOut();
      }}>
      <Text>выйти</Text>
    </TouchableOpacity>
  ),
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    height: 60,
    backgroundColor: '#03A9F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTest: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    margin: 5,
    backgroundColor: 'white',
    paddingLeft: 10,
    elevation: 1,
  },
  title: {
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: 'white',
  },
});
export default History;
