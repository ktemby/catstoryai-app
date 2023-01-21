import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles, { getColorScheme } from './Styles';
import Cat, {copernicusValues} from "../models/Cat";
import { OPENAI_API_KEY, OPENAI_EMAIL, OPENAI_PASSWORD } from '@env';
import { CheckModeration, bias_words } from '../models/CheckModerationOAI';
import LoadingSpinner from "../components/LoadingSpinner";
import TextInputWithLabel from "../components/TextInputWithLabel";

let cat = new Cat();
cat.state = copernicusValues;

//let storyPrep = "Write a children's story about "

let storyPrep = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a story about ";

let postPrep = "\n\nAI: ";

//let storyPrep = "As an expert storyteller, write a children's story around 400 words. Use brief sentences, good formatting and short paragraphs. Don't say 'forevermore' or use offensive language.\n\nInput: Tell me a story about "

const ChatGPTInteraction = () => {
  let modThreshold = 0.0001;
  const [input, setInput] = useState(cat.catText().concat(""));
  const [output, setOutput] = useState('');
  const [loadMessage, setLoadMessage] = useState(null);
  const [inputModFlag, setInputModeration] = useState(null);
  const [outputModFlag, setOutputModeration] = useState(null);

  useEffect(() => {
    if (inputModFlag === false) {
      setLoadMessage("Dreaming your story...")
      getStoryData(); // fetch the story once.
      setInputModeration(null);
      setOutputModeration('pending');
    } else if (inputModFlag === true) {
      console.log("Communicating blocked due to moderation")
      setOutput("I'm sorry, that request was flagged by our moderator.");
    } else {
      "Neither"
    }
    console.log(`Content Moderation State {Input: ${inputModFlag}, Output:${outputModFlag}}`);
    }, [inputModFlag]);

    useEffect(() => {
      if (outputModFlag !== 'pending') {
        setLoadMessage(null)
      }
    }, [outputModFlag]);

    useEffect(() => {
      if (outputModFlag === 'pending') {
        setLoadMessage("Reviewing the story...")
        //console.log(`Checking Output : ${output}`);
        handleReview();
      };
     }, [output]);

   const getModerationData = async (inputToCheck) => {
     let ModerationAPI = 'https://api.openai.com/v1/moderations';

     try {
       const response = await fetch(ModerationAPI, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer '.concat(OPENAI_API_KEY),
         },
         body: JSON.stringify({
           input: inputToCheck,
         }),
       });
       const modData = await response.json();
       return(modData);
     } catch (err) {
       console.log(err);
     };
   };

   const getStoryData = async () => {
     console.log(`Creating Story. Story input: ${storyPrep.concat(input)}`);
     try {
       const response = await fetch('https://api.openai.com/v1/completions', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer '.concat(OPENAI_API_KEY),
         },
         body: JSON.stringify({
           model: "text-davinci-003",
           prompt: storyPrep.concat(input).concat(postPrep),
           temperature: 0.9,
           top_p: 1,
           max_tokens: 700,
           //stop: ['AI:', "Human:"],
           presence_penalty: .6, //1.0
           frequency_penalty: 0.6, //1.0
           logit_bias: bias_words,
         }),
       });
       const data = await response.json();
       console.log(data)
       setOutput(data.choices[0].text);
     } catch (err) {
       console.log(err);
       alert("AI is sleeping, try again later")
       setOutputModeration(null)
     }
   };

  const handleReview = async () => {
    // Moderation check on story Data
    console.log("Getting Story Output Moderation Score");
    //console.log(output);
    const outputModData = await getModerationData(output);
    let outputModCheckFlag = await CheckModeration(outputModData, modThreshold)
    setOutputModeration(outputModCheckFlag);
  };

  const handleSubmit = async () => {
    setInput(input);
    setOutputModeration(null);
    setOutput(null);
    //setInputModeration(null)
    // Initial input check
    console.log("Getting Input Moderation Score");
    const modData = await getModerationData(input);
    let modCheckFlag = await CheckModeration(modData, modThreshold);
    setInputModeration(modCheckFlag);
  };

  const textInputWithLabel = TextInputWithLabel(input, setInput, "Tell me a story about...", "Tell me a story about ".concat(cat.catText()));

  return (
    <View style={styles.container}>

      <View style={[styles.inputWrapper, {width: '80%', marginBottom: 30, marginTop: 30, padding: 10}]}>
        {textInputWithLabel}
      </View>
      <Pressable onPress={() => handleSubmit()} >
        <View style={{backgroundColor: '#424242AA', marginTop: 0, marginBottom: 20, borderRadius: 5 }}>
          <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Create Story!{'\t\t\t\t'}$0.09</Text>
        </View>
      </Pressable>

      <Text style={styles.body}>
      { (inputModFlag === true) ? "I'm sorry, that request was flagged by our moderator.\n\nAsk for a happy story about kittens?"
        : (outputModFlag === true) ? "The generated content was flagged as potentially inappropriate, are you sure you want to see it?"
        : outputModFlag === false ? output
        : ""
      }</Text>
      <View style={styles.container}>
      { (outputModFlag === 'pending') ? LoadingSpinner() : "" }
      { !!loadMessage && <Text>{loadMessage}</Text> }
      </View>
      { outputModFlag === true && <Button title="Yes" onPress={() => setOutputModeration(false)} /> }
    </View>
  );
};

//.replace(`/${'\n'}/g`, `${'\n\n'}`)

function CreateTestStoryGPT({navigation}) {
  const themeColorStyle = getColorScheme();

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <ScrollView>
          <ChatGPTInteraction />
        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default CreateTestStoryGPT;
