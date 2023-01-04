import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeStack from '../views/HomeStack';
import StoryStack from '../views/StoryStack';

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#212121' }}
    >
    <Tab.Screen name="Stories Stack" component={StoryStack}
      options={{
        tabBarLabel: 'Stories',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cat" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen name="Home Stack" component={HomeStack}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="information" color={color} size={26} />
          ),
         }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
