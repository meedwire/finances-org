import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ViewProps,
  StyleSheet,
} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useCode, set, sub} from 'react-native-reanimated';

import masterlogo from '../../assets/master_logo.png';
import Button from '../Button';

import styles from './styles';
import {Colors} from '../../Constants';
import {
  mix,
  usePanGestureHandler,
  withSpring,
  useValue,
} from 'react-native-redash';
import {PanGestureHandler} from 'react-native-gesture-handler';

interface PropsCard extends ViewProps {
  position: number;
  card: {
    id: string;
    value: string;
    number: string;
    validate: string;
  };
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const {width: wWidth} = Dimensions.get('screen');
const width = wWidth * 0.9;
const height = 230;

const Card: React.FC<PropsCard> = ({card, position}) => {
  const translateY = useValue(0);
  const scale = mix(position, 1, 0.98);
  const {gestureHandler, state, velocity, translation} = usePanGestureHandler();

  useCode(() => set(translateY, mix(position, 0, 10)), [state]);
  useCode(
    () =>
      set(
        translateY,
        sub(
          withSpring({
            value: translation.y,
            state,
            velocity: velocity.y,
            snapPoints: [0, height + 30],
          }),
          mix(position, 0, -10),
        ),
      ),
    [translation.x],
  );
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <PanGestureHandler {...gestureHandler}>
        <AnimatedLinearGradient
          style={[
            styles.container,
            {
              width,
              height,
              transform: [{translateY}, {scale}],
            },
          ]}
          colors={[Colors.COMMENT, Colors.CYAN, Colors.PINK]}>
          <Text style={styles.textDeficitCard}>{card.value}</Text>
          <Text style={styles.textNumbercard}>{card.number}</Text>

          <View style={styles.boxCardOperations}>
            <Button style={styles.buttonLaunch}>
              <EvilIcons name="arrow-down" size={60} color={Colors.BG} />
            </Button>
            <View style={styles.boxLogo}>
              <Image
                resizeMode="center"
                source={masterlogo}
                style={styles.logoCard}
              />
              <Text>{card.validate}</Text>
            </View>
            <Button>
              <EvilIcons name="arrow-up" size={60} color={Colors.BG} />
            </Button>
          </View>
        </AnimatedLinearGradient>
      </PanGestureHandler>
    </View>
  );
};

export default Card;
