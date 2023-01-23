import {TextInput, View, Text} from 'react-native';

const TextInputWithLabel = (parentInput, setParentInput, label, placeholder) => {
  return(
    <View>
      <Text style={{color: '#424242', marginBottom: 10}} >{label}</Text>
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
  );
};

export default TextInputWithLabel;
