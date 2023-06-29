import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export const Loader: FC = () => (
  <ActivityIndicator
    style={styles.indicator}
    animating
    color={MD2Colors.red800}
  />
);

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
