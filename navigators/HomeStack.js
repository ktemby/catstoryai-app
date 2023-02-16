import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutScreen from "../views/About";
import CreateStory from "../views/CreateStory";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AboutScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Create"
        component={CreateStory}
        options={{
          title: "Story Creation",
          headerTransparent: true,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
