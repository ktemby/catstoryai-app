import { View } from "react-native";
import styles from "../views/Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const Coin = (props) => {
  return (
    <View style={styles.coin}>
      <LinearGradient
        colors={["#FFDF00", "#9544FF"]}
        style={{
          borderRadius: 70,
          width: "100%",
        }}
        start={{ x: 0, y: 0.4 }}
        end={{ x: 2, y: 0.2 }}
      >
        <MaterialCommunityIcons name="cat" color="#FFA" size={props.size} />
      </LinearGradient>
    </View>
  );
};

export default Coin;
