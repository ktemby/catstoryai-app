import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView, useColorScheme} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import Cat, {copernicusValues} from "../models/Cat";

function renderCatCard(thisCat) {
  return(
    <View style={{flex: 1, marginBottom: 40, width: '100%'}}>
      <LinearGradient {...styles.gradientProps}>
        <Text style = {[styles.Heading, {marginBottom: 5}]} >{thisCat.state.name}</Text>
        <Text style = {[styles.SubHeading, {marginLeft: 35, color: 'black', marginBottom: 20}]} >{thisCat.state.title}</Text>
        <Image source={{uri: thisCat.state.image}}  style={[styles.ImageStyle, {marginLeft: 20}]}></Image>
        <Text style = {styles.body} >{thisCat.catText()}</Text>
      </LinearGradient>
    </View>
  )
};



let margotValues = {
  name :"Margot",
  color : "white",
  breed : "Lynx Point Siamese",
  breedMix : "Tabby",
  feature : "gorgeous blue eyes",
  personality : "playful",
  superpower : "hunt and make friends",
  image : "https://raw.githubusercontent.com/ktemby/catstoryai-app/main/ml/models/MargotModel/Margot_Face.jpeg",
  title: "The Huntress",
}

let margot = new Cat();
margot.state = margotValues;

let copernicus = new Cat();
copernicus.state = copernicusValues;

function CatCreation({navigation}) {
  const colorScheme = useColorScheme();
  const themeColorStyle = styles.themeColorStyle[colorScheme];
  const insets = useSafeAreaInsets();

  return (
      <SafeAreaView style={[styles.safeAreaHeader, themeColorStyle, {paddingBottom: -insets.bottom}]}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'flex-start', margin: 20}}>

            {renderCatCard(copernicus)}
            {renderCatCard(margot)}

          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

export default CatCreation;
