import React from 'react';
import { Text, View, Image, Pressable} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles'

const imageString = '../assets/copernicus_and_margot.jpeg';

function AboutScreen({navigation}) {

  return (
      <LinearGradient {...styles.gradientProps}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {styles.SubHeading}>The Adventures of</Text>
            <Text style = {styles.HeadingAlt}>Copernicus and Margot</Text>
            <Pressable onPress={() => navigation.navigate('Zoomies!')} >
              <Image style={styles.ImageStyle}
            		source = {require( imageString ) }>
              </Image>
            </Pressable>
            <Text style={{color: 'white', paddingTop: 10}}>Curated AI stories and Art</Text>
        </View>
      </LinearGradient>
  );
}






export default AboutScreen;
