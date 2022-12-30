import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

imageString = 'https://scontent-sea1-1.cdninstagram.com/v/t51.2885-15/277332634_553313109384248_1468714574737808589_n.webp?stp=dst-jpg_e35&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=DFnSAGrREoAAX_0-nQE&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjgwNjIzMzkzMzU4NzkyOTgyMw%3D%3D.2-ccb7-5&oh=00_AfBLGoI04DXLYGlBhPThq4fkSvutfQiRGKaKeZ4UCHYxCQ&oe=6392EBF4&_nc_sid=30a2ef'

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Hello Copernicus and Margot!! 🎉
      </Text>
      <Image style={{ width: 300, height: 300, borderRadius: 150 }} source={{ uri: imageString }} ></Image>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Voted fav couple on the island every single time!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} tabBarIcon={<Icon name="homes" size={30} color="#900" />} />
      <Tab.Screen name="Voters" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

