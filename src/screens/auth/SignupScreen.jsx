import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../services/auth/authApi'


const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("");

    const [signup, { data, isLoading, isError, error: signupError }] = useSignupMutation();

    const handleSignup = () => {
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        if (!email || !password || !confirmPassword) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        signup({ email, password, returnSecureToken: true });
    };

    useEffect(() => {
        if (data) {
            console.log("Usuario registrado con éxito:", data);
            navigation.navigate('Login', { signupSuccess: true });
        }
        if (isError && signupError) {
            const errorMessage = signupError?.data?.error?.message;
            if (errorMessage) {
                switch (errorMessage) {
                    case 'EMAIL_EXISTS':
                        setError("El email ya está registrado.");
                        break;
                    case 'WEAK_PASSWORD':
                        setError("La contraseña debe tener al menos 6 caracteres.");
                        break;
                    default:
                        setError("Ocurrió un error al registrar. Intenta de nuevo.");
                        break;
                }
            } else {
                setError("Ocurrió un error al registrar. Intenta de nuevo.");
            }
        }
    }, [data, isError, signupError, navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🌵 SuculentApp 🌵</Text>
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
                <TextInput
                    onChangeText={setConfirmPassword}
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                    value={confirmPassword}
                />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {isLoading && <Text style={styles.loadingText}>Creando cuenta...</Text>}

            <View style={styles.footTextContainer}>
                <Text style={styles.textAccount}>¿Ya tenés una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={{ ...styles.underLineText }}>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={handleSignup} disabled={isLoading}>
                <Text style={styles.btnText}>Crear cuenta</Text>
            </Pressable>
        </View>
    )
}

export default SignupScreen

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
    }
})