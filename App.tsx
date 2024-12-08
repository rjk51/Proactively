/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../Proactively/src/screens/LoginScreen';
import HomeScreen from '../Proactively/src/screens/HomeScreen';
import AccountScreen from '../Proactively/src/screens/AccountScreen';
import SplashScreen from 'react-native-splash-screen'
import BMIScreen from '../Proactively/src/screens/BMIScreen';
import StepsScreen from '../Proactively/src/screens/StepsScreen';
import SleepScreen from '../Proactively/src/screens/SleepScreen';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Account: undefined;
  BMI: undefined;
  Steps: undefined;
  Sleep: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user); // Set true if user exists
    };

    checkLogin();
    SplashScreen.hide()
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Account">
              {(props) => <AccountScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="BMI" component={BMIScreen} />
            <Stack.Screen name="Steps" component={StepsScreen} />
            <Stack.Screen name="Sleep" component={SleepScreen} />
          </>
        ) : (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
