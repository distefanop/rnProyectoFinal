import { StyleSheet, TextInput, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../global/colors'

const Search = ({ keyword, setKeyword }) => {

  return (
    <View style={styles.searchContainer}>
      <TextInput
        onChangeText={(text) => setKeyword(text)}
        style={styles.searchInput}
        value={keyword} />

      <Ionicons name="search" size={32} color={colors['btn-text']} />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 15,
    paddingBottom: 5,
    backgroundColor: colors['secondary-color']
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors['btn-text'],
    borderRadius: 16,
    padding: 8,
    paddingHorizontal: 16,
    width: '90%',
    color: colors['btn-text'],
    fontFamily: 'NataSans-Light',
  }
})