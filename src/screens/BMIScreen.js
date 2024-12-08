import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const BMIScreen = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const navigation = useNavigation();

  const calculateBMI = async () => {
    if (!weight || !height) {
      Alert.alert('Error', 'Please enter both weight and height');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to meters
    const bmi = weightNum / (heightNum * heightNum);
    const roundedBMI = Math.round(bmi * 100) / 100; // Round to 2 decimal places

    try {
      await AsyncStorage.setItem('bmi', roundedBMI.toString());
      await AsyncStorage.setItem('bmiLastUpdated', new Date().toISOString());
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save BMI');
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
        <Text style={styles.headerTitle}>BMI entry</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Body weight:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="0"
            />
            <Text style={styles.unit}>kgs</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholder="0"
            />
            <Text style={styles.unit}>cms</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={calculateBMI}
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
    fontWeight: '600',
    marginLeft: 12,
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    height: 76,
    width: 173,
  },
  input: {
    flex: 1,
    fontSize: 32,
    fontWeight: '600',
    paddingVertical: 12,
    color: '#000',
  },
  unit: {
    fontSize: 18,
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#4384E6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BMIScreen;

