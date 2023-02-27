import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../views/Styles";
import { AppContext } from "../store/context";
import { View, Text } from "react-native";
import { PressableHighlight } from "../components/HighlightButton";
import CatViewer from "../components/CatViewer";
import { ScrollView } from "react-native-gesture-handler";

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

function CatDetails({ route, navigation }) {
  const { item } = route.params;
  const { themeColorStyle } = useContext(AppContext);

  return (
    <SafeAreaView style={[styles.safeAreaFull, themeColorStyle]}>
      <ScrollView>
        <CatViewer item={item} />
        <EditButton
          onPress={() => navigation.navigate("Cat Editor", { item })}
          color={themeColorStyle.color}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CatDetails;
