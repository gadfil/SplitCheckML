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
import firebase from 'react-native-firebase';
import {upsert} from '../api';
import ImagePicker from 'react-native-image-crop-picker';
import AmazingCropper from 'react-native-amazing-cropper';
import {recognizeText} from '../api/ml.js';
const Home: () => React$Node = () => {
  const [image, setImage] = useState({});
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
  return (
    <>
      <Text>HOME </Text>
      {/*<Button*/}
      {/*  onPress={async () => {*/}
      {/*    console.log('click');*/}

      {/*    const response = await firebase.auth().signOut();*/}
      {/*  }}*/}
      {/*  title={`${displayName || email || 'mystery user'} logout`}*/}
      {/*/>*/}
      <Button
        title={'take photo'}
        onPress={() => {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(async photo => {
            console.log('photo');
            const result = await recognizeText(image?.path);
            console.log('result', result);

            setImage(photo);
          });
        }}
      />
      {image?.path && (
        <AmazingCropper
          imageUri={image?.path}
          imageWidth={1600}
          imageHeight={2396}
          NOT_SELECTED_AREA_OPACITY={0.3}
          BORDER_WIDTH={20}
        />
      )}
    </>
  );
};
Home.navigationOptions = {
  title: 'HOME',
};
export default Home;
