import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const predefinedUser = {
  email: 'testuser@gmail.com',
  password: 'password123',
};

const LoginScreen = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (email === predefinedUser.email && password === predefinedUser.password) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(predefinedUser));
        setIsLoggedIn(true);
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert('Error', 'Failed to save user data');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login to</Text>
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>proactively</Text>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.arrowImage}
          />
        </View>
        <Text style={styles.subtitle}>
          Login as a patient using your registered email.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isEmailFocused && styles.inputFocused]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isPasswordFocused && styles.inputFocused]}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity
            style={styles.togglePassword}
            onPress={togglePasswordVisibility}
          >
            <Icon
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color="#7F8A99"
            />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../assets/google.png')}
            style={styles.socialIcon}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
          <Icon name="logo-apple" size={20} color="white" />
          <Text style={styles.appleButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 32,
    textAlign: 'left',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 33,
    fontWeight: '600',
    color: '#2A6DD2',
  },
  arrowImage: {
    width: 24,
    height: 24,
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 23,
    marginBottom: 40,
    textAlign: 'left',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 5,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#4384E6',
  },
  togglePassword: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  loginButton: {
    height: 54,
    backgroundColor: '#4384E6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 37,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D1D1',
  },
  orText: {
    textAlign: 'center',
    paddingHorizontal: 8,
    color: '#D1D1D1',
    fontSize: 16,
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#E7E7E7',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    color: '#757575',
    fontSize: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    height: 54,
    gap: 8,
  },
  appleButton: {
    backgroundColor: '#000',
  },
  appleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default LoginScreen;

