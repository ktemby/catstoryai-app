import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import Purchases from "react-native-purchases";
import Coin from "../components/Coin";
import Balance from "../components/Balance";
import { PressableHighlight } from "../components/HighlightButton";
import { AppContext } from "../store/context";

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

const handlePurchase = async (props) => {
  try {
    console.log("attempting purchase");
    const purchase = await Purchases.purchasePackage(props.package);

    if (true) {
      // TODO get the latest purchase from customerIfno at this point, and extract the amount
      // could also check to see if it matches the amout we expect in the product description info
      console.log(JSON.stringify(purchase));
      console.log(props.package);

      let amount = props.package.product.description.match(/\d/g).join("");
      props.balanceModel.updateBalance(1 * amount);
    }
  } catch (e) {
    console.log("Error:", e);
    alert(`We're sorry!\n\n ${e}`);
  }
};

const StoreList = (props) => {
  const { themeColorStyle } = useContext(AppContext);

  var renderPackage = (myPackage) => {
    return (
      <View style={[styles.container, { margin: 10 }]}>
        <PressableHighlight
          onPress={() =>
            handlePurchase({
              package: myPackage.item,
              balanceModel: props.balanceModel,
            })
          }
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
  const { themeColorStyle, balanceModel, balance } = useContext(AppContext);

  useEffect(() => {
    getIAPData(setPackages);
  }, []);

  return (
    <SafeAreaView style={[styles.safeAreaHeader, themeColorStyle]}>
      <StoreList packages={packages} balanceModel={balanceModel} />
      <Balance amount={balance} />
    </SafeAreaView>
  );
};

export default Store;
