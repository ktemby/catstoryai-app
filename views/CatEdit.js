import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../views/Styles";
import { AppContext } from "../store/context";
import { View, Text, FlatList, TextInput } from "react-native";
import { PressableHighlight } from "../components/HighlightButton";
import CachedImage from "../components/CachedImage";
//import TextInputWithLabel from "../components/TextInputWithLabel";
import { updateByKey } from "../models/PhoneStorage";
import CatModel from "../models/CatModel";

const TextInputWithLabel = (props) => {
  const { themeColorStyle } = useContext(AppContext);

  return (
    <View
      style={[
        {
          width: "100%",
          padding: 0,
          paddingTop: 10,
          paddingLeft: "8%",
          alignItems: "flex-start",
        },
        themeColorStyle,
      ]}
    >
      <View style={[themeColorStyle, { width: "100%" }]}>
        <Text style={[{ fontWeight: "bold" }, themeColorStyle]}>
          {props.label}
        </Text>
        <TextInput
          autoCapitalize={props.autoCapitalize}
          placeholder={props.placeholder}
          placeholderTextColor="#9E9E9E"
          onChangeText={props.onChangeText}
          value={props.value}
          style={[
            {
              fontSize: 18,
              paddingBottom: 10,
              paddingTop: 12,
            },
            themeColorStyle,
          ]}
          multiline={false}
          autoFocus={true}
        />
      </View>
    </View>
  );
};

function EditCat({ item }, catItem, catModel) {
  return (
    <View style={[styles.listItemContainer, { padding: 0 }]}>
      <TextInputWithLabel
        label={item.feature}
        placeholder={catItem[item.item]}
        autoCapitalize={item.capitalize}
        autoCorrect={item.autoCorrect}
        onChangeText={(text) => {
          catModel.setData({
            filterKey: "guid",
            item: catItem,
            changeKey: item.item,
            value: text,
          });
          catModel.getData();
        }}
      />
    </View>
  );
}

function CatEdit({ route }) {
  const { item } = route.params;
  const catItem = item;
  const { themeColorStyle, catModel } = useContext(AppContext);

  const editList = [
    { feature: "Name", item: "name", autoCorrect: false },
    { feature: "Color", item: "color", capitalize: "none" },
    { feature: "Breed", item: "breed" },
    { feature: "Breed Mix", item: "breedMix" },
    { feature: "Personality", item: "personality", capitalize: "none" },
    { feature: "Unique feature", item: "feature", capitalize: "none" },
    { feature: "Superpower Action", item: "superpower", capitalize: "none" },
    { feature: "Title", item: "title" },
  ];

  return (
    <SafeAreaView style={[styles.safeAreaFull, themeColorStyle]}>
      <View>
        <FlatList
          data={editList}
          renderItem={(item) => EditCat(item, catItem, catModel)}
          style={{ paddingTop: 60 }}
        />

        <CachedImage
          source={{ uri: catItem.image }}
          style={[
            {
              position: "absolute",
              right: 0,
              top: 0,
              width: 150,
              height: 150,
              borderRadius: 150,
              margin: 20,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

export default CatEdit;
