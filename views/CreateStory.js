import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles, {getColorScheme} from '../views/Styles';
import {getImagesOAI} from '../models/GetImageOpenAI';
import LoadingSpinner from "../components/LoadingSpinner";
import TextInputWithLabel from "../components/TextInputWithLabel";
import Cat, {copernicusValues} from "../models/Cat";
import GetTextOpenAI from "../models/GetTextOpenAI"
import StoryViewer from '../components/StoryViewer';
import ModalWrapper from '../components/ModalWrapper';
import PurchaseButton from '../components/PurchaseButton';
import LoadLibrary, {resetLibrary, getLibraryPath, getLibraryMaxID, saveStoryToLibrary} from '../models/LibraryStorage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let cat = new Cat();
cat.state = copernicusValues;

const placeholder = {
  "name": "A Cat Adventure",
  "url": "placeholder_icon.jpeg",
}

const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";

let imagePrep = ", cat, oil painting, highly detailed, global illumination, fantasy, ";
let storyPrep = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a story around 500 words long about ";

function CreateStory({navigation}) {

  const themeColorStyle = getColorScheme();
  const [title, setTitle] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [storyInput, setStoryInput] = React.useState(cat.catText());
  const [output, setOutput] = useState(null);
  const [fetchedState, setFetchedState]=useState(null);
  const [imageData, setImageData] = useState( { "created":1673128176, "data":[{"url":  null }]} );

  useEffect(() => {
     setFetchedState('idle')
   },[])

   const titleInputComponent = TextInputWithLabel(title, setTitle, "What will you name the Story?", placeholder.name);

   const storyInputComponent = TextInputWithLabel(storyInput, setStoryInput, "Tell me a story about...", "Tell me a story about ".concat(cat.catText()));

   let showOutput = false;

   let chatGPTInteraction = new GetTextOpenAI(storyPrep.concat(storyInput), output, setOutput, showOutput);

   let thisStory = new StoryViewer(title, imageData.data[0].url, output);

   let createImagePurchaseButton = new PurchaseButton(() => {
       setFetchedState('loading');
       getImagesOAI(imagePrep.concat(storyInput), setFetchedState, setImageData);
     },"Create Picture!","9","cat" );

   let savePurchaseButton = new PurchaseButton(() => {
     setShowModal(true);
   },"Wonderful, save it!","FREE" );

   let newStory = {
     "name": title,
     "id": "",
     "description": output,
     "image": imageData.data[0].url,
     "storyInput": storyInput,
     "imageInput": storyInput,
     "hiddenInput": ", cat, oil painting, highly detailed, global illumination, fantasy, ",
     "cdn": false,
   };

   let saveToLibrary = () => {
     saveStoryToLibrary(newStory);
   }

   let CancelButton = (props) => {
     let [backColor, setColor] = useState(themeColorStyle.backgroundColor);

     return (
       <View style={{flex:1}}>
        <Pressable
         style={[props.style, { backgroundColor: backColor, borderTopWidth: 1, borderColor: '#616161'}]}
         onPressIn={() => setColor(themeColorStyle.highlight)}
         onPressOut={() => setColor(themeColorStyle.backgroundColor)}
         onPress={() => setShowModal(false)}
        >

         <Text style={{color: themeColorStyle.color, fontSize: 20, lineHeight: 20, margin: 20, textAlign: "center"}}>Cancel</Text>
         </Pressable>
       </View>
    );
   }


   let SaveButton = (props) => {
     let [fav, setFav] = useState(false);
     let [backColor, setColor] = useState(themeColorStyle.backgroundColor);

     return (
       <View style={{flex:1}}>
        <Pressable
          onPressIn={() => setColor(themeColorStyle.highlight)}
          onPressOut={() => setColor(themeColorStyle.backgroundColor)}
          onPress={() => {
            saveToLibrary(props.item);
            setShowModal(false);
            let alertString = !!props.item.name ? ` "${props.item.name}"` : "";
            alert(`Saved${alertString}!`);
          }}
          style={[props.style, {flex:1, backgroundColor: backColor, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#616161'}]}
        >
         <Text style={{color: themeColorStyle.color, fontWeight: "bold", fontSize: 20, lineHeight: 20, margin: 20, textAlign: "center"}}>Save</Text>
         </Pressable>
       </View>
    ); //props.item.isFavorite = !props.item.isFavorite
   }

  return (
    <LinearGradient {...styles.gradientProps}>

      <SafeAreaView style={[styles.safeAreaFull]}>
        <ScrollView>

          <View style={[styles.container, {paddingTop: 0}]}>
            {storyInputComponent}
            <View style={[styles.container, {marginTop: 10}]}>
              {chatGPTInteraction}
              {createImagePurchaseButton}
            </View>
          </View>

          <View style={styles.container}>
            { fetchedState === 'loading' ? LoadingSpinner() : "" }
          </View>

          <View style={{marginTop: 20}}>
            {thisStory}

          </View>

          { (!!output || !!imageData.data[0].url) &&
            <View style={[styles.container, {marginTop: 10, marginBottom: 40, width: "100%"}]}>
              {savePurchaseButton}
            </View>
          }

          <ModalWrapper
            showModal={showModal}
            setShowModal={setShowModal}
            >
              {titleInputComponent}
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <CancelButton item={newStory} style={{padding: 0}} />
                <SaveButton item={newStory} style={{padding: 0}}/>

              </View>
          </ModalWrapper>

        </ScrollView>
      </SafeAreaView>

      </LinearGradient>
  );
}

export default CreateStory;
