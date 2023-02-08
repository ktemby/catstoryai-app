import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';
import styles, { getColorScheme } from '../views/Styles';
import Cat, {copernicusValues} from "../models/Cat";
import { OPENAI_API_KEY, OPENAI_EMAIL, OPENAI_PASSWORD } from '@env';
import { CheckModeration, bias_words } from '../models/CheckModerationOAI';
import LoadingSpinner from "../components/LoadingSpinner";
import PurchaseButton from '../components/PurchaseButton';

const GetTextOpenAI = (input, output, setOutput, showOutput) => {
  let modThreshold = 0.0002;
  let postPrep = "\n\nAI: ";

  //const [output, setOutput] = useState('');
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
     console.log(`Creating Story. Story input: ${input}`);
     try {
       const response = await fetch('https://api.openai.com/v1/completions', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer '.concat(OPENAI_API_KEY),
         },
         body: JSON.stringify({
           model: "text-davinci-003",
           prompt: input.concat(postPrep),
           temperature: 0.9,
           top_p: 1,
           max_tokens: 700,
           stop: ["Human:"],
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
    const outputModData = await getModerationData(output);
    let outputModCheckFlag = await CheckModeration(outputModData, modThreshold)
    setOutputModeration(outputModCheckFlag);
  };

  const handleSubmit = async () => {
    setOutputModeration(null);
    setOutput(null);

    // Initial input check
    console.log("Getting Input Moderation Score");
    const modData = await getModerationData(input);
    let modCheckFlag = await CheckModeration(modData, modThreshold);
    setInputModeration(modCheckFlag);
  };

  const outputDisplay = () => {
    let blockedMessage = "I'm sorry, that request was flagged by our moderator.\n\nAsk for a happy story about kittens?";
    let flaggedMessage = "The generated content was flagged as potentially inappropriate, are you sure you want to see it?"
    return (
      <View>
        <View>
          { (inputModFlag === true) ? <Text style={styles.body}>{blockedMessage}</Text>
            : (true) ? <Text style={[styles.body, {textAlign: "center"}]}>{flaggedMessage}</Text>
            : outputModFlag === false ? showOutput && <Text style={styles.body}>{output}</Text>
            : ""
          }
        </View>
        <View style={styles.container}>
          { (outputModFlag === 'pending') ? LoadingSpinner() : "" }

        {true &&
          <Pressable title="Yes" style={{borderWidth: 1, alignItems: "center", width: "50%", borderRadius: 10, padding: 10, marginBottom: 30, backgroundColor: "#FFFFFF33"}} onPress={() => setOutputModeration(false)} >
            <Text style={styles.text}>Yes</Text>
          </Pressable> }
          </View>
      </View>
    )
  };

  let createStoryPurchaseButton = new PurchaseButton(() => { handleSubmit()},"Create Story!","9", "cat" );

  return (
    <View style={[styles.container, {width: "100%"}]}>
      {createStoryPurchaseButton}
      {outputDisplay()}
    </View>
  );
};

export default GetTextOpenAI;
