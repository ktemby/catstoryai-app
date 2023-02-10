import { useContext } from "react";
import { Text, FlatList, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Balance from "../components/Balance";
import { PressableHighlight } from "../components/HighlightButton";
import { AppContext } from "../store/context";

const imageString = "../assets/copernicus_and_margot.jpeg";

const accountList = [
  {
    title: "BalanceTester",
    navigation: "BalanceTester",
  },
  {
    title: "My Cats",
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

function AboutScreen({ navigation }) {
  const { themeColorStyle } = useContext(AppContext);

  const renderListItem = ({ item }) => (
    <PressableHighlight
      onPress={() => {
        navigation.navigate(item.navigation);
      }}
    >
      <View style={styles.listItemContainer}>
        <View style={{ width: "90%" }}>
          <Text style={styles.buttonTextStyle}>{item.title}</Text>
        </View>
        <View
          style={{
            width: "10%",
            alignItems: "flex-start",
          }}
        >
          <Text style={[styles.buttonTextStyle, { marginLeft: 3 }]}>〉</Text>
        </View>
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
      <Balance amount={14500} />
    </LinearGradient>
  );
}

export default AboutScreen;
