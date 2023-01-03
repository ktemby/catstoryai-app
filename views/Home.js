import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const imageString = '../assets/copernicus_and_margot.jpeg';

function HomeScreen({navigation}) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LinearGradient
          colors={['#03DAC6', '#6200EE']}
          style={styles.linearGradient}
          start={{ x: 0, y: 0.4 }}
          end={{ x: 2, y: 0.2 }}
        >
        <Text style = {styles.SubHeading}>
          The Adventures of
        </Text>
        <Text style = {styles.Heading}>
          Copernicus and Margot
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Zoomies!')} >
          <Image style={styles.ImageStyle}
        		source = {require( imageString ) }>
          </Image>
        </Pressable>
        </LinearGradient>
      </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    width: "100%",
  },
  Heading: {
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
  },
  SubHeading: {
    fontSize: 12,
    color: '#FFF',
  },
  ImageStyle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    margin: 15
  }
})

export default HomeScreen;
