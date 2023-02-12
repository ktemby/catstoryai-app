import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from '../navigators/BottomTabNav';
import { AppContext } from '../store/context';

export default Root = () => {
  const {themeColorStyle} = useContext(AppContext);

  return (
      <NavigationContainer theme={themeColorStyle}>
        <BottomTab />
      </NavigationContainer>
  );
}
