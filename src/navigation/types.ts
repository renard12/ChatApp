import type { StackNavigationProp } from '@react-navigation/stack';
import { Screens } from 'constants/navigation';

export type RootStackParamList = {
  [Screens.LOGIN]: undefined;
  [Screens.CHAT_SCREEN]: undefined;
};

export type RootStackNavigationProps<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;
