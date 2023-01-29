import React, {useState, useEffect} from "react";
import { Image } from "react-native";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

const CachedImage = (props) => {
  const { source, style } = props;
  const [uri, setUri] = useState(null);

  useEffect(() => {
    Cached();
  }, []);

  const Cached = async () => {
    try {
      // we hash the url image
      const name = shorthash.unique(source.uri);

      // we save and cache the image in user system with shorthash name
      const path = `${FileSystem.cacheDirectory}${name}`;

      // we invoke the user file system to check
      const image = await FileSystem.getInfoAsync(path);

      // if the image path exists, we return and display it
      if (image.exists) {
        setUri(image.uri);
        //console.log(`retrieved image from filesystem ${JSON.stringify(image)}`)
        return;
      }

      // otherwise we download the image, then return the local reference to it.
      const newImage = await FileSystem.downloadAsync(source.uri, path);
      //console.log(`cached new image to filesystem ${JSON.stringify(newImage)}`)
      setUri(newImage.uri);
    } catch (err) {
      console.log(err);
    }
  };

  return <Image style={style} source={{ uri: uri }} />;
}

export default CachedImage;
