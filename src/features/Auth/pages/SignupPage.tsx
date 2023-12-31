import React, {FC, useCallback, useState} from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../../../navigation/AuthStack';
import {
  useCreateUserMutation,
  useLazyGetIsEmailApprovedQuery,
} from '../../../slices/userSlice';
import {validateEmail, validateName, validatePassword} from '../utils';

const SIMPLIFIT_PRIVACY_POLICY_URL =
  'https://www.simplifit.in/privacy-policy.html';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupPage: FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [getIsEmailApproved] = useLazyGetIsEmailApprovedQuery();
  const [createUser, {isLoading}] = useCreateUserMutation();

  const handleSignup = useCallback(async () => {
    let errorText =
      (validateEmail(email) ||
        validatePassword(password) ||
        validateName(name)) ??
      null;
    setError(errorText);
    if (!errorText) {
      try {
        // Only allow signup if email is approved
        if (await getIsEmailApproved({email}).unwrap()) {
          await createUser({name, email, password}).unwrap();
        } else {
          setError(
            'You are not present in the challenge group. Please contact Admin Support.',
          );
        }
      } catch (e: any) {
        setError(e);
      }
    }
  }, [email, password, name, getIsEmailApproved, createUser]);

  return (
    <SafeAreaView className="container flex-1">
      <View className="flex-1 flex flex-col px-8 py-4">
        <Text className="text-[#55b295] text-lg font-bold">
          Hey! we need your basic Info
        </Text>
        <View className="flex flex-col py-2">
          <TextInput
            autoFocus={true}
            textColor="#212121"
            outlineColor="#9e9e9e"
            activeOutlineColor="#9e9e9e"
            className="my-2"
            label="Name"
            mode="outlined"
            autoCapitalize="words"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            textColor="#212121"
            outlineColor="#9e9e9e"
            activeOutlineColor="#9e9e9e"
            className="my-2"
            label="Email"
            mode="outlined"
            inputMode="email"
            autoCapitalize="none"
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())}
          />
          <TextInput
            textColor="#212121"
            outlineColor="#9e9e9e"
            activeOutlineColor="#9e9e9e"
            className="my-2"
            label="Password"
            mode="outlined"
            right={
              <TextInput.Icon
                color="#55b295"
                onPress={() => setHidePassword(h => !h)}
                icon={hidePassword ? 'eye-outline' : 'eye-off-outline'}
              />
            }
            value={password}
            autoCapitalize="none"
            secureTextEntry={hidePassword}
            onChangeText={text => setPassword(text)}
          />
          <View className="flex flex-row justify-center py-2">
            <Text className="text-[#49454f]">
              By signing up you agree to our{' '}
            </Text>
            <Pressable
              onPress={() => Linking.openURL(SIMPLIFIT_PRIVACY_POLICY_URL)}>
              <Text className="underline text-[#49454f]">Privacy Policy</Text>
            </Pressable>
          </View>
          <Button
            disabled={!email || !password || !name}
            onPress={handleSignup}
            className="my-4"
            mode="contained"
            buttonColor="#f9c06c"
            textColor="#000000"
            loading={isLoading}
            labelStyle={buttonTextStyles.buttonText}>
            Almost Done
          </Button>
          <View className="flex flex-row justify-center">
            <HelperText type="error" visible={error !== null}>
              {error}
            </HelperText>
          </View>
        </View>
        <View className="flex flex-row justify-center items-center">
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text className="text-black">Already Registered? Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const buttonTextStyles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupPage;
