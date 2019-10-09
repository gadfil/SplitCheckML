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

// export const saveFcmToken = ()
