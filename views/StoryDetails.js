import React from 'react';
import { ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles, {getColorScheme} from '../views/Styles';
import StoryViewer from '../components/StoryViewer';

function StoryDetail({ route, navigation}) {
  const { item } = route.params;
  const themeColorStyle = getColorScheme();

  let prepend = "";
  const myCDN = "https://d2sphvb6m6942c.cloudfront.net/";
  !!item.cdn ? prepend = myCDN : "";

  let thisStory = new StoryViewer(item.name, prepend.concat(item.image).replace(/ /g, "%20"), item.description);

  return (
      <SafeAreaView style={[styles.safeAreaFull, themeColorStyle]}>
        <ScrollView>
          {thisStory}
        </ScrollView>
      </SafeAreaView>
  );
}

export default StoryDetail;
