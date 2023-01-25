import { StyleSheet, View } from "react-native";
import CachedImage from "../components/CachedImage";
/*
 * Adapted from https://github.com/facebook/react-native/blob/main/Libraries/Image/ImageBackground.js
*/
let CachedImageBackground = (props) => {
  const flattenedStyle = StyleSheet.flatten(props.style);
  return (
    <View style={props.style}>
      <CachedImage source={props.source} resizeMode={props.resizeMode}
        style={[
          StyleSheet.absoluteFill,
              {
                width: flattenedStyle?.width,
                height: flattenedStyle?.height,
              },
              props.style,
            ]}>
      </CachedImage>
      {props.children}
    </View>
  )
};

export default CachedImageBackground;
