import React from 'react';
import { Text, View, Pressable, FlatList, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import customData from '../storydata.json';
import styles from './Styles'

const gitCDN = "https://github.com/ktemby/expo-test-app/raw/main/assets/stories/";

function StoriesScreen({navigation}) {
  var renderItem = ({ item }) => (
      <Pressable onPress={() => navigation.navigate('Story Detail', {item} )}>
        <View style={styles.storyListSquare}>
          <ImageBackground source={{ uri: gitCDN.concat(item.image) }} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>{(item.name)}</Text>
          </ImageBackground>
        </View>
      </Pressable>
  );

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={{width: '100%', alignItems: 'center'}}>
        <View>
          <FlatList
            data={customData}
            renderItem={renderItem}
            numColumns={2}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default StoriesScreen;
