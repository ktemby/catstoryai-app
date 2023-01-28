import { View, Text, Pressable } from 'react-native';
import styles from '../views/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let PurchaseButton = (callback, text, price, icon) => {
  return(
    <View style={{flex: 1, width: "70%", margin: 10}}>
      <Pressable onPress={callback} >
        <View style={styles.buttonContainerStyle}>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: "70%", justifyContent: "center"}} >
              <Text style={styles.buttonTextStyle}>{text}</Text>
            </View>
            <View style={{width: "10%", justifyContent: "center", alignItems: "flex-end"}} >
              {!!icon && <MaterialCommunityIcons name={icon} color="#03DAC5" size={20} />}
            </View>
            <View style={{width: "20%", justifyContent: "center", alignItems: "flex-start"}}>
              <Text style={[styles.buttonTextStyle, {margin: 1}]}>{price}</Text>
            </View>
          </View>

        </View>
      </Pressable>
    </View>
  ) //#6200EE
};

export default PurchaseButton;
