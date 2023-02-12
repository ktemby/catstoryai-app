import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Switch,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import initialSettingObject from "../assets/settings.json";
import LoadJson, { saveUpdate } from "../models/PhoneStorage";
import { AppContext } from "../store/context";
import { MyDarkTheme, MyLightTheme } from "../views/Styles";

//settingsObject = Settings.getSetting

let Settings = () => {
  const { themeColorStyle, setThemeColorStyle, setDarkThemeOverride } =
    useContext(AppContext);

  let [settingsObject, setSettingsObject] = useState();
  let [refreshing, setRefreshing] = useState(true);
  const [selectedId, setSelectedId] = useState();

  let jsonName = "settings.json";

  useEffect(() => {
    getData();
  }, []);

  const getSetting = (key) => {
    try {
      settingsObject.map((item) => {
        if (item.key === key) {
          return item.value;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    const jsonObject = await LoadJson(jsonName, initialSettingObject);
    setSettingsObject(jsonObject);
    setRefreshing(false);
  };

  const updateToggle = (id, value) => {
    setSettingsObject(
      settingsObject.map((item) => {
        if (item.id === id) {
          item.isEnabled = value;
          eval(item.callback);
          //Function(item.callback);
        }
        return item;
      })
    );
  };

  let headerSection = () => {
    return (
      <View style={{ flex: 1, height: 1, backgroundColor: "#000" }}></View>
    );
  };

  const renderSetting = ({ item }) => {
    return (
      item.isShown && (
        <View
          style={[
            {
              flex: 1,
              flexDirection: "row",
              padding: 40,
              borderBottomWidth: 1,
            },
            themeColorStyle,
          ]}
        >
          <View style={{ width: "90%", justifyContent: "center" }}>
            <Text style={[styles.buttonTextStyle, themeColorStyle]}>
              {item.title}
            </Text>
          </View>
          <View
            style={{
              width: "10%",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Switch
              trackColor={{ false: "#616161", true: "#03DAC6" }}
              thumbColor={item.isEnabled ? "#FFF" : "#FFF"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                updateToggle(item.id, !item.isEnabled);
                saveUpdate({ jsonName: jsonName, jsonObject: settingsObject });
                setSelectedId(item.id);
              }}
              value={item.isEnabled}
            />
          </View>
        </View>
      )
    );
  };

  return (
    <SafeAreaView style={[styles.safeAreaHeader, themeColorStyle]}>
      <FlatList
        data={settingsObject}
        renderItem={renderSetting}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
        extraData={selectedId}
        ListHeaderComponent={headerSection}
      />
    </SafeAreaView>
  );
};

export default Settings;

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
