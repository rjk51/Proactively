import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../Proactively/src/screens/LoginScreen';
import HomeScreen from '../Proactively/src/screens/HomeScreen';
import AccountScreen from '../Proactively/src/screens/AccountScreen';
import SplashScreen from 'react-native-splash-screen';
import BMIScreen from '../Proactively/src/screens/BMIScreen';
import StepsScreen from '../Proactively/src/screens/StepsScreen';
import SleepScreen from '../Proactively/src/screens/SleepScreen';
import AppointmentDetailsScreen from '../Proactively/src/screens/AppointmentDetailsScreen';
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid } from 'react-native';
import { navigationRef } from './src/navigation/navigation';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    const initialize = async () => {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user);
      SplashScreen.hide();

      await requestUserPermission();

      const token = await messaging().getToken();
      console.log('FCM Token:', token);

      const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
        Alert.alert('Notification', remoteMessage.notification?.body);
      });

      const unsubscribeBackground = messaging().onNotificationOpenedApp(() => {
        navigationRef.current?.navigate('AppointmentDetails');
      });
      
      messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          navigationRef.current?.navigate('AppointmentDetails');
        }
      });

      return () => {
        unsubscribeOnMessage();
        unsubscribeBackground();
      };
    };

    initialize();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
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
            <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
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
