import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/sizes';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
} from 'react-native-paper';
import { scaleByHeight } from 'utils/theme';

interface ButtonProps extends Omit<PaperButtonProps, 'children'> {
  title: string;
}

export const Button: FC<ButtonProps> = ({ title, ...rest }) => (
  <PaperButton
    {...rest}
    uppercase={false}
    contentStyle={styles.buttonContainer}
    style={styles.button}
  >
    {title}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    marginTop: scaleByHeight(10),
  },
  buttonContainer: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_HEIGHT / 15,
  },
});
