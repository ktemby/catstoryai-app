import React from "react";
import { View, Text } from "react-native";
import styles from "../views/Styles";
import Coin from "../components/Coin";
import { AppContext } from "../store/context";

let Balance = (props) => {
  const { themeColorStyle } = React.useContext(AppContext);

  return (
    <View style={styles.balanceBar.container}>
      <View style={{ flex: 1, flexDirection: "row", marginLeft: 3 }}>
        <View style={styles.balanceBar.coinContainer}>
          <Coin size={20} />
        </View>
        <View style={styles.balanceBar.amountContainer}>
          <Text
            style={[
              styles.buttonTextStyle,
              { color: themeColorStyle.color, margin: 0 },
            ]}
          >
            {props.amount}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Balance;
