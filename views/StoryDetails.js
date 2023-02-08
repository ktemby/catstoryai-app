import React, {useContext} from 'react';
import { ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../views/Styles';
import StoryViewer from '../components/StoryViewer';
import {AppContext} from '../store/context';

function StoryDetail({ route, navigation}) {
  const { item } = route.params;
  const {themeColorStyle} = useContext(AppContext);

  let prepend = "";
  const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";
  !!item.cdn ? prepend = myCDN : "";

  return (
      <SafeAreaView style={[styles.safeAreaFull, themeColorStyle]}>
        <ScrollView>
          <StoryViewer name={item.name} imageUrl={prepend.concat(item.image).replace(/ /g, "%20")}  story={item.description} />
        </ScrollView>
      </SafeAreaView>
  );
}

export default StoryDetail;
