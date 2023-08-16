import firestore from '@react-native-firebase/firestore';

export function onTeamSelection(userId: string, teamId: string) {
  const userRef = firestore().doc(`users/${userId}`);
  const teamRef = firestore().doc(`teams/${teamId}`);

  return firestore().runTransaction(async transaction => {
    const teamSnapshot = await transaction.get(teamRef);

    // update team user count
    transaction.update(userRef, {
      teamId: teamId,
    });
    transaction.update(teamRef, {
      userCount: teamSnapshot.data()?.userCount + 1,
    });
  });
}
