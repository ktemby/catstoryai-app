import React, { useState, useEffect } from 'react';
import { OPENAI_API_KEY } from '@env'

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
      "size": "512x512",
      "response_format": "url",
    })
  })
};

const sampleData = { "created":1673128176, "data":[{"url":"https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}]};
const url = 'https://api.openai.com/v1/images/generations'

export const getImagesOAI = async(imagePrompt, setFetchedState, setImageData) => {
     try{
       const response=await fetch(url, requestImageJson(imagePrompt, 1) );
       const data=await response.json();
       setImageData(data);
       //setMyImageData(data);
       console.log(imagePrompt)
       console.log("data in the fetch")
       console.log(data)
     }
     catch(error){
       console.log(error)
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

//export const OpenAI = () => {
//  const imageUrlApi = () => {
//    return ('https://api.openai.com/v1/images/generations')
//  };
  //return (
//};

/*

export function requestImageJson(storyPrompt) {
  return (
    {
      method: 'POST',
      headers: {
        "Authorization": 'Bearer '.concat(OPENAI_API_KEY),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "prompt": {storyPrompt},
        "n": 1,
        "size": "512x512",
        "response_format": "url",
      })
    }
  )
};
*/
