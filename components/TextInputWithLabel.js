import {TextInput, View, Text} from 'react-native';
import styles, {getColorScheme} from '../views/Styles';

const TextInputWithLabel = (parentInput, setParentInput, label, placeholder) => {
  const themeColorStyle = getColorScheme();

  return(
    <View style={[styles.inputWrapper, themeColorStyle]}>
    <View style={[themeColorStyle, {width: '90%'}]}>
      <Text style={[{color: '#212121', fontWeight: 'bold', marginBottom: 10}, themeColorStyle]} >{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={text => setParentInput(text)}
        value={parentInput}
        style={[{
          fontSize: 18,
        }, themeColorStyle]}
        multiline={true}
        autoFocus = {true}
      />
    </View>
    </View>
  );
};

export default TextInputWithLabel;
