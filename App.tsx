import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';
import LoginPage from './src/views/LoginPage';
import store from './src/state/store';
import Profile from './Profile';
import Nameplate from './Nameplate';
import SignUpPage from './src/views/SignUpPage';
import Hello from './Hello';

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.apiKey,
  projectId: Constants?.manifest?.extra?.projectId,
  messagingSenderId: Constants?.manifest?.extra?.messagingSenderId,
  appId: Constants?.manifest?.extra?.appId,
};

initializeApp(firebaseConfig);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen
            name="Main"
            component={Hello}
          />
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Nameplate" component={Nameplate} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
