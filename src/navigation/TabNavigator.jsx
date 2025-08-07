import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopNavigator from './ShopNavigator';
import CartNavigator from './CartNavigator';
import OrdersNavigator from './OrdersNavigator';
import ProfileNavigator from './ProfileNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet } from 'react-native';
import { colors } from '../global/colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBar, tabBarActiveTintColor: colors['cards-shadow'], tabBarInactiveTintColor: 'gray', }}>
            <Tab.Screen name="Shop" component={ShopNavigator} options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={21} color={color} /> }} />
            <Tab.Screen name="Cart" component={CartNavigator} options={{ tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} /> }} />
            <Tab.Screen name="Orders" component={OrdersNavigator} options={{ tabBarIcon: ({ color }) => <Ionicons name="list-circle" size={24} color={color} /> }} />
            <Tab.Screen name="Profile" component={ProfileNavigator} options={{ tabBarIcon: ({ color }) => <Ionicons name="person-sharp" size={21} color={color} /> }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors['secondary-color'],
        paddingTop: 10,
    }
})