import {
  StyleSheet, View, TextInput, Button,
} from 'react-native';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, Session } from './src/state/types';
import { setUserName } from './src/state/session/actions';

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

type Props = {
  session: Session,
  navigation: any,
  onSetUserName: (arg0:string) => void,
};

const NameplateBase: React.FC<Props> = ({
  session,
  navigation,
  onSetUserName,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => (navigation.popToTop())} title="Home" />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nobody"
        onChangeText={(e) => { onSetUserName(e); }}
        value={session.user?.name}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetUserName: (name: string) => {
    dispatch(setUserName(name));
  },
});

const Nameplate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameplateBase);

export default Nameplate;
