import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { Image } from 'react-native';
import { Animated } from "react-native";


const imageString = '../assets/copernicus_and_margot.jpeg';
// note this image string is from instagram but the signed url expires after 24 hours. Instead we'll hard code
// imageString = 'https://scontent-sea1-1.cdninstagram.com/v/t51.2885-15/277332634_553313109384248_1468714574737808589_n.webp?stp=dst-jpg_e35&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=DFnSAGrREoAAX_0-nQE&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjgwNjIzMzkzMzU4NzkyOTgyMw%3D%3D.2-ccb7-5&oh=00_AfBLGoI04DXLYGlBhPThq4fkSvutfQiRGKaKeZ4UCHYxCQ&oe=6392EBF4&_nc_sid=30a2ef'

function HomeScreen({navigation}) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          Hello Copernicus and Margot!! 🎉
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Zoomies!')} >
          <Image style={{ width: 300, height: 300, borderRadius: 150, margin: 15}}
        		// source={{ uri: imageString }} // used for remotely loading an image
        		source = {require( imageString ) }>
          </Image>
        </Pressable>
      </View>

  );
}

export default HomeScreen;
