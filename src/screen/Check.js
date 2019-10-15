// @flow
import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {FAB, Portal, Provider, PaperProvider} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import AmazingCropper, {DefaultFooter} from 'react-native-amazing-cropper';
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import {uploadImage} from '../api';
import RNTextDetector from 'react-native-text-detector';
import {RNCamera} from 'react-native-camera';

const options = {
  title: 'Take check',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const PendingView = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Waiting</Text>
    </View>
  );
};
const Check: () => React$Node = props => {
  const [isOpen, setOpen] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [uid, setUid] = useState('');
  const [image, setImage] = useState('');
  const [lines, setLines] = useState([]);
  useEffect(() => {
    console.log('Check');

    const uid = props.navigation.getParam('uid', '');
    setUid(uid);
    console.log('uid', uid);
    firestore()
      .collection('images')
      .doc(uid)
      .onSnapshot(doc => {
        // console.log(doc);
        setImage(doc.data()?.image ? doc.data()?.image : '');
      });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Image style={{flex: 1}} source={{uri: image}} />

      <FAB
        open={{isOpen}}
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="add"
        onPress={
          () => props.navigation.navigate('CropScreen', {eventUid: uid})
          // ImagePicker.showImagePicker(options, async response => {
          //   console.log('Response = ', response);
          //
          //   if (response.didCancel) {
          //     console.log('User cancelled image picker');
          //   } else if (response.error) {
          //     console.log('ImagePicker Error: ', response.error);
          //   } else if (response.customButton) {
          //     console.log('User tapped custom button: ', response.customButton);
          //   } else {
          //     const {fileName, data, uri} = response;
          //     const extension = fileName
          //       ?.split('.')
          //       ?.pop()
          //       ?.toLowerCase();
          //     const imageBase64 = `data:image/${extension};base64,${data}`;
          //     setImage(imageBase64);
          //     await uploadImage({imageBase64, eventUid: uid});
          //     await detectText(uri);
          //     // You can also display the image using data:
          //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          //
          //     // setImagePath(response.uri);
          //     // props.navigation.navigate('CropScreen', {
          //     //   imageUri: response.uri,
          //     //   eventUid: uid,
          //     // });
          //   }
          // })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
export default Check;
