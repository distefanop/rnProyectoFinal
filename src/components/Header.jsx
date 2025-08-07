import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { clearSession } from '../db'
import { clearUser } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'

const Header = ({ title, subtitle }) => {

  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()
  const user = useSelector(state => state.userReducer.userEmail)

  const dispatch = useDispatch()

  const handleClearSession = async () => {
    try {
      await clearSession()
      dispatch(clearUser())
    } catch {
      console.log("Hubo un error al limpiar la sesión")
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {
        user
        &&
        <Pressable onPress={handleClearSession}>
          <Text style={styles.logOut}>Cerrar Sesión</Text>
        </Pressable>
      }
      {
        canGoBack &&
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="return-down-back" size={32} color={colors['btn-text']} />
        </Pressable>
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors['secondary-color']
  },
  title: {
    fontSize: 32,
    fontFamily: 'Sacramento-Regular'
  },
  subtitle: {
    fontFamily: 'NataSans-Bold',
  },
  logOut: {
    fontFamily: 'NataSans-Light',
    color: colors['btn-text']
  }
})