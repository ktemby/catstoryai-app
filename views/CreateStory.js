import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../views/Styles";
import { getImagesOAI } from "../models/GetImageOpenAI";
import LoadingSpinner from "../components/LoadingSpinner";
import TextInputWithLabel from "../components/TextInputWithLabel";
import Cat, { copernicusValues } from "../models/Cat";
import GetTextOpenAI from "../models/GetTextOpenAI";
import StoryViewer from "../components/StoryViewer";
import ModalWrapper from "../components/ModalWrapper";
import PurchaseButton from "../components/PurchaseButton";
import { saveStoryToLibrary } from "../models/LibraryStorage";
import HighlightButton from "../components/HighlightButton";
import BalanceModel from "../models/BalanceModel";
import BalanceChecker from "../components/BalanceChecker";

let cat = new Cat();
cat.state = copernicusValues;

const placeholder = {
  name: "A Cat Adventure",
  url: "placeholder_icon.jpeg",
};

let imagePrep =
  "Cat, oil painting, highly detailed, global illumination, fantasy, trending on artstation, ";
let storyPrep =
  //  "The following is a conversation with a sophisticated large language model AI assistant. The AI is helpful, creative, clever and tells great stories.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a fun childrens story around 500 words long featuring ";
  "The following is a conversation with a sophisticated large language model AI. The AI is helpful, creative, clever, knowledgeable about myths, legends, jokes, folk tales and storytelling from all cultures and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a fun childrens story around 500 words long featuring ";
let imageNull = { created: 1673128176, data: [{ url: null }] };

// The assistant is helpful, creative, clever, knowledgeable about myths, legends, jokes, folk tales and storytelling from all cultures, and very friendly.

function CreateStory({ navigation }) {
  let balanceModel = new BalanceModel();
  const [title, setTitle] = React.useState(null);
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const [storyInput, setStoryInput] = React.useState(cat.catText());
  const [output, setOutput] = useState(null);
  const [fetchedState, setFetchedState] = useState(null);
  const [imageData, setImageData] = useState(imageNull);
  const [showLowBalance, setShowLowBalance] = React.useState(
    balanceModel.isBalanceLow()
  );

  useEffect(() => {
    setShowLowBalance(balanceModel.isBalanceLow());
    console.log(balanceModel.getBalance());
  }, [imageData, fetchedState, balanceModel]);

  let showOutput = false;

  let chatGPTInteraction = new GetTextOpenAI({
    input: storyPrep.concat(storyInput),
    output: output,
    setOutput: setOutput,
    showOutput: showOutput,
    balanceModel: balanceModel,
  });

  let CreateImagePurchaseButton = () => {
    return (
      <PurchaseButton
        callback={() => {
          setFetchedState("loading");
          setImageData(imageNull);
          getImagesOAI({
            imagePrompt: imagePrep.concat(storyInput),
            setFetchedState: setFetchedState,
            setImageData: setImageData,
            balanceModel: balanceModel,
          });
        }}
        title="Create Picture!"
        price={9}
        icon="cat"
      />
    );
  };

  let KeepContentButton = () => {
    return (
      <HighlightButton
        onPress={() => {
          setShowSaveModal(true);
        }}
        title="Save!"
        style={{ padding: 40 }}
      />
    );
  };

  let FailContentButton = () => {
    return (
      <HighlightButton
        onPress={() => {
          setImageData(imageNull);
          setOutput(null);
          setTitle(null);
          console.log("cleared it all");
        }}
        title="Delete forever"
        style={{ padding: 30, borderLeftWidth: 1, borderColor: "#333" }}
      />
    );
  };

  let SaveButton = () => {
    return (
      <HighlightButton
        title="Save"
        onPress={() => {
          saveToLibrary(newStory);
          setShowSaveModal(false);
          let alertString = !!newStory.name ? ` "${newStory.name}"` : "";
          alert(`Saved${alertString}!`);
        }}
        style={{
          width: "50%",
          padding: 0,
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderColor: "#616161",
        }}
      />
    );
  };

  let CancelButton = () => {
    return (
      <HighlightButton
        title="Cancel"
        onPress={() => setShowSaveModal(false)}
        style={{
          width: "50%",
          borderTopWidth: 1,
          borderColor: "#616161",
          padding: 0,
        }}
      />
    );
  };

  let newStory = {
    name: title,
    id: "",
    description: output,
    image: imageData.data[0].url,
    storyInput: storyInput,
    imageInput: storyInput,
    hiddenInput:
      ", cat, oil painting, highly detailed, global illumination, fantasy, ",
    cdn: false,
  };

  let saveToLibrary = () => {
    saveStoryToLibrary(newStory);
  };

  return (
    <LinearGradient {...styles.gradientProps}>
      <ScrollView>
        <View style={[styles.container, { paddingBottom: 10, paddingTop: 20 }]}>
          <View style={[styles.container, { height: 40 }]}></View>
          <TextInputWithLabel
            parentInput={storyInput}
            setParentInput={setStoryInput}
            label={"Tell me a story about..."}
            placeholder={"Tell me a story about ".concat(
              cat.catText().concat(".")
            )}
          />

          {showLowBalance ? (
            <View style={[styles.container, { width: "100%" }]}>
              <BalanceChecker
                balanceModel={balanceModel}
                navigation={navigation}
              />
            </View>
          ) : (
            <View style={[styles.container, { marginTop: 10 }]}>
              {chatGPTInteraction}
              <CreateImagePurchaseButton />
            </View>
          )}
        </View>

        <View style={styles.container}>
          {fetchedState === "loading" ? LoadingSpinner() : ""}
        </View>

        <View style={{ marginTop: 0 }}>
          <StoryViewer
            name={title}
            imageUrl={imageData.data[0].url}
            story={output}
          />
        </View>

        {(!!output || !!imageData.data[0].url) && (
          <View
            style={[
              styles.container,
              {
                marginTop: 1,
                marginBottom: 1,
                width: "50%",
                flexDirection: "row",
              },
            ]}
          >
            <KeepContentButton />
            <FailContentButton />
          </View>
        )}
        <ModalWrapper showModal={showSaveModal} setShowModal={setShowSaveModal}>
          <TextInputWithLabel
            parentInput={title}
            setParentInput={setTitle}
            label={"What will you name the Story?"}
            placeholder={placeholder.name}
          />
          <View style={{ flexDirection: "row" }}>
            <CancelButton />
            <SaveButton />
          </View>
        </ModalWrapper>
      </ScrollView>
    </LinearGradient>
  );
}

export default CreateStory;
