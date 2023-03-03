import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../views/Styles";
import { AppContext } from "../store/context";
import { View, FlatList } from "react-native";
import { PressableHighlight } from "../components/HighlightButton";
import CachedImage from "../components/CachedImage";
import TextInputWithLabel from "../components/TextInputWithLabel";
import { DeleteButton, FavoriteButton } from "../components/StoryViewerButtons";

function EditCat({ item }, catItem, catModel) {
  return (
    <View style={[styles.listItemContainer, { padding: 0 }]}>
      <TextInputWithLabel
        label={item.feature}
        placeholder={catItem[item.item]}
        autoCapitalize={item.capitalize}
        autoCorrect={item.autoCorrect}
        multiline={false}
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

EditCatFooter = (item) => {
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
      <FavoriteButton item={item} style={{ padding: 40 }} />
      <DeleteButton item={item} style={{ padding: 40 }} />
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

  return (
    <SafeAreaView style={[styles.safeAreaFull, themeColorStyle]}>
      <View>
        <FlatList
          data={editList}
          renderItem={(item) => EditCat(item, catItem, catModel)}
          style={{ paddingTop: 60 }}
          ListFooterComponent={() => EditCatFooter(catItem)}
        />
        <CachedImage
          source={{ uri: catItem.image }}
          style={styles.profileThumb}
        />
      </View>
    </SafeAreaView>
  );
}

export default CatEdit;
