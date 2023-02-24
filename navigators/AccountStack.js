import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutScreen from "../views/About";
import CatCreation from "../views/CatCreation";
import Settings from "../views/Settings";
import BalanceTester from "../views/BalanceTester";
import Account from "../views/Account";
import CatDetails from "../views/CatDetails";
import Store from "../views/Store";
import { AppContext } from "../store/context";
import CatEdit from "../views/CatEdit";

const Stack = createNativeStackNavigator();

function AccountStack() {
  const { themeColorStyle } = React.useContext(AppContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          title: "Cat Tester",
          headerTransparent: true,
          headerTintColor: themeColorStyle.color,
        }}
      />
      <Stack.Screen
        name="Cat Details"
        component={CatDetails}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          title: "",
          headerTransparent: true,
          headerTintColor: themeColorStyle.color,
        }}
      />
      <Stack.Screen
        name="Cat Editor"
        component={CatEdit}
        options={{
          title: "",
          //headerShown: false,
          headerTransparent: true,
          //headerBackTitleVisible: false,
          headerTintColor: themeColorStyle.color,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CatCreation"
        component={CatCreation}
        options={{
          title: "Cats",
          headerTransparent: true,
          headerTintColor: themeColorStyle.color,
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
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          headerTransparent: true,
          headerTintColor: themeColorStyle.color,
        }}
      />
      <Stack.Screen
        name="BalanceTester"
        component={BalanceTester}
        options={{
          title: "BalanceTester",
          headerTransparent: true,
          headerTintColor: themeColorStyle.color,
        }}
      />
    </Stack.Navigator>
  );
}

export default AccountStack;
