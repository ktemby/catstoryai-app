import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './navigators/BottomTabNav';
import { useColorScheme } from 'react-native';
import { MyDarkTheme, MyLightTheme} from "./views/Styles";
import Purchases from 'react-native-purchases';
import { REVENUE_CAT_PUB_KEY } from '@env';

export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {
      Purchases.configure({ apiKey: REVENUE_CAT_PUB_KEY});
    }, []);

  //  Purchases.configure({ apiKey: '' });
  //        /* await Purchases.setup(""); */
  //      } else if (Platform.OS === "android") {
  //        /* await Purchases.setup("public_google_sdk_key"); */
  //      }


  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      <BottomTab />
    </NavigationContainer>
  );
}
