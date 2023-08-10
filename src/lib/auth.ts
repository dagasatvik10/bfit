import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function onUserSignIn(authUser: FirebaseAuthTypes.User) {
  const userReference = firestore().doc(`users/${authUser.uid}`);

  return firestore().runTransaction(async transaction => {
    const userSnapshot = await transaction.get(userReference);

    if (userSnapshot.exists) {
      throw new Error('User already exists!');
    }

    transaction.set(userReference, {
      email: authUser.email,
      uid: authUser.uid,
      name: authUser.displayName,
      photoURL: authUser.photoURL,
    });
  });
}
