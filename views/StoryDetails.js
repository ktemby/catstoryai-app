import React from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, useColorScheme} from 'react-native';
import customData from '../storydata.json';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';

const gitCDN = "https://github.com/ktemby/expo-test-app/raw/main/assets/stories/";

function StoryDetail({ route, navigation}) {
  const { item } = route.params;
  const colorScheme = useColorScheme();
  const themeColorStyle = styles.themeColorStyle[colorScheme];

  return (
      <SafeAreaView style={themeColorStyle}>
        <ScrollView>
          <View style={[styles.container, themeColorStyle]}>
            <Text style={[styles.Heading, themeColorStyle]}>{(item.name)}</Text>
            <Image source={{ uri: gitCDN.concat(item.image) }} resizeMode={'cover'} style={styles.imageDetail}></Image>
            <Text style={[styles.body, themeColorStyle]}>{(item.description)}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

export default StoryDetail;
