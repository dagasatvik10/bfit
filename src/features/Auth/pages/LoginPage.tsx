import React, {FC, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, TextInput} from 'react-native-paper';

import {AuthStackParamList} from '../../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginPage: FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <SafeAreaView className="container flex-1">
      <View className="flex-1 flex flex-col px-8 py-4">
        <Text className="text-[#55b295] text-lg font-bold">
          Hey! please login to continue
        </Text>
        <View className="flex flex-col py-2">
          <TextInput
            autoFocus={true}
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
            right={
              <TextInput.Icon
                color="#55b295"
                onPress={() => setHidePassword(h => !h)}
                icon={hidePassword ? 'eye-outline' : 'eye-off-outline'}
              />
            }
            value={password}
            onFocus={() => setHidePassword(false)}
            onBlur={() => setHidePassword(true)}
            autoCapitalize="none"
            secureTextEntry={hidePassword}
            onChangeText={text => setPassword(text)}
          />
          <Button
            className="my-4"
            mode="contained"
            buttonColor="#f9c06c"
            textColor="#000000"
            labelStyle={buttonTextStyles.buttonText}>
            Login
          </Button>
        </View>
        <View className="flex flex-row justify-center items-center">
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text>Not a registered user? Signup</Text>
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

export default LoginPage;
