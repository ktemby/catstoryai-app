import { useState, useEffect } from "react";
import LoadJson, { updateData, resetData } from "./PhoneStorage";
import initialCatData from "../assets/dataCats.json";

export function CatModel() {
  let [catDataObject, setCatDataObject] = useState(initialCatData);
  let [refreshing, setRefreshing] = useState(true);

  this.jsonName = "dataCats.json";

  //resetData(this.jsonName, initialCatData);

  useEffect(() => {
    this.getData();
  }, []);

  this.getDataObject = () => {
    return catDataObject;
  };

  this.getRefreshing = () => {
    return refreshing;
  };

  this.getData = async () => {
    const jsonObject = await LoadJson(this.jsonName, initialCatData);
    setCatDataObject(jsonObject);
    console.log(catDataObject);
    setRefreshing(false);
  };

  //this.updateName = async (change) => {
  // let updatedValue = "Copernicat";
  //  await updateData({
  //    changeKey: "name",
  //    value: updatedValue,
  //    setDataObject: setCatDataObject,
  //    dataObject: catDataObject,
  //    jsonName: this.jsonName,
  //  });
  //};

  this.getNames = () => {
    return this.getValue("name");
  };

  this.getValue = (getKey) => {
    let matches = [];
    catDataObject.map((item) => {
      for (var key in item) {
        if (key === getKey) {
          matches.push(item[key]);
        }
      }
    });
    return matches;
  };

  this.show = () => {
    return (
      <View>
        <Text style={styles.Heading}>{this.state.name}</Text>
        <Image
          source={{ uri: this.state.image }}
          style={[styles.ImageStyle, { marginLeft: 20 }]}
        ></Image>
        <Text style={this.props.style}>{this.catText()}</Text>
      </View>
    );
  };

  this.state = {
    name: "Adoracat",
    color: "brown",
    breed: "Tabby",
    breedMix: "",
    feature: "soft fur",
    personality: "playful",
    superpower: "go zoomies",
    title: "The New Cat on the Block",
    image: "https://via.placeholder.com/256x256.png?text=Get+Portrait+First",
  };

  this.catText = () => {
    return [
      "A ",
      this.state.color,
      " ",
      this.state.breed,
      " ",
      this.state.breedMix.length > 1 ? this.state.breedMix.concat(" mix ") : "",
      "named ",
      this.state.name,
      ", who has a ",
      this.state.personality,
      " personality, ",
      this.state.feature,
      ", and loves to ",
      this.state.superpower,
      ".",
    ].join("");
  };
}

export default CatModel;

export let copernicusValues = {
  name: "Copernicus",
  color: "brown",
  breed: "Tabby",
  breedMix: "",
  //breedMix : "Egyptian Mao",
  feature: "soft fur",
  personality: "loving",
  superpower: "cuddle and purr",
  image:
    "https://d2sphvb6m6942c.cloudfront.net/Copernicus%20Wonders%20at%20the%20Stars.png",
  title: "The Renassiance Cat",
};

export let margotValues = {
  name: "Margot",
  color: "white",
  breed: "Lynx Point Siamese",
  breedMix: "Tabby",
  feature: "gorgeous blue eyes",
  personality: "playful",
  superpower: "hunt and make friends",
  image:
    "https://raw.githubusercontent.com/ktemby/catstoryai-app/main/ml/models/MargotModel/Margot_Face.jpeg",
  title: "The Huntress",
};