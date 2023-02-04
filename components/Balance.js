import {View, Text} from 'react-native';
import styles, {getColorScheme} from '../views/Styles';
import Coin from '../components/Coin';

let Balance = (props) => {
  const themeColorStyle = getColorScheme();

  return(
    <View style={{width: "100%", height: 34, position: 'absolute', right: 0, top: 59, left: "75%", backgroundColor:"#21212122", borderRadius: 15}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: "5%", justifyContent: "center", alignItems: "flex-end", marginLeft: 10}} >
          <Coin size={20} />
        </View>
        <View style={{width: "20%", justifyContent: "center", alignItems: "flex-start"}} >
          <Text style={[styles.body, {color: themeColorStyle.color, margin: 0, marginLeft: 3}]}>14500</Text>
        </View>
      </View>
    </View>
  );
}

export default Balance;
