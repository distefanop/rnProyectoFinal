import { StyleSheet, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../global/colors';

const CameraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Ionicons name="camera" size={24} color={colors['btn-text']} />
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors['btn'],
    width: 48,
    height: 48,
    borderRadius: 50
  }
})