import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Image,
} from 'react-native';

import { Provider, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/state/store';
import { AppState, Session, User } from '../state/types';
import { setCurrentUser, clearCurrentUser, getRandomUser } from '../state/session/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

const TestBase: React.FC<Props> = ({
}) => (
  <View style={styles.container}>
    <Text> Hello </Text>
  </View>
);

const Test = connect(
)(TestBase);

export default Test;
