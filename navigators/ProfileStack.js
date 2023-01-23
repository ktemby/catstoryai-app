import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '../views/About';
import ZoomScreen from '../views/ZoomScreen';
import CreateStory from '../views/CreateStory';
import CatCreation from '../views/CatCreation';
import Create from '../views/Create';
import CreateTestStoryGPT from '../views/CreateTestStoryGPT';

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Account" component={AboutScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Zoomies!" component={ZoomScreen}
          options={{
            title: 'Zoomies!',
            headerTransparent: true,
            headerShadowVisible: false
          }}
        />
        <Stack.Screen name="Create" component={CreateStory}
          options={{
            title: 'Create',
            headerTransparent: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name="CatCreation" component={CatCreation}
          options={{
            title: 'My Cats',
            headerTransparent: true,
            headerShadowVisible: false
          }}
        />
      </Stack.Navigator>
  );
}

export default ProfileStack;
