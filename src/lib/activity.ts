import firestore from '@react-native-firebase/firestore';

export function onUserActivityAdd(
  userId: string,
  teamId: string,
  activityId: string,
  points: number,
) {
  const userRef = firestore().collection('users').doc(userId);
  const userActivityRef = firestore()
    .collection('users')
    .doc(userId)
    .collection('activities')
    .doc(activityId);
  const teamRef = firestore().collection('teams').doc(teamId);

  return firestore().runTransaction(async transaction => {
    const userSnapshot = await transaction.get(userRef);
    const teamSnapshot = await transaction.get(teamRef);
    const userActivitySnapshot = await transaction.get(userActivityRef);

    if (userActivitySnapshot.exists) {
      throw new Error('User Activity already exists!');
    }

    transaction.set(userActivityRef, {
      completedAt: firestore.Timestamp.now(),
      completed: true,
      points,
    });
    transaction.update(userRef, {
      points: userSnapshot.data()?.points + points,
    });
    transaction.update(teamRef, {
      points: teamSnapshot.data()?.points + points,
    });
  });
}
