// @flow
import React, {useEffect, useState} from 'react';
// import AmazingCropper, {DefaultFooter} from 'react-native-amazing-cropper';
import {
  Platform,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {uploadImage, addCheckToEvent} from '../api';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImageResizer from 'react-native-image-resizer';

// props.navigation.goBack();

export default props => {
  const [lines, setLines] = useState([]);
  const [upload, setUpload] = useState(false);

  const takePhoto = async camera => {
    setUpload(true);

    const options = {
      quality: 0.2,
      // quality: 0.8,
      base64: true,
      skipProcessing: true,
    };
    const {uri, base64, width, height} = await camera.takePictureAsync(options);
    const extension = uri
      ?.split('.')
      ?.pop()
      ?.toLowerCase();
    const imageBase64 = `data:image/${extension};base64,${base64}`;
    const eventUid = props.navigation.getParam('eventUid', '');
    // const resizedImage = await ImageResizer.createResizedImage(
    //   uri,
    //   width,
    //   height,
    //   'JPEG',
    //   100,
    // );
    console.log('resizedImage', imageBase64);
    await uploadImage({imageBase64, eventUid});
    await addCheckToEvent({uid: eventUid, check: lines});
    setUpload(false);

    props.navigation.goBack();
  };
  const textRecognized = object => {
    // console.log(object);
    setLines(object.textBlocks);
  };
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        onTextRecognized={object => textRecognized(object)}
        androidCameraPermissionOptions={{
          title: 'Permission to use Camera',
          message: 'We need your permission to user your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          return (
            <View
              style={{
                flex: 0,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  padding: 24,
                  fontSize: 48,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {lines.length ? 'Чек найден' : 'Поиск чека'}
              </Text>
              {!upload && lines.length ? (
                <TouchableOpacity
                  onPress={() => takePhoto(camera)}
                  style={styles.capture}>
                  <FontAwesome5 name={'camera'} style={{fontSize: 48}} />
                </TouchableOpacity>
              ) : (
                <ActivityIndicator size="large" style={styles.capture} />
              )}
            </View>
          );
        }}
      </RNCamera>
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
