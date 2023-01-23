import React, { useState, useEffect } from 'react';
import { View, Pressable, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles, { getColorScheme } from './Styles';
import Cat, {copernicusValues} from "../models/Cat";
import TextInputWithLabel from "../components/TextInputWithLabel";

let cat = new Cat();
cat.state = copernicusValues;

//let storyPrep = "Write a children's story about "

let storyPrep = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a story about ";

let postPrep = "\n\nAI: ";

//let storyPrep = "As an expert storyteller, write a children's story around 400 words. Use brief sentences, good formatting and short paragraphs. Don't say 'forevermore' or use offensive language.\n\nInput: Tell me a story about "

const StoryPrompt = () => {
  const [input, setInput] = useState(cat.catText().concat(""));
  const textInputWithLabel = TextInputWithLabel(input, setInput, "Tell me a story about...", "Tell me a story about ".concat(cat.catText()));

  return (
    <View style={styles.container}>

      <View style={[styles.inputWrapper, {width: '80%', marginBottom: 30, marginTop: 30, padding: 10}]}>
        {textInputWithLabel}
        </View>
    </View>
  );
};

function Create({navigation}) {
  const themeColorStyle = getColorScheme();

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <ScrollView>
          <StoryPrompt />
        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default Create;
