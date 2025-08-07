import { StyleSheet, View } from 'react-native'
import { colors } from '../global/colors'

const FlatCard = ({ children, style }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: colors.cards,
    alignItems: "center",
    paddingVertical: 16,
    margin: 10,
    shadowColor: colors['cards-shadow'],
    elevation: 5,
    borderRadius: 20
  }
})