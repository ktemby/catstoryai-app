import { View, Text, Pressable } from "react-native";
import styles from "../views/Styles";
import Coin from "../components/Coin";

let PurchaseButton = (props) => {
  return (
    <View style={{ width: "70%", margin: 10 }}>
      <Pressable onPress={props.callback}>
        <View style={styles.buttonContainerStyle}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.buttonTextStyle,
                { alignSelf: "center", width: "70%" },
              ]}
            >
              {props.title}
            </Text>

            <View style={{ width: "10%", alignItems: "flex-end" }}>
              {!!props.icon && <Coin size={20} />}
            </View>

            <Text
              style={[
                styles.buttonTextStyle,
                {
                  marginLeft: 3,
                  width: "20%",
                  alignSelf: "center",
                },
              ]}
            >
              {props.price}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  ); //#6200EE
};

export default PurchaseButton;
