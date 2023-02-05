import React, { useState, useEffect } from 'react';
import { OPENAI_API_KEY } from '@env'

function removeFromString(words, str) {
  return words.reduce((result, word) => result.replace(`/${word}/g`, ' '), str)
}; // Ugly string literal since replaceAll does not work on Android.

function resizeString(maxLength, str) {
  return (str.length <= maxLength) ? str : (str.substring(0, maxLength));
};

function requestImageJson(imagePrompt, n_images) {
  return ( {
    method: 'POST',
    headers: {
      "Authorization": 'Bearer '.concat(OPENAI_API_KEY),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "prompt": imagePrompt,
      "n": n_images,
      "size": "1024x1024",
      "response_format": "url",
    })
  })
};

const sampleData = { "created":0, "data":[{"url":"https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}]};
const failData = { "created":1, "data":[{"url":"https://via.placeholder.com/256x256.png?text=Be+Nice"}]};
const url = 'https://api.openai.com/v1/images/generations';
const maxPromptLength = 1000;
const scrubWords = [" a ", " and ", " at ", " but ", " for ", " had ", " he ", " her ", " his ", " in ", " of ", " on ", " she ", " that ", " the ", " they ", " to ", " was ", " with ", " when "]

export const getImagesOAI = async(imagePrompt, setFetchedState, setImageData) => {
   var prompt = imagePrompt;
   prompt = removeFromString(scrubWords, prompt);
   prompt = resizeString(maxPromptLength, prompt);

   try{
     const response=await fetch(url, requestImageJson(prompt, 1) );
     const data=await response.json();
     if (typeof(data.data) == 'undefined') { // Ensure we have data
       setImageData(failData);
       setFetchedState('blocked');
       } else {
         setImageData(data);
         console.log(`Data received for image prompt: ${prompt}` )
     };
     console.log(data);
   }
   catch(error){
     console.log(error);
     setImageData(failData);
   }
   finally{
     setFetchedState(null);
   }
};

class OpenAI {
  url() {
    return(url);
  };
}

const openai = new OpenAI();
export default openai;
