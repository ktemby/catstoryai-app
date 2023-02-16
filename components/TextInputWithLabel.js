import React, { useContext } from "react";
import { TextInput, View, Text } from "react-native";
import styles from "../views/Styles";
import { AppContext } from "../store/context";

const TextInputWithLabel = (props) => {
  const { themeColorStyle } = useContext(AppContext);

  return (
    <View style={[styles.inputWrapper, themeColorStyle]}>
      <View style={[themeColorStyle, { width: "90%" }]}>
        <Text
          style={[
            { color: "#212121", fontWeight: "bold", marginBottom: 10 },
            themeColorStyle,
          ]}
        >
          {props.label}
        </Text>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor="#9E9E9E"
          onChangeText={(text) => props.setParentInput(text)}
          value={props.parentInput}
          style={[
            {
              fontSize: 18,
            },
            themeColorStyle,
          ]}
          multiline={true}
          autoFocus={true}
        />
      </View>
    </View>
  );
};

export default TextInputWithLabel;
