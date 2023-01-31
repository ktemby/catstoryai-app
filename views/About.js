import React from 'react';
import { Text, View, Image, Pressable, ScrollView} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles'
import PurchaseButton from '../components/PurchaseButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const imageString = '../assets/copernicus_and_margot.jpeg';

function AboutScreen({navigation}) {

  let seeMyCatsButton = new PurchaseButton(() => { navigation.navigate('CatCreation')},"See My Cats","〉" );

  let testButton = new PurchaseButton(() => { navigation.navigate('TestPage')},"Test Page","〉" );

  return (
      <LinearGradient {...styles.gradientProps}>
        <SafeAreaView style={styles.safeAreaFull}>
          <ScrollView>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40}}>
                <Text style = {styles.SubHeading}>The Adventures of</Text>
                <Text style = {styles.HeadingAlt}>Copernicus and Margot</Text>
                <Image style={styles.ImageStyle}
              		source = {require( imageString ) }>
                </Image>
                <Text style={{color: 'white', padding: 10}}>Curated AI stories and Art</Text>
                {seeMyCatsButton}
                {testButton}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
  );
}

export default AboutScreen;
