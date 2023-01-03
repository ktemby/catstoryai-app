import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../views/HomeStack';
import StoriesScreen from '../views/Stories';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
//const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      //activeColor="#e91e63" #6200EE '#03DAC6'
      barStyle={{ backgroundColor: '#212121' }}
    >
      <Tab.Screen name="Home" component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
         }}
      />
      <Tab.Screen name="Stories" component={StoriesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cat" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
