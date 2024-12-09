import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AppointmentDetailsScreen = () => {
  const navigation = useNavigation();
  const meetingLink = 'https://meet.google.com/abc-defa-dwa';

  const handleJoinMeeting = async () => {
    try {
      if (Platform.OS === 'android') {
        // Android intent
        await Linking.openURL(`googlemeet://meeting/${meetingLink.split('/').pop()}`);
      } else {
        // iOS and fallback
        await Linking.openURL(meetingLink);
      }
    } catch (error) {
      // Fallback to browser if app is not installed
      await Linking.openURL(meetingLink);
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
        <Text style={styles.headerTitle}>Appointment details</Text>
      </View>

      <View style={styles.upcomingBadge}>
          <Text style={styles.upcomingText}>UPCOMING</Text>
        </View>
      <View style={styles.content}>
        <Image
          source={require('../assets/doctor-avatar.png')}
          style={styles.doctorImage}
        />

        <Text style={styles.appointmentTitle}>
          Your upcoming appointment with
        </Text>
        <Text style={styles.doctorName}>
          Laurie Simons, MD, DipABLM
        </Text>

        <View style={styles.appointmentLabel}>
          <Text style={styles.appointmentLabelText}>Appointment</Text>
        </View>

        <Text style={styles.appointmentTime}>
          Thu, December 21, 2024 | 10:00 AM PST
        </Text>

        <View style={styles.divider} />

        <View style={styles.meetingSection}>
          <Text style={styles.meetingLabel}>Meeting link:</Text>
          <Text style={styles.meetingLink}>{meetingLink}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.joinButton}
          onPress={handleJoinMeeting}
        >
          <Text style={styles.joinButtonText}>Join meeting</Text>
          <Icon name="arrow-forward" size={20} color="#fff" />
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
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  upcomingBadge: {
    backgroundColor: '#3A9B78',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 2,
    marginBottom: 12,
    marginTop: 24,
    marginLeft: 20,
    width: 90,
    height: 25,
  },
  upcomingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  doctorImage: {
    width: 105,
    height: 105,
    borderRadius: 50,
    marginBottom: 24,
  },
  appointmentTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
  doctorName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  appointmentLabel: {
    backgroundColor: 'rgba(122, 61, 182, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 8,
  },
  appointmentLabelText: {
    color: '#7A3DB6',
    fontSize: 14,
    fontWeight: '500',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#707070',
    marginBottom: 32,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    width: '100%',
    marginBottom: 24,
  },
  meetingSection: {
    width: '100%',
    gap: 8,
  },
  meetingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  meetingLink: {
    fontSize: 16,
    color: '#707070',
  },
  buttonContainer: {
    backgroundColor: '#F9F9F9',
    padding: 8,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4384E6',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AppointmentDetailsScreen;

