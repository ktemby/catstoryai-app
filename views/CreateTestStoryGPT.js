import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView} from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import Cat, {copernicusValues} from "../models/Cat";
import { OPENAI_API_KEY, OPENAI_EMAIL, OPENAI_PASSWORD } from '@env';
import { CheckModeration, bias_words } from '../models/CheckModerationOAI';

let cat = new Cat();
cat.state = copernicusValues;

let storyPrep = "Write a story that is friendly, accurate and does not offend, while still being creative and fun to read. Reject offensive input. The short story should be around 500 words. Be appropriate for ages 3 and up. Use proper grammar and simple sentences, and end the story with 'The end.'\n\nInput: "

let modThreshold = 0.00001;

const ChatGPTInteraction = () => {
  const [input, setInput] = useState("Tell me a story about ".concat(cat.catText()));
  const [output, setOutput] = useState('');
  const [inputModFlag, setInputModeration] = useState(null);
  const [outputModFlag, setOutputModeration] = useState(null);

  useEffect(() => {
    if (inputModFlag === false) {
      console.log("Fetching Story")
      getStoryData(); // fetch the story once.
      setInputModeration(null);
    } else if (inputModFlag === true) {
      console.log("Communicating blocked due to moderation")
      setOutput("I'm sorry, that request was flagged by our moderator.");
    } else {
      "Neither"
    }
    console.log(`Content Moderation State {Input: ${inputModFlag}, Output:${outputModFlag}}`);
    }, [inputModFlag]);

   useEffect(() => {
      console.log(`Content Moderation State {Output:${outputModFlag}}`);
    }, [outputModFlag]);

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
     console.log("Creating Story");
     console.log(`Story input: ${storyPrep.concat(input)}`);
     try {
       const response = await fetch('https://api.openai.com/v1/completions', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer '.concat(OPENAI_API_KEY),
         },
         body: JSON.stringify({
           model: "text-davinci-003",
           prompt: input,
           temperature: 0.6,
           max_tokens: 700,
           presence_penalty: 1.0,
           frequency_penalty: 1.0,
           logit_bias: bias_words,
         }),
       });
       const data = await response.json();
       console.log(data)
       setOutput(data.choices[0].text);

       // Moderation check on story Data
       await getModerationData(output).then(
         (outputModData) => {
           console.log("Getting Story Moderation Score");
           setOutputModeration(CheckModeration(outputModData, modThreshold));
         }
       );
     } catch (err) {
       console.log(err);
     }
   };

  const handleSubmit = async () => {
    setOutputModeration(null)
    // Initial input check
    const modData = await getModerationData(input);
    console.log("Getting Moderation Score");
    let modCheckFlag = await CheckModeration(modData, modThreshold);
    console.log(`inputModFlag: ${inputModFlag}`);
    setInputModeration(modCheckFlag);
    console.log(`inputModFlag: ${inputModFlag}`);

    // Probe input more deeply
  };

  //setOutputModeration(true);
  const ButtonControl = () => {
    return (
        !!outputModFlag === true && <Button title="Yes" onPress={setOutputModeration(false)}/>
    );
  };

  return (
    <View>
      <TextInput
        placeholder={"Tell me a story about ".concat(cat.catText())}
        onChangeText={text => setInput(text)}
        value={input}
        style={{
          width: '80%',
          color: 'black',
          fontSize: 18,
          backgroundColor: 'white',
          padding: 10,
          marginLeft: 35,
          marginBottom: 10,
        }}
        multiline={true}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Text style={styles.body}>
      { (inputModFlag === true) ? "I'm sorry, that request was flagged by our moderator.\n\nAsk for a happy story about kittens?"
        : (outputModFlag === true) ? "The generated content was flagged as potentially inappropriate, are you sure you want to see it?"
        : outputModFlag === false ? output
        : ""
      }</Text>
      { !!outputModFlag && <Button title="Yes" onPress={setOutputModeration(false)} /> }
    </View>
  );
};


function CreateTestStoryGPT({navigation}) {

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.body}>AI Story Input Testing:</Text>
          </View>
          <ChatGPTInteraction />
        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default CreateTestStoryGPT;

/*
const handleSubmit = async () => {
  try {
    //console.log(`logging input: ${input}`);
    const response = await fetch(openAIURL, body);
    console.log(`sending body: ${JSON.stringify(body)}`);
    const data = await response.text();
    console.log('got data')
    console.log(data)
    //setOutput(JSON.stringify(data));
    setOutput("Yo!");
  } catch (err) {
    console.log(err);
  }
};
*/
