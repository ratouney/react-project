import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.apiKey,
  projectId: Constants?.manifest?.extra?.projectId,
  messagingSenderId: Constants?.manifest?.extra?.messagingSenderId,
  appId: Constants?.manifest?.extra?.appId,
};

initializeApp(firebaseConfig);

export default function App() {
  return (
    <View>
      <StatusBar />
    </View>
  );
}
