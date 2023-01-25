import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './navigators/BottomTabNav';
import { useColorScheme } from 'react-native';
import { MyDarkTheme, MyLightTheme} from "./views/Styles";

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      <BottomTab />
    </NavigationContainer>
  );
}
