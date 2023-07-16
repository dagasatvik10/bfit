import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export type AuthUser = Pick<
  FirebaseAuthTypes.User,
  'email' | 'displayName' | 'photoURL' | 'uid'
>;

export interface AuthState {
  status: 'idle' | 'loading' | 'failed';
  user: AuthUser | null;
  token: string | null;
}

const initialState: AuthState = {
  status: 'idle',
  user: null,
  token: null,
};

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

export const signIn = createAsyncThunk<AuthUser>('auth/signIn', async () => {
  const {user} = await onGoogleButtonPress();
  return {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
  };
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await auth().signOut();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'idle';
    });
    builder.addCase(signIn.rejected, state => {
      state.status = 'failed';
    });

    builder.addCase(signOut.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(signOut.fulfilled, state => {
      state.user = null;
      state.status = 'idle';
    });
    builder.addCase(signOut.rejected, state => {
      state.status = 'failed';
    });
  },
});

export const selectUser = (state: {auth: AuthState}) => state.auth.user;
export const selectToken = (state: {auth: AuthState}) => state.auth.token;

export default authSlice.reducer;
