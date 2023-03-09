import { useState, useEffect } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import LoadJson, {
  updateData,
  resetData,
  updateByKey,
  saveUpdate,
  removeItemByGuid,
} from "../models/PhoneStorage";
import initialCatData from "../assets/dataCats.json";

export function CatModel() {
  let [catDataObject, setCatDataObject] = useState(initialCatData);
  let [refreshing, setRefreshing] = useState(true);

  this.jsonName = "dataCats.json";

  this.resetData = async () => resetData(this.jsonName, initialCatData);
  //this.resetData(); // Quick nuke to get back to factory.

  useEffect(() => {
    this.getData();
  }, []);

  this.getDataObject = () => {
    return catDataObject;
  };

  this.removeCat = (props) => {
    console.log(`removing cat with guid ${props.guid}`);
    removeItemByGuid({
      dataObject: catDataObject,
      guid: props.guid,
      jsonName: this.jsonName,
    });
  };

  this.setData = (props) => {
    console.log(
      `updated unique: ${props.filterKey}, key: ${props.changeKey} value: ${props.value}`
    );
    updateByKey({
      dataObject: catDataObject,
      filterKey: props.filterKey,
      item: props.item,
      changeKey: props.changeKey,
      value: props.value,
      jsonName: this.jsonName,
    });
  };

  this.getRefreshing = () => {
    return refreshing;
  };

  this.getData = async () => {
    const jsonObject = await LoadJson(this.jsonName, initialCatData);
    setCatDataObject(jsonObject);
    setRefreshing(false);
  };

  this.getNames = () => {
    return this.getValue("name");
  };

  this.getCat = (guid) => {
    catDataObject.map((item) => {
      if (item.guid === guid) {
        console.log(JSON.stringify(item));
        return item;
      }
    });
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

  this.getGuid = () => {
    return uuidv4();
  };

  this.createCat = () => {
    let cat = {
      name: "Adoracat",
      color: "brown",
      breed: "Tabby",
      breedMix: "",
      feature: "soft fur",
      personality: "playful",
      superpower: "go zoomies",
      image: "https://via.placeholder.com/256x256.png?text=Get+Portrait+First",
      title: "The New Cat on the Block",
      guid: this.getGuid(),
    };

    let newID = catDataObject.length;
    catDataObject[newID] = cat;
    console.log(catDataObject);
    //console.log(this.getDataObject().length);
    //setCatDataObject(this.getDataObject().push(cat));
    this.saveUpdate();
    return cat;
  };

  this.saveUpdate = () => {
    saveUpdate({ jsonName: this.jsonName, jsonObject: catDataObject });
  };

  this.catText = (item) => {
    return [
      "A ",
      item.color,
      " ",
      item.breed,
      " ",
      item.breedMix.length > 1 ? item.breedMix.concat(" mix ") : "",
      "named ",
      item.name,
      ", who has a ",
      item.personality,
      " personality, ",
      item.feature,
      ", and loves to ",
      item.superpower,
      ".",
    ].join("");
  };

  this.getStoryText = () => {
    let featuredOnly = true;
    let storyText = [];
    catDataObject.map((item) => {
      if (featuredOnly && item["isFeatured"] === true) {
        let addText = this.catText(item);
        storyText.length === 0
          ? (storyText = addText)
          : (storyText = storyText
              .slice(0, -1)
              .concat(", and their friend, a", addText.slice(1)));
      }
    });
    return storyText;
  };
}

export default CatModel;
