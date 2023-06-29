import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from 'contexts/AuthProvider';
import { RootStack } from 'navigation/RootStack';
import React, { FC } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5b3a70',
    accent: '#50c878',
    background: '#f7f9fb',
  },
};

const AppComponent: FC = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <AuthProvider>
            <RootStack />
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default gestureHandlerRootHOC(AppComponent);
