import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Image,
} from 'react-native';
import { Camera } from 'expo-camera';

const noFlash = require('./assets/no-flash.png');
const withFlash = require('./assets/flash.png');
const flip = require('./assets/flip.png');
const diag = require('./assets/diaphragm.png');

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
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
});

const Hello: React.FC<Props> = ({
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [picture, setPicture] = useState(null);
  const [flashPic, setFlashPic] = useState(noFlash);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function takePic(camera) {
    const photo = await camera.takePictureAsync();
    setPicture(photo.uri);
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: '100%' }}>
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
              style={{ flex: 0.15, width: 50, alignItems: 'center' }}
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
              style={{ flex: 0.15, width: 50, alignItems: 'center' }}
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
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Hello />
      <StatusBar />
    </View>
  );
}
