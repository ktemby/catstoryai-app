import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '../views/About';
import CreateStory from '../views/CreateStory';
import CatCreation from '../views/CatCreation';
import Create from '../views/Create';
import styles, {getColorScheme} from '../views/Styles';


const Stack = createNativeStackNavigator();

function ProfileStack() {
  const themeColorStyle = getColorScheme();

  return (
      <Stack.Navigator>
        <Stack.Screen name="Account" component={AboutScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Create" component={CreateStory}
          options={{
            title: 'Create',
            headerTransparent: true,
          }}
        />
        <Stack.Screen name="CatCreation" component={CatCreation}
          options={{
            title: 'My Cats',
            headerTransparent: true,
            headerTintColor: themeColorStyle.color,
          }}
        />
      </Stack.Navigator>
  );
}

export default ProfileStack;
