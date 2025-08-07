import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../global/colors'
import FlatCard from '../../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { removeItems, clearCart } from '../../features/cart/cartSlice'
import { usePostOrderMutation } from '../../services/orders/ordersApi'
import { useNavigation } from '@react-navigation/native'

const CartScreen = () => {
    const cartItems = useSelector(state => state.cartReducer.cartItems)
    const total = useSelector(state => state.cartReducer.total)
    const localId = useSelector(state => state.userReducer.localId)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [triggerPostOrder, { isLoading }] = usePostOrderMutation()

    const handleConfirm = async () => {
        try {
            await triggerPostOrder({
                localId,
                order: {
                    createdAt: new Date().toLocaleString(),
                    cartItems,
                    total
                }
            }).unwrap();
            dispatch(clearCart());
            navigation.navigate('Orders');
        } catch (error) {
            console.error("Error al confirmar la orden:", error);
        }
    }

    const FooterComponent = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.footerTotal}>Total: $ {total} </Text>
            <Pressable
                style={styles.confirmButton}
                onPress={handleConfirm}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color={colors['btn-text']} />
                ) : (
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                )}
            </Pressable>
        </View>
    )

    const renderCartItem = ({ item }) => (
        <FlatCard style={styles.cartContainer}>
            <View>
                <Image
                    source={{ uri: item.img }}
                    style={styles.cartImage}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.cartDescription}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtotal}>Cantidad: {item.quantity}</Text>
                <Text style={styles.subtotal}>Subtotal: $ {item.price * item.quantity}</Text>
                <Pressable onPress={() => dispatch(removeItems(item.id))}>
                    <Icon name="delete" size={24} color={colors['cards-shadow']} style={styles.trashIcon} />
                </Pressable>
            </View>
        </FlatCard>
    )

    return (
        <View style={{ flex: 1 }}>
            {cartItems.length > 0
                ?
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.id}
                    renderItem={renderCartItem}
                    ListHeaderComponent={<Text style={styles.cartScreenTitle}>Mi carrito</Text>}
                    ListFooterComponent={<FooterComponent />}
                    style={styles.flatlist}
                />
                :
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>No hay productos en el carrito</Text>
                </View>
            }
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors['secondary-color']
    },
    emptyCartText: {
        fontSize: 18,
        color: 'gray',
        fontFamily: 'NataSans-Light',
    },
    footerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors['secondary-color'],
        padding: 32,
        gap: 8,
    },
    flatlist: {
        backgroundColor: colors['secondary-color'],
    },
    confirmButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.btn,
        borderRadius: 16,
        marginBottom: 24,
    },
    confirmButtonText: {
        color: colors['btn-text'],
        fontSize: 18,
        fontFamily: 'NataSans-Bold',
    },
    cartContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        alignItems: "center",
        gap: 10,
        borderRadius: 10
    },
    cartImage: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    cartDescription: {
        width: '80%',
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontFamily: 'NataSans-Bold',
    },
    description: {
        marginBottom: 16,
    },
    subtotal: {
        fontSize: 16,
        fontFamily: 'NataSans-Light',
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginRight: 16,
    },
    footerTotal: {
        fontSize: 16,
        fontFamily: 'NataSans-Bold',
    },
    cartScreenTitle: {
        fontSize: 20,
        textAlign: "center",
        paddingVertical: 8,
        fontFamily: 'NataSans-Bold',
    },
});