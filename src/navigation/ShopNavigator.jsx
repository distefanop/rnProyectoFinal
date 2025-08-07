import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesScreen, ProductsScreen, ProductScreen } from "../screens";
import Header from "../components/Header";
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function ShopNavigator() {

    const category = useSelector(state => state.shopReducer.categorySelected)
    const products = useSelector(state=>state.shopReducer.productSelected)

    return (
        <Stack.Navigator initialRouteName='Categorías' screenOptions={{ header: ({ route }) => <Header title="🌵 SuculentApp 🌵" subtitle={route.name} /> }}>
            <Stack.Screen name="Categorías" component={CategoriesScreen} />
            <Stack.Screen name="Productos" component={ProductsScreen} />
            <Stack.Screen
                name="Producto"
                component={ProductScreen}
                options={({ route }) => ({
                    header: () => <Header title="🌵 SuculentApp 🌵" subtitle={route.params?.product?.name} />
                })} />
        </Stack.Navigator>
    );
}