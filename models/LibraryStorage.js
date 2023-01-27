import React from 'react';
import * as FileSystem from 'expo-file-system';
import initialLibrary from '../assets/storydata.json';

export let getLibraryPath = () => {
    let libraryFilename = 'libraryData.json';
    const libraryPath: string = `${FileSystem.documentDirectory}${libraryFilename}`;
    return libraryPath;
}

export let getLibraryMaxID = (library) => {
  return (
    library.reduce((arr, oId) => {
      return (arr = arr> oId.id ? arr : oId.id);
      })
  );
};

export let saveStoryToLibrary = async (newStory) => {
  let libraryPath = getLibraryPath();
  let libraryData = await LoadLibrary();

  let maxId = getLibraryMaxID(libraryData)
  newStory.id = maxId+1;

  libraryData.push(newStory);

  // Save the changes to storage
  await FileSystem.writeAsStringAsync( libraryPath, JSON.stringify(libraryData));
  console.log(`Updated Library with ${newStory.name} id: ${newStory.id}`);
}

/*
 resetLibrary - Write the initial json data to storage
*/
export let resetLibrary = async (setLibrary) => {
  let libraryPath = getLibraryPath();
  let factoryLibrary = await FileSystem.writeAsStringAsync( libraryPath, JSON.stringify(initialLibrary));
  const libraryCheck = await FileSystem.getInfoAsync(libraryPath);
  console.log("reset library to initial");
};

let LoadLibrary = async (setLibrary) => {
  // if the library doesn't exist, we initialize it from the factory data
  let libraryPath = getLibraryPath();
  const libraryCheck = await FileSystem.getInfoAsync(libraryPath);

  if (!libraryCheck.exists) {
    await FileSystem.writeAsStringAsync( libraryPath, JSON.stringify(initialLibrary));
    console.log("Initialized library stories")
  }
  // Then we load it into memory
  let library = JSON.parse(await FileSystem.readAsStringAsync(libraryPath));
  console.log("loaded library")

  // if a state updated provided, use it.
  !!setLibrary ? setLibrary(await library) : "";
  return library;
}

export default LoadLibrary;
