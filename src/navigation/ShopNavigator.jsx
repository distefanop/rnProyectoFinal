import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesScreen, ProductsScreen, ProductScreen } from "../screens";
import Header from "../components/Header";
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function ShopNavigator() {

    const category = useSelector(state => state.shopReducer.categorySelected)

    return (
        <Stack.Navigator initialRouteName='Categorias' screenOptions={{ header: ({ route }) => <Header title="🌵 SuculentApp 🌵" subtitle={route.name} /> }}>
            <Stack.Screen name="Categorias" component={CategoriesScreen} />
            <Stack.Screen name="Productos" component={ProductsScreen} />
            <Stack.Screen name="Producto" component={ProductScreen} options={{ header: ({ route }) => <Header title="🌵 SuculentApp 🌵" /> }} />
        </Stack.Navigator>
    );
}