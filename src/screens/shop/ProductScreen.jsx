import { StyleSheet, Text, Pressable, Image, ScrollView, useWindowDimensions, View } from 'react-native'
import { colors } from '../../global/colors';
import { useDispatch } from 'react-redux';
import { addItems } from '../../features/cart/cartSlice';
import { useState } from 'react';
import QuantitySelector from '../../components/QuantitySelector';

const ProductScreen = ({ route }) => {
    const { product } = route.params;
    const { width } = useWindowDimensions();
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        dispatch(addItems({ product: product, quantity: quantity }));
    };

    return (
        <ScrollView style={styles.productContainer}>
            <Text style={styles.textTitle}>{product.name}</Text>
            <View style={{ width: width * .56, height: width * .56, alignSelf: 'center', borderRadius: 30, overflow: 'hidden' }}>
                <Image
                    source={{ uri: product.img }}
                    alt={product.name}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode='cover'
                />
            </View>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>Precio: ${product.price}</Text>

            <QuantitySelector stock={product.stock} onQuantityChange={handleQuantityChange} />

            <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.addToCartButton]}
                onPress={handleAddToCart}>
                <Text style={styles.textAddToCart}>Agregar al carrito</Text>
            </Pressable>
        </ScrollView>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    productContainer: {
        paddingHorizontal: 16,
        backgroundColor: colors['secondary-color']
    },
    textTitle: {
        fontSize: 22,
        textAlign: 'center',
        paddingBottom: 10,
        fontFamily: 'NataSans-Bold',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 8,
        fontFamily: 'NataSans-Light',
    },
    price: {
        fontSize: 18,
        alignSelf: 'center',
        paddingVertical: 5,
        fontFamily: 'NataSans-Bold',
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.btn,
        borderRadius: 16,
        marginVertical: 5
    },
    textAddToCart: {
        color: colors['btn-text'],
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'NataSans-Bold',
    },
});