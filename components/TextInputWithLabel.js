import React, { useContext } from "react";
import { TextInput, View, Text } from "react-native";
import styles from "../views/Styles";
import { AppContext } from "../store/context";

const TextInputWithLabel = (props) => {
  const { themeColorStyle } = useContext(AppContext);
  return (
    <View style={[styles.inputWrapper, props.frameStyle, themeColorStyle]}>
      <View style={[themeColorStyle, { width: "90%" }]}>
        <Text
          style={[{ fontWeight: "bold", marginBottom: 10 }, themeColorStyle]}
        >
          {props.label}
        </Text>
        <TextInput
          placeholder={props.placeholder}
          autoCapitalize={props.autoCapitalize}
          placeholderTextColor="#9E9E9E"
          onChangeText={props.onChangeText}
          value={props.value}
          style={[
            {
              fontSize: 18,
            },
            themeColorStyle,
          ]}
          multiline={props.multiline === undefined ? true : props.multiline}
          autoFocus={true}
        />
      </View>
    </View>
  );
};

export default TextInputWithLabel;
