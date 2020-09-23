import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { cond, eq, set, sub } from 'react-native-reanimated';
import {
  usePanGestureHandler,
  useValue,
  withSpring,
} from 'react-native-redash';

import { Colors } from '../../Constants';
import { TypeSpending } from '../../GlobalTypes';
import { money } from '../../Utils';
import getRealm from '../../schemas';
import Button from '../Button';
import { Text } from '../Text';
import styles from './styles';

interface PropsItem {
  item: TypeSpending;
}

const ListItemTransations: React.FC<PropsItem> = ({ item }) => {
  const {
    gestureHandler,
    state,
    translation,
    velocity,
  } = usePanGestureHandler();
  const enable = useValue(State.UNDETERMINED);

  const Icon: React.FC = () => {
    return item.type === 'CREDIT' ? (
      <EvilIcons name="credit-card" size={24} color="white" />
    ) : item.operation === 'POSITIVE' ? (
      <EvilIcons name="plus" size={24} color="white" />
    ) : (
      <EvilIcons name="cart" size={24} color="white" />
    );
  };

  const translateX = withSpring({
    state,
    velocity: velocity.x,
    value: translation.x,
    snapPoints: [0, -60],
    config: { damping: new Animated.Value(10) },
    onSnap: () => {
      cond(
        eq(enable, State.ACTIVE),
        set(enable, State.UNDETERMINED),
        set(enable, State.ACTIVE)
      );
    },
  });

  async function handleDelete() {
    const realm = await getRealm();

    realm.write(() => {
      const itemDelet = realm.objects('Spending').filtered('id == $0', item.id);

      realm.delete(itemDelet);
    });
  }

  return (
    <View>
      <PanGestureHandler minDeltaX={10} {...gestureHandler}>
        <Animated.View>
          <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateX }] }}>
              <Button style={styles.containerItem}>
                <Icon />
                <Text size={14} lite style={styles.textDescription}>
                  {item.description}
                </Text>
                <Text size={18} style={styles.textValue}>
                  -{money(item.value)}
                </Text>
              </Button>
            </Animated.View>
            <Animated.View
              style={{
                position: 'absolute',
                right: 0,
                zIndex: -1,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [
                  {
                    translateX: sub(translateX, -50),
                  },
                ],
              }}
            >
              <Button onPress={handleDelete}>
                <EvilIcons name="trash" size={30} color={Colors.RED} />
              </Button>
            </Animated.View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ListItemTransations;
