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
import LoadLibrary from '../models/LibraryStorage';

let getMaxID = async (arrayData) => {
  return (
    arrayData.reduce((arr, oId) => {
      return (arr = arr> oId.id ? arr : oId.id);
      })
  );
};

let resetLibrary = async (setLibrary) => {
  // Create: (write the initial custom data to storage)
  let libraryFilename = 'libraryData.json';
  const libraryPath: string = `${FileSystem.documentDirectory}${libraryFilename}`;
  let factoryLibrary = await FileSystem.writeAsStringAsync( libraryPath, JSON.stringify(initialLibrary));
  const libraryCheck = await FileSystem.getInfoAsync(libraryPath);
  console.log(libraryCheck);
  console.log("reset library to initial");
};

function removeId(data, id) {
  data.forEach((item, index) => {
    if (item.id && item.id === id) {
      data.splice(index, 1);
      return true;
    }
  });
}

let readWriteTest = async () => {
  try {
    let newstory = {
      "name": "A Cat Adventure",
      "id": "",
      "description": "Here's a new story item we'll add to our library",
      "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ifp2DX8dA4TXI6LQwRqbuIHO/user-T4KQTXd9eDOjXgaF7j0c0fbE/img-NdTAswSVglQkFamekIRVO0cJ.png?st=2023-01-27T07%3A11%3A28Z&se=2023-01-27T09%3A11%3A28Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-26T23%3A32%3A35Z&ske=2023-01-27T23%3A32%3A35Z&sks=b&skv=2021-08-06&sig=Tq0zwNFBBvQfBBakVD/uQFdlOiSf2oeuWYpUlzKXfN4%3D",
      "storyInput": "Tell me a story about a cat named Copernicus who is a small brown tabby with ear tufts and a loving personality.",
      "imageInput": "A Cat Adventure with magical castles on a mountain",
      "hiddenInput": ", cat, oil painting, highly detailed, global illumination, fantasy, ",
      "cdn": false,
    };

    // Read: read it back in as a string
    let libraryFilename = 'libraryData.json';
    const libraryPath: string = `${FileSystem.documentDirectory}${libraryFilename}`;

    let libraryData = await LoadLibrary();
    console.log("Finished awaiting load === Read: libraryData: ");
    console.log(libraryData[2].name);
    console.log(libraryData[2].isFeatured);

    // Create part 2:
    // Push new story onto the new listen
    // read the highest id value currently in stack.
    let maxId = libraryData.reduce((arr, oId) => {
      return (arr = arr> oId.id ? arr : oId.id);
      });
    console.log(`maxId: ${maxId}`);

    newstory.id = maxId+1;

    libraryData.push(newstory);
    console.log("library size now");
    let newMax = libraryData.reduce((arr, oId) => {
      return (arr = arr> oId.id ? arr : oId.id);
      });
    console.log(newMax);
    console.log(libraryData.length);

    // Update
    libraryData[2].isFeatured = 'false';
    await FileSystem.writeAsStringAsync( libraryPath, JSON.stringify(libraryData));
    console.log("updated file")

    //libraryData = JSON.parse(await FileSystem.readAsStringAsync(libraryDataUri));
    //console.log("Read: catStoryData: ");
    //console.log(libraryData[2].isFeatured);


    // Delete
    // Id of story catStoryData[2] is 3
    console.log(JSON.stringify(libraryData[2].id));
    console.log(JSON.stringify(libraryData[2].name));

    //console.log(catStoryData[2].name);
    //removeId(libraryData, 3)
    console.log(JSON.stringify(libraryData[2].id));
    console.log(JSON.stringify(libraryData[2].name));

     } catch(error){
        console.log(error);
    }
    console.log("made it");

};

let FileSystemTest = (navigation) => {

  let [library, setLibrary] = React.useState();

//  let oldStory = new StoryViewer(blankstory.name, blankstory.image);

  let showNew = async () => {
    newStory = await new StoryViewer(library[0].name, library[0].image);
    return newStory;
  }

  let imageData = { "created":1673128176, "data":[{"url":  null }]}

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <ScrollView>
          <View style={styles.container}>

            <View style={[styles.container, {width: "100%", justifyContent: "center"}]}>

              <Text style={styles.Heading}>Debug use Only!</Text>
              <Text style={[styles.text, {textAlign: "center"}]}>will permanently delete all your data</Text>

              <Button onPress={() => LoadLibrary(setLibrary)}
               title="Test Loading the Story Library">
              </Button>

              <Button onPress={() => readWriteTest()}
               title="Test adding a new Story to the Library">
              </Button>

              <Button onPress={() => resetLibrary(setLibrary)}
               title="Reset the Library">
              </Button>

            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default FileSystemTest;

// Goal4: add Blurhash
/*
need to switch to dev builds first https://docs.expo.dev/development/create-development-builds/
//import { Blurhash } from 'react-native-blurhash';

<Blurhash
  blurhash="LGFFaXYk^6#M@-5c,1J5@[or[Q6."
  style={{flex: 1}}
/>
*/

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


/* Read from a local source
<Text> local image</Text>
<Image source={{ uri: fileUri }} resizeMode={'cover'} style={styles.storyListSquare}></Image>

const Cached = async () => {
  try {
    // we hash the url image
    const name = shorthash.unique(source.uri);

    // we save and cache the image in user system with shorthash name
    const path = `${FileSystem.cacheDirectory}${name}`;

    // we invoke the user file system to check
    const image = await FileSystem.getInfoAsync(path);

    // if the image path exists, we return and display it
    if (image.exists) {
      setUri(image.uri);
      return;
    }

    // otherwise we download the image, then return the local reference to it.
    const newImage = await FileSystem.downloadAsync(source.uri, path);
    setUri(newImage.uri);
  } catch (err) {
    console.log(err);
  }
};

*/
