import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, Text, ScrollView, StyleSheet, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles, { getColorScheme } from './Styles';
import Cat, {copernicusValues} from "../models/Cat";
import TextInputWithLabel from "../components/TextInputWithLabel";
import * as FileSystem from 'expo-file-system';
import CachedImage from "../components/CachedImage";
import CachedImageBackground from "../components/CachedImageBackground";

let FileSystemTest = (navigation) => {

  //Goal: download a file remotely, then display it using its local uri
  let filename = "mySaveTestFile.png";
  let uri = "https://raw.githubusercontent.com/ktemby/catstoryai-app/main/assets/caticon512.png";

  const fileUri: string = `${FileSystem.documentDirectory}${filename}`;

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <ScrollView>
          <View style={styles.container}>
            <Text>remote image</Text>
            <Image source={{ uri: uri }} resizeMode={'cover'} style={styles.storyListSquare}>
            </Image>

            <Text>cached image</Text>
            <CachedImage source={{ uri: uri }} resizeMode={'cover'} style={styles.storyListSquare}/>

            <Text>remote image background image</Text>
            <ImageBackground source={{ uri: uri }} resizeMode={'cover'} style={styles.storyListSquare}>
              <Text>Beans!</Text>
            </ImageBackground>

            <Text>cached background image</Text>
            <CachedImageBackground source={{ uri: uri }} resizeMode={'cover'} style={styles.storyListSquare}>
              <Text>Cool beans!</Text>
            </CachedImageBackground>

          </View>
        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default FileSystemTest;
