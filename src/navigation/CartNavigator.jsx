import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen } from "../screens";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

export default function CartNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Carrito'
            screenOptions={{ header: ({ route }) => <Header title="🌵 SuculentApp 🌵" /> }}>

            <Stack.Screen name="Carrito" component={CartScreen} />
        </Stack.Navigator>
    );
}