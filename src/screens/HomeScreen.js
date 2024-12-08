import React,{ useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {
  const [sleep, setSleep] = useState('-');
  const [sleepLastUpdated, setSleepLastUpdated] = useState('');
  const [steps, setSteps] = useState('-');
  const [stepsLastUpdated, setStepsLastUpdated] = useState('');
  const [bmi, setBmi] = useState('-');
  const [bmiLastUpdated, setBmiLastUpdated] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadHealthData();
    });

    return unsubscribe;
  }, [navigation]);

  const loadHealthData = async () => {
    try {
      const storedSteps = await AsyncStorage.getItem('steps');
      const stepsUpdated = await AsyncStorage.getItem('stepsLastUpdated');
      const storedBMI = await AsyncStorage.getItem('bmi');
      const bmiUpdated = await AsyncStorage.getItem('bmiLastUpdated');
      const storedSleep = await AsyncStorage.getItem('sleep');
      const sleepUpdated = await AsyncStorage.getItem('sleepLastUpdated');

      if (storedSteps) {
        setSteps(storedSteps);
        setStepsLastUpdated(stepsUpdated ? 'Updated' : '');
      }
      if (storedBMI) {
        setBmi(storedBMI);
        setBmiLastUpdated(bmiUpdated ? 'Updated' : '');
      }
      if (storedSleep) {
        setSleep(storedSleep);
        setSleepLastUpdated(sleepUpdated ? 'Updated' : '');
      }
    } catch (error) {
      console.error('Error loading health data:', error);
    }
  };

  const renderHealthScore = () => (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreTitle}>Health Score</Text>
      <Text style={styles.scoreValue}>2,740</Text>
      <Text style={styles.scoreSubtext}>
        This score is for information purposes only.
      </Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '91.3%' }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>0</Text>
          <Text style={styles.progressLabel}>600</Text>
          <Text style={styles.progressLabel}>1200</Text>
          <Text style={styles.progressLabel}>1800</Text>
          <Text style={styles.progressLabel}>2400</Text>
          <Text style={styles.progressLabel}>3000</Text>
        </View>
      </View>
    </View>
  );

  const renderAppointment = () => (
    <TouchableOpacity style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.upcomingBadge}>
          <Text style={styles.upcomingText}>UPCOMING</Text>
        </View>
        <Icon name="chevron-forward" size={20} color="#666" />
      </View>
      <View style={styles.appointmentDetails}>
        <View style={styles.doctorInfo}>
          <View>
            <Text style={styles.doctorName}>Laurie Simons</Text>
            <Text style={styles.doctorTitle}>MD, DipABLM</Text>
            <Text style={styles.speciality}>Internal medicine</Text>
            <Text style={styles.appointmentTime}>
              Thu, December 21, 2024 | 10:00 AM PST
            </Text>
          </View>
          <Image
            source={require('../assets/doctor-avatar.png')}
            style={styles.doctorAvatar}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHealthOverview = () => (
    <View style={styles.overviewSection}>
      <Text style={styles.sectionTitle}>Health Overview</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.overviewCards}
      >
        <TouchableOpacity 
          style={[styles.overviewCard, styles.stepsCard]}
          onPress={() => navigation.navigate('Steps')}
        >
          <Text style={styles.overviewLabel}>Steps</Text>
          <Text style={styles.overviewValue}>{steps}</Text>
          <Text style={styles.overviewUpdated}>{stepsLastUpdated}</Text>
          <Icon name="chevron-forward" size={20} color="#666" style={styles.cardArrow} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.overviewCard, styles.bmiCard]}
          onPress={() => navigation.navigate('BMI')}
        >
          <Text style={styles.overviewLabel}>BMI</Text>
          <View style={styles.bmiValue}>
            <Text style={styles.overviewValue}>{bmi}</Text>
            <Text style={styles.bmiUnit}>kg/m²</Text>
          </View>
          <Text style={styles.overviewUpdated}>{bmiLastUpdated}</Text>
          <Icon name="chevron-forward" size={20} color="#666" style={styles.cardArrow} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.overviewCard, styles.sleepCard]}
          onPress={() => navigation.navigate('Sleep')}
        >
          <Text style={styles.overviewLabel}>Sleep</Text>
          <View style={styles.sleepValue}>
            <Text style={styles.overviewValue}>{sleep}</Text>
            <Text style={styles.sleepUnit}>hours</Text>
          </View>
          <Text style={styles.overviewUpdated}>{sleepLastUpdated}</Text>
          <Icon name="chevron-forward" size={20} color="#666" style={styles.cardArrow} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderTodos = () => (
    <View style={styles.todosSection}>
      <Text style={styles.sectionTitle}>Let's check off your to-dos</Text>
      <Text style={styles.todoProgress}>1/4 Completed</Text>
      <View style={styles.progressIndicator}>
        <View style={styles.progressFill} />
      </View>
      {[
        {
          text: 'Achieve 30k steps every week for blood sugar',
          date: 'Sep 5, 2024',
          completed: false,
        },
        {
          text: 'Take up health Coaching',
          date: 'Sep 5, 2024',
          completed: false,
        },
        {
          text: 'Go to a nearby gym and workout for 30 mins',
          date: 'Sep 5, 2024',
          completed: false,
        },
        {
          text: 'Complete 2 courses of Dr. Laurie Simons',
          date: 'Aug 30, 2024',
          completed: true,
        },
      ].map((todo, index) => (
        <View key={index} style={styles.todoItem}>
          <Icon
            name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={todo.completed ? '#4CAF50' : '#666'}
          />
          <View style={styles.todoContent}>
            <Text style={styles.todoText}>{todo.text}</Text>
            <Text style={styles.todoDate}>Laurie Simons • {todo.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../assets/profile-avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Ethan Harkinson</Text>
        </View>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {renderHealthScore()}
        {renderAppointment()}
        {renderHealthOverview()}
        {renderTodos()}
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../assets/home-active.png')} 
            style={styles.navAvatar}
          />
          <Text style={[styles.navText, styles.navActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Account')}
        >
          <Image source={require('../assets/account.png')} 
            style={styles.navAvatar}
          />
          <Text style={styles.navText}>Account</Text>
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
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#4384E6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  scoreContainer: {
    padding: 20,
    backgroundColor: '#4384E6',
  },
  scoreTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  scoreSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 20,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ffffff40',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  appointmentCard: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  upcomingBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  upcomingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  appointmentDetails: {
    padding: 16,
    paddingTop: 0,
  },
  doctorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  doctorTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  speciality: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  overviewSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  overviewCards: {
    paddingHorizontal: 20,
    gap: 12,
  },
  overviewCard: {
    width: 150,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepsCard: {
    backgroundColor: '#F0F4FF',
  },
  bmiCard: {
    backgroundColor: '#FFFBEB',
  },
  sleepCard: {
    backgroundColor: '#F5F0FF',
  },
  overviewLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  bmiValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  sleepValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  sleepUnit: {
    fontSize: 12,
    color: '#666',
  },
  bmiUnit: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  overviewUpdated: {
    fontSize: 12,
    color: '#666',
  },
  cardArrow: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  todosSection: {
    padding: 16,
  },
  todoProgress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressIndicator: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 20,
  },
  progressFill: {
    width: '25%',
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  todoContent: {
    marginLeft: 12,
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  todoDate: {
    fontSize: 14,
    color: '#666',
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

export default HomeScreen;