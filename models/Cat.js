import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../views/Styles';

class Cat extends React.Component {
  state = {
    name :"Adoracat",
    color : "brown",
    breed : "Tabby",
    breedMix : "",
    feature : "soft fur",
    personality : "playful",
    superpower : "go zoomies",
    title: "The New Cat on the Block",
    image : "https://via.placeholder.com/256x256.png?text=Get+Portrait+First",
  };

  catText() {
    return (
      ["A ",this.state.color," ",this.state.breed," ",
      (this.state.breedMix.length > 1 ? this.state.breedMix.concat(" mix ") : ''),
      "named ",this.state.name,
      ", who has a ", this.state.personality," personality, ",
      this.state.feature,
      ", and loves to ", this.state.superpower, "."].join("")
    )
  }

  render() {
    return (
      <View>
      <Text style = {styles.Heading} >{this.state.name}</Text>
      <Image source={{uri: this.state.image}}  style={[styles.ImageStyle, {marginLeft: 20}]}></Image>
      <Text style = {this.props.style} >{this.catText()}</Text>

      </View>
    );
  }
}

export default Cat;

export let copernicusValues = {
  name :"Copernicus",
  color : "brown",
  breed : "Tabby",
  breedMix : "",
  //breedMix : "Egyptian Mao",
  feature : "spots and stripes",
  personality : "loving",
  superpower : "cuddle and purr",
  image : "https://d2sphvb6m6942c.cloudfront.net/Copernicus%20Wonders%20at%20the%20Stars.png",
  title: "The Renassiance Cat",
};

export let margotValues = {
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
