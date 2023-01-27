import React from 'react';
import * as FileSystem from 'expo-file-system';
import initialLibrary from '../assets/storydata.json';

let LoadLibrary = async (setLibrary) => {
  let libraryFilename = 'libraryData.json';
  const libraryPath: string = `${FileSystem.documentDirectory}${libraryFilename}`;

  // if the library doesn't exist, we initialize it from the factory data
  const libraryCheck = await FileSystem.getInfoAsync(libraryPath);

  if (!libraryCheck.exists) {
    await FileSystem.writeAsStringAsync( libraryPath, JSON.stringify(initialLibrary));
    console.log("Initialized library stories")
  }

  // Then we load it into memory
  console.log("loaded library")

  let library = JSON.parse(await FileSystem.readAsStringAsync(libraryPath));

  !!setLibrary ? setLibrary(await library) : "";

  return library;
}

export default LoadLibrary;
