import React from 'react';
import HomeScreen from '../screens/Home';
import {AddRelease} from '../screens/AddRelease';
import {ConfigScreen} from '../screens/ConfigScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigationBar} from '../components/BottomNavigationBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddRelese" component={AddRelease} />
      <Stack.Screen name="ConfigScreen" component={ConfigScreen} />
    </Stack.Navigator>
  );
};

const RoutesApp: React.FC = () => {
  return (
    <Tab.Navigator
      lazy
      tabBarOptions={{
        style: {
          height: 55,
          backgroundColor: '#221133',
        },
      }}
      tabBar={({navigation}) => (
        <BottomNavigationBar bank="1" {...{navigation}} />
      )}>
      <Tab.Screen name="Bottom" component={StackNav} />
    </Tab.Navigator>
  );
};

export default RoutesApp;
