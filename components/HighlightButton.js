import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, Pressable} from 'react-native';
import styles from '../views/Styles';
import { AppContext } from '../store/context';

export let PressableHighlight = (props) => {
  const {themeColorStyle} = useContext(AppContext);
  let [pressableColor, setPressableColor] = useState(themeColorStyle.backgroundColor);

  useEffect(() => {
    setPressableColor(themeColorStyle.backgroundColor)
  }, [themeColorStyle]);

  return (
    <Pressable
     style={[{backgroundColor: pressableColor, width: "100%"}, props.style]}
     onPressIn={() => setPressableColor(themeColorStyle.highlight)}
     onPressOut={() => setPressableColor(themeColorStyle.backgroundColor)}
     onPress={props.onPress}
    >
      {props.children}
    </Pressable>
  );
};

let HighlightButton = (props) => {
  const {themeColorStyle} = useContext(AppContext);

  return (
    <PressableHighlight onPress={props.onPress} style={props.style}>
      <Text style={{color: themeColorStyle.color, fontSize: 20, lineHeight: 20, margin: 20, textAlign: "center" }} >{props.title}</Text>
    </PressableHighlight>
 );
}

export default HighlightButton;

/*
*/
