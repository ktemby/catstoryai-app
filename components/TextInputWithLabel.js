import {TextInput, View, Text} from 'react-native';
import styles from '../views/Styles';

const TextInputWithLabel = (parentInput, setParentInput, label, placeholder) => {
  return(
    <View style={[styles.inputWrapper, {width: '100%', margin: 20, marginBottom: 10, padding: 20, paddingTop: 30, alignItems: "center"}]}>
    <View style={[styles.inputWrapper, {width: '90%'}]}>
      <Text style={{color: '#212121', marginBottom: 10}} >{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={text => setParentInput(text)}
        value={parentInput}
        style={{
          color: 'black',
          fontSize: 18,
          backgroundColor: 'white',
        }}
        multiline={true}
      />
    </View>
    </View>
  );
};

export default TextInputWithLabel;
