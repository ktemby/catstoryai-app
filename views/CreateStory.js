import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import {getImagesOAI} from '../models/GetImageOpenAI';
import LoadingSpinner from "../components/LoadingSpinner";
import TextInputWithLabel from "../components/TextInputWithLabel";
import Cat, {copernicusValues} from "../models/Cat";
import GetTextOpenAI from "../models/GetTextOpenAI"
import StoryViewer from '../components/StoryViewer';
import ModalWrapper from '../components/ModalWrapper';
import PurchaseButton from '../components/PurchaseButton';

let cat = new Cat();
cat.state = copernicusValues;

const placeholder = {
  "name": "A Cat Adventure",
  "url": "placeholder_icon.jpeg",
}

const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";

let imagePrep = ", cat, oil painting, highly detailed, global illumination, fantasy, ";
let storyPrep = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a story around 500 worlds long about ";

function CreateStory({navigation}) {

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
     },"Give the Story a Picture","$0.09" );

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={[styles.safeAreaFull]}>
        <ScrollView>

          <View style={styles.container}>
            {storyInputComponent}
            {chatGPTInteraction}
            {createImagePurchaseButton}
          </View>

          <View style={styles.container}>
            { fetchedState === 'loading' ? LoadingSpinner() : "" }
          </View>

          <View style={{marginTop: 20}}>
            {thisStory}
          </View>

          { (!!output || !!imageData.data[0].url) &&
            <View style={[styles.container, {margin: 20}]}>
              <Pressable onPress={() => setShowModal(true)} >
                <View style={{backgroundColor: '#424242AA', alignItems: "center", marginTop: 0, marginBottom: 20, borderRadius: 5 }}>
                  <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Wonderful, save it!{'\t\t\t'}FREE</Text>
                </View>
              </Pressable>
            </View>
          }

          <ModalWrapper
            showModal={showModal}
            setShowModal={setShowModal}
            >
              {titleInputComponent}
          </ModalWrapper>

        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default CreateStory;
