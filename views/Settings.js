import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <LinearGradient
    //activeColor="#e91e63" #6200EE '#03DAC6'
              colors={['#03DAC6', '#6200EE']}
              style={styles.linearGradient}
              start={{ x: 0, y: 0.4 }}
              end={{ x: 2, y: 0.2 }}
            >
      <Text>Voted fav couple on the island every single time!</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    width: "100%",
  },
})

export default SettingsScreen;
