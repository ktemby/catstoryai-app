import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileStack from '../navigators/ProfileStack';
import StoryStack from '../navigators/StoryStack';

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: '#212121' }} >
    <Tab.Screen name="Stories Stack" component={StoryStack}
      options={{
        tabBarLabel: 'Stories',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cat" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen name="Account Stack" component={ProfileStack}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
         }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
