import React from 'react';
import Animated, {
  Easing,
  set,
  useCode,
  useValue,
} from 'react-native-reanimated';
import { timing } from 'react-native-redash';

import styles from './styles';

interface Props {
  opacity: Animated.Value<number>;
}

const AnimatedColumn: React.FC<Props> = ({ opacity }) => {
  const heightEssential = useValue(0);
  const heightSuperfluous = useValue(0);
  const heightTotal = useValue(0);

  const Timing = (
    animate: Animated.Value<number>,
    time: number,
    h: number
  ): Animated.Node<number> =>
    set(
      animate,
      timing({
        from: 0,
        to: h,
        duration: time,
        easing: Easing.elastic(),
      })
    );

  useCode(() => Timing(heightEssential, 2000, 150), []);
  useCode(() => Timing(heightSuperfluous, 1750, 80), []);
  useCode(() => Timing(heightTotal, 1400, 70), []);

  return (
    <Animated.View style={[styles.container]}>
      <Animated.View
        style={[
          styles.essentialExpenses,
          {
            height: heightEssential,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.superfluousExpenses,
          {
            height: heightSuperfluous,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.totalExpenses,
          {
            height: heightTotal,
          },
        ]}
      />
    </Animated.View>
  );
};

export default AnimatedColumn;
