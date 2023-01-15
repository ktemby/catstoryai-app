import React from 'react';
import { Text, View, Pressable, FlatList, ImageBackground} from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import customData from '../storydata.json';
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//const myCDN = "https://github.com/ktemby/expo-test-app/raw/main/assets/stories/";
const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";
function StoriesScreen({navigation}) {
  const insets = useSafeAreaInsets();

  var renderItem = ({ item }) => (
      <Pressable onPress={() => navigation.navigate('Story Detail', {item} )}>
        <View style={styles.storyListSquare}>
          <ImageBackground source={{ uri: myCDN.concat(item.image) }} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>{(item.name)}</Text>
          </ImageBackground>
        </View>
      </Pressable>
  );

  return (
    <LinearGradient {...styles.gradientProps}>
    <SafeAreaView style={[styles.safeArea, {alignItems: 'center', paddingBottom: -insets.bottom}]}>
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
