import React from 'react';
import {
  Button, Image, StyleSheet, Text, TouchableHighlight, View,
} from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, Session, User } from './src/state/types';
import { clearCurrentUser, getRandomUser, setCurrentUser } from './src/state/session/actions';
import { DbTest } from './src/state/session/actions';

type Props = {
  navigation: any
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
  coloredHeader: {
    backgroundColor: 'green',
  },
});

const HelloBase: React.FC<Props> = ({
  session,
  onSetUser,
  onClearUser,
  onTest,
  onGetRandomUser,
  navigation,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => onGetRandomUser()} title="Get ser" />
      ),
      headerStyle: styles.coloredHeader,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => (navigation.navigate('Nameplate'))}
      >
        <Text style={styles.greeting}>
          Hello
          {' '}
          {session.user === undefined ? 'Nobody' : session.user?.name}
          {/* getExclamationMarks(enthusiasmLevel) */}
        </Text>
      </TouchableHighlight>
      <View>
        <TouchableHighlight onPress={() => (navigation.navigate('Profile'))}>
          <Image
            source={{ uri: session.user === undefined ? 'https://reactjs.org/logo-og.png' : session.user.profileIcon }}
            style={{ width: 400, height: 400 }}
          />
        </TouchableHighlight>
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
        <Button
          title="Terst"
          accessibilityLabel="decrement"
          onPress={() => (navigation.navigate('Camera'))}
          color="red"
        />
      </View>
    </View>
  );
};

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
  }
});

const Hello = connect(
  mapStateToPros,
  mapDispatchToProps,
)(HelloBase);

export default Hello;
