import React from "react";
import { View, ScrollView } from "react-native";
import { Image } from "react-native";
import styles from "./Styles";

const imageString = "../assets/copernicus_and_margot.jpeg";

function ZoomScreen() {
  return (
    <ScrollView>
      <ScrollView horizontal>
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Image source={require(imageString)}></Image>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

export default ZoomScreen;
