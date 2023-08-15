import firestore from '@react-native-firebase/firestore';

export function onUserDelete(userId: string, teamId: string) {
  const userRef = firestore().doc(`users/${userId}`);
  const teamRef = firestore().doc(`teams/${teamId}`);

  return firestore().runTransaction(async transaction => {
    const userSnapshot = await transaction.get(userRef);
    const teamSnapshot = await transaction.get(teamRef);

    if (!userSnapshot.exists) {
      throw new Error('User already deleted');
    }
    const teamPoints = teamSnapshot.data()?.points;
    const userPoints = userSnapshot.data()?.points;

    // update team points
    transaction.update(teamRef, {
      points: teamPoints - userPoints,
    });
    transaction.delete(userRef);
  });
}
