import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#212121",
  },
  color: "black",
  backgroundColor: "white",
  highlight: "#616161",
};

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "white",
    headerTitleTint: "white",
  },
  backgroundColor: "#212121",
  color: "white",
  highlight: "#616161",
};

const styles = StyleSheet.create({
  balanceBar: {
    container: {
      width: "20%",
      height: 34,
      position: "absolute",
      right: 0,
      top: Platform.OS === "ios" ? "8%" : "1.60%",
      backgroundColor: "#21212122",
      borderRadius: 15,
    },
    coinContainer: {
      width: "30%",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    amountContainer: {
      width: "80%",
      justifyContent: "center",
      alignItems: "flex-start",
      marginLeft: 3,
    },
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 35,
    borderBottomWidth: 1,
  },
  coin: {
    borderRadius: 70,
    borderColor: "#CC9900",
    borderWidth: 1,
    backgroundColor: "#d4af37",
  },
  storeItem: {
    container: {
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#616161",
      paddingBottom: 25,
      paddingTop: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    price: {
      fontSize: 18,
      marginTop: 10,
      backgroundColor: "#21212122",
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 15,
    },
  },
  safeAreaHeader: {
    flex: 1,
    width: "100%",
    paddingTop: 45, //Needed for iOS when using react-native-safearea-context for SafeAreaView
    paddingBottom: -50,
  },
  safeAreaFull: {
    flex: 1,
    width: "100%",
    paddingBottom: -50,
  },
  loadingtext: {
    fontSize: 28,
    fontWeight: "bold",
  },
  text: {
    fontSize: 24,
    margin: 10,
  },
  gradientProps: {
    colors: ["#03DAC6", "#6200EE"],
    style: {
      height: "100%",
      width: "100%",
    },
    start: { x: 0, y: 0.4 },
    end: { x: 2, y: 0.2 },
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  Heading: {
    fontSize: 26,
    //fontWeight: 700,
    margin: 35,
  },
  HeadingAlt: {
    fontSize: 26,
    color: "#FFF",
    textAlign: "center",
  },
  body: {
    fontSize: 20,
    lineHeight: 35,
    margin: 35,
  },
  SubHeading: {
    fontSize: 14,
    color: "#FFF",
  },
  imageDetail: {
    width: "100%",
    flex: 1,
    height: 400,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ImageStyle: {
    width: 250,
    height: 250,
    borderRadius: 150,
    margin: 15,
  },
  storyListSquare: {
    flex: 1,
    height: 200,
    width: 200,
    textAlign: "bottom",
  },
  title: {
    fontWeight: "bold",
    width: "80%",
    color: "#FFFFFF",
    backgroundColor: "#424242AA",
    position: "absolute",
    bottom: 0,
    margin: 10,
  },
  inputWrapper: {
    width: "100%",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: "center",
  },
  buttonTextStyle: {
    fontWeight: "bold",
    color: "white",
  },
  buttonContainerStyle: {
    alignItems: "flex-start",
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#424242AA",
  },
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  profileThumb: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 150,
    height: 150,
    borderRadius: 150,
    margin: 20,
  },
});

export default styles;
