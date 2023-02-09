import {TextInput, View, Text} from 'react-native';
import styles, {getColorScheme} from '../views/Styles';

const TextInputWithLabel = (props) => {
  const themeColorStyle = getColorScheme();

  return(
    <View style={[styles.inputWrapper, themeColorStyle]}>
    <View style={[themeColorStyle, {width: '90%'}]}>
      <Text style={[{color: '#212121', fontWeight: 'bold', marginBottom: 10}, themeColorStyle]}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={text => props.setParentInput(text)}
        value={props.parentInput}
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
