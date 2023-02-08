import React, {useState, useEffect} from 'react';
import { Text, View, Image, Pressable, FlatList, ImageBackground, ActivityIndicator, RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import customData from '../assets/storydata.json';
import styles from '../views/Styles'
import CachedImageBackground from "../components/CachedImageBackground";
import LoadLibrary from "../models/LibraryStorage"

const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";

const StoriesScreen = ({navigation}) => {
  let [library, setLibrary] = useState();
  let [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
      getData();
    }, []);

  const getData = async () => {
      const update = await LoadLibrary();
      setLibrary(update.reverse());
      setRefreshing(false);
  };

  var renderItem = ({ item }) => {
    let prepend = "";
    !!item.cdn ? prepend = myCDN : "";
    return (
      <Pressable onPress={() => navigation.navigate('Story Detail', {item} )}>
        <View style={styles.storyListSquare}>
          <CachedImageBackground
            source={{ uri: prepend.concat(item.image).replace(/ /g, "%20")}}
            resizeMode="cover"
            style={styles.image}>
            <Text style={styles.title}>{(item.name)}</Text>
          </CachedImageBackground>
        </View>
      </Pressable>
    );
  };

  return (
    <LinearGradient {...styles.gradientProps}>
    <SafeAreaView style={[styles.safeAreaFull, {alignItems: 'center'}]}>
        <View>
         {refreshing ? <ActivityIndicator /> : null}
          <FlatList
            data={library}
            renderItem={renderItem}
            numColumns={2}
            refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={getData}  />}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default StoriesScreen;
