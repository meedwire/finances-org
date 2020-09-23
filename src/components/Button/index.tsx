import React from 'react';
import {TouchableOpacity, TouchableHighlightProps} from 'react-native';

const Button: React.FC<TouchableHighlightProps> = ({
  children,
  onPress,
  ...rest
}) => {
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
