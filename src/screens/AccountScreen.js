import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();

  const email = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        const { email } = JSON.parse(user);
        return email;
      }
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/profile-avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.profileSubSection}>
            <Text style={styles.name}>Ethan Harkinson</Text>
            <Text style={styles.email}>ethanharkinson@outlook.com</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image source={require('../assets/acc.png')} 
              style={styles.accAvatar}
            />
            <Text style={styles.sectionTitle}>Account</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
          <Icon name="chevron-forward" size={22} color="#FD7468" />
        </TouchableOpacity>

        <Text style={styles.version}>Proactively version 0.0.1</Text>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Image source={require('../assets/home.png')} 
            style={styles.navAvatar}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../assets/account-active.png')} 
            style={styles.navAvatar}
          />
          <Text style={[styles.navText, styles.navActive]}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 30,
  },
  profileSubSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: 79,
    height: 79,
    borderRadius: 38,
  },
  name: {
    fontSize: 21,
    fontWeight: '500',
    marginBottom: 4,
    marginLeft: -30,
  },
  email: {
    fontSize: 15,
    color: '#707070',
    marginLeft: 16,
  },
  section: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  accAvatar: {
    width: 19,
    height: 19,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 17,
    color: '#FD7468',
  },
  version: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 0,
    width: '100%',
    textAlign: 'center',
    color: '#707070',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navAvatar: {
    width: 24,
    height: 24,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  navActive: {
    color: '#6156B2',
  },
});

export default AccountScreen;