import React, { useState, useEffect, useContext } from "react";
import { View, Switch, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import initialSettingObject from "../assets/settings.json";
import LoadJson, { saveUpdate } from "../models/PhoneStorage";
import { AppContext } from "../store/context";

let Settings = () => {
  const { themeColorStyle, setThemeColorStyle, setDarkThemeOverride } =
    useContext(AppContext); // setThemeColoarStyle and setDTO are used in json callback
  let [settingsObject, setSettingsObject] = useState();
  let [refreshing, setRefreshing] = useState(true);
  const [selectedId, setSelectedId] = useState();
  let jsonName = "settings.json";

  useEffect(() => {
    getData();
  }, []);

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
          //Function(item.callback); // would be nice to not use eval, but safe here since it's our local json
        }
        return item;
      })
    );
  };

  let headerSection = () => (
    <View style={{ flex: 1, height: 1, backgroundColor: "#000" }} />
  );

  const renderSetting = ({ item }) => {
    return (
      item.isShown && (
        <View style={[styles.listItemContainer, themeColorStyle]}>
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
