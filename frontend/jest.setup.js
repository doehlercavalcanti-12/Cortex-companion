import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-config', () => ({
  API_URL: 'https://api.local.test'
}));
