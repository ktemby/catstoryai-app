import { View, Text, Pressable } from 'react-native';
import styles from '../views/Styles';

let PurchaseButton = (callback, text, price) => {
  return(
    <View style={{flex: 1, width: "85%", margin: 10}}>
      <Pressable onPress={callback} >
        <View style={styles.buttonContainerStyle}>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: "70%", justifyContent: "center"}} >
              <Text style={styles.buttonTextStyle}>{text}</Text>
            </View>
            <View style={{width: "30%", justifyContent: "center", alignItems: "flex-end"}} >
              <Text style={styles.buttonTextStyle}>{price}</Text>
            </View>
          </View>

        </View>
      </Pressable>
    </View>
  )
};

export default PurchaseButton;
