import { createStackNavigator } from '@react-navigation/stack';
import { BackButton } from 'components/BackButton/BackButton';
import { Screens } from 'constants/navigation';
import { AuthContext } from 'contexts/AuthProvider';
import React, { useContext, useEffect, useState } from 'react';
import { Chat } from 'screens/Chat';
import { Login } from 'screens/Login';

import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName={Screens.LOGIN}
      screenOptions={() => ({
        gestureEnabled: false,
      })}
    >
      {!user ? (
        <Stack.Screen
          name={Screens.LOGIN}
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name={Screens.CHAT_SCREEN}
          component={Chat}
          options={{
            gestureEnabled: true,
            headerMode: 'float',
            title: 'Chat',
            headerLeft: props => <BackButton />,
          }}
        />
      )}
    </Stack.Navigator>
  );
};
