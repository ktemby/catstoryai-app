import * as FileSystem from "expo-file-system";

export let getPath = (jsonName) => {
  const jsonStoragePath = `${FileSystem.documentDirectory}${jsonName}`;
  return jsonStoragePath;
};

// Overwrite the old json with current changes to storage
export let saveUpdate = async (props) => {
  let jsonStoragePath = getPath(props.jsonName);
  await FileSystem.writeAsStringAsync(
    jsonStoragePath,
    JSON.stringify(props.jsonObject)
  );
  console.log(`saved ${props.jsonName}`);
};

export let resetData = async (jsonName, factoryJsonObject) => {
  saveUpdate({ jsonName: jsonName, jsonObject: factoryJsonObject });
};

// Update object when it is being used as a state variable
export let updateData = async (props) => {
  await props.setDataObject(
    props.dataObject.map((item) => {
      for (var key in item) {
        if (key === props.changeKey) {
          console.log(`updating ${key} to ${props.value}`);
          item[key] = props.value;
          return item;
        }
      }
    })
  );
  await saveUpdate({
    jsonName: props.jsonName,
    jsonObject: props.dataObject,
  });
};

// directly modify object with current stored values
const updateByKey = (props) => {
  filterKey = props.filterKey;
  props.modifyObject.map((item) => {
    if (item[filterKey] === props.item[filterKey]) {
      for (var key in item) {
        if (key === props.changeKey) {
          item[key] = props.value;
        }
      }
    }
  });
};

export let updateModel = async (jsonName, factoryJsonObject) => {
  let jsonCurrentObject = await getJsonObject(jsonName);
  let newObject = factoryJsonObject;

  // TODO: this whole section needs cleanup
  // - will wait until other data saving use cases are clearer before refactor
  if (jsonName === "settings.json") {
    // Settings Only: Retrieve the saved values, but also update the underlying model as needed.
    await jsonCurrentObject.map((item) => {
      // pull all the current values into the factory value.
      let key = "isEnabled";
      let filterKey = "id";
      updateByKey({
        modifyObject: newObject,
        changeKey: key,
        filterKey: filterKey,
        value: item[key],
        item: item,
      });
    });
  } else if (jsonName === "dataUsers.json") {
    await jsonCurrentObject.map((item) => {
      //console.log("putting current values into the factory reference object");
      for (var key in item) {
        console.log(`updating ${key} with ${item[key]}`);
        updateByKey({
          modifyObject: newObject,
          changeKey: key,
          value: item[key],
          item: item,
        });
      }
    });
  } else {
    console.log(`updating ${jsonName} currently unsupported`);
  }

  saveUpdate({ jsonName: jsonName, jsonObject: newObject });
};

export let initializeStorage = async (jsonName, factoryJsonObject) => {
  let jsonStoragePath = getPath(jsonName);
  const pathCheck = await FileSystem.getInfoAsync(jsonStoragePath);

  if (!pathCheck.exists) {
    console.log(`Library doesn't exist, Initializing storage of ${jsonName}`);
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
  let jsonStoragePath = getPath(jsonName);
  let jsonObject = JSON.parse(
    await FileSystem.readAsStringAsync(jsonStoragePath)
  );
  return jsonObject;
};

let LoadJson = async (jsonName, factoryJsonObject) => {
  await initializeStorage(jsonName, factoryJsonObject);
  return await getJsonObject(jsonName);
};

export default LoadJson;
