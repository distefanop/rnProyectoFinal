import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrdersScreen } from "../screens";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

export default function OrdersNavigator() {
    return (
        <Stack.Navigator initialRouteName='Ordenes' screenOptions={{ header: ({ route }) => <Header title="🌵 SuculentApp 🌵" /> }}>

            <Stack.Screen name="Ordenes" component={OrdersScreen} />

        </Stack.Navigator>
    );
}