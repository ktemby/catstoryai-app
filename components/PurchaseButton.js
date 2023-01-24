import { View, Text, Pressable } from 'react-native';
import styles from '../views/Styles';

let PurchaseButton = (callback, text, price) => {
  return(
    <View style={{flex: 1, width: "85%", margin: 10}}>
    <Pressable onPress={callback} >
      <View style={{alignItems: "center", marginTop: 0, padding: 10, borderRadius: 5, backgroundColor: '#424242AA' }}>
      <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>{text}{'\t\t'}{price}</Text>
      </View>
    </Pressable>
    </View>
  )
};

export default PurchaseButton;
