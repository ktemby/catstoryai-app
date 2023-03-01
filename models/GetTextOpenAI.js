import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import styles from "../views/Styles";
import { OPENAI_API_KEY } from "@env";
import { CheckModeration, bias_words } from "../models/CheckModerationOAI";
import LoadingSpinner from "../components/LoadingSpinner";
import PurchaseButton from "../components/PurchaseButton";
import HighlightButton from "../components/HighlightButton";

const GetTextOpenAI = (props) => {
  let modThreshold = 0.0002;
  let postPrep = "\n\nAI: ";
  let input = props.input;
  let output = props.output;
  let setOutput = props.setOutput;
  let showOutput = props.showOutput;
  let balanceModel = props.balanceModel;

  const [loadMessage, setLoadMessage] = useState(null);
  const [inputModFlag, setInputModeration] = useState(null);
  const [outputModFlag, setOutputModeration] = useState(null);

  useEffect(() => {
    if (inputModFlag === false) {
      setLoadMessage("Dreaming your story...");
      getStoryData(); // fetch the story once.
      setInputModeration(null);
      setOutputModeration("pending");
    } else if (inputModFlag === true) {
      console.log("Communicating blocked due to moderation");
      setOutput("I'm sorry, that request was flagged by our moderator.");
    } else {
      ("Neither");
    }
    console.log(
      `Content Moderation State {Input: ${inputModFlag}, Output:${outputModFlag}}`
    );
  }, [inputModFlag]);

  useEffect(() => {
    if (outputModFlag !== "pending") {
      setLoadMessage(null);
    }
  }, [outputModFlag]);

  useEffect(() => {
    if (outputModFlag === "pending") {
      setLoadMessage("Reviewing the story...");
      handleReview();
    }
  }, [output]);

  const getModerationData = async (inputToCheck) => {
    let ModerationAPI = "https://api.openai.com/v1/moderations";

    try {
      const response = await fetch(ModerationAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(OPENAI_API_KEY),
        },
        body: JSON.stringify({
          input: inputToCheck,
        }),
      });
      const modData = await response.json();
      return modData;
    } catch (err) {
      console.log(err);
    }
  };

  const getStoryData = async () => {
    console.log(`Creating Story. Story input: ${input}`);
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(OPENAI_API_KEY),
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: input.concat(postPrep),
          temperature: 0.9,
          top_p: 1,
          max_tokens: 700,
          stop: ["Human:"],
          presence_penalty: 0.6, //1.0
          frequency_penalty: 0.6, //1.0
          logit_bias: bias_words,
        }),
      });
      const data = await response.json();
      console.log(data);
      setOutput(data.choices[0].text);
      balanceModel.updateBalance(-9);
    } catch (err) {
      console.log(err);
      alert("AI is sleeping, try again later");
      setOutputModeration(null);
    }
  };

  const handleReview = async () => {
    // Moderation check on story Data
    console.log("Getting Story Output Moderation Score");
    const outputModData = await getModerationData(output);
    let outputModCheckFlag = CheckModeration(outputModData, modThreshold);
    setOutputModeration(outputModCheckFlag);
  };

  const handleSubmit = async () => {
    setOutputModeration(null);
    setOutput(null);

    // Initial input check
    console.log("Getting Input Moderation Score");
    const modData = await getModerationData(input);
    let modCheckFlag = CheckModeration(modData, modThreshold);
    setInputModeration(modCheckFlag);
  };

  const outputDisplay = () => {
    let blockedMessage =
      "I'm sorry, that request was flagged by our moderator.\n\nAsk for a happy story about kittens?";
    let flaggedMessage =
      "The generated content was flagged as potentially inappropriate, are you sure you want to see it?";
    return (
      <View style={styles.container}>
        <View>
          {inputModFlag === true ? (
            <Text style={styles.body}>{blockedMessage}</Text>
          ) : outputModFlag === true ? (
            <Text style={[styles.body, { textAlign: "center" }]}>
              {flaggedMessage}
            </Text>
          ) : outputModFlag === false ? (
            showOutput && <Text style={styles.body}>{output}</Text>
          ) : (
            ""
          )}
        </View>
        <View style={styles.container}>
          {outputModFlag === "pending" ? LoadingSpinner() : ""}
          {outputModFlag === true && (
            <HighlightButton
              onPress={() => setOutputModeration(false)}
              title="Yes"
            />
          )}
        </View>
      </View>
    );
  };

  let CreateStoryPurchaseButton = () => {
    return (
      <PurchaseButton
        callback={() => {
          handleSubmit();
        }}
        title="Create Story!"
        price="9"
        icon="cat"
      />
    );
  };

  return (
    <View style={[styles.container, { width: "100%" }]}>
      <CreateStoryPurchaseButton />
      {outputDisplay()}
    </View>
  );
};

export default GetTextOpenAI;
