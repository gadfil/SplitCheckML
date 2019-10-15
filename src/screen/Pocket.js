// @flow
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Text, View, FlatList} from 'react-native';
import {Button, Dialog, FAB, List, TextInput} from 'react-native-paper';

export default props => {
  const [textBlocks, setTextBlocks] = useState([]);
  useEffect(() => {
    console.log('Wallet');

    const uid = props.navigation.getParam('uid', '');
    console.log('uid', uid);
    firestore()
      .collection('events')
      .doc(uid)
      .onSnapshot(doc => {
        // setImage(doc.data()?.image);
        console.log('tblocl', doc.data());
        setTextBlocks(doc?.data()?.check);
      });
  }, []);
  const renderBlock = (block, index) => {
    return (
      <View style={{flex: 1}}>
        {block?.components?.map((c, i) => (
          <Text key={`bloc${index}_${i}`}>{c.text}</Text>
        ))}
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={textBlocks}
        renderItem={({item, index}) => <Text>{item.value}</Text>}
        keyExtractor={item =>
          `${item?.bounds?.origin}_${item.components.length}`
        }
      />
    </View>
  );
};
