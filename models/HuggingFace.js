import React, { useState, useEffect } from 'react';
import { HUGGINGFACE_API_KEY } from '@env'

const url = 'https://api.openai.com/v1/images/generations'

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

export const getImagesHF = async(imagePrompt, setFetchedState, setImageData) => {
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

class HuggingFace {
  url() {
    return(url);
  };
}

const hug = new HuggingFace();
export default hug;
