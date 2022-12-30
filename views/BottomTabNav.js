import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../views/Home';
import SettingsScreen from '../views/Settings';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{tabBarIcon: () => <Ionicons name="home-sharp" />}}
      />
      <Tab.Screen name="Votes" component={SettingsScreen}
        options={{tabBarIcon: () => <Ionicons name="thumbs-up-sharp" />}}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
