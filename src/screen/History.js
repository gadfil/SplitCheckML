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
// import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  List,
  Paragraph,
  Dialog,
  Button,
  TextInput,
  FAB,
} from 'react-native-paper';
import {createEvent} from '../api';
import moment from 'moment';

const History: () => React$Node = props => {
  const [open, changeOpen] = useState(false);
  const [name, setName] = useState('');
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const currentUser = auth().currentUser;
    console.log(currentUser);
    if (currentUser?._user.uid) {
      firestore()
        .collection('events')
        .where('userUid', '==', currentUser?._user.uid)
        .onSnapshot(doc => {
          console.log(doc);
          console.log(doc.docs.map(d => d.data()));
          setHistory(
            doc.docs.map(d => {
              return {uid: d.id, ...d.data()};
            }),
          );
          // console.log(doc.data());
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={item => item.uid}
        renderItem={({item}) => (
          <List.Item
            onPress={() => props.navigation.navigate('Check')}
            title={item.title}
            description={`${moment(item?.date?.toDate()).format('DD.MM.YYYY')}`}
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
    <TouchableOpacity onPress={() => auth().signOut()}>
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
