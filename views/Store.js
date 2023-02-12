import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import Purchases from "react-native-purchases";
import Coin from "../components/Coin";
import Balance from "../components/Balance";
import { PressableHighlight } from "../components/HighlightButton";
import { AppContext } from "../store/context";
import BalanceModel from "../models/BalanceModel";

let initialPackage = [
  {
    identifier: "consumable",
    offeringIdentifier: "default",
    packageType: "CUSTOM",
    product: {
      currencyCode: "USD",
      description: "placeholder",
      discounts: [Array],
      identifier: "com.keltronix.catstoryai.purchase.story",
      introPrice: null,
      price: 0.9,
      priceString: "$0.90",
      productCategory: "NON_SUBSCRIPTION",
      productType: "NON_CONSUMABLE",
      subscriptionPeriod: null,
      title: "Cat StoryAI App",
    },
  },
];

let getIAPData = async (setPackages) => {
  console.log("getting offerings");
  try {
    const offerings = await Purchases.getOfferings();
    const availablePackages = offerings.all.default.availablePackages;
    setPackages(await availablePackages);
  } catch (e) {
    console.log("Error:", JSON.stringify(e));
  }
};

const handlePurchase = async (myPackage) => {
  try {
    const purchase = await Purchases.purchasePackage(myPackage);
  } catch (e) {
    console.log("Error:", e);
  }
};

const StoreList = (props) => {
  const { themeColorStyle } = useContext(AppContext);

  var renderPackage = (myPackage) => {
    return (
      <View style={[styles.container, { margin: 10 }]}>
        <PressableHighlight
          onPress={() => handlePurchase(myPackage.item)}
          style={styles.storeItem.container}
        >
          <Text
            style={[styles.storeItem.text, { color: themeColorStyle.color }]}
          >
            {myPackage.item.product.description}
          </Text>

          <View style={{ margin: 20 }}>
            <Coin size={60} />
          </View>

          <Text style={[themeColorStyle, styles.storeItem.price]}>
            {myPackage.item.product.priceString}
          </Text>
        </PressableHighlight>
      </View>
    );
  };

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        data={props.packages}
        renderItem={renderPackage}
        numColumns={2}
        style={{ padding: 10 }}
      />
    </View>
  );
};

let Store = () => {
  let [packages, setPackages] = useState(initialPackage);
  const { themeColorStyle } = useContext(AppContext);

  let myBalance = new BalanceModel();

  useEffect(() => {
    getIAPData(setPackages);
  }, []);

  return (
    <SafeAreaView style={[styles.safeAreaHeader, themeColorStyle]}>
      <StoreList packages={packages} />
      <Balance amount={myBalance.getBalance()} />
    </SafeAreaView>
  );
};

export default Store;
