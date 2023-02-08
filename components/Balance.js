import {View, Text} from 'react-native';
import styles, {getColorScheme} from '../views/Styles';
import Coin from '../components/Coin';

let Balance = (props) => {
  const themeColorStyle = getColorScheme();

  return(
    <View style={{width: "30%", height: 34, position: 'absolute', right: 0, top: 59, backgroundColor:"#21212122", borderRadius: 15}}>
      <View style={{flex: 1, flexDirection: 'row', marginLeft: 3}}>
        <View style={{width: "20%", justifyContent: "center", alignItems: "flex-end"}} >
          <Coin size={20} />
        </View>
        <View style={{width: "80%", justifyContent: "center", alignItems: "flex-start", marginLeft: 3}} >
          <Text style={[styles.buttonTextStyle, {color: themeColorStyle.color, margin: 0}]}>14500</Text>
        </View>
      </View>
    </View>
  );
}

export default Balance;
