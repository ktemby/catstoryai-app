import { Text, View } from 'react-native';
import styles, {getColorScheme} from '../views/Styles';
import CachedImage from "../components/CachedImage";

const StoryViewer = (name, imageUrl, story) => {
  const themeColorStyle = getColorScheme();

  return (
    <View style={[styles.container, themeColorStyle]}>
      {!!name && <Text style={[styles.Heading, themeColorStyle]}>{(name)}</Text>}
      {!!imageUrl && <CachedImage source={{ uri: imageUrl }} resizeMode={'cover'} style={styles.imageDetail} />}
      {!!story && <Text style={[styles.body, themeColorStyle]}>{(story)}</Text>}
    </View>
  );
}

export default StoryViewer;
