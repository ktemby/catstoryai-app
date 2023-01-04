import React from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView, Image, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import customData from '../storydata.json';

//<ImageBackground source={item.image} resizeMode="cover" style={styles.image}>
//</ImageBackground>

//const imageString = '../assets/copernicus_and_margot.jpeg';
//""


///<Text style={styles.title}>{gitCDN.concat(item.image)}</Text>

//const imageString = "../stories/copernicus_in_the_countryside.png";
const gitCDN = "https://github.com/ktemby/expo-test-app/raw/main/stories/";
const imageString = "https://github.com/ktemby/expo-test-app/raw/main/assets/copernicus_and_margot.jpeg"

var renderItem = ({ item }) => (
    <View style={styles.square}>
    <ImageBackground source={{ uri: gitCDN.concat(item.image) }} resizeMode="cover" style={styles.image}>
    <Text style={styles.title}>{(item.name)}</Text>
    </ImageBackground>

    </View>
  );

function StoriesScreen() {
  return (

    <LinearGradient
      colors={['#03DAC6', '#6200EE']}
      style={styles.linearGradient}
      start={{ x: 0, y: 0.4 }}
      end={{ x: 2, y: 0.2 }}>

    <SafeAreaView >

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <FlatList style={{padding:0}}
          data={customData}
          renderItem={renderItem}
          numColumns={2}
          //columnWrapperStyle={styles.row}
        />
      </View>
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  image: {
      //flex: 1,
      width: 150,
      height: 150,
      borderRadius: 20,
      margin: 10
    },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    width: "100%",
  },
  square: {
    //flexGrow: 1,
    //flexShrink: 1,
    flexBasis: '40%',
    height: 150,
    width: 150,
    borderRadius: 20,
    textAlign: "bottom",
    alignItems: "bottom",
    margin: 10,
  },
  row: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    //fontSize: 32,
    width: "80%",
    color: "#FFFFFF",
    backgroundColor: '#424242AA',
    position:'absolute',
    bottom: 0,
    //paddingTop: 90,
    margin: 10,
  },
});

export default StoriesScreen;
