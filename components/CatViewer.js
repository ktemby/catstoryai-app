import { useContext } from "react";
import styles from "../views/Styles";
import { AppContext } from "../store/context";
import { View, Text } from "react-native";
import CachedImage from "../components/CachedImage";

let CatViewer = ({ item }) => {
  const { themeColorStyle, catModel } = useContext(AppContext);
  let prepend = "";
  const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";
  item.cdn === undefined ? "" : (prepend = myCDN);

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

      <CachedImage
        source={{ uri: item.image }}
        style={[styles.ImageStyle, { borderWidth: 0.2 }]}
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
        {catModel.catText(item)}
      </Text>
    </View>
  );
};

export default CatViewer;
