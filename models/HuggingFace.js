import React, { useState, useEffect } from 'react';
import { HUGGINGFACE_API_KEY } from '@env'

const url = 'https://api.openai.com/v1/images/generations'


async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/gpt2",
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
query("Can you please let us know more details about your ").then((response) => {
    console.log(JSON.stringify(response));
});
// [{"generated_text":"Can you please let us know more details about your ids as a subscriber or other related project? Be sure to update your username and password or it will be stolen via email. Our information is only accessible through our website, and the payment support services"}]

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
