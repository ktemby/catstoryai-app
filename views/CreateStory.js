import React from 'react';
import { Text, View, Image, Pressable, ScrollView, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import customData from '../storydata.json';

const gitCDN = "https://github.com/ktemby/expo-test-app/raw/main/assets/stories/";

const item = {
  "name": "Placeholder Story Name",
  "description": "Test Description",
  "image": "../assets/copernicus_and_margot.jpeg",
  "storyInput": "Tell me a story about a cat named Copernicus who is a small brown tabby with ear tufts and a loving personality",
  "description": "",
  "imageInput": "synthwave the wisest cat in all the galaxy brown tabby exploring the vastness of space with strange and wonderful creatures meeting friendly aliens",
}

function CreateStory({navigation}) {
  const [textName, onChangeName] = React.useState(item.name);
  const [textContent, onChangeContent] = React.useState(item.description);
  const [textInput, onChangeStoryInput] = React.useState(item.storyInput);
  const [imageInput, onChangeImageInput] = React.useState(item.imageInput);

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={{ flex: 1, width: '100%'}}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'left', margin: 20}}>

            <View style={{border: 1, borderColor: '#AAA', marginBottom: 15, borderWidth: 1, width: '100%', padding: 5, backgroundColor: 'white'}}>
              <Text style={{color: '#424242', marginBottom: 10}} >Story Input</Text>
              <TextInput
                style={styles2.input}
                onChangeText={onChangeStoryInput}
                value={textInput}
                placeholder={(item.storyInput)}
                autoComplete='false'
                multiline
              />
            </View>

            <Pressable onPress={() => alert('Create')} >
              <View style={{backgroundColor: '#424242AA', alignItems: "center", marginTop: 0, marginBottom: 100, borderRadius: 5 }}>
              <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Create this Story!{'\t\t'}$0.09</Text>
              </View>
            </Pressable>

            <View style={{border: 1, borderColor: '#AAA', marginBottom: 15, borderWidth: 1, width: '100%', padding: 5, backgroundColor: 'white'}}>
              <Text style={{color: '#424242', marginBottom: 10}} >Picture Input</Text>
              <TextInput
                style={styles2.input}
                onChangeText={onChangeImageInput}
                value={imageInput}
                placeholder={(item.imageInput)}
                autoComplete='false'
                multiline
              />
            </View>

            <Pressable onPress={() => alert('Create')} >
              <View style={{backgroundColor: '#424242AA', alignItems: "center", marginTop: 0, marginBottom: 100, borderRadius: 5 }}>
              <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Give the Story a Picture{'\t\t'}$0.29</Text>
              </View>
            </Pressable>


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

            <View style={{border: 1, borderColor: '#AAA', marginBottom: 15, borderWidth: 1, width: '100%', padding: 5, backgroundColor: 'white'}}>
              <Text style={{color: '#424242', marginBottom: 10}} >What will you name the Story?</Text>
              <TextInput
                style={styles2.input}
                onChangeText={onChangeName}
                value={textName}
                placeholder={(item.name)}
                autoComplete='false'
              />
            </View>


            <Image source={{ uri: gitCDN.concat(item.image) }} resizeMode={'cover'} style={{width: 250}}></Image>

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
});
