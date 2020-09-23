import {NavigationHelpers} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../Button';
import styles from './styles';
import {EvilIcons} from '@expo/vector-icons';
import {SvgBackGround} from './SvgBackground';
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {ContextScreen} from '../../Contexts';
import {Colors} from '../../Constants';

interface Props {
  bank: string;
  navigation: NavigationHelpers<
    Record<string, object | undefined>,
    BottomTabNavigationEventMap
  >;
}

const BottomNavigationBar: React.FC<Props> = ({navigation}) => {
  console.log(navigation.dangerouslyGetState());
  const {
    screen: {name},
  } = useContext(ContextScreen);

  const style = StyleSheet.create({
    buttonAddRelese: {
      backgroundColor: name === 'AddRelese' ? Colors.CYAN : 'transparent',
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      width: 54,
      height: 54,
      bottom: 12,
    },
    buttonConfigScree: {
      backgroundColor: name === 'ConfigScreen' ? Colors.CYAN : 'transparent',
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      width: 54,
      height: 54,
      bottom: -14,
      right: 8,
    },
    buttonHome: {
      backgroundColor: name === 'Home' ? Colors.CYAN : 'transparent',
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      width: 54,
      height: 54,
      bottom: -14,
      left: 8,
    },
  });

  return (
    <View style={styles.containerBottom}>
      <SvgBackGround />
      <Button
        style={style.buttonHome}
        onPress={() => navigation.navigate('Home')}>
        <EvilIcons
          name="archive"
          size={34}
          color={name === 'Home' ? Colors.COMMENT : Colors.CYAN}
        />
      </Button>
      <Button onPress={() => navigation.navigate('AddRelese')}>
        <EvilIcons
          name="tag"
          size={40}
          color={name === 'AddRelese' ? Colors.COMMENT : Colors.CYAN}
        />
      </Button>
      <Button
        style={style.buttonAddRelese}
        onPress={() => navigation.navigate('AddRelese')}>
        <EvilIcons
          name="plus"
          size={40}
          color={name === 'AddRelese' ? Colors.COMMENT : Colors.CYAN}
        />
      </Button>
      <Button onPress={() => navigation.navigate('AddRelese')}>
        <EvilIcons
          name="chart"
          size={40}
          color={name === 'AddRelese' ? Colors.COMMENT : Colors.CYAN}
        />
      </Button>
      <Button
        style={style.buttonConfigScree}
        onPress={() => navigation.navigate('ConfigScreen')}>
        <EvilIcons
          name="gear"
          size={34}
          color={name === 'ConfigScreen' ? Colors.COMMENT : Colors.CYAN}
        />
      </Button>
    </View>
  );
};

export {BottomNavigationBar};
