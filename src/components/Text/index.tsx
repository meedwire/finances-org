import React from 'react';
import {StyleSheet, Text as RNText, TextProps} from 'react-native';

interface Props extends TextProps {
  lite?: boolean;
  size?: number;
}

const Text: React.FC<Props> = ({children, lite, style, size}) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: lite ? 'Century Gothic' : 'gothicb',
      fontSize: size,
    },
  });
  return <RNText style={[styles.text, style]}>{children}</RNText>;
};

Text.defaultProps = {
  lite: false,
  size: 20,
};

export {Text};
