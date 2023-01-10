import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import customData from '../storydata.json';
import AppTextInput from '../components/TextInputWrapper';

import { OPENAI_API_KEY } from '@env'

const gitCDN = "https://github.com/ktemby/expo-test-app/raw/main/assets/stories/";

const item = {
  "name": "A Cat Adventure",
  "description": "Test Description",
  "image": "../assets/copernicus_and_margot.jpeg",
  "storyInput": "Tell me a story about a cat named Copernicus who is a small brown tabby with ear tufts and a loving personality.",
  "description": "You need to create the story first!",
  "imageInput": "synthwave oil painting the wisest cat in all the galaxy brown tabby exploring the vastness of space with strange and wonderful creatures meeting friendly aliens",
  "hiddenInput": ", global illumination, fantasy"
}

const requestImage = {
  method: 'POST',
  headers: {
    "Authorization": "Bearer ".concat(OPENAI_API_KEY),
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "prompt": item.imageInput,
    "n": 1,
    "size": "512x512",
    "response_format": "url",
  })
};

const requestStory = {
  method: 'POST',
  headers: {
    "Authorization": 'Bearer '.concat(OPENAI_API_KEY),
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "prompt": item.imageInput,
    "n": 1,
    "size": "512x512",
    "response_format": "url",
  })
}

function CreateStory({navigation}) {
  const [fetchedState,setFetchedState]=useState(null);
  const [usersData,setUsersData]=useState({"created":1673128176,"data":[{"url":"https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}]});
  const [userInputState,setUserInputState]=useState(item);

  useEffect(() => {
     setFetchedState('idle')
   },[])

   // Retrieve data from OpenAI
   const getData=async()=>{
      try{
        const response=await fetch('https://api.openai.com/v1/images/generations', requestImage );
        const data=await response.json();
        setUsersData(data);
        console.log(JSON.stringify(usersData));
        console.log(JSON.stringify(data));
      }
      catch(error){
        console.log(error)
      }
      finally{
        setFetchedState(null);
      }
    }

  const [textName, onChangeName] = React.useState(item.name);
  const [textContent, onChangeContent] = React.useState(item.description);
  const [textInput, onChangeStoryInput] = React.useState(item.storyInput);
  const [imageInput, onChangeImageInput] = React.useState(item.imageInput);

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={{ flex: 1, width: '100%'}}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'left', margin: 20}}>

          <View style={styles2.inputWrapper}>
            <Text style={{color: '#424242', marginBottom: 10}} >What will you name the Story?</Text>
            <TextInput
              style={styles2.input}
              onChangeText={onChangeName}
              value={textName}
              placeholder={(item.name)}
              autoComplete='false'
            />
          </View>

            <View style={styles2.inputWrapper}>
              <Text style={{color: '#424242', marginBottom: 10}} >AI Story Input</Text>
              <AppTextInput
                style={styles2.input}
                onChangeText={onChangeStoryInput}
                value={textInput}
                placeholder={(item.storyInput)}
                onFocus
                autoComplete='false'
                multiline
              />
            </View>

            <Pressable onPress={() => alert('Create Coming Soon!')} >
              <View style={{backgroundColor: '#424242AA', alignItems: "center", marginTop: 0, marginBottom: 20, borderRadius: 5 }}>
                <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Create Story!{'\t\t\t\t'}FREE</Text>
              </View>
            </Pressable>

            <View style={{border: 1, borderColor: '#AAA', marginBottom: 15, borderWidth: 1, width: '100%', padding: 5, backgroundColor: 'white'}}>
              <Text style={{color: '#424242', marginBottom: 10}} >AI Picture Input</Text>
              <TextInput
                style={styles2.input}
                onChangeText={onChangeImageInput}
                value={imageInput}
                placeholder={(item.imageInput)}
                autoComplete='false'
                multiline
              />
            </View>

            <Pressable onPress={() => {
                setFetchedState('loading');
                setTimeout( () => getData(), 10000);
                }} >
              <View style={{backgroundColor: '#424242AA', alignItems: "center", marginTop: 0, marginBottom: 10, borderRadius: 5 }}>
              <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Give the Story a Picture{'\t\t'}$0.09</Text>
              </View>
            </Pressable>

          </View>

          <View style={styles.container}>
              {
                (fetchedState === 'idle') ?
                  <Image source={{uri: usersData.data[0].url}} resizeMode={'cover'} style={styles.storyListSquare}></Image>
                : (fetchedState === 'loading') ?
                  <Text style={styles.body}>Ludicriously advanced AI is dreaming up your image (ETA 11 seconds)...</Text>
                : // Else
                  <Image source={{uri: usersData.data[0].url}} resizeMode={'cover'} style={styles.imageDetail}></Image>
              }
          </View>

          <View style={{ flex: 1, width: '100%', marginTop: 30, backgroundColor: 'white'}}>
          <View style={{ flex: 1, alignItems: 'left', margin: 15}}>
            <Text style={styles.Heading}>{(item.name)}</Text>
            <Image source={{ uri: usersData.data[0].url }} resizeMode={'cover'} style={styles.imageDetail}></Image>
            <Text style={styles.body}>{(item.description)}</Text>
          </View>
          </View>

          <View style={{ flex: 1, alignItems: 'left', margin: 20}}>
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

const styles2 = StyleSheet.create({
  input: {
    borderColor: '#AAAAAFF',
    borderWidth: 0,
    width: '100%',
    color: 'black',
    fontSize: 18,
  },
  inputWrapper: {
    border: 1,
    borderColor: '#AAA',
    marginBottom: 15,
    borderWidth: 1,
    width: '100%',
    padding: 5,
    backgroundColor: 'white'
  }
});

/*
  <View style={{border: 1, borderColor: '#AAA', marginBottom: 15, borderWidth: 1, width: '100%', padding: 5, backgroundColor: 'white'}}>
    <Text style={{color: '#424242', marginBottom: 10}}>Story Content</Text>
    <TextInput
      style={styles2.input}
      onChangeText={onChangeContent}
      value={textContent}
      placeholder={(item.description)}
      miltiline
      autoComplete='false'
    />
  </View>
*/


/*
async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
query({inputs:{question:"What is my name?",context:"My name is Clara and I live in Berkeley."}}).then((response) => {
    console.log(JSON.stringify(response));
});
// {"score":0.933128833770752,"start":11,"end":16,"answer":"Clara"}

*/
