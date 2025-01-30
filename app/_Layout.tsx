// app/layout.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <View style={styles.container}>
      <Stack />  {/* Este es el lugar donde se gestionan las rutas */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});

export default Layout;
