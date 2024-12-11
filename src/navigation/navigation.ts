// Add a navigation ref for programmatic navigation
import { createNavigationContainerRef } from '@react-navigation/native';

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Account: undefined;
    BMI: undefined;
    Steps: undefined;
    Sleep: undefined;
    AppointmentDetails: undefined;
};
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export function navigate(name: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}