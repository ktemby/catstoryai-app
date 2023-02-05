import React, {useState} from 'react';

/*
 * Checks whether the total score from categories exceeds a thresnhold.
 */
export const CheckModeration = (moderationSample, modThreshold) => {
  let modScore = 0;

  for (const each in moderationSample.results[0].category_scores) {
    modScore = modScore + moderationSample.results[0].category_scores[each];
    console.log(modScore);
  };
  console.log(`Modscore: ${modScore}`);
  console.log(`Is modscore greater than threshold? ${modScore > modThreshold}`)
  return ((modScore > modThreshold) ? true : false);
};

const blocked = -100;
/*
 * These are tokens and weightings to guide OpenAI responses (i.e., block these words).
*/
export let bias_words = {};
/*
 export let bias_words = {
   "532": blocked, // ' -'
   "851": blocked,
   "35540": blocked, // ' ;)'
   "14373": blocked, // ' :)'
   "25": blocked,
   "8": blocked,
   "2396": blocked, // "So"
   "438": blocked, // '--'
   "1464": blocked, // 'always'
 };
*/

/*
export let bias_words = {
  // Nasty themes
  "77": blocked,
  "7761": blocked,
  "19147": blocked,
  "12267": blocked,
  "13484": blocked,
  "5235": blocked,
  "16207": blocked,
  "18338" : blocked,
  "8044" : blocked,
  "79" : blocked,
  "1211" : blocked,
  "37035" : blocked,
  "11908" : blocked,
  "12819": blocked,
  "1042" : blocked,

  // Bad storywriting
  "532": blocked, // ' -'
  "851": blocked,
  "35540": blocked, // ' ;)'
  "14373": blocked, // ' :)'
  "25": blocked,
  "8": blocked,
};
*/

/*
let moderationSample = {
  "id": "modr-5MWoLO",
  "model": "text-moderation-001",
  "results": [
    {
      "categories": {
        "hate": false,
        "hate/threatening": true,
        "self-harm": false,
        "sexual": false,
        "sexual/minors": false,
        "violence": true,
        "violence/graphic": false
      },
      "category_scores": {
        "hate": 0.22714105248451233,
        "hate/threatening": 0.4132447838783264,
        "self-harm": 0.005232391878962517,
        "sexual": 0.01407341007143259,
        "sexual/minors": 0.0038522258400917053,
        "violence": 0.9223177433013916,
        "violence/graphic": 0.036865197122097015
      },
      "flagged": true
    }
  ]
};
*/
