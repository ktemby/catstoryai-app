import React, { useState, useEffect } from 'react';
import { View, Pressable, Button, Image, Text, ScrollView, StyleSheet, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import styles, { getColorScheme } from './Styles';
import Cat, {copernicusValues} from "../models/Cat";
import TextInputWithLabel from "../components/TextInputWithLabel";
import * as FileSystem from 'expo-file-system';
import CachedImage from "../components/CachedImage";
import CachedImageBackground from "../components/CachedImageBackground";
import initialLibrary from '../assets/storydata.json';
import StoryViewer from '../components/StoryViewer';
import LoadLibrary, {resetLibrary, getLibraryPath, getLibraryMaxID, saveStoryToLibrary} from '../models/LibraryStorage';
import Purchases from 'react-native-purchases';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Coin from '../components/Coin';

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
    console.log(offerings);
    const availablePackages = offerings.all.default.availablePackages;
    console.log(availablePackages);
    setPackages(await availablePackages);
    console.log("got offerings");
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

let IAPTest = (navigation) => {
  let [packages, setPackages] = useState(initialPackage);
  const themeColorStyle = getColorScheme();

  useEffect(() => {
      getIAPData(setPackages);
  }, []);

  return (

      <SafeAreaView style={[styles.safeAreaHeader, themeColorStyle]}>
        <ScrollView>
          <View style={styles.container}>


          <View style={[styles.container, { margin: 30, width: "40%", borderRadius: 15, borderWidth: 1, borderColor: themeColorStyle.highlight } ]}>
            <Pressable
              style={{flex: 1, width: "100%", height: 250, justifyContent: "center", alignItems: "center"}}
              onPress={() => handlePurchase(packages[0])}
              >
              <Text style={[styles.text, {textAlign: "center"}, themeColorStyle]}>{packages[0].product.description}</Text>
              <View style={{margin: 20}}>
                <Coin size={60} />
              </View>

              <Text style={[{color:"black", fontSize: 20, marginTop: 10},themeColorStyle]}>{packages[0].product.priceString}</Text>

            </Pressable>
          </View>


          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: "10%", justifyContent: "center", alignItems: "flex-end"}} >
              <Coin size={20} />
            </View>
            <View style={{width: "20%", justifyContent: "center", alignItems: "flex-start"}}>
              <Text style={[styles.body, {marginLeft: 3}]}>100</Text>
            </View>
          </View>

          </View>
        </ScrollView>
      </SafeAreaView>

  );
}

export default IAPTest;

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
