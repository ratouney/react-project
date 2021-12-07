import React, { useState } from 'react';
import {
  Text, TextInput, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../state/types';
import { SignUp } from '../state/session/actions';

type Props = {
  navigation: any
  onSignUp: (email: string, password: string, name: string) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

const SignUpPageBase: React.FC<Props> = ({
  onSignUp,
  navigation,
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    onSignUp(email, password, username);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>PictuGram</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Userame..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
        <Text style={styles.loginText}>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>

    </View>
  );
};

const mapStateToPros = (state: AppState) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSignUp: (email: string, password: string, name: string) => {
    dispatch(SignUp(email, password, name));
  },
});

const SignUpPage = connect(
  mapStateToPros,
  mapDispatchToProps,
)(SignUpPageBase);

export default SignUpPage;
