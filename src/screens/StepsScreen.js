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

const StepsScreen = () => {
  const [steps, setSteps] = useState('');
  const navigation = useNavigation();

  const saveSteps = async () => {
    if (!steps) {
      Alert.alert('Error', 'Please enter the number of steps');
      return;
    }

    try {
      await AsyncStorage.setItem('steps', steps);
      await AsyncStorage.setItem('stepsLastUpdated', new Date().toISOString());
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save steps');
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
        <Text style={styles.headerTitle}>Steps entry</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Steps Count:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={steps}
              onChangeText={setSteps}
              keyboardType="numeric"
              placeholder="0"
            />
            <Text style={styles.unit}>steps</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={saveSteps}
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
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 32,
    fontWeight: '600',
    paddingVertical: 12,
    height: 76,
    borderRadius: 10,
  },
  unit: {
    fontSize: 18,
    color: '#999',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#4384E6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    height: 54,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StepsScreen;
