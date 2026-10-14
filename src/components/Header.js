import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ mode }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={{ fontSize: 24, color: '#DCA06D' }}>⏱️</Text>
        <Text style={styles.title}>Pomodoro</Text>
      </View>
      <Text style={styles.mode}>{mode === 'work' ? 'Робота' : 'Перерва'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DCA06D',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  mode: {
    fontSize: 18,
    color: 'rgba(220, 160, 109, 0.6)',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  }
});
