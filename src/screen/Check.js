// @flow
import React, {useState} from 'react';
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

const options = {
  title: 'Take check',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Check: () => React$Node = props => {
  const [isOpen, setOpen] = useState(false);
  const [imagePath, setImagePath] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: '#ffdfdf'}}>
      <FAB
        open={{isOpen}}
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="add"
        onPress={() =>
          ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = {uri: response.uri};

              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };

              setImagePath(response.uri);
              props.navigation.navigate('CropScreen', {
                imageUri: response.uri,
              });
            }
          })
        }
      />
    </View>
  );
};
export default Check;
