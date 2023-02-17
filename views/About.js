import { useContext } from "react";
import { Text, FlatList, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../views/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Balance from "../components/Balance";
import { PressableHighlight } from "../components/HighlightButton";
import { AppContext } from "../store/context";

const imageString = "../assets/copernicus_and_margot.jpeg";

const accountList = [
  /*{
    title: "BalanceTester",
    navigation: "BalanceTester",
  },
  */
  {
    title: "Cats",
    navigation: "CatCreation",
  },
  {
    title: "Store",
    navigation: "Store",
  },
  {
    title: "Settings",
    navigation: "Settings",
  },
];

let headerSection = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 40 }}>
      <Text style={styles.SubHeading}>The Adventures of</Text>
      <Text style={styles.HeadingAlt}>Copernicus and Margot</Text>
      <Image style={styles.ImageStyle} source={require(imageString)}></Image>
      <Text style={{ color: "white", padding: 10 }}>
        Curated AI stories and Art
      </Text>
    </View>
  );
};

let footerSection = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#212121",
        paddingTop: 40,
      }}
    ></View>
  );
};

let AboutScreen = ({ navigation }) => {
  const { themeColorStyle, balance } = useContext(AppContext);

  const renderListItem = ({ item }) => (
    <PressableHighlight
      onPress={() => {
        navigation.navigate(item.navigation);
      }}
    >
      <View style={styles.listItemContainer}>
        <Text
          style={[
            styles.buttonTextStyle,
            { width: "90%", color: themeColorStyle.color },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.buttonTextStyle,
            {
              width: "10%",
              color: themeColorStyle.color,
            },
          ]}
        >
          〉
        </Text>
      </View>
    </PressableHighlight>
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
      <Balance amount={balance} style={{ top: "20%" }} />
    </LinearGradient>
  );
};

export default AboutScreen;
