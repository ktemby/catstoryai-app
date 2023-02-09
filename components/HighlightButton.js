import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, Pressable} from 'react-native';
import styles from '../views/Styles';
import { AppContext } from '../store/context';

let HighlightButton = (props) => {
  const {themeColorStyle} = useContext(AppContext);
  let [backColor, setColor] = useState(themeColorStyle.backgroundColor);

  useEffect(() => {
    setColor(themeColorStyle.backgroundColor);
  }, [themeColorStyle]);

  return (

       <Pressable
        style={[props.style, {backgroundColor: backColor}]}
        onPressIn={() => setColor(themeColorStyle.highlight)}
        onPressOut={() => setColor(themeColorStyle.backgroundColor)}
        onPress={props.onPress}>
        <Text style={{color: themeColorStyle.color, fontSize: 20, lineHeight: 20, margin: 20, textAlign: "center" }} > {props.title}</Text>
      </Pressable>

 );
}

export default HighlightButton;

/*
export let PressableHighlight = (props) => {
  const {themeColorStyle} = useContext(AppContext);
  let [backColor, setColor] = useState(themeColorStyle.backgroundColor);

  useEffect(() => {
    setColor(themeColorStyle.backgroundColor);
  }, [themeColorStyle]);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable
     style={[{backgroundColor: backColor}, props.style]}
     onPressIn={() => setColor(themeColorStyle.highlight)}
     onPressOut={() => setColor(themeColorStyle.backgroundColor)}
      {...props}
    />
  );
};
*/
