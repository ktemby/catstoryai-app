import { Text, Image, View } from 'react-native';
import styles, {getColorScheme} from '../views/Styles';

const StoryViewer = (name, imageUrl, story) => {
  const themeColorStyle = getColorScheme();

  return (
    <View style={[styles.container, themeColorStyle]}>
      {!!name && <Text style={[styles.Heading, themeColorStyle]}>{(name)}</Text>}
      {!!imageUrl && <Image source={{ uri: imageUrl }} resizeMode={'cover'} style={styles.imageDetail}></Image>}
      {!!story && <Text style={[styles.body, themeColorStyle]}>{(story)}</Text>}
    </View>
  );
}

export default StoryViewer;
