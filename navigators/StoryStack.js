import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoriesScreen from '../views/StoryList';
import StoryDetail from '../views/StoryDetails';

const Stack = createNativeStackNavigator();

function StoryStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Stories" component={StoriesScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Story Detail" component={StoryDetail}
          options={{
            title: 'The story',
            headerTransparent: true,
            headerShadowVisible: false,
            headerShown:false
          }}
        />
      </Stack.Navigator>
  );
}

export default StoryStack;
