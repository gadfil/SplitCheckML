// @flow
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Dialog, FAB, List, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {addFriendToEvent} from '../api';
import moment from 'moment';
import ImageEditor from '@react-native-community/image-editor';

const Frends: () => React$Node = props => {
  const [event, setEvent] = useState({});
  const [uid, setUid] = useState('');
  const [open, changeOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('F');
    console.log('ImageEditor', ImageEditor);

    const uid = props.navigation.getParam('uid', '');
    const event = props.navigation.getParam('event', '');
    setUid(uid);
    console.log('uid', uid);
    firestore()
      .collection('events')
      .doc(uid)
      .onSnapshot(doc => {
        console.log(doc);
        console.log(doc.data());
        setEvent(doc?.data());
      });
  }, []);
  return (
    <>
      <FlatList
        data={event?.friends}
        keyExtractor={item => item.uid}
        renderItem={({item}) => (
          <List.Item
            onPress={() => {}}
            title={item?.name}
            description={`Потратил ${item?.spend}`}
            left={props => <List.Icon {...props} icon="person" />}
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
        onPress={() => {
          changeOpen(true);
          // setName(`Чек ${moment(new Date()).format('DD.MM.YYYY')}`);
        }}
      />

      <Dialog
        visible={open}
        onDismiss={() => {
          changeOpen(false);
          setName('');
        }}>
        <Dialog.Title>Имя</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label={'Чек'}
            value={name}
            onChangeText={text => setName(text)}
            mode={'outlined'}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => changeOpen(false)}>Cancel</Button>
          <Button
            onPress={async () => {
              await addFriendToEvent({name, uid, friends: event.friends});
              changeOpen(false);
            }}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
export default Frends;
