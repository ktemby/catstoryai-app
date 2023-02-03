import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './navigators/BottomTabNav';
import { Platform, useColorScheme } from 'react-native';
import { MyDarkTheme, MyLightTheme} from "./views/Styles";
import Purchases from 'react-native-purchases';
import { REVENUE_CAT_PUB_KEY_APPLE } from '@env';
import { REVENUE_CAT_PUB_KEY_GOOGLE } from '@env';

export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {
      (Platform.OS === "android")
      ? Purchases.configure({ apiKey: REVENUE_CAT_PUB_KEY_GOOGLE})
      : Purchases.configure({ apiKey: REVENUE_CAT_PUB_KEY_APPLE})
    }, []);

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      <BottomTab />
    </NavigationContainer>
  );
}
