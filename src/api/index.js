// @flow

import firebase from 'react-native-firebase';

export const upsert = (ref, value) => {
  console.log('upsert', ref, value);
  firebase
    .firestore()
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
    const uid = firebase.auth().currentUser?._user?.uid;
    const ref = firebase
      .firestore()
      .collection('events')
      .doc(uid);
    await ref.add({
      userUid: uid,
      title,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.log(err);
  }
};
// export const saveFcmToken = ()
