import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView, StyleSheet} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import {getImagesOAI} from '../models/OpenAI';
import LoadingSpinner from "../components/LoadingSpinner";
import TextInputWithLabel from "../components/TextInputWithLabel";
import Cat, {copernicusValues} from "../models/Cat";
import ChatGPTInteraction from "../models/ChatGPTInteraction"
import StoryViewer from '../components/StoryViewer';

let cat = new Cat();
cat.state = copernicusValues;

const item = {
  "name": "A Cat Adventure",
  "description": "Test Description",
  "image": "../assets/copernicus_and_margot.jpeg",
  "storyInput": "Tell me a story about a cat named Copernicus who is a small brown tabby with ear tufts and a loving personality.",
  "description": "You need to create the story first!",
  "imageInput": "A Cat Adventure with magical castles on a mountain",
  "hiddenInput": ", cat, oil painting, highly detailed, global illumination, fantasy, "
}

const placeholderUrl = "placeholder_icon.jpeg";
const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";

let storyPrep = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a story around 500 worlds long about ";

function CreateStory({navigation}) {
  const insets = useSafeAreaInsets();

  const [fetchedState, setFetchedState]=useState(null);
  const [imageData, setImageData] = useState( { "created":1673128176, "data":[{"url":  myCDN.concat(placeholderUrl) }]} );

  useEffect(() => {
     setFetchedState('idle')
   },[])

   const [title, setTitle] = React.useState(item.name);
   const [textContent, onChangeContent] = React.useState(item.description);
   const [storyInput, setStoryInput] = React.useState(cat.catText());
   //const [imagePrompt, setImagePrompt] = React.useState(item.imageInput);
   const [output, setOutput] = useState("You need to create the story first!");

   const titleInputComponent = TextInputWithLabel(title, setTitle, "What will you name the Story?", item.name);

   const storyInputComponent = TextInputWithLabel(storyInput, setStoryInput, "Tell me a story about...", "Tell me a story about ".concat(cat.catText()));

   //const imageInputComponent = TextInputWithLabel(imagePrompt, setImagePrompt, "AI Picture Input", item.imageInput);

   let showOutput = false;

   let chatGPTInteraction = new ChatGPTInteraction(storyPrep.concat(storyInput), output, setOutput, showOutput);

   let thisStory = new StoryViewer(title, imageData.data[0].url, output);

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={[styles.safeAreaFull]}>
        <ScrollView>

          <View style={{flex: 1, alignItems: 'center'}}>
            {storyInputComponent}
            {chatGPTInteraction}
            <Pressable onPress={() => {
                setFetchedState('loading');
                getImagesOAI(item.hiddenInput.concat(storyInput), setFetchedState, setImageData);
                }} >
              <View style={{backgroundColor: '#424242AA', alignItems: "center", marginTop: 0, marginBottom: 10, borderRadius: 5 }}>
              <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Give the Story a Picture{'\t\t'}$0.09</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.container}>
            { fetchedState === 'loading' ? LoadingSpinner() : "" }
          </View>

          <View style={{flex: 1, alignItems: 'center'}}>
            {titleInputComponent}
          </View>

          <View style={{marginTop: 20}}>
            {thisStory}
          </View>

          <View style={[styles.container, {margin: 20}]}>
            <Pressable onPress={() => alert('Save Coming Soon!')} >
              <View style={{backgroundColor: '#424242AA', alignItems: "center", marginTop: 0, marginBottom: 20, borderRadius: 5 }}>
                <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Wonderful, save it!{'\t\t\t\t'}FREE</Text>
              </View>
            </Pressable>
          </View>

        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default CreateStory;
