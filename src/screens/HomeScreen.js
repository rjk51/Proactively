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
import LinearGradient from 'react-native-linear-gradient';


const HomeScreen = () => {
  const [sleep, setSleep] = useState('-');
  const [sleepLastUpdated, setSleepLastUpdated] = useState('');
  const [steps, setSteps] = useState('-');
  const [stepsLastUpdated, setStepsLastUpdated] = useState('');
  const [bmi, setBmi] = useState('-');
  const [bmiLastUpdated, setBmiLastUpdated] = useState('');
  const navigation = useNavigation();
  const [todos, setTodos] = useState([
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
      completed: false,
    },
  ]);

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

  const renderHealthScore = () => {
    const healthScore = 2740;
    const maxScore = 3000;
    const indicatorPosition = (healthScore / maxScore) * 100;
    return (
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>Health Score</Text>
        <Text style={styles.scoreValue}>{healthScore.toLocaleString()}</Text>
        <Text style={styles.scoreSubtext}>
          This score is for information purposes only.
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#FF9B9B', '#FFB178', '#FFD178', '#E4FF84', '#73FF73']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.progress]}
            />
          </View>
          <View
            style={[
              styles.progressIndicator,
              { left: `${indicatorPosition}%` }
            ]}
          />
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
  };

  const renderAppointment = () => (
    <TouchableOpacity 
      style={styles.appointmentCard}
      onPress={() => navigation.navigate('AppointmentDetails')}
      >
      <View style={styles.appointmentHeader}>
        <View style={styles.upcomingBadge}>
          <Text style={styles.upcomingText}>UPCOMING</Text>
        </View>
        <Icon name="chevron-forward" size={20} color="#A2A2A2" />
      </View>
      <View style={styles.appointmentDetails}>
        <View style={styles.doctorInfo}>
          <View>
            <View style={styles.doctorSubInfo}>
              <Text style={styles.doctorName}>Laurie Simons</Text>
              <Text style={styles.doctorTitle}>MD, DipABLM</Text>
            </View>
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
          <Text style={styles.stepsUpdated}>{stepsLastUpdated}</Text>
          <Text style={styles.overviewValue}>{steps}</Text>
          <Icon name="chevron-forward" size={20} color="#A0B8E6" style={styles.cardArrow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.overviewCard, styles.bmiCard]}
          onPress={() => navigation.navigate('BMI')}
        >
          <Text style={styles.overviewLabel}>BMI</Text>
          <Text style={styles.bmiUpdated}>{bmiLastUpdated}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.bmiValue}>{bmi}</Text>
            {bmi !== '-' && <Text style={styles.bmiUnit}>kg/m²</Text>}
          </View>
          <Icon name="chevron-forward" size={20} color="#CDD47A" style={styles.cardArrow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.overviewCard, styles.sleepCard]}
          onPress={() => navigation.navigate('Sleep')}
        >
          <Text style={styles.overviewLabel}>Sleep</Text>
          <Text style={styles.sleepUpdated}>{sleepLastUpdated}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.sleepValue}>{sleep}</Text>
            {sleep !== '-' && <Text style={styles.sleepUnit}>hours</Text>}
          </View>
          <Icon name="chevron-forward" size={20} color="#D3B47B" style={styles.cardArrow} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderTodos = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;
    const progressPercentage = (completedCount / totalCount) * 100;

    const toggleTodo = (index) => {
      const newTodos = [...todos];
      newTodos[index].completed = !newTodos[index].completed;
      setTodos(newTodos);
    };

    return (
      <View style={styles.todosSection}>
        <Text style={styles.sectionTitle}>Let's check off your to-dos</Text>
        <Text style={styles.todoProgress}>{completedCount}/{totalCount} Completed</Text>
        <View style={styles.progressIndicator}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>
        {todos.map((todo, index) => (
          <TouchableOpacity key={index} style={styles.todoItem} onPress={() => toggleTodo(index)}>
            <View style={styles.todoIconContainer}>
              <Icon
                name={todo.completed ? 'checkbox' : 'square-outline'}
                size={24}
                color={todo.completed ? '#49A275' : '#BCBDBA'}
              />
            </View>
            <View style={styles.todoContent}>
              <Text style={[styles.todoText, todo.completed && styles.completedTodoText]}>{todo.text}</Text>
              <Text style={styles.todoDate}>Laurie Simons • {todo.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
        <View style={styles.divider} />
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
    backgroundColor: '#3D53B6',
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
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  scoreContainer: {
    padding: 20,
    backgroundColor: '#3D53B6',
  },
  scoreTitle: {
    fontSize: 16,
    color: '#D5D8FF',
    marginBottom: 20,
    marginTop: -8,
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  scoreSubtext: {
    fontSize: 14,
    color: '#D5D8FF',
    opacity: 0.8,
    marginBottom: 50,
  },
  progressContainer: {
    marginTop: 10,
    position: 'relative',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ffffff40',
    borderRadius: 12,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
  },
  progressIndicator: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#73FF73',
    position: 'absolute',
    top: -16,
    marginLeft: -12,
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
    margin: 20,
    marginTop: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 12,
  },
  cardArrow: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  upcomingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    backgroundColor: '#3A9B78',
    width: 90,
    height: 25,
  },
  upcomingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
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
    color: '#333333',
    marginBottom: 4,
  },
  doctorTitle: {
    fontSize: 14,
    color: '#707070',
  },
  doctorSubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  speciality: {
    fontSize: 14,
    color: '#707070',
    marginBottom: 16,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#707070',
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginTop: -35,
  },
  overviewSection: {
    padding: 20,
    marginBottom: 16,
    marginTop: -15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  overviewCards: {
    paddingHorizontal: 20,
    gap: 10,
  },
  overviewCard: {
    width: 155,
    height: 129,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  stepsUpdated:{
    color: '#4F65CB',
    fontSize: 14,
    marginBottom: 16,
  },
  bmiUpdated: {
    color: '#7B8400',
    fontSize: 14,
    marginBottom: 16,
  },
  sleepUpdated: {
    color: '#B27500',
    fontSize: 14,
    marginBottom: 16,
  },
  stepsCard: {
    backgroundColor: '#E9F0FF',
  },
  bmiCard: {
    backgroundColor: '#FBFFC8',
  },
  sleepCard: {
    backgroundColor: '#FFECC8',
  },
  overviewLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4F65CB',
    marginBottom: 4,
  },
  bmiValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    color: '#7B8400',
    fontSize: 24,
    fontWeight: '700',
  },
  sleepValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    color: '#B27500',
    fontSize: 24,
    fontWeight: '700',
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
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    flexWrap: 'wrap',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 16,
  },
  todosSection: {
    padding: 16,
  },
  todoProgress: {
    fontSize: 14,
    color: '#707070',
    marginBottom: 8,
  },
  progressIndicator: {
    height: 13,
    backgroundColor: '#F1F8F4',
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    width: '25%',
    height: '100%',
    backgroundColor: '#77C69F',
    borderRadius: 24,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginBottom: 16,
    borderRadius: 12,
  },
  todoContent: {
    flex: 1,
    padding: 8,
    alignContent: 'center',
  },
  todoText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  todoIconContainer: {
    marginLeft: 12,
    marginRight: 6,
    paddingTop: 10,
  },
  todoDate: {
    fontSize: 14,
    color: '#707070',
  },
  completedTodoText: {
    color: '#707070',
  },
  bottomNav: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#fff',
    elevation: 40,
    shadowOffset: {width: 0, height: 2,},
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 7,
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