import React, { useContext } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import { AppContext } from "../store/context";
import { PressableHighlight } from "../components/HighlightButton";
import Balance from "../components/Balance";
import BalanceModel from "../models/BalanceModel";

let headerSection = () => {
  return <View style={{ flex: 1, height: 1, backgroundColor: "#000" }}></View>;
};

let BalanceTester = () => {
  let balanceModel = new BalanceModel();

  const { themeColorStyle } = useContext(AppContext);

  const renderUser = ({ item }) => {
    return (
      <View
        style={[
          { flex: 1, flexDirection: "row", padding: 40, borderBottomWidth: 1 },
          themeColorStyle,
        ]}
      >
        <View style={{ width: "90%", justifyContent: "center" }}>
          <Text style={[styles.buttonTextStyle, themeColorStyle]}>
            Name: {item.firstName} {item.lastName}
          </Text>
          <Text style={[styles.buttonTextStyle, themeColorStyle]}>
            Coins: {item.coins}
          </Text>
          <Text style={[styles.buttonTextStyle, themeColorStyle]}>
            Guid: {item.guid}
          </Text>
          <Text style={[styles.buttonTextStyle, themeColorStyle]}>
            Start Date: {item.startDate}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeAreaHeader, themeColorStyle]}>
      <FlatList
        data={balanceModel.getDataObject()}
        renderItem={renderUser}
        refreshControl={
          <RefreshControl
            refreshing={balanceModel.getRefreshing()}
            onRefresh={() => balanceModel.getDataObject()}
          />
        }
        ListHeaderComponent={headerSection}
      />

      <View style={[styles.container, { flexDirection: "row", margin: 10 }]}>
        <PressableHighlight
          onPress={() => balanceModel.updateBalance(50)}
          style={{ padding: 40, borderWidth: 1, flex: 1 }}
        >
          <Text style={{ color: themeColorStyle.color }}>Add 50 Coins</Text>
        </PressableHighlight>
        <PressableHighlight
          onPress={() => balanceModel.updateBalance(-25)}
          style={{ padding: 40, borderWidth: 1, flex: 1 }}
        >
          <Text style={{ color: themeColorStyle.color }}>Use 25 Coins</Text>
        </PressableHighlight>
      </View>
      <Balance amount={balanceModel.getBalance()} />
    </SafeAreaView>
  );
};

export default BalanceTester;
