import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Image,
} from 'react-native';

import { Camera } from 'expo-camera';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useIsFocused } from '@react-navigation/native';
import store from '../state/store';
import { AppState, Session, User } from '../state/types';
import { setCurrentUser, clearCurrentUser, getRandomUser } from '../state/session/actions';

const noFlash = require('../../assets/no-flash.png');
const withFlash = require('../../assets/flash.png');
const flip = require('../../assets/flip.png');
const diag = require('../../assets/diaphragm.png');

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
    width: '100%',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  icon: {
    flex: 0.15,
    width: 50,
    alignItems: 'center',
  },
});

const HelloBase: React.FC<Props> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [flashPic, setFlashPic] = useState(noFlash);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function takePic(camera) {
    const photo = await camera.takePictureAsync();
    navigation.navigate('Test');
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: '100%' }}>
        { isFocused && (
        <Camera
          style={{
            flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-end',
          }}
          type={type}
          flashMode={flash}
          ref={(ref) => { camera = ref; }}
        >
          <View style={{
            flex: 1, width: '100%', alignItems: 'flex-end', justifyContent: 'flex-start',
          }}
          >
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                );
              }}
            >
              <Image
                style={{ height: 50, width: 50, marginTop: 20 }}
                source={flip}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off,
                );
                setFlashPic(
                  flashPic === noFlash
                    ? withFlash
                    : noFlash,
                );
              }}
            >
              <Image
                style={{ height: 50, width: 50, marginTop: 20 }}
                source={flashPic}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ flex: 0.15, width: 75, alignItems: 'center' }} onPress={() => { takePic(camera); }}>
            <Image
              style={{ height: 75, width: 75, marginTop: 5 }}
              source={diag}
            />
          </TouchableOpacity>
        </Camera>
        )}
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
  },
});

const Hello = connect(
  mapStateToPros,
  mapDispatchToProps,
)(HelloBase);

export default Hello;
