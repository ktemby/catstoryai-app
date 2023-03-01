import * as FileSystem from "expo-file-system";

// Overwrite the old json with current changes to storage
export let saveUpdate = async (props) => {
  await FileSystem.writeAsStringAsync(
    getPath(props.jsonName),
    JSON.stringify(props.jsonObject)
  );
  console.log(`saved ${props.jsonName}`);
};

export let resetData = async (jsonName, factoryJsonObject) => {
  saveUpdate({ jsonName: jsonName, jsonObject: factoryJsonObject });
};

// Update object when it is being used as a state variable
export let updateData = (props) => {
  let filterKey = props.filterKey;
  props.setDataObject(
    props.dataObject.map((item) => {
      if (item[filterKey] === props.item[filterKey]) {
        for (var key in item) {
          if (key === props.changeKey) {
            // console.log(
            //   `updating ${key} to ${props.value}, only for ${filterKey}`
            // );
            item[key] = props.value;
            return item;
          }
        }
      }
    })
  );
  saveUpdate({
    jsonName: props.jsonName,
    jsonObject: props.dataObject,
  });
};

// directly modify object with current stored values
export const updateByKey = async (props) => {
  filterKey = props.filterKey;
  props.dataObject.map((item) => {
    if (item[filterKey] === props.item[filterKey]) {
      for (var key in item) {
        if (key === props.changeKey) {
          // console.log(
          //   `updating ${key} to ${props.value}, only for ${filterKey}`
          // );
          item[key] = props.value;

          saveUpdate({
            jsonName: props.jsonName,
            jsonObject: props.dataObject,
          });
          return;
        }
      }
    }
  });
};

let updateModel = async (jsonName, factoryJsonObject) => {
  let jsonCurrentObject = await getJsonObject(jsonName);
  let newObject = factoryJsonObject;

  // TODO: this whole section needs cleanup
  // - will wait until other data saving use cases are clearer before refactor
  if (jsonName === "settings.json") {
    // Settings Only: Retrieve the saved values, but also update the underlying model as needed.
    await jsonCurrentObject.map((item) => {
      let key = "isEnabled";
      let filterKey = "id";
      updateByKey({
        dataObject: newObject,
        changeKey: key,
        filterKey: filterKey,
        value: item[key],
        item: item,
        jsonName: jsonName,
      });
    });
  } else if (jsonName === "dataUsers.json") {
    await jsonCurrentObject.map((item) => {
      //console.log("putting current values into the factory reference object");
      for (var key in item) {
        //console.log(`updating ${key} with ${item[key]}`);
        updateByKey({
          dataObject: newObject,
          changeKey: key,
          value: item[key],
          item: item,
          jsonName: jsonName,
        });
      }
    });
  }
  // else if (jsonName === "dataCats.json") {
  //   await jsonCurrentObject.map((item) => {
  //     //console.log("putting current values into the factory reference object");
  //     let filterKey = "guid"; // only update unique elements
  //     for (var key in item) {
  //       console.log(
  //         `updating ${key} with ${item[key]}, only for matching ${filterKey}: which is ${item[filterKey]}`
  //       );
  //       updateByKey({
  //         dataObject: newObject,
  //         changeKey: key,
  //         value: item[key],
  //         item: item,
  //         jsonName: jsonName,
  //         filterKey: filterKey,
  //       });
  //     }
  //   });
  // }
  else {
    console.log(`updating ${jsonName} to factory currently unsupported`);
    return; // If we remove this, we will overwrite to factory each time
  }
  saveUpdate({ jsonName: jsonName, jsonObject: newObject });
};

let initializeStorage = async (jsonName, factoryJsonObject) => {
  let jsonStoragePath = getPath(jsonName);
  const pathCheck = await FileSystem.getInfoAsync(jsonStoragePath);

  if (!pathCheck.exists) {
    console.log(`Data doesn't exist, Initializing storage of ${jsonName}`);
    await FileSystem.writeAsStringAsync(
      jsonStoragePath,
      JSON.stringify(factoryJsonObject)
    );
  } else {
    console.log(`${jsonName} model exists, updating model`);
    await updateModel(jsonName, factoryJsonObject);
  }
  return jsonStoragePath;
};

let getJsonObject = async (jsonName) => {
  return JSON.parse(await FileSystem.readAsStringAsync(getPath(jsonName)));
};

export let getPath = (jsonName) => {
  return `${FileSystem.documentDirectory}${jsonName}`;
};

let LoadJson = async (jsonName, factoryJsonObject) => {
  await initializeStorage(jsonName, factoryJsonObject);
  return await getJsonObject(jsonName);
};

export default LoadJson;
