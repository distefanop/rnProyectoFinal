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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {
        user
        &&
        <View style={styles.logOutContainer}>
          <Pressable onPress={handleClearSession}>
            <Text style={styles.logOut}>Cerrar Sesión</Text>
          </Pressable>
        </View>
      }
      {
        canGoBack &&
        <View style={styles.goBackContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="return-down-back" size={32} color={colors['btn-text']} />
          </Pressable>
        </View>

      }
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors['secondary-color'],
    position: 'relative',
  },
  titleContainer: {
    position: 'absolute',
    top: 50,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Sacramento-Regular'
  },
  subtitleContainer: {
    position: 'absolute',
    bottom: 5,
  },
  subtitle: {
    fontFamily: 'NataSans-Bold',
    paddingTop: 15,
    fontSize: 20
  },
  logOutContainer: {
    position: 'absolute',
    top: 95,
  },
  logOut: {
    fontFamily: 'NataSans-Light',
    color: colors['btn-text']
  },
  goBackContainer: {
    position: 'absolute',
    top: 120,
  }
})