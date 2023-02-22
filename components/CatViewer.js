import { useContext } from "react";
import styles from "../views/Styles";
import { AppContext } from "../store/context";
import { View, Text } from "react-native";
import CachedImage from "../components/CachedImage";

let CatViewer = ({ item }) => {
  const { themeColorStyle } = useContext(AppContext);

  let prepend = "";
  const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";
  !!item.cdn ? (prepend = myCDN) : "";

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
    <View style={{ alignItems: "center" }}>
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

      <CachedImage source={{ uri: item.image }} style={styles.ImageStyle} />

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
    </View>
  );
};

export default CatViewer;
