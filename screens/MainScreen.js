import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const MainScreen = () => {
  const route = useRoute();
  const { user, token } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>Hoş geldin, {user.email}</Text>
      <Text>Token: {token}</Text>
    </View>
  );
};

export default MainScreen;
