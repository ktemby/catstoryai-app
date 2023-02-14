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
import Balance from "../components/Balance";
import BalanceModel from "../models/BalanceModel";

let cat = new Cat();
cat.state = copernicusValues;

const placeholder = {
  name: "A Cat Adventure",
  url: "placeholder_icon.jpeg",
};

const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";

let imagePrep =
  "Cat, oil painting, highly detailed, global illumination, fantasy, trending on artstation, ";
let storyPrep =
  "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a story around 500 words long featuring ";
let imageNull = { created: 1673128176, data: [{ url: null }] };

function CreateStory() {
  const [title, setTitle] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [storyInput, setStoryInput] = React.useState(cat.catText());
  const [output, setOutput] = useState(null);
  const [fetchedState, setFetchedState] = useState(null);
  const [imageData, setImageData] = useState(imageNull);

  useEffect(() => {
    setFetchedState("idle");
  }, [imageData]);

  let showOutput = false;
  let myBalance = new BalanceModel();

  let chatGPTInteraction = new GetTextOpenAI(
    storyPrep.concat(storyInput),
    output,
    setOutput,
    showOutput
  );

  let CreateImagePurchaseButton = () => {
    return (
      <PurchaseButton
        callback={() => {
          setImageData(imageNull);
          setFetchedState("loading");
          getImagesOAI(
            imagePrep.concat(storyInput),
            setFetchedState,
            setImageData
          );
        }}
        title="Create Picture!"
        price={9}
        icon="cat"
      />
    );
  };

  let KeepContentButton = () => {
    return (
      <PurchaseButton
        callback={() => {
          setShowModal(true);
        }}
        title="Wonderful, save it!"
        price="FREE"
        icon={null}
      />
    );
  };

  let FailContentButton = () => {
    return (
      <PurchaseButton
        callback={() => {
          setImageData(imageNull);
          setOutput(null);
          setTitle(null);
          console.log("cleared it all");
        }}
        title="Disapointing, clear it all"
        price="FREE"
        icon={null}
      />
    );
  };

  let SaveButton = () => {
    return (
      <HighlightButton
        title="Save"
        onPress={() => {
          saveToLibrary(newStory);
          setShowModal(false);
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
        onPress={() => setShowModal(false)}
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
          <View style={[styles.container, { marginTop: 10 }]}>
            {chatGPTInteraction}
            <CreateImagePurchaseButton />
          </View>
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
              { marginTop: 10, marginBottom: 40, width: "100%" },
            ]}
          >
            <KeepContentButton />
            <FailContentButton />
          </View>
        )}
        <ModalWrapper showModal={showModal} setShowModal={setShowModal}>
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
      <Balance amount={myBalance.getBalance()} />
    </LinearGradient>
  );
}

export default CreateStory;
