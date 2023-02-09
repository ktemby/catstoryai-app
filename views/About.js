import React from 'react';
import { Text, FlatList, View, Image, Pressable, ScrollView} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles'
import PurchaseButton from '../components/PurchaseButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Balance from '../components/Balance';

const imageString = '../assets/copernicus_and_margot.jpeg';

const accountList = [
  {
    title: 'My Cats',
    navigation: "CatCreation",
  },
  {
    title: 'Store',
    navigation: "Store",
  },
  {
    title: 'Settings',
    navigation: "Settings",
  },
];

let headerSection = () => {
  return(
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 40}}>
      <Text style = {styles.SubHeading}>The Adventures of</Text>
      <Text style = {styles.HeadingAlt}>Copernicus and Margot</Text>
      <Image style={styles.ImageStyle}
        source = {require( imageString ) }>
      </Image>
      <Text style={{color: 'white', padding: 10}}>Curated AI stories and Art</Text>
    </View>
  )
}

let footerSection = () => {
  return(
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#212121", paddingTop: 40}}>
    </View>
  )
}

function AboutScreen({navigation}) {

  const renderListItem = ({item}) => (
    <Pressable
      onPress={() => {navigation.navigate(item.navigation)}}
    >
    <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#212121", padding: 40, borderBottomWidth: 1}}>
      <View style={{width: "90%", justifyContent: "center"}} >
        <Text style={styles.buttonTextStyle}>{item.title}</Text>
      </View>
      <View style={{width: "10%", justifyContent: "flex-end", alignItems: "flex-start"}}>
        <Text style={[styles.buttonTextStyle, {marginLeft: 3}]}>〉</Text>
      </View>
    </View>
    </Pressable>
  );

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={styles.safeAreaFull}>
        <FlatList
          data={accountList}
          renderItem={renderListItem}
          ListHeaderComponent={headerSection}
          ListFooterComponent={footerSection}
          />
      </SafeAreaView>
      <Balance />
    </LinearGradient>
  );
}

export default AboutScreen;
