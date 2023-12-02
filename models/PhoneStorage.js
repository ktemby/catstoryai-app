import React, { useState } from "react";
import * as FileSystem from "expo-file-system";

export let getPath = (jsonName) => {
  const jsonStoragePath = `${FileSystem.documentDirectory}${jsonName}`;
  return jsonStoragePath;
};

export let saveUpdate = async (props) => {
  let jsonStoragePath = getPath(props.jsonName);

  // Overwrite the old json with current changes to storage
  await FileSystem.writeAsStringAsync(
    jsonStoragePath,
    JSON.stringify(props.jsonObject)
  );
  console.log(`saved ${props.jsonName}`);
};

export let updateUserData = async (props) => {
  await props.setUserDataObject(
    props.userDataObject.map((item) => {
      for (var key in item) {
        if (key === props.changeKey) {
          item[key] = props.value;
          return item;
        }
      }
    })
  );
  await saveUpdate({
    jsonName: props.jsonName,
    jsonObject: props.userDataObject,
  });
};

// We need a way to cleverly retrieve the saved 'isEnabed' values, but also update the underlying model as needed.
export let updateModel = async (jsonName, factoryJsonObject) => {
  let jsonStoragePath = getPath(jsonName);

  // first load the current values in storage
  let jsonCurrentObject = JSON.parse(
    await FileSystem.readAsStringAsync(jsonStoragePath)
  );
  let newObject = factoryJsonObject;

  // update factory setting object with current stored values
  const updateFactoryValues = (currentKey, currentValue) => {
    newObject.map((item) => {
      for (var key in item) {
        if (key === currentKey) {
          //console.log(`matched key: ${key}`);
          item[key] = currentValue;
        }
      }
    });
  };

  await jsonCurrentObject.map((item) => {
    // pull all the current values into the factory value.
    for (var key in item) {
      updateFactoryValues(key, item[key]);
    }
  });

  saveUpdate({ jsonName: jsonName, jsonObject: newObject });
};

// We need a way to cleverly retrieve the saved 'isEnabed' values, but also update the underlying model as needed.
export let updateSettingsModel = async (jsonName, factoryJsonObject) => {
  let jsonStoragePath = getPath(jsonName);

  // first load the current values in storage
  let jsonCurrentObject = JSON.parse(
    await FileSystem.readAsStringAsync(jsonStoragePath)
  );
  let newObject = factoryJsonObject;

  // update factory setting object with current stored values
  const updateFactoryValues = (id, value) => {
    if (value === null) {
      console.log("skipping null value");
      return;
    }
    newObject.map((item) => {
      if (item.id === id) {
        item.isEnabled = value;
      }
    });
  };

  await jsonCurrentObject.map((item) => {
    // pull all the current values into the factory value.
    updateFactoryValues(item.id, item.isEnabled);
  });

  // This would completely nuke the previous preferences.
  saveUpdate({ jsonName: jsonName, jsonObject: newObject });
};

export let initializeStorage = async (jsonName, factoryJsonObject) => {
  let jsonStoragePath = getPath(jsonName);
  const pathCheck = await FileSystem.getInfoAsync(jsonStoragePath);

  // if the library doesn't exist, initialize it from the factory data
  console.log("initializing the storage");
  if (!pathCheck.exists) {
    await FileSystem.writeAsStringAsync(
      jsonStoragePath,
      JSON.stringify(factoryJsonObject)
    );
    console.log(`Initialized storage of ${jsonName}`);
  } else {
    // ensure the model is up to date
    console.log("model exists, updating model");
    if (jsonName === "settings.json") {
      updateSettingsModel(jsonName, factoryJsonObject);
    } else {
      updateModel(jsonName, factoryJsonObject);
    }
  }
  return jsonStoragePath;
};

let LoadJson = async (jsonName, factoryJsonObject) => {
  let jsonStoragePath = await initializeStorage(jsonName, factoryJsonObject);
  // Then we load it into memory
  let jsonObject = JSON.parse(
    await FileSystem.readAsStringAsync(jsonStoragePath)
  );
  return jsonObject;
};

export default LoadJson;
