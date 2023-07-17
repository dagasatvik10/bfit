import React, {FC, useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useCreateUserMutation} from '../../../slices/userSlice';

const SignupPage: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [createUser] = useCreateUserMutation();

  const handleSignup = useCallback(async () => {
    if (name && email && password) {
      await createUser({name, email, password}).unwrap();
    }
  }, [createUser, name, email, password]);

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
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            textColor="#212121"
            outlineColor="#9e9e9e"
            activeOutlineColor="#9e9e9e"
            className="my-2"
            label="Password"
            mode="outlined"
            value={password}
            onFocus={() => setHidePassword(false)}
            onBlur={() => setHidePassword(true)}
            autoCapitalize="none"
            secureTextEntry={hidePassword}
            onChangeText={text => setPassword(text)}
          />
          <Button
            onPress={handleSignup}
            className="my-4"
            mode="contained"
            buttonColor="#f9c06c"
            textColor="#000000"
            labelStyle={buttonTextStyles.buttonText}>
            Almost Done
          </Button>
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
