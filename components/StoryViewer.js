import {useContext} from 'react';
import { Text, View } from 'react-native';
import styles from '../views/Styles';
import CachedImage from "../components/CachedImage";
import { AppContext } from '../store/context';

const StoryViewer = (props) => {
  const {themeColorStyle} = useContext(AppContext);

  return (
    <View style={[styles.container, themeColorStyle]}>
      {!!props.name &&
        <Text style={[styles.Heading, themeColorStyle]}>{(props.name)}</Text>}
      {!!props.imageUrl &&
        <CachedImage source={{ uri: props.imageUrl }} resizeMode={'cover'} style={styles.imageDetail} />}
      {!!props.story &&
        <Text style={[styles.body, themeColorStyle]}>{(props.story)}</Text>}
    </View>
  );
}

export default StoryViewer;
