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
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {List, Paragraph, Dialog, Button, TextInput} from 'react-native-paper';

const mock = [
  {title: 'Встреча выпускников', uid: '1', date: '10.06.2019'},
  {title: 'Настолки', uid: '12', date: '10.10.2019'},
  {title: 'Пятница', uid: '12', date: '13.10.2019'},
  {title: 'Настолки', uid: '13', date: '10.03.2019'},
];
const History: () => React$Node = props => {
  const [open, changeOpen] = useState(false);
  const [name, setName] = useState('');
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
      <TouchableOpacity
        onPress={() => {
          changeOpen(true);
        }}
        style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

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
          <Button onPress={() => console.log('Ok')}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

History.navigationOptions = {
  title: 'История',
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
