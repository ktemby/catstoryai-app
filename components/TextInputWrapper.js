import React, { useState, useEffect } from 'react';
import {TextInput} from 'react-native';

const AppTextInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      {...props}
      style={[props.style, isFocused && {backgroundColor: 'white'}]}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      maxLength={10000}
    />
  );
};

export default AppTextInput;
