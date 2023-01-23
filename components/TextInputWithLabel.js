import {TextInput, View, Text} from 'react-native';
import styles from '../views/Styles';

const TextInputWithLabel = (parentInput, setParentInput, label, placeholder) => {
  return(
  <View style={[styles.inputWrapper, {width: '80%', marginBottom: 30, marginTop: 30, padding: 10}]}>
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
