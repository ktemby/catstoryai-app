import { useContext } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../views/Styles";
import CatModel from "../models/CatModel";
import CachedImage from "../components/CachedImage";
import { AppContext } from "../store/context";
import { PressableHighlight } from "../components/HighlightButton";

const renderCatCard = ({ item }, themeColorStyle) => {
  this.catText = () => {
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

  return (
    <View style={{ margin: 20 }}>
      <LinearGradient {...styles.gradientProps} style={{ width: "100%" }}>
        <View style={{ margin: 1 }}>
          <PressableHighlight style={[{ alignItems: "center" }]}>
            <Text
              style={[
                styles.Heading,
                { color: themeColorStyle.color, marginBottom: 5 },
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                styles.SubHeading,
                { color: themeColorStyle.color, marginBottom: 20 },
              ]}
            >
              {item.title}
            </Text>

            <CachedImage
              source={{ uri: item.image }}
              style={[
                styles.ImageStyle,
                {
                  borderRadius: 10,
                  width: "75%",
                  //margin: 10,
                  //alignItems: "center",
                },
              ]}
            />

            <Text
              style={[
                styles.body,
                {
                  color: themeColorStyle.color,
                  textAlign: "center",
                  marginTop: 10,
                  width: "85%",
                },
              ]}
            >
              {catText()}
            </Text>
          </PressableHighlight>
        </View>
      </LinearGradient>
    </View>
  );
};

let CatCreation = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { themeColorStyle } = useContext(AppContext);

  let catModel = new CatModel();

  return (
    <SafeAreaView
      style={[
        styles.safeAreaHeader,
        themeColorStyle,
        { paddingBottom: -insets.bottom },
      ]}
    >
      <FlatList
        data={catModel.getDataObject()}
        renderItem={(item) => renderCatCard(item, themeColorStyle)}
        style={{ padding: 10, width: "100%" }}
      />
    </SafeAreaView>
  );
};

export default CatCreation;

/* Blurhash as a container working on iOS not android
import { Blurhash } from 'react-native-blurhash';
const blurhash = await Blurhash.encode('https://blurha.sh/assets/images/img2.jpg', 4, 3)
<View style={[styles.container, {width: "100%"}]}>
  <Blurhash
    blurhash="LGFFaXYk^6#M@-5c,1J5@[or[Q6."
    style={{flex: 1, width: "100%", height: 100, justifyContent: "center", alignItems: "center"}}>
  </Blurhash>
  <Text style={[styles.Heading, themeColorStyle]}>Buy Coins!</Text>
  <Text style={[styles.text, {textAlign: "center"}, themeColorStyle]}>for more stories</Text>
</View>

*/
