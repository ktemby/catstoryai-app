import React, { useState, useEffect } from 'react';
import { View, Pressable, Button, Image, Text, ScrollView, StyleSheet, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles, { getColorScheme } from './Styles';
import Cat, {copernicusValues} from "../models/Cat";
import TextInputWithLabel from "../components/TextInputWithLabel";
import * as FileSystem from 'expo-file-system';
import CachedImage from "../components/CachedImage";
import CachedImageBackground from "../components/CachedImageBackground";
import initialLibrary from '../assets/storydata.json';
import StoryViewer from '../components/StoryViewer';
import LoadLibrary, {resetLibrary, getLibraryPath, getLibraryMaxID, saveStoryToLibrary} from '../models/LibraryStorage';
import Purchases from 'react-native-purchases';
import { Blurhash } from 'react-native-blurhash';


function removeId(library, id) {
  library.forEach((item, index) => {
    if (item.id && item.id === id) {
      data.splice(index, 1);
      return true;
    }
  });
}

let readWriteTest = async () => {
  try {
     } catch(error){
        console.log(error);
    }
    console.log("made it");
};

let IAPTest = (navigation) => {

  let imageData = { "created":1673128176, "data":[{"url":  null }]}

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <ScrollView>
          <View style={styles.container}>

            <View style={[styles.container, {width: "100%"}]}>
              <Blurhash
                blurhash="LGFFaXYk^6#M@-5c,1J5@[or[Q6."
                style={{flex: 1, width: "100%", height: 300, justifyContent: "center", alignItems: "center"}}>
                  <Text style={styles.Heading}>Debug use Only!</Text>
                  <Text style={[styles.text, {textAlign: "center"}]}>purchase testing</Text>
              </Blurhash>
            </View>

            <View style={[styles.container, {width: "100%", backgroundColor: "#212121", padding: 50}]}>
              <Button onPress={() => "yarp"}
               title="Buy 100 credits">
              </Button>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default IAPTest;

/* Accessing local images
const [image, setImage] = useState(null);

 const pickImage = async () => {
   // No permissions request is necessary for launching the image library
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
   });

   console.log(result);

   if (!result.cancelled) {
     setImage(result.uri);
   }
 };
*/
