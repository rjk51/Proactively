import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SleepScreen = () => {
  const [hours, setHours] = useState(8);
  const navigation = useNavigation();

  const handleIncrement = () => {
    if (hours < 24) {
      setHours(hours + 1);
    }
  };

  const handleDecrement = () => {
    if (hours > 0) {
      setHours(hours - 1);
    }
  };

  const saveSleep = async () => {
    try {
      await AsyncStorage.setItem('sleep', hours.toString());
      await AsyncStorage.setItem('sleepLastUpdated', new Date().toISOString());
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save sleep hours');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sleep entry</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleDecrement}
          >
            <Icon name="remove" size={24} color="#4F65CB" />
          </TouchableOpacity>

          <View style={styles.hoursContainer}>
            <Icon name="moon-outline" size={24} color="#707070" />
            <Text style={styles.hoursText}>{hours} hours</Text>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleIncrement}
          >
            <Icon name="add" size={24} color="#4F65CB" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={saveSleep}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  content: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4F65CB',
    backgroundColor: '#E9F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hoursText: {
    fontSize: 18,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4384E6',
    borderRadius: 8,
    height: 54,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SleepScreen;
