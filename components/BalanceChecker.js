import React, { useContext } from "react";
import styles from "../views/Styles";
import { Text, View } from "react-native";
import { AppContext } from "../store/context";
import { PressableHighlight } from "../components/HighlightButton";
import Coin from "../components/Coin";

let BalanceChecker = (props) => {
  const { themeColorStyle } = useContext(AppContext);

  return (
    props.balanceModel.isBalanceLow() && (
      <PressableHighlight
        onPress={() => props.navigation.navigate("Store")}
        style={{
          margin: 20,
          width: "80%",
          padding: 20,
          flex: 1,
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        <Text
          style={[
            styles.buttonTextStyle,
            { color: themeColorStyle.color, textAlign: "center" },
          ]}
        >
          Not enough coins{"\n\n"}Please tap to get more coins in the store!
          {"\n"}
        </Text>
        <View style={[styles.container, { alignItems: "center" }]}>
          <Coin size={30} />
        </View>
      </PressableHighlight>
    )
  );
};

export default BalanceChecker;
