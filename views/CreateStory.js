import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../views/Styles";
import { getImagesOAI } from "../models/GetImageOpenAI";
import LoadingSpinner from "../components/LoadingSpinner";
import TextInputWithLabel from "../components/TextInputWithLabel";
import GetTextOpenAI from "../models/GetTextOpenAI";
import StoryViewer from "../components/StoryViewer";
import ModalWrapper from "../components/ModalWrapper";
import PurchaseButton from "../components/PurchaseButton";
import { saveStoryToLibrary } from "../models/LibraryStorage";
import HighlightButton from "../components/HighlightButton";
import BalanceChecker from "../components/BalanceChecker";
import { AppContext } from "../store/context";
import { SafeAreaView } from "react-native-safe-area-context";

const placeholder = {
  name: "A Cat Adventure",
  url: "placeholder_icon.jpeg",
};

let imagePrep =
  "Cat, oil painting, highly detailed, global illumination, fantasy, trending on artstation,  ";
let storyPrep =
  //  "The following is a conversation with a sophisticated large language model AI assistant. The AI is helpful, creative, clever and tells great stories.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a fun childrens story around 500 words long featuring ";
  "The following is a conversation with a sophisticated large language model AI. The AI is helpful, creative, clever, knowledgeable about myths, legends, jokes, folk tales and storytelling from all cultures and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Tell me a fun childrens story around 500 words long featuring ";
let imageNull = { created: 1673128176, data: [{ url: null }] };

// The assistant is helpful, creative, clever, knowledgeable about myths, legends, jokes, folk tales and storytelling from all cultures, and very friendly.

function CreateStory({ navigation }) {
  const { balanceModel, catModel } = useContext(AppContext);
  const [title, setTitle] = React.useState(null);
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const [storyInput, setStoryInput] = React.useState(catModel.getStoryText);
  const [output, setOutput] = useState(null);
  const [fetchedState, setFetchedState] = useState(null);
  const [imageData, setImageData] = useState(imageNull);
  const [showLowBalance, setShowLowBalance] = React.useState(
    balanceModel.isBalanceLow()
  );

  useEffect(() => {
    setShowLowBalance(balanceModel.isBalanceLow());
  }, [imageData, fetchedState, balanceModel]);

  let chatGPTInteraction = new GetTextOpenAI({
    input: storyPrep.concat(storyInput),
    output: output,
    setOutput: setOutput,
    showOutput: false,
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
          saveStoryToLibrary(newStory);
          setShowSaveModal(false);
          let alertString = !!newStory.name ? ` "${newStory.name}"` : "";
          alert(`Saved${alertString}!`);
        }}
        style={{
          width: "50%",
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

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={[styles.safeAreaFull, { paddingTop: 0 }]}>
        <ScrollView style={{ width: "100%" }}>
          <View
            style={[styles.container, { paddingBottom: 10, width: "100%" }]}
          >
            <TextInputWithLabel
              value={storyInput}
              onChangeText={(text) => setStoryInput(text)}
              label="Tell me a story about..."
              placeholder={"Tell me a story about ".concat(
                catModel.getStoryText()
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
          <ModalWrapper
            showModal={showSaveModal}
            setShowModal={setShowSaveModal}
          >
            <TextInputWithLabel
              value={title}
              onChangeText={(text) => setTitle(text)}
              label={"What will you name the Story?"}
              placeholder={placeholder.name}
            />
            <View style={{ flexDirection: "row" }}>
              <CancelButton />
              <SaveButton />
            </View>
          </ModalWrapper>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default CreateStory;
