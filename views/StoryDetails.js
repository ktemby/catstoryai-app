import React from 'react';
import { Text, View, Image, ScrollView} from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import customData from '../assets/storydata.json';
import { LinearGradient } from "expo-linear-gradient";
import styles, {getColorScheme} from './Styles';

const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";

function StoryDetail({ route, navigation}) {
  const { item } = route.params;
  const themeColorStyle = getColorScheme();

  return (
      <SafeAreaView style={[styles.safeAreaFull, themeColorStyle]}>
        <ScrollView>
          <View style={[styles.container, themeColorStyle]}>
            <Text style={[styles.Heading, themeColorStyle]}>{(item.name)}</Text>
            <Image source={{ uri: myCDN.concat(item.image) }} resizeMode={'cover'} style={styles.imageDetail}></Image>
            <Text style={[styles.body, themeColorStyle]}>{(item.description)}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

export default StoryDetail;
