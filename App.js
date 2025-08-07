import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import MainNavigator from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import store from './src/store';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Sacramento-Regular': require('./assets/fonts/Sacramento-Regular.ttf'),
    'NataSans-Light': require('./assets/fonts/NataSans-Light.ttf'),
    'NataSans-Bold': require('./assets/fonts/NataSans-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <StatusBar style="dark" />
        <MainNavigator />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});