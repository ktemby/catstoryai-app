import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../views/Home';
import SettingsScreen from '../views/Settings';
//import { Icon} from 'react-native-vector-icons/ionicons'

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}
	 	// tabBarIcon={<Icon name="homes" size={30} color="#900" />}
	/>
      <Tab.Screen name="Voters" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default BottomTab;
