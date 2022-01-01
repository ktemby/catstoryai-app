import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'react-native';

const imageString = '../assets/copernicus_and_margot.jpeg'

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Hello Copernicus and Margot!! 🎉
      </Text>
      <Image style={{ width: 300, height: 300, borderRadius: 150 }}
  		// source={{ uri: imageString }}
  		source = {require( imageString ) }
      >
      </Image>
    </View>
  );
}
