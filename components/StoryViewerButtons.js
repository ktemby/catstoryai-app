import { useState } from "react";
import { View, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../views/Styles";

// Todo, refactor these and set up proper callbacks if needed.

export let FavoriteButton = (props) => {
  let [fav, setFav] = useState(props.item.isFeatured);
  let [backColor, setColor] = useState(null);

  return (
    <View>
      <Pressable
        onPressIn={() => setColor("#424242")}
        onPressOut={() => setColor(null)}
        onPress={() => {
          props.onPress();
          setFav(!fav);
        }}
        style={[props.style, { backgroundColor: backColor }]}
      >
        <MaterialCommunityIcons
          name="star"
          color={fav ? "yellow" : "#616161"}
          size={50}
        />
      </Pressable>
    </View>
  ); //props.item.isFavorite = !props.item.isFavorite
};

export let DeleteButton = (props) => {
  let [backColor, setColor] = useState(null);
  let [binColor, setBinColor] = useState("#616161");

  return (
    <View>
      <Pressable
        style={[props.style, { backgroundColor: backColor }]}
        onPressIn={() => {
          setColor("#424242"), setBinColor("#FFF");
        }}
        onPressOut={() => {
          setColor(null), setBinColor("#616161");
        }}
        onPress={() => {
          //alert(`Delete ${props.item.name}?`);
          props.onPress();
        }}
      >
        <MaterialCommunityIcons name="delete" color={binColor} size={50} />
      </Pressable>
    </View>
  );
};

/*
Inside Story StoryViewer

<View style={[styles.container, {flexDirection: "row", alignItems: "center", justifyContent: "space-around"}]}>

  <FavoriteButton item={item} style={{padding: 30}} />
  <DeleteButton item={item} style={{padding: 30}}/>

</View>
*/
