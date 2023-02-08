import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '../views/About';
import CatCreation from '../views/CatCreation';
import Settings from '../views/Settings';
import Store from '../views/Store';
import {AppContext} from '../store/context';

const Stack = createNativeStackNavigator();

function AccountStack() {
  const {themeColorStyle} = React.useContext(AppContext);

  return (
      <Stack.Navigator>
        <Stack.Screen name="Account" component={AboutScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="CatCreation" component={CatCreation}
          options={{
            title: 'My Cats',
            headerTransparent: true,
            headerTintColor: themeColorStyle.color,
          }}
        />
        <Stack.Screen name="Store" component={Store}
          options={{
            title: 'Store',
            headerTransparent: true,
            headerTintColor: themeColorStyle.color,
          }}
        />
        <Stack.Screen name="Settings" component={Settings}
          options={{
            title: 'Settings',
            headerTransparent: true,
            headerTintColor: themeColorStyle.color,
          }}
        />
      </Stack.Navigator>
  );
}

export default AccountStack;
