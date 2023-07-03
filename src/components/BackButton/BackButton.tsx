import { AuthContext } from 'contexts/AuthProvider';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scaleByWidth } from 'utils/theme';

type BackButtonProps = {
  color?: string;
};

export const BackButton = ({ color }: BackButtonProps) => {
  const { setUser } = useContext(AuthContext);

  const goBack = () => {
    setUser(null);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={goBack}>
      <Icon name="arrow-left" size={20} color={color ? color : '#000000'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: scaleByWidth(12),
  },
});
