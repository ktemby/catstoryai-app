import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../views/Styles";
import { PressableHighlight } from "../components/HighlightButton";
import { AppContext } from "../store/context";
import { LinearGradient } from "expo-linear-gradient";
import CatModel from "../models/CatModel";
import CachedImageBackground from "../components/CachedImageBackground";
import TitleSection from "../components/TitleSection";
import Balance from "../components/Balance";

let CatCard = (props) => {
  const { themeColorStyle } = useContext(AppContext);

  return (
    <Pressable
      style={[{ backgroundColor: pressableColor, width: "100%" }, props.style]}
      onPressIn={() => setPressableColor(themeColorStyle.highlight)}
      onPressOut={() => setPressableColor(themeColorStyle.backgroundColor)}
      onPress={props.onPress}
    >
      {props.children}
    </Pressable>
  );
};

let CreateCatFooter = () => {
  return (
    <View style={{ margin: 10, marginRight: 30 }}>
      <LinearGradient {...styles.gradientProps} style={{ borderRadius: 15 }}>
        <View style={{ margin: 1 }}>
          <PressableHighlight
            style={[
              {
                alignItems: "center",
                justifyContent: "center",
                width: 150,
                height: 250,
                borderRadius: 15,
              },
            ]}
          >
            <Text style={[{ color: "#FFF", fontSize: 50 }]}>+</Text>
          </PressableHighlight>
        </View>
      </LinearGradient>
    </View>
  );
};

const renderMiniCard = ({ item }, navigation) => {
  //let cat = item;
  //console.log(`rendering: ${JSON.stringify(item)}`);
  //console.log(cat.image);
  return (
    <View style={{ margin: 10 }}>
      <LinearGradient {...styles.gradientProps} style={{ borderRadius: 15 }}>
        <View style={{ margin: 1 }}>
          <PressableHighlight
            style={[{ width: 150, borderRadius: 15 }]}
            onPress={() => navigation.navigate("Cat Details", { item })}
          >
            <CachedImageBackground
              source={{ uri: item.image }}
              style={[
                styles.ImageStyle,
                {
                  borderRadius: 15,
                  width: "100%",
                  margin: 0,
                  alignItems: "center",
                },
              ]}
            />
          </PressableHighlight>
        </View>
      </LinearGradient>
    </View>
  );
};

let CatCarousel = (navigation) => {
  const { catModel, catData, setCatData } = useContext(AppContext);

  useEffect(() => {
    setCatData(catModel.getDataObject());
  }, [catModel]);

  return (
    <View>
      <TitleSection names={catModel.getNames()} style={{ paddingTop: 40 }} />
      <View>
        <FlatList
          data={catData}
          renderItem={(item) => renderMiniCard(item, navigation)}
          style={{ padding: 10, width: "100%" }}
          horizontal={true}
          ListFooterComponent={CreateCatFooter}
          snapToAlignment="start"
          decelerationRate={"fast"}
          snapToInterval={160}
        />
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            paddingBottom: 10,
          }}
        >
          Curated AI stories and Art
        </Text>
      </View>
    </View>
  );
};

let AccountScreen = ({ navigation }) => {
  const { themeColorStyle } = useContext(AppContext);
  let listStyle = [styles.buttonTextStyle, { color: themeColorStyle.color }];

  const accountMenuList = [
    //{ title: "BalanceTester", navigation: "BalanceTester" },
    { title: "Store", navigation: "Store" },
    { title: "Settings", navigation: "Settings" },
  ];

  let footerSection = () => {
    return <View style={[{ flex: 1, padding: "15%" }, themeColorStyle]} />;
  };

  const renderNavListItem = ({ item }) => (
    <PressableHighlight
      onPress={() => {
        navigation.navigate(item.navigation);
      }}
    >
      <View style={styles.listItemContainer}>
        <Text style={[listStyle, { width: "90%" }]}>{item.title}</Text>
        <Text style={[listStyle, { width: "10%" }]}>〉</Text>
      </View>
    </PressableHighlight>
  );

  return (
    <View>
      <FlatList
        data={accountMenuList}
        renderItem={renderNavListItem}
        ListHeaderComponent={() => CatCarousel(navigation)}
        ListFooterComponent={footerSection}
      />
    </View>
  );
};

let Account = ({ navigation }) => {
  const { balance } = useContext(AppContext);

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={[styles.safeAreaFull]}>
        <AccountScreen navigation={navigation} />
        <Balance amount={balance} style={{ top: "20%" }} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Account;
