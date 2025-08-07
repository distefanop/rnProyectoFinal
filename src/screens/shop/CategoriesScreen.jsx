import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native'
import FlatCard from '../../components/FlatCard'
import { useDispatch } from 'react-redux'
import { setCategorySelected, filterProducts } from '../../features/shop/shopSlice'
import { useGetCategoriesQuery } from '../../services/shop/shopApi'
import { colors } from '../../global/colors'

const CategoriesScreen = ({ navigation }) => {

  const { data: categories, isLoading, error } = useGetCategoriesQuery()
  const dispatch = useDispatch()

  const renderCategoryItem = ({ item }) => (
    <Pressable onPress={
      () => {
        dispatch(setCategorySelected(item.category))
        dispatch(filterProducts())
        navigation.navigate("Productos")
      }}>
      <FlatCard>
        <View style={styles.categoryContainer}>
          {<Text style={styles.categories}>{item.category}</Text>}
        </View>
      </FlatCard>
    </Pressable>
  )

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={item => item.id}
      style={styles.flatlist} />
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  flatlist: {
    backgroundColor: colors['secondary-color'],
  },
  categories: {
    fontFamily: 'NataSans-Bold',
    color: colors['btn-text']
  }
})