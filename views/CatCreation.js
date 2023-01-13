import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView, SafeAreaView} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import Cat from "../models/Cat";

function renderCatCard(thisCat) {
  return(
    <View style={{flex: 1, marginBottom: 40}}>
      <LinearGradient {...styles.gradientProps}>
      <Text style = {[styles.Heading, {marginBottom: 5}]} >{thisCat.state.name}</Text>
      <Text style = {[styles.SubHeading, {marginLeft: 35, color: 'black', marginBottom: 20}]} >{thisCat.state.title}</Text>
      <Image source={{uri: thisCat.state.image}}  style={[styles.ImageStyle, {marginLeft: 20}]}></Image>
      <Text style = {styles.body} >{thisCat.catText()}</Text>
      </LinearGradient>
    </View>
  )
};

let copernicusValues = {
  name :"Copernicus",
  color : "brown",
  breed : "Tabby",
  breedMix : "Egyptian Mao",
  feature : "fluffy ear tufts",
  personality : "loving",
  superpower : "cuddle and purr",
  image : "https://d2sphvb6m6942c.cloudfront.net/Copernicus%20Wonders%20at%20the%20Stars.png",
  title: "The Renassiance Cat",
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
  return (
      <SafeAreaView style={{ flex: 1, width: '100%'}}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'left', margin: 20}}>

            {renderCatCard(copernicus)}
            {renderCatCard(margot)}

          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

export default CatCreation;
