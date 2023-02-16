import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoriesScreen from "../views/StoryList";
import StoryDetail from "../views/StoryDetails";
import Store from "../views/Store";
import { AppContext } from "../store/context";
import CreateStory from "../views/CreateStory";

const Stack = createNativeStackNavigator();

function StoryStack() {
  const { themeColorStyle } = React.useContext(AppContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Stories"
        component={StoriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Story Detail"
        component={StoryDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Store"
        component={Store}
        options={{
          title: "Store",
          headerTransparent: true,
          headerTintColor: themeColorStyle.color,
        }}
      />
      <Stack.Screen
        name="Create"
        component={CreateStory}
        options={{
          title: "Create",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default StoryStack;
