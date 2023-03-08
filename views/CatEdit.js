import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../views/Styles";
import { AppContext } from "../store/context";
import { View, FlatList, Pressable } from "react-native";
import { PressableHighlight } from "../components/HighlightButton";
import CachedImage from "../components/CachedImage";
import TextInputWithLabel from "../components/TextInputWithLabel";
import { DeleteButton, FavoriteButton } from "../components/StoryViewerButtons";
import * as ImagePicker from "expo-image-picker";

function EditCat({ item }, catItem, catModel) {
  return (
    <View style={[styles.listItemContainer, { padding: 0 }]}>
      <TextInputWithLabel
        label={item.feature}
        placeholder={catItem[item.item]}
        autoCapitalize={item.capitalize}
        autoCorrect={item.autoCorrect}
        multiline={false}
        autoFocus={false}
        onChangeText={(text) => {
          catModel.setData({
            filterKey: "guid",
            item: catItem,
            changeKey: item.item,
            value: text,
          });
          catItem[item.item] = text;
          catModel.getData();
        }}
        frameStyle={{
          width: "100%",
          paddingTop: 12,
          paddingBottom: 10,
          paddingLeft: "8%",
          alignItems: "flex-start",
        }}
      />
    </View>
  );
}

EditCatFooter = (catItem, catModel) => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
          paddingTop: 20,
        },
      ]}
    >
      <FavoriteButton
        item={catItem}
        style={{ padding: 40 }}
        onPress={() => {
          console.log(catItem.isFeatured);
          catModel.setData({
            filterKey: "guid",
            item: catItem,
            changeKey: "isFeatured",
            value: !catItem.isFeatured,
          });
          catItem["isFeatured"] = !catItem.isFeatured;
          catModel.getData();
        }}
      />
      <DeleteButton
        item={catItem}
        style={{ padding: 40 }}
        onPress={() => alert(`Delete ${catItem.name}?`)}
      />
    </View>
  );
};

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

  const [image, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      //console.log(result);
      let imgResult = result.assets[0].uri;
      console.log(imgResult);
      setSelectedImage(imgResult);
      catItem.image = image;
      catModel.setData({
        filterKey: "guid",
        item: catItem,
        changeKey: "image",
        value: imgResult,
      });
      catItem["image"] = imgResult;
      catModel.getData();
      console.log(catModel.getDataObject());
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <SafeAreaView style={[styles.safeAreaFull, themeColorStyle]}>
      <View>
        <FlatList
          data={editList}
          renderItem={(item) => EditCat(item, catItem, catModel)}
          style={{ paddingTop: 60 }}
          ListFooterComponent={() => EditCatFooter(catItem, catModel)}
        />
        <Pressable
          onPress={() => pickImageAsync()}
          style={[
            styles.profileThumb,
            { margin: 20, backgroundColor: "#9E9E9E" },
          ]}
        >
          <CachedImage
            source={{ uri: catItem.image }}
            style={styles.profileThumb}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default CatEdit;
