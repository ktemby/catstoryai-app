import { Text, Image, View } from 'react-native';
import styles, {getColorScheme} from '../views/Styles';

const StoryViewer = (name, imageUrl, story) => {
  const themeColorStyle = getColorScheme();

  return (
    <View style={[styles.container, themeColorStyle]}>
      <Text style={[styles.Heading, themeColorStyle]}>{(name)}</Text>
      <Image source={{ uri: imageUrl }} resizeMode={'cover'} style={styles.imageDetail}></Image>
      <Text style={[styles.body, themeColorStyle]}>{(story)}</Text>
    </View>
  );
}

export default StoryViewer;
