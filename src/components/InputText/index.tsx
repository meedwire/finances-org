import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import styles from './styles';

const InputText: React.FC<TextInputProps> = () => {
  return <TextInput style={styles.container} />;
};

export {InputText};
