import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../views/Styles';
//name, color, breed, breedMix, feature, personality, superpower, image

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
      ", with a ", this.state.personality," personality ",
      "and ",this.state.feature,
      " who loves to ", this.state.superpower, "."].join("")
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


//
