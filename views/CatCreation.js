import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles, {getColorScheme} from './Styles';
import Cat, {copernicusValues} from "../models/Cat";


function renderCatCard(thisCat) {
  const themeColorStyle = getColorScheme();

  return(
    <View style={{flex: 1, marginTop: 40, width: '80%', alignItems: 'center'}}>
    <LinearGradient {...styles.gradientProps}>
      <View style={[themeColorStyle, {flex: 1, margin: 1, alignItems: 'center'}]}>

          <Text style = {[styles.Heading, themeColorStyle, {marginBottom: 5}]} >{thisCat.state.name}</Text>
          <Text style = {[styles.SubHeading, themeColorStyle, { marginBottom: 20}]} >{thisCat.state.title}</Text>

            <Image source={{uri: thisCat.state.image}}  style={[styles.ImageStyle, {borderRadius: '0%', width: '80%', flex: 1, margin: 10}]}></Image>

          <Text style = {[styles.body, themeColorStyle, {textAlign: 'center'}]} >{thisCat.catText()}</Text>

      </View>
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
  const insets = useSafeAreaInsets();
  const themeColorStyle = getColorScheme();

  return (

      <SafeAreaView style={[styles.safeAreaHeader, themeColorStyle, {paddingBottom: -insets.bottom}]}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'center'}}>

            {renderCatCard(copernicus)}
            {renderCatCard(margot)}

          </View>
        </ScrollView>
      </SafeAreaView>

  );
}

export default CatCreation;
