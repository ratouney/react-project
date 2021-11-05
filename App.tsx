import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import { Provider, connect } from 'react-redux';
import { Dispatch } from 'redux';
import store from './src/state/store';

import { AppState, Session, User } from './src/state/types';
import { setCurrentUser, clearCurrentUser, getRandomUser } from './src/state/session/actions';

const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.apiKey,
  projectId: Constants?.manifest?.extra?.projectId,
  messagingSenderId: Constants?.manifest?.extra?.messagingSenderId,
  appId: Constants?.manifest?.extra?.appId,
};

export type Props = {
  session: Session;
  onSetUser: () => void;
  onClearUser: () => void;
  onGetRandomUser: () => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

const HelloBase: React.FC<Props> = ({
  session,
  onSetUser,
  onClearUser, onGetRandomUser,
}) => (
  <View style={styles.container}>
    <Text style={styles.greeting}>
      Hello
      {' '}
      {session.user === undefined ? 'Nobody' : session.user?.name}
      {/* getExclamationMarks(enthusiasmLevel) */}
    </Text>
    <View>
      <Button
        title="Load predefined"
        accessibilityLabel="increment"
        onPress={onSetUser}
        color="blue"
      />
      <Button
        title="Get Random user"
        accessibilityLabel="decrement"
        onPress={onGetRandomUser}
        color="purple"
      />
      <Button
        title="Decrease enthusiasm"
        accessibilityLabel="decrement"
        onPress={onClearUser}
        color="red"
      />
    </View>
  </View>
);

const mapStateToPros = (state: AppState) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetUser: () => {
    const ud: User = {
      name: 'Ratouney',
      email: 'nothjsjkfds',
      profileIcon: 'https://static.wikia.nocookie.net/frstarwars/images/d/d9/Grievous_t%C3%AAte.jpg/revision/latest?cb=20160514112949',
    };
    dispatch(setCurrentUser(ud));
  },
  onClearUser: () => {
    dispatch(clearCurrentUser());
  },
  onGetRandomUser: () => {
    dispatch(getRandomUser());
  },
});

const Hello = connect(
  mapStateToPros,
  mapDispatchToProps,
)(HelloBase);

initializeApp(firebaseConfig);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Hello />
        <StatusBar />
      </View>
    </Provider>
  );
}
