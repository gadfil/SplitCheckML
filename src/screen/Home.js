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
  ImageStore,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import firebase from 'react-native-firebase';
import {upsert} from '../api';
import ImagePicker from 'react-native-image-crop-picker';
import AmazingCropper, {DefaultFooter} from 'react-native-amazing-cropper';
import {recognizeText} from '../api/ml.js';

const win = Dimensions.get('window');

const Home: () => React$Node = () => {
  const [image, setImage] = useState('');
  const [cropperMode, setCropperMode] = useState(false);
  // useEffect(async () => {
  //   const currentUser = firebase.auth().currentUser;
  //
  //   console.log('currentUser', currentUser);
  //   console.log('currentUser', currentUser._user);
  //   if (currentUser?._user) {
  //     const ref = firebase
  //       .firestore()
  //       .collection('users')
  //       .doc(currentUser.uid);
  //
  //     const refFCM = firebase
  //       .firestore()
  //       .collection('fcm')
  //       .doc(currentUser.uid);
  //
  //     upsert(ref, currentUser?._user);
  //
  //     const sendToken = async () => {
  //       const fcmToken = await firebase.messaging().getToken();
  //       if (fcmToken) {
  //         upsert(refFCM, {fcmToken});
  //       }
  //     };
  //     await sendToken();
  //   }
  // }, []);
  //
  // useEffect(async () => {
  //   if (image?.path) {
  //     // setImage(image);
  //   }
  // }, [image]);
  // const {displayName, email} = firebase.auth()?.currentUser;

  const onDone = croppedImageUri => {
    ImageStore.getBase64ForTag(croppedImageUri, base64Image => {
      // send image to server
      setImage(croppedImageUri);
      setCropperMode(false);
    });
  };

  if (cropperMode) {
    return (
      <AmazingCropper imageUri={image} imageWidth={1600} imageHeight={2300} />
    );
  }
  return (
    <>
      <AmazingCropper
        imageUri="https://www.lifeofpix.com/wp-content/uploads/2018/09/manhattan_-11-1600x2396.jpg"
        imageWidth={1600}
        imageHeight={2396}
        NOT_SELECTED_AREA_OPACITY={0.3}
        BORDER_WIDTH={20}
      />
    </>
  );
};
Home.navigationOptions = {
  title: 'HOME',
};
export default Home;
