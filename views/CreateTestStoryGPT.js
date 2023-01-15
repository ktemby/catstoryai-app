import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView} from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import Cat from "../models/Cat";
import { OPENAI_API_KEY } from '@env'

let cat = new Cat();

const ChatGPTInteraction = () => {
  const [input, setInput] = useState("Tell me a story about ".concat(cat.catText()));
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '.concat(OPENAI_API_KEY),
        },
        body: JSON.stringify({
          prompt: input,
          temperature: 0.7,
          max_tokens: 100,
        }),
      });
      const data = await response.json();
      console.log(data)
      setOutput(data.choices[0].text);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', margin: 20}}>
      <TextInput
        placeholder={"Tell me a story about ".concat(cat.catText())}
        onChangeText={text => setInput(text)}
        value={input}
        style={{
          width: '100%',
          color: 'black',
          fontSize: 18,
        }}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Text>{output}</Text>
    </View>
  );
};


function CreateTestStoryGPT({navigation}) {

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'flex-start', margin: 20}}>
            <Text>AI Story Input:</Text>
            <Text>Tell me a story about {cat.catText()}</Text>
            <ChatGPTInteraction />
          </View>
        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default CreateTestStoryGPT;
