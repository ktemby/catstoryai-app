import React, {useEffect, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from '../navigators/BottomTabNav';
import { MyDarkTheme, MyLightTheme} from "../views/Styles";
import {AppContext} from '../store/context';

export default function Root() {
  const {themeColorStyle} = useContext(AppContext);

  return (
      <NavigationContainer theme={themeColorStyle}>
        <BottomTab />
      </NavigationContainer>
  );
}
