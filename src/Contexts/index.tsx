import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface ParamsContext {
  screen: {
    name: string;
    isActive: boolean;
  };
  setActiveScreen: Dispatch<SetStateAction<{name: string; isActive: boolean}>>;
}

const ContextScreen = createContext<ParamsContext>({} as ParamsContext);

const ContextProvider: React.FC = ({children}) => {
  const [activeScreen, setActiveScreen] = useState({
    name: 'Home',
    isActive: true,
  });

  return (
    <ContextScreen.Provider
      value={{
        screen: activeScreen,
        setActiveScreen,
      }}>
      {children}
    </ContextScreen.Provider>
  );
};

export {ContextScreen, ContextProvider};
