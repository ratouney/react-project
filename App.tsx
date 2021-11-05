import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import Hello from './Hello';
import store from './src/state/store';
import Profile from './Profile';
import Nameplate from './Nameplate';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Hello}
            options={
                        { headerLeft: () => <Button title="Ayo" /> }
                    }
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Nameplate" component={Nameplate} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
