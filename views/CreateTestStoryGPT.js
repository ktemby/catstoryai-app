import React, { useState, useEffect } from 'react';
import { View, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles, { getColorScheme } from './Styles';
import Cat, {copernicusValues} from "../models/Cat";
import TextInputWithLabel from "../components/TextInputWithLabel";
import ChatGPTInteraction from "../models/ChatGPTInteraction"

let cat = new Cat();
cat.state = copernicusValues;

//let storyPrep = "Write a children's story about "

let storyPrep = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a story around 500 worlds long about ";

//let storyPrep = "As an expert storyteller, write a children's story around 400 words. Use brief sentences, good formatting and short paragraphs. Don't say 'forevermore' or use offensive language.\n\nInput: Tell me a story about "

function CreateTestStoryGPT({navigation}) {
  const themeColorStyle = getColorScheme();

  const [input, setInput] = useState(cat.catText().concat(""));
  const [output, setOutput] = useState('');

  const storyInput = TextInputWithLabel(input, setInput, "Tell me a story about...", "Tell me a story about ".concat(cat.catText()));

  let showOutput = true;

  let chatGPTInteraction = new ChatGPTInteraction(storyPrep.concat(input), output, setOutput, showOutput);

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <ScrollView>
          <View style={styles.container}>
            {storyInput}
            {chatGPTInteraction}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default CreateTestStoryGPT;
