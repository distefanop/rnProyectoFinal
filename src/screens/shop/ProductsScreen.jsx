import { StyleSheet, Text, FlatList, Pressable } from 'react-native'
import FlatCard from '../../components/FlatCard'
import { useEffect, useState } from 'react'
import Search from '../../components/Search'
import { useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../../services/shop/shopApi'
import { colors } from '../../global/colors'

const ProductsScreen = ({ navigation }) => {
  const [productsFiltered, setProductsFiltered] = useState([])
  const [keyword, setKeyword] = useState("")

  const category = useSelector((state) => (state.shopReducer.categorySelected))

  const { data: productsFilteredCat, isLoading, error } = useGetProductsByCategoryQuery(category.toLowerCase())

  useEffect(() => {
    if (keyword) {
      const productsFilteredKey = productsFilteredCat.filter(product => product.name.includes(keyword))
      setProductsFiltered(productsFilteredKey)
    } else {
      setProductsFiltered(productsFilteredCat)
    }
  }, [category, keyword, productsFilteredCat])

  const renderProductItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("Producto", { product: item })}>
      <FlatCard style={styles.productCard}>
        <Text style={styles.products}>{item.name}</Text>
      </FlatCard>
    </Pressable>
  )

  return (
    <>
      <Search keyword={keyword} setKeyword={setKeyword} />
      <FlatList
        data={productsFiltered}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        style={styles.flatlist} />
    </>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: colors.cards,
    shadowColor: colors['cards-shadow'],
  },
  flatlist: {
    backgroundColor: colors['secondary-color'],
  },
  products: {
    fontFamily: 'NataSans-Bold',
    color: colors['btn-text']
  }
})