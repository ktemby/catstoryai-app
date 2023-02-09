import React from 'react';
import { StyleSheet, useColorScheme} from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#212121',
  },
  color: "black",
  backgroundColor: 'white',
  highlight: "#616161",
};

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    headerTitleTint: 'white',
  },
  backgroundColor: '#212121',
  color: "white",
  highlight: "#616161",
};

export const getColorScheme = () => {
  const colorScheme = useColorScheme();
  let themeColorStyle = colorScheme === 'dark' ? MyDarkTheme : MyLightTheme;
  //const themeColorStyle = styles.themeColorStyle[colorScheme];
  return themeColorStyle;
};

const styles = StyleSheet.create({
  storeItem: {
    container : {
      borderRadius: 15, borderWidth: 1, borderColor: "#616161", paddingBottom: 25, paddingTop: 25, justifyContent: "center", alignItems: "center",
    },
    text : {
      fontSize: 18, fontWeight: "bold", textAlign: "center",
    },
    price : {
      fontSize: 18, marginTop: 10, backgroundColor:"#21212122", paddingLeft: 15, paddingRight: 15, borderRadius: 15
    }, 
  },
  safeAreaHeader: {
    flex: 1,
    width: '100%',
    paddingTop: 45, //Needed for iOS when using react-native-safearea-context for SafeAreaView
    paddingBottom: -50
  },
  safeAreaFull: {
    flex: 1,
    width: '100%',
    paddingBottom: -50,
  },
  loadingtext:{
    fontSize: 28,
    fontWeight: 'bold',
  },
  text:{
    fontSize:24,
    margin:10
  },
  gradientProps: {
    colors: ['#03DAC6', '#6200EE'],
    style: {
      height: "100%",
      width: "100%",
    },
    start: { x: 0, y: 0.4 },
    end: { x: 2, y: 0.2 },
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Heading: {
    fontSize: 30,
    //fontWeight: 700,
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
    //width: '80%'
  },
  SubHeading: {
    fontSize: 12,
    color: '#FFF',
  },
  imageDetail: {
    width: '100%',
    flex:1,
    //width: 400,
    height: 400,
    //marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ImageStyle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    margin: 15,
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
  },
  inputWrapper: {
    width: '100%',
    //margin: 20,
    //marginBottom: 10,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: "center",
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainerStyle: {
    alignItems: "flex-start",
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#424242AA'
  },
});

export default styles;
