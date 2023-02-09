import { View, Text, Pressable } from 'react-native';
import styles from '../views/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Coin from '../components/Coin';

let PurchaseButton = (props) => {
  return(
    <View style={{flex: 1, width: "70%", margin: 10}}>
      <Pressable onPress={props.callback} >
        <View style={styles.buttonContainerStyle}>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: "70%", justifyContent: "center"}} >
              <Text style={styles.buttonTextStyle}>{props.title}</Text>
            </View>
            <View style={{width: "10%", justifyContent: "center", alignItems: "flex-end"}} >
              {!!props.icon &&
                <Coin size={20} />
              }
            </View>
            <View style={{width: "20%", justifyContent: "center", alignItems: "flex-start"}}>
              <Text style={[styles.buttonTextStyle, {marginLeft: 3}]}>{props.price}</Text>
            </View>
          </View>

        </View>
      </Pressable>
    </View>
  ) //#6200EE
};

export default PurchaseButton;
