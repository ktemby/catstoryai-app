import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import customData from '../storydata.json';
import { LinearGradient } from "expo-linear-gradient";

/*
var renderItem = ({ item }) => (
    <View style={styles.square}>

    </View>
  );

  */

// Think of this as a template but I'll hardcode the first one.

const gitCDN = "https://github.com/ktemby/expo-test-app/raw/main/stories/";

function StoryDetail({ route, navigation}) {
  const { item } = route.params;

  return (
    <LinearGradient
      //colors={['#030000', '#6200EE']}
      colors={['#FFFFFF', '#FFFFFF']}
      style={styles.linearGradient}
      start={{ x: 0, y: 0.4 }}
      end={{ x: 2, y: 0.2 }}>

    <SafeAreaView>
    <ScrollView>


      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.Heading }>{(item.name)}</Text>

      <Image source={{ uri: gitCDN.concat(item.image) }} resizeMode={'cover'} style={styles.image}>
      </Image>

        <Text style={styles.body }>{(item.description)}</Text>
      </View>

    </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    width: "100%",
  },
  Heading: {
    fontSize: 30,
    color: '#000',
    margin: 35,
    //textAlign: 'left',
  },
  body: {
    fontSize: 20,
    color: '#000',
    lineHeight: 30,
    //textAlign: 'center',
    margin: 35,
  },
  SubHeading: {
    fontSize: 12,
    color: '#FFF',
  },
  image: {
    width: '100%',
    flex:1,
    width: 400,
    height: 400,
    marginBottom: 20,
  }
})

export default StoryDetail;
