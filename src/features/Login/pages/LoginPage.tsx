import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Button, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

GoogleSignin.configure({
  webClientId:
    '791972729440-vmh7151kmp52644ipm8ihc6e9beco2hb.apps.googleusercontent.com',
});

function LoginPage(): JSX.Element {
  return (
    <View style={styles.container}>
      {/* Code for drawable */}
      <View style={styles.tiltedRectangle} />
      <Button
        title={'Sign in with Google'}
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#073b38',
  },
  tiltedRectangle: {
    flex: 1,
    backgroundColor: '#117773',
    transform: [{rotate: '45deg'}],
  },
});

export default LoginPage;
