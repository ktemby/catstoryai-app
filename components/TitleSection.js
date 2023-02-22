import { View, Text } from "react-native";
import styles from "../views/Styles";

let TitleSection = (props) => {
  let names = props.names;

  nameString = "";
  names.length == 0
    ? (nameString = "Cats")
    : names.length == 1
    ? (nameString = names)
    : names.length == 2
    ? (nameString = names[0] + " and " + names[1])
    : (nameString = names[0] + ", " + names[1] + " & friends");

  return (
    <View style={[props.style, { alignItems: "center", paddingBottom: 20 }]}>
      <Text style={styles.SubHeading}>The Adventures of</Text>
      <Text style={styles.HeadingAlt}>{nameString}</Text>
    </View>
  );
};

export default TitleSection;
