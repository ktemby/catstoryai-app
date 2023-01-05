import React from 'react';
import { StyleSheet } from 'react-native';

const gitCDN = "https://github.com/ktemby/expo-test-app/raw/main/assets/stories/";

const styles = StyleSheet.create({
  gradientProps: {
    colors: ['#03DAC6', '#6200EE'],
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%",
      width: "100%",
    },
    start: { x: 0, y: 0.4 },
    end: { x: 2, y: 0.2 },
  },
  Heading: {
    fontSize: 30,
    color: '#000',
    margin: 35,
  },
  HeadingAlt: {
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
  },
  body: {
    fontSize: 20,
    color: '#000',
    lineHeight: 30,
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
    width: 200,
    height: 200,
  },
  square: {
    height: 200,
    width: 200,
    textAlign: "bottom",
    alignItems: "bottom",
    margin: 0,
  },
  title: {
    fontWeight: 'bold',
    width: "80%",
    color: "#FFFFFF",
    backgroundColor: '#424242AA',
    position:'absolute',
    bottom: 0,
    margin: 10,
  },
  ImageStyle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    margin: 15
  }
});

export default styles;
