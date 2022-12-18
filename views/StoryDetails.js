import React from 'react';
import { Text, View, Image, ScrollView, SafeAreaView} from 'react-native';
import customData from '../storydata.json';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';

const gitCDN = "https://github.com/ktemby/expo-test-app/raw/main/assets/stories/";

function StoryDetail({ route, navigation}) {
  const { item } = route.params;

  return (
      <SafeAreaView>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.Heading }>{(item.name)}</Text>
            <Image source={{ uri: gitCDN.concat(item.image) }} resizeMode={'cover'} style={styles.imageDetail}></Image>
            <Text style={styles.body }>{(item.description)}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

export default StoryDetail;
