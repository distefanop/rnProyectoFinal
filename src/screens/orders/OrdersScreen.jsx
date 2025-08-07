import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { colors } from '../../global/colors';
import { useSelector } from 'react-redux';
import { useGetOrdersQuery } from '../../services/orders/ordersApi';
import FlatCard from '../../components/FlatCard';

const OrdersScreen = () => {
    const localId = useSelector(state => state.userReducer.localId)
    const { data: orders, isLoading, isError } = useGetOrdersQuery(localId);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors['btn-text']} />
            </View>
        );
    }

    if (isError || !orders || orders.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No has realizado ninguna orden</Text>
            </View>
        );
    }

    const renderOrderItem = ({ item }) => (
        <FlatCard style={styles.orderCard}>
            <View>
                <Text style={styles.orderDate}>Fecha de la orden: {item.createdAt}</Text>
                <Text style={styles.orderId}>ID de la orden: {item.id}</Text>
                <Text style={styles.orderTotal}>Total: ${item.total}</Text>
            </View>
        </FlatCard>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Ordenes</Text>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={renderOrderItem}
            />
        </View>
    );
}

export default OrdersScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors['secondary-color']
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors['secondary-color']
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors['secondary-color']
    },
    emptyText: {
        fontSize: 18,
        color: 'gray',
        fontFamily: 'NataSans-Light',
    },
    title: {
        fontSize: 20,
        marginBottom: 16,
        textAlign: 'center',
        fontFamily: 'NataSans-Bold',
    },
    orderCard: {
        backgroundColor: colors.cards,
        padding: 16,
        marginBottom: 16
    },
    orderDate: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'NataSans-Light',
    },
    orderId: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'NataSans-Light',
    },
    orderTotal: {
        fontSize: 18,
        marginTop: 8,
        fontFamily: 'NataSans-Bold',
    },
})