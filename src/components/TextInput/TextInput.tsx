import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/sizes';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
  TextInput as PaperTextInput,
  TextInputProps,
} from 'react-native-paper';
import { scaleByHeight } from 'utils/theme';

export const TextInput: FC<TextInputProps> = ({ ...rest }) => {
  return <PaperTextInput style={styles.input} numberOfLines={1} {...rest} />;
};

const styles = StyleSheet.create({
  input: {
    marginTop: scaleByHeight(10),
    marginBottom: scaleByHeight(10),
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_HEIGHT / 15,
  },
});
