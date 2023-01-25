import React from 'react';
import { Text, View, Image, Pressable, FlatList, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import customData from '../assets/storydata.json';
import styles from '../views/Styles'
import CachedImageBackground from "../components/CachedImageBackground";

const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";

function StoriesScreen({navigation}) {
  var renderItem = ({ item }) => (
      <Pressable onPress={() => navigation.navigate('Story Detail', {item} )}>
        <View style={styles.storyListSquare}>
          <CachedImageBackground source={{ uri: myCDN.concat(item.image).replace(/ /g, "%20") }} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>{(item.name)}</Text>
          </CachedImageBackground>
        </View>
      </Pressable>
  );
  return (
    <LinearGradient {...styles.gradientProps}>
    <SafeAreaView style={[styles.safeAreaFull, {alignItems: 'center'}]}>
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
