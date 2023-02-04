import React, { useState, useEffect } from 'react';
import { View, Pressable, Button, Image, Text, ScrollView, StyleSheet, ImageBackground, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles, { getColorScheme } from './Styles';
import Cat, {copernicusValues} from "../models/Cat";
import TextInputWithLabel from "../components/TextInputWithLabel";
import * as FileSystem from 'expo-file-system';
import CachedImage from "../components/CachedImage";
import CachedImageBackground from "../components/CachedImageBackground";
import initialLibrary from '../assets/storydata.json';
import LoadLibrary, {resetLibrary, getLibraryPath, getLibraryMaxID, saveStoryToLibrary} from '../models/LibraryStorage';
import Purchases from 'react-native-purchases';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Coin from '../components/Coin';
import Balance from '../components/Balance';

function removeId(library, id) {
  library.forEach((item, index) => {
    if (item.id && item.id === id) {
      data.splice(index, 1);
      return true;
    }
  });
}

let readWriteTest = async () => {
  try {
     } catch(error){
        console.log(error);
    }
    console.log("made it");
};

let initialPackage =
 [
   {
     "identifier": "consumable",
     "offeringIdentifier": "default",
     "packageType": "CUSTOM",
     "product": {
       "currencyCode": "USD",
       "description": "placeholder",
       "discounts": [Array],
       "identifier": "com.keltronix.catstoryai.purchase.story",
       "introPrice": null,
       "price": 0.90,
       "priceString": "$0.90",
       "productCategory": "NON_SUBSCRIPTION",
       "productType": "NON_CONSUMABLE",
       "subscriptionPeriod": null,
       "title": "Cat StoryAI App"
   }
 }
]

let getIAPData = async(setPackages) => {
  console.log("getting offerings");
  try {
    const offerings = await Purchases.getOfferings();
    const availablePackages = offerings.all.default.availablePackages;
    setPackages(await availablePackages);
  }  catch (e) {
    console.log("Error:", JSON.stringify(e));
  }
}

const handlePurchase = async (myPackage) => {
  try {
    const purchase = await Purchases.purchasePackage(myPackage);
  } catch (e) {
    console.log("Error:", e);
  }
};

const StoreList = (props) => {
  const themeColorStyle = getColorScheme();

  var renderPackage = (myPackage) => {
    return (
      <View style={[styles.container, { margin: 10, borderRadius: 15, borderWidth: 1, borderColor: themeColorStyle.highlight } ]}>
        <Pressable
          style={{flex: 1, width: "100%", paddingBottom: 25, paddingTop: 25, justifyContent: "center", alignItems: "center"}}
          onPress={() => handlePurchase(myPackage.item)}
          >
          <Text style={[{fontSize: 22, textAlign: "center"}, themeColorStyle]}>{myPackage.item.product.description}</Text>
          <View style={{margin: 20}}>
            <Coin size={60} />
          </View>
          <Text style={[themeColorStyle, {fontSize: 18, marginTop: 10, backgroundColor:"#21212122", paddingLeft: 15, paddingRight: 15, borderRadius: 15}, ]}>{myPackage.item.product.priceString}</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={{width: "100%"}}>
      <FlatList
        data={props.packages}
        renderItem={renderPackage}
        numColumns={2}
        style={{padding: 10}}
      />
    </View>
  );
}

let Store = (navigation) => {
  let [packages, setPackages] = useState(initialPackage);
  const themeColorStyle = getColorScheme();

  useEffect(() => {
      getIAPData(setPackages);
  }, []);

  return (
    <SafeAreaView style={[styles.safeAreaHeader, themeColorStyle]}>
      <StoreList packages={packages} />
      <Balance />
    </SafeAreaView>
  );
}

export default Store;

/* Accessing local images
const [image, setImage] = useState(null);

 const pickImage = async () => {
   // No permissions request is necessary for launching the image library
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
   });

   console.log(result);

   if (!result.cancelled) {
     setImage(result.uri);
   }
 };
*/
