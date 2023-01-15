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
            <Pressable onPress={() => navigation.navigate('Create')} >
              <View style={{backgroundColor: '#424242AA', marginTop: 30, borderRadius: 5 }}>
              <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Create a Story!</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('CatCreation')} >
              <View style={{backgroundColor: '#424242AA', marginTop: 30, borderRadius: 5 }}>
              <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>See My Cats</Text>
              </View>
            </Pressable>

        </View>
      </LinearGradient>
  );
}

export default AboutScreen;

// Next builds
/*
<Pressable onPress={() => navigation.navigate('Create GPT')} >
  <View style={{backgroundColor: '#424242AA', marginTop: 30, borderRadius: 5 }}>
  <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Test Story Gen</Text>
  </View>
</Pressable>
*/
