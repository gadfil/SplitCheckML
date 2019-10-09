// import vision from '@react-native-firebase/ml-vision';

export const recognizeText = async imagePath => {
  console.log('text recognizing...');
  //
  // try {
  //   const result = await vision().textRecognizerProcessImage(imagePath);
  //   return result.text;
  // } catch (error) {
  //   console.log(error);
  // }
};

// 1. Clear watchman watches: watchman watch-del-all
// 2. Delete node_modules: rm -rf node_modules and run yarn install
// 3. Reset Metro's cache: yarn start --reset-cache
// 4. Remove the cache: rm -rf /tmp/metro-*
