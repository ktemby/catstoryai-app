import { View, Text } from "react-native";
import styles from "../views/Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { PressableHighlight } from "../components/HighlightButton";

const Coin = (props) => {
  return (
    <LinearGradient
      {...styles.gradientProps}
      style={{
        borderRadius: 80,
      }}
    >
      <View
        style={{
          borderRadius: 80,
          margin: 1,
          flex: 1,
          alignItems: "center",
          alignContent: "center",
          padding: 20,
          shadowColor: "black",
        }}
      >
        <MaterialCommunityIcons
          name={props.icon === undefined ? "cat" : props.icon}
          color="#FFA"
          size={props.size}
          style={props.style}
        />
        {!(<Text style={{ color: "white" }}>Create</Text>)}
      </View>
    </LinearGradient>
  );
};

let CreateButton = (props) => {
  return (
    <PressableHighlight
      style={styles.container}
      onPress={() => props.navigation.navigate("Create")}
    >
      <View
        style={{
          position: "absolute",
          //right: 20,
          paddingBottom: 10,
          bottom: Platform.OS === "ios" ? "5%" : "1.60%",
          flex: 1,
        }}
      >
        <Coin size={30} icon="plus" style={{ color: "#212121" }} />
      </View>
    </PressableHighlight>
  );
};

export default CreateButton;
