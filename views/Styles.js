import React from 'react';
import { StyleSheet } from 'react-native';

const gitCDN = "https://github.com/ktemby/expo-test-app/raw/main/assets/stories/";

const styles = StyleSheet.create({
  gradientProps: {
    colors: ['#03DAC6', '#6200EE'],
    //future dark gradient ['#212121', '#3000BB'],
    style: {
      height: "100%",
      width: "100%",
    },
    start: { x: 0, y: 0.4 },
    end: { x: 2, y: 0.2 },
  },
  themeColorStyle: {
    light: {
      color: "black",
    },
    dark: {
      backgroundColor: '#212121',
      color: "white",
    },
    null: {
      color: "black",
    },
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Heading: {
    fontSize: 30,
    margin: 35,
  },
  HeadingAlt: {
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
  },
  body: {
    fontSize: 20,
    lineHeight: 35,
    margin: 35,
  },
  SubHeading: {
    fontSize: 12,
    color: '#FFF',
  },
  imageDetail: {
    width: '100%',
    flex:1,
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ImageStyle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    margin: 15
  },
  storyListSquare: {
    flex: 1,
    height: 200,
    width: 200,
    textAlign: "bottom",
  },
  title: {
    fontWeight: 'bold',
    width: "80%",
    color: "#FFFFFF",
    backgroundColor: '#424242AA',
    position:'absolute',
    bottom: 0,
    margin: 10,
  }
});

export default styles;
