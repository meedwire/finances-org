import { EvilIcons } from '@expo/vector-icons';
import React, { memo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TapGestureHandler, RectButton } from 'react-native-gesture-handler';
import Animated, { Easing, interpolate } from 'react-native-reanimated';
import { useTapGestureHandler, mix, useTransition } from 'react-native-redash';

import { Colors } from '../../Constants';
import Button from '../Button';
import styles from './styles';

interface Values {
  text: string;
  value: string;
}

interface Props {
  selectedValue: (arg: Values) => void;
  values: Values[];
  minWidth?: number;
}

const SelectButton: React.FC<Props> = ({ selectedValue, values, minWidth }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(values[0].text);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const style = { minWidth: minWidth ?? '100%' };

  const transition = useTransition(show, {
    duration: 100,
    easing: Easing.inOut(Easing.circle),
  });

  const scale = mix(transition, 0, 1);

  function handleSelect(c: Values) {
    selectedValue(c);
    setSelected(c.text);
    setShow((prev) => !prev);
  }

  return (
    <View>
      {show && (
        <Animated.View
          style={[
            styles.boxSelection,
            {
              ...style,
              transform: [
                {
                  translateX: interpolate(scale, {
                    inputRange: [0, 1],
                    outputRange: [position.x, position.x],
                  }),
                },
                {
                  translateY: interpolate(scale, {
                    inputRange: [0, 1],
                    outputRange: [position.y, 0],
                  }),
                },
                {
                  scaleX: interpolate(scale, {
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
                {
                  scaleY: interpolate(scale, {
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {values.map((value) => {
            const backGround =
              selected === value.text ? Colors.CYAN : 'transparent';
            return (
              <Button
                key={value.text}
                style={[
                  styles.buttonBoxSelection,
                  {
                    backgroundColor: backGround,
                  },
                ]}
                onPress={() => show && handleSelect(value)}
              >
                <Text style={{ color: 'white' }}>{value.text}</Text>
              </Button>
            );
          })}
        </Animated.View>
      )}
      <Button
        onLayout={({
          nativeEvent: {
            layout: { x, y },
          },
        }) => setPosition({ x, y })}
        activeOpacity={0.9}
        onPress={() => setShow((prev) => !prev)}
        style={[styles.buttonChangeCurrency, style]}
      >
        <EvilIcons
          style={styles.icon}
          name="chevron-down"
          size={24}
          color="white"
        />
        <Text style={styles.textCurrency}>{selected}</Text>
      </Button>
    </View>
  );
};

export default memo(SelectButton);
