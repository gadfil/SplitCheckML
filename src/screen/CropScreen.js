// @flow
import React, {useEffect} from 'react';
import AmazingCropper, {DefaultFooter} from 'react-native-amazing-cropper';
import {ImageStore, Platform, Dimensions} from 'react-native';

export default props => {
  const {width} = Dimensions.get('window');
  const onDone = croppedImageUri => {
    console.log('croppedImageUri = ', croppedImageUri);
    // ImageStore.getBase64ForTag(
    //   croppedImageUri,
    //   base64Image => {
    //     // send image to server or save it locally
    //     ImageStore.removeImageForTag(croppedImageUri);
    //   },
    //   err => {},
    // );
    // navigate to the next page of your application
    // Actions.home();
  };
  return (
    <AmazingCropper
      imageUri={props.navigation.getParam('imageUri', '')}
      imageWidth={width - 50}
      NOT_SELECTED_AREA_OPACITY={0.3}
      BORDER_WIDTH={20}
      onCancel={() => props.navigation.goBack()}
      onDone={uri => onDone(uri)}
    />
  );
};
