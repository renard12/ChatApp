import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { TextInput } from 'components/TextInput';
import { AuthContext } from 'contexts/AuthProvider';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { scaleByHeight, scaleFontSize } from 'utils/theme';

export const Login = () => {
  const [name, setName] = useState<string>('');

  const { register, isLoading } = useContext(AuthContext);

  const changeName = (userName: string) => {
    setName(userName);
  };

  const createUser = async () => {
    await register(name);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Title
        style={styles.textTitle}
      >{`Welcome!\n Please enter your name`}</Title>
      <TextInput
        label="My name is"
        value={name}
        autoCapitalize="none"
        onChangeText={changeName}
        placeholder="John Doe"
      />

      <Button
        title="Go to Chat"
        mode="text"
        labelStyle={styles.navigationButtonText}
        onPress={createUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: scaleFontSize(24),
    marginBottom: scaleByHeight(10),
    alignSelf: 'center',
    textAlign: 'center',
  },
  loginButtonLabel: {
    fontSize: scaleFontSize(22),
  },
  navigationButtonText: {
    fontSize: scaleFontSize(16),
  },
});
