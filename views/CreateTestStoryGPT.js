import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView, SafeAreaView} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import Cat from "../models/Cat";

function CreateTestStoryGPT({navigation}) {

  let cat = new Cat();

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={{ flex: 1, width: '100%'}}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'left', margin: 20}}>
            <Text>AI Story Input:</Text>
            <Text>Tell me a story about {cat.catText()}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default CreateTestStoryGPT;
