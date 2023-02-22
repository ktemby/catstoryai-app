import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../views/Styles";
import { AppContext } from "../store/context";
import { View, Text, FlatList, TextInput } from "react-native";
import { PressableHighlight } from "../components/HighlightButton";
import { LinearGradient } from "expo-linear-gradient";
import CatModel from "../models/CatModel";
import CachedImage from "../components/CachedImage";
import CatViewer from "../components/CatViewer";
//import TextInputWithLabel from "../components/TextInputWithLabel";
import { updateByKey } from "../models/PhoneStorage";

let EditButton = (props) => {
  return (
    <PressableHighlight
      onPress={props.onPress}
      style={{
        borderRadius: 36,
        borderColor: props.color,
        borderWidth: 1,
        width: 120,
        alignSelf: "center",
        padding: 18,
        margin: 20,
        paddingLeft: 40,
        paddingRight: 40,
        color: "#FFF",
      }}
    >
      <Text style={{ color: props.color, alignSelf: "center" }}>
        {props.showEdit ? "Done" : "Edit"}
      </Text>
    </PressableHighlight>
  );
};

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
          //onChangeText={(text) => props.setParentInput(text)}
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

let EditCat = ({ item }, catItem) => {
  let listStyle = [styles.buttonTextStyle, { color: "#212121" }];
  //let [featureValue, setFeatureValue] = useState(catItem[item.item]);
  let filterKey = catItem.guid;

  //useEffect

  // export const updateByKey = (props) => {
  //   filterKey = props.filterKey;
  //   props.modifyObject.map((item) => {
  //     if (item[filterKey] === props.item[filterKey]) {
  //       for (var key in item) {
  //         if (key === props.changeKey) {
  //           item[key] = props.value;
  //         }
  //       }
  //     }
  //   });
  // };

  console.log(`guid: ${catItem.guid}`);

  //console.log(catItem);
  return (
    <View style={[styles.listItemContainer, { padding: 0 }]}>
      <TextInputWithLabel
        label={item.feature}
        placeholder={catItem[item.item]}
        //value={catItem[item.item]}
        autoCapitalize={item.capitalize}
      />
    </View>
  );
};

function CatDetails({ route }) {
  const { item } = route.params;
  const catItem = item;
  const { themeColorStyle } = useContext(AppContext);
  const [showEdit, setShowEdit] = useState(false);

  const editList = [
    { feature: "Name", item: "name" },
    { feature: "Color", item: "color", capitalize: "none" },
    { feature: "Breed", item: "breed" },
    { feature: "Breed Mix", item: "breedMix" },
    { feature: "Personality", item: "personality", capitalize: "none" },
    { feature: "Unique feature", item: "feature", capitalize: "none" },
    { feature: "Superpower Action", item: "superpower", capitalize: "none" },
    { feature: "Title", item: "title" },
  ];

  let headerComponent = () => {
    return (
      <View>
        {!showEdit && (
          <>
            <CatViewer item={item} />
            <EditButton
              onPress={() => setShowEdit(!showEdit)}
              color={themeColorStyle.color}
              showEdit={showEdit}
            />
          </>
        )}
      </View>
    );
  };

  let footerComponent = () => {
    return (
      <View>
        {showEdit && (
          <>
            <EditButton
              onPress={() => setShowEdit(!showEdit)}
              color={themeColorStyle.color}
              showEdit={showEdit}
            />
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeAreaFull, themeColorStyle]}>
      <View>
        <FlatList
          data={showEdit && editList}
          renderItem={(item) => EditCat(item, catItem)}
          ListHeaderComponent={headerComponent}
          ListFooterComponent={footerComponent}
          style={{ paddingTop: 40 }}
        />
        {showEdit && (
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
                //borderWidth: 1,
                //borderColor: themeColorStyle.color,
              },
            ]}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default CatDetails;
