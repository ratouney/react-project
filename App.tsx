import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity,
} from 'react-native';
import { Camera } from 'expo-camera';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
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

const Hello: React.FC<Props> = ({
  name,
  baseEnthusiasmLevel = 0,
}) => {
  const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(
    baseEnthusiasmLevel,
  );

  const onIncrement = () => setEnthusiasmLevel(enthusiasmLevel + 1);
  const onDecrement = () => setEnthusiasmLevel(
    enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0,
  );

  const getExclamationMarks = (numChars: number) => (numChars > 0 ? Array(numChars + 1).join('!') : '');

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function takePic(camera) {
    const photo = await camera.takePictureAsync();
    console.log('photo: ', photo);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello
        {' '}
        {name}
        {getExclamationMarks(enthusiasmLevel)}
      </Text>
      <View style={{ flex: 0.2 }}>
        <Button
          title="Increase enthusiasm"
          accessibilityLabel="increment"
          onPress={onIncrement}
          color="blue"
        />
        <Button
          title="Decrease enthusiasm"
          accessibilityLabel="decrement"
          onPress={onDecrement}
          color="red"
        />
      </View>
      <Camera style={{ flex: 1, width: '100%' }} type={type} ref={(ref) => { camera = ref; }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { takePic(camera); }}
          >
            <Text style={styles.text}> Take picture </Text>
          </TouchableOpacity>
        </View>
      </Camera>
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
