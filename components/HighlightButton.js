import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, Pressable} from 'react-native';
import styles from '../views/Styles';
import { AppContext } from '../store/context';

let HighlightButton = (props) => {
  const {themeColorStyle} = useContext(AppContext);
  let [backColor, setColor] = useState(themeColorStyle.backgroundColor);

  return (
    <View style={{flex:1, backgroundColor: themeColorStyle.backgroundColor, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#616161'}}>
       <Pressable
        style={[props.style, {backgroundColor: themeColorStyle.backgroundColor}]}
        onPressIn={() => setColor(themeColorStyle.highlight)}
        onPressOut={() => setColor(themeColorStyle.backgroundColor)}
        onPress={props.onPress}>
        <Text style={{color: themeColorStyle.color, fontSize: 20, lineHeight: 20, margin: 20, textAlign: "center"}}>{props.title}</Text>
      </Pressable>
    </View>
 );
}

export default HighlightButton;
