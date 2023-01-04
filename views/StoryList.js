import React from 'react';
import { Text, View, Pressable, StyleSheet, FlatList, ScrollView, Image, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import customData from '../storydata.json';

const gitCDN = "https://github.com/ktemby/expo-test-app/raw/main/stories/";

//onPress={() => navigation.navigate('Zoomies!')}
//onPress={() => alert("clicked: ".concat(item.name)) }
function StoriesScreen({navigation}) {
  var renderItem = ({ item }) => (
      <Pressable
        onPress={() => navigation.navigate('Story Detail', {item} )}
        >
      <View style={styles.square}>
        <ImageBackground source={{ uri: gitCDN.concat(item.image) }} resizeMode="cover" style={styles.image}>
          <Text style={styles.title}>{(item.name)}</Text>
        </ImageBackground>
      </View>
      </Pressable>
  );

  return (
    <LinearGradient
      colors={['#03DAC6', '#6200EE']}
      style={styles.linearGradient}
      start={{ x: 0, y: 0.4 }}
      end={{ x: 2, y: 0.2 }}>

      <SafeAreaView >
        <View>
          <FlatList style={{padding:0}}
            data={customData}
            renderItem={renderItem}
            numColumns={2}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    height: "100%",
    width: "100%",
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
});

export default StoriesScreen;
