import * as React from 'react';
import { Button, View, Text, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '../views/About';

const imageString = '../assets/copernicus_and_margot.jpeg';

function ZoomScreen() {
  return (
    <ScrollView>
    <ScrollView horizontal>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source = {require( imageString ) }>
        </Image>
      </View>
    </ScrollView>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={AboutScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Zoomies!" component={ZoomScreen}
          options={{
            title: 'Zoomies!',
            headerTransparent: true,
            headerShadowVisible: false
          }}
        />
      </Stack.Navigator>
  );
}

export default HomeStack;
