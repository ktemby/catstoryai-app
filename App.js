import React, {useEffect, useContext} from 'react';
import Root from './navigators/Root';
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import { REVENUE_CAT_PUB_KEY_APPLE } from '@env';
import { REVENUE_CAT_PUB_KEY_GOOGLE } from '@env';
import {AppContextProvider} from './store/context';

export default function App() {

  useEffect(() => {
      (Platform.OS === "android")
      ? Purchases.configure({ apiKey: REVENUE_CAT_PUB_KEY_GOOGLE})
      : Purchases.configure({ apiKey: REVENUE_CAT_PUB_KEY_APPLE})
    }, []);

  return (
    <AppContextProvider>
      <Root />
    </AppContextProvider>
  );
}
