import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../views/Styles";
import { AppContext } from "../store/context";
import { Text, View, Alert } from "react-native";
import { PressableHighlight } from "../components/HighlightButton";
import CatViewer from "../components/CatViewer";
import { ScrollView } from "react-native-gesture-handler";
import { DeleteButton, FavoriteButton } from "../components/StoryViewerButtons";

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
      }}
    >
      <Text style={{ color: props.color, alignSelf: "center" }}>
        {props.showEdit ? "Done" : "Edit"}
      </Text>
    </PressableHighlight>
  );
};

EditCatFooter = (props) => {
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
        item={props.catItem}
        style={{ padding: 40 }}
        onPress={() => {
          props.catModel.setData({
            filterKey: "guid",
            item: props.catItem,
            changeKey: "isFeatured",
            value: !props.catItem.isFeatured,
          });
        }}
      />
      <DeleteButton
        item={props.catItem}
        style={{ padding: 40 }}
        onPress={() => {
          Alert.alert(
            `Delete ${props.catItem.name}?`,
            `This will permanently delete ${props.catItem.name} from the app`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  props.navigation.navigate("Account");
                  props.catModel.removeCat(props.catItem);
                  props.catModel.getData();
                  console.log("OK Pressed");
                },
              },
            ]
          );
        }}
      />
    </View>
  );
};

function CatDetails({ route, navigation }) {
  const { item } = route.params;
  const { themeColorStyle, catModel } = useContext(AppContext);

  return (
    <SafeAreaView style={[styles.safeAreaFull, themeColorStyle]}>
      <ScrollView>
        <CatViewer item={item} />
        <EditButton
          onPress={() => navigation.navigate("Cat Editor", { item })}
          color={themeColorStyle.color}
        />
        <EditCatFooter
          catItem={item}
          catModel={catModel}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CatDetails;
