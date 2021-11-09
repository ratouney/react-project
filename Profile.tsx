import {
  Button, View, Image,
} from 'react-native';
import React from 'react';
// import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, Session } from './src/state/types';
// import { getRandomUser } from './src/state/session/actions';

type Props = {
  session: Session,
  navigation: any,
};

const ProfileBase: React.FC<Props> = ({
  session,
  navigation,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: session.user?.name,
    });
  }, [navigation]);
  return (
    <View>
      <Image
        source={{ uri: session.user?.profileIcon }}
        style={{ width: '100%', height: '80%' }}
      />
      <Button title="Change Name" onPress={() => (navigation.navigate('Nameplate'))} />
    </View>
  );
};

const mapStateToPros = (state: AppState) => ({
  session: state.session,
});

/*
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onGetRandomUser: () => {
    dispatch(getRandomUser());
  },
});
*/

const Profile = connect(
  mapStateToPros,
  null,
)(ProfileBase);

export default Profile;
