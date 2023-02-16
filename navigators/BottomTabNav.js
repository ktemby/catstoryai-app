import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AccountStack from "../navigators/AccountStack";
import StoryStack from "../navigators/StoryStack";
import CreateStory from "../views/CreateStory";

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "#212121" }}>
      <Tab.Screen
        name="Stories Stack"
        component={StoryStack}
        options={{
          tabBarLabel: "Stories",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Creation"
        component={CreateStory}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account Stack"
        component={AccountStack}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
