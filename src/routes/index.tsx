import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RoutesApp from './routes.app';
import {Omni} from '../Theme';
import {ContextProvider} from '../Contexts';

const Routes: React.FC = () => {
  return (
    <NavigationContainer theme={Omni}>
      <ContextProvider>
        <RoutesApp />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default Routes;
