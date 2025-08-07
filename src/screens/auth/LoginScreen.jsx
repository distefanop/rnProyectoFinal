import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Switch } from 'react-native'
import { colors } from '../../global/colors';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/auth/authApi';
import { setUser } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { saveSession, clearSession } from '../../db';

const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [persistSession, setPersistSession] = useState(false)
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState(null)

    const [triggerLogin, { data, isError, error: loginError, isLoading }] = useLoginMutation()

    const dispatch = useDispatch()

    const onsubmit = () => {
        setError("");
        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }
        triggerLogin({ email, password, returnSecureToken: true })
    }

    useEffect(() => {
        if (route.params?.signupSuccess) {
            setSuccessMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
            navigation.setParams({ signupSuccess: false });
        }
    }, [route.params?.signupSuccess, navigation]);


    useEffect(() => {

        if (data) {
            setError("");
            setSuccessMessage(null);

            const { localId, email } = data;

            dispatch(setUser({ localId, email }));

            if (persistSession) {
                saveSession(localId, email);
            } else {
                clearSession();
            }
        }

        else if (isError && loginError) {
            const errorMessage = loginError?.data?.error?.message;
            switch (errorMessage) {
                case 'EMAIL_NOT_FOUND':
                case 'INVALID_LOGIN_CREDENTIALS':
                    setError("Credenciales inválidas. Por favor, verifica tu email y contraseña.");
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    setError("Demasiados intentos de inicio de sesión. Intenta de nuevo más tarde.");
                    break;
                default:
                    setError("Ocurrió un error al iniciar sesión. Intenta de nuevo.");
                    break;
            }
        }
    }, [data, isError, loginError, persistSession, dispatch, navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🌵 SuculentApp 🌵</Text>

            {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setEmail}
                    placeholder="Email"
                    style={styles.textInput}
                    value={email}
                />
                <TextInput
                    onChangeText={setPassword}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                    value={password}
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.textAccount}>¿No tenés una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ ...styles.underLineText }}>
                        Registrate
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit} disabled={isLoading}>
                <Text style={styles.btnText}>Iniciar sesión</Text>
            </Pressable>
            <View style={styles.rememberMe}>
                <Switch
                    onValueChange={() => setPersistSession(!persistSession)}
                    value={persistSession}
                    trackColor={{ false: "light-gray", true: "gray" }}
                    thumbColor={persistSession ? colors['switch-on'] : colors['switch-off']}
                />
                <Text style={styles.textAccount}>Recordarme</Text>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors['main-color']
    },
    title: {
        fontFamily: "Sacramento-Regular",
        fontSize: 32,
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors['secondary-color'],
        width: textInputWidth,
        color: colors['text-input'],
        fontFamily: 'NataSans-Light',
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    textAccount: {
        fontFamily: 'NataSans-Light',
    },
    underLineText: {
        textDecorationLine: 'underline',
        fontFamily: 'NataSans-Light',
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.btn,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors['btn-text'],
        fontSize: 16,
        fontFamily: 'NataSans-Bold',
    },
    rememberMe: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    }
})