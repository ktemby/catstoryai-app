import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles, {getColorScheme} from '../views/Styles';
import StoryViewer from '../components/StoryViewer';

function StoryDetail({ route, navigation}) {
  const { item } = route.params;
  const themeColorStyle = getColorScheme();
  const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";

  let thisStory = new StoryViewer(item.name, myCDN.concat(item.image), item.description);

  return (
      <SafeAreaView style={[styles.safeAreaFull, themeColorStyle]}>
        <ScrollView>
          {thisStory}
        </ScrollView>
      </SafeAreaView>
  );
}

export default StoryDetail;
