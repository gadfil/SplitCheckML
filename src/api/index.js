// @flow

// import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const upsert = (ref, value) => {
  console.log('upsert', ref, value);

  firestore()
    .runTransaction(async transaction => {
      const doc = await transaction.get(ref);

      if (!doc.exists) {
        transaction.set(ref, value);
        return value;
      }

      transaction.update(ref, value);

      return value;
    })
    .then(user => {
      console.log(`Transaction successfully committed '${value}'.`);
    })
    .catch(error => {
      console.log('Transaction failed: ', error);
    });
};

export const createEvent = async title => {
  try {
    const uid = auth().currentUser?._user?.uid;
    const ref = await firestore().collection(`events`);
    console.log('ref:', ref);
    const result = await ref.add({
      userUid: uid,
      title,
      friends: [],
      date: firestore.FieldValue.serverTimestamp(),
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
// export const saveFcmToken = ()
