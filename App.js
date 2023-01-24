import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import BottomTab from './navigators/BottomTabNav';
import { useColorScheme } from 'react-native';

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#212121',
  },
  paddingLeft: 10,
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
  },
};

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      <BottomTab />
    </NavigationContainer>
  );
}
