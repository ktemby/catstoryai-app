import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import customData from '../storydata.json';
import {getImagesOAI} from '../models/OpenAI';
import AppTextInput from '../components/TextInputWrapper';
import LoadingSpinner from "../components/LoadingSpinner";

const item = {
  "name": "A Cat Adventure",
  "description": "Test Description",
  "image": "../assets/copernicus_and_margot.jpeg",
  "storyInput": "Tell me a story about a cat named Copernicus who is a small brown tabby with ear tufts and a loving personality.",
  "description": "You need to create the story first!",
  "imageInput": "Once upon a time, in a land far, far away, there lived a small brown tabby cat named Copernicus. Copernicus had ear tufts and a loving personality, and he lived with his human in a cozy little cottage nestled in the heart of the forest.\n\nOne day, Copernicus was out for a stroll through the forest when he stumbled upon a magical unicorn. The unicorn's name was Starburst, and she had a mane and tail that shimmered like the night sky, with a horn that glowed like a rainbow.\n\nStarburst was on a quest to find the legendary Fountain of Youth, and she needed a brave and adventurous companion to join her on her journey. Copernicus, who had always dreamed of going on a great adventure, eagerly agreed to come along.\n\nTogether, Copernicus and Starburst set off into the unknown, braving treacherous mountain passes and dark, foreboding forests. They encountered all sorts of dangers along the way, from fierce dragons to tricky goblins, but with his quick thinking and Starburst's magical powers, they always managed to come out on top.\n\nAfter many weeks of travel, they finally reached the Fountain of Youth. It was a beautiful, crystal-clear pool surrounded by lush, green gardens, and it was said to grant eternal youth and happiness to all who drank from it.\n\nCopernicus and Starburst were overjoyed at their discovery, and they couldn't wait to taste the water. But just as they were about to take a drink, they were ambushed by a group of bandits who had been following them all along, hoping to steal the Fountain's magic for themselves.\n\nIn the ensuing battle, Copernicus and Starburst fought bravely, using all their strength and cunning to defeat the bandits and protect the Fountain. In the end, they emerged victorious, and they were able to drink from the Fountain in peace.\n\nAs the magical waters flowed through their bodies, Copernicus and Starburst felt a sense of joy and vitality like they had never known before. And from that day on, they lived happily ever after, exploring new lands and going on many more adventures together.",
  "hiddenInput": ", cat, oil painting, highly detailed, global illumination, fantasy, "
}

function CreateStory({navigation}) {

  const [fetchedState,setFetchedState]=useState(null);
  const [imageData,setImageData]=useState({"created":1673128176,"data":[{"url":"https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}]});
  const [userInputState,setUserInputState]=useState(item);

  useEffect(() => {
     setFetchedState('idle')
   },[])

   const [textName, onChangeName] = React.useState(item.name);
   const [textContent, onChangeContent] = React.useState(item.description);
   const [textInput, onChangeStoryInput] = React.useState(item.storyInput);
   const [imagePrompt, onChangeImagePrompt] = React.useState(item.imageInput);

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={{ flex: 1, width: '100%'}}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'left', margin: 20}}>

          <View style={styles2.inputWrapper}>
            <Text style={{color: '#424242', marginBottom: 10}} >What will you name the Story?</Text>
            <TextInput style={styles2.input} autoComplete='false'
              onChangeText={onChangeName} value={textName}
              placeholder={(item.name)}

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
              <View style={{backgroundColor: '#424242AA', marginTop: 0, marginBottom: 20, borderRadius: 5 }}>
                <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Create Story!{'\t\t\t\t'}FREE</Text>
              </View>
            </Pressable>

            <View style={{border: 1, borderColor: '#AAA', marginBottom: 15, borderWidth: 1, width: '100%', padding: 5, backgroundColor: 'white'}}>
              <Text style={{color: '#424242', marginBottom: 10}} >AI Picture Input</Text>
              <TextInput
                style={styles2.input}
                onChangeText={onChangeImagePrompt}
                value={imagePrompt}
                placeholder={(item.imageInput)}
                autoComplete='false'
                multiline
              />
            </View>

            <Pressable onPress={() => {
                setFetchedState('loading'); //setTimeout( () => getImages(), 10000);
                getImagesOAI(item.hiddenInput.concat(imagePrompt), setFetchedState, setImageData);
                }} >
              <View style={{backgroundColor: '#424242AA', alignItems: "center", marginTop: 0, marginBottom: 10, borderRadius: 5 }}>
              <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Give the Story a Picture{'\t\t'}$0.09</Text>
              </View>
            </Pressable>

          </View>

          <View style={styles.container}>
            { // if
              (fetchedState === 'idle') ?
                <Image source={{uri: imageData.data[0].url}} resizeMode={'cover'} style={styles.storyListSquare}></Image>
              : // else if
                (fetchedState === 'loading') ? ( LoadingSpinner() )
              : // else
                <Image source={{uri: imageData.data[0].url}} resizeMode={'cover'} style={styles.imageDetail}></Image>
            }
          </View>

          <View style={{ flex: 1, width: '100%', marginTop: 30, backgroundColor: 'white'}}>
            <View style={{ flex: 1, alignItems: 'left', margin: 15}}>
              <Text style={styles.Heading}>{(item.name)}</Text>
              <Image source={{ uri: imageData.data[0].url }} resizeMode={'cover'} style={styles.imageDetail}></Image>
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
