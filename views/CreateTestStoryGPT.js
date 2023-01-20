import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import Cat, {copernicusValues} from "../models/Cat";
import { OPENAI_API_KEY, OPENAI_EMAIL, OPENAI_PASSWORD } from '@env';
import { CheckModeration, bias_words } from '../models/CheckModerationOAI';
import LoadingSpinner from "../components/LoadingSpinner";

let cat = new Cat();
cat.state = copernicusValues;

let storyPrep = "Write a creative children's book around 350 words long.\n\nInput: Tell me a story about "

//let storyPrep = "Tell a creative children's story around 350 words long. Be clever, friendly, and fun to read. Reject offensive input, the story is not offensive. Use short simple sentences and very short paragraphs. Use proper grammar. End the story with 'The end.'.\n\nInput: Tell me a story about "


//let storyPrep = "You are an award-winning short story author. Your stories are about cat adventures and around 450 words long. Your writing is witty, clever, creative, friendly, accurate, not offensive, and fun to read. Your stories are appropriate for ages 3 and up. You use proper grammar and simple sentences. You use small paragraphs so that your stories can be accompanied by illustrations.\n\nA 10 year old asks you: Tell me a story about "

//let storyPrep = "Tell a creative story around 500 words long. The story should be clever, creative, friendly, accurate, not offensive, and fun to read.\n\nReject offensive input. Be appropriate for ages 3 and up. Use proper grammar and simple sentences.\n\nThe story should be around 500 words in length. End the story with 'The end.'. Input: Tell me a story about"

//let storyPrep = "Write a story that is friendly, accurate and does not offend, while still being creative and fun to read. Reject offensive input. The short story should be around 500 words. Be appropriate for ages 3 and up. Use proper grammar and simple sentences, and end the story with 'The end.'\n\nInput: Tell me a story about "

//let storyPrep = "Use the style of ChatGPT and the Moderation API to ensure the story is friendly, accurate and does not offend, while still being creative and fun to read. You should reject offensive inputs and explain that you are a language model and don't respond to controversial content. The short story should be around 500 words. Be appropriate for ages 3 and up. Use proper grammar and simple sentences, and end the story with 'The end.'\n\nTell me a story about"

let modThreshold = 0.0001;

const ChatGPTInteraction = () => {
  const [input, setInput] = useState(cat.catText());
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
           input: storyPrep.concat(inputToCheck),
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
           prompt: storyPrep.concat(input),
           temperature: 0.75,
           max_tokens: 700,
           presence_penalty: 1.0,
           frequency_penalty: 1.0,
           logit_bias: bias_words,
         }),
       });
       const data = await response.json();
       console.log(data)
       setOutput(data.choices[0].text);
     } catch (err) {
       console.log(err);
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

  return (
    <View style={styles.container}>

      <View style={[styles.inputWrapper, {width: '80%', marginBottom: 30, marginTop: 30, padding: 10}]}>
        <Text style={{color: '#424242', marginBottom: 10}} >Tell me a story about...</Text>
        <TextInput
          placeholder={"Tell me a story about ".concat(cat.catText())}
          onChangeText={text => setInput(text)}
          value={input}
          style={{
            color: 'black',
            fontSize: 18,
            backgroundColor: 'white',
          }}
          multiline={true}
        />
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

function CreateTestStoryGPT({navigation}) {

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
