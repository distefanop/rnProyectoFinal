import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../global/colors';
import { useState } from 'react';

const QuantitySelector = ({ stock, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        if (quantity < stock) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const handleSubtract = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    return (
        <View style={styles.quantityContainer}>
            <Pressable onPress={handleSubtract} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Pressable onPress={handleAdd} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
        </View>
    );
};

export default QuantitySelector;

const styles = StyleSheet.create({
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        gap: 20
    },
    quantityButton: {
        backgroundColor: colors.btn,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        color: colors['btn-text'],
        fontSize: 20,
        fontFamily: 'NataSans-Bold',
    },
    quantityText: {
        fontSize: 18,
        fontFamily: 'NataSans-Bold',
    },
});