import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function TimerControls({ isRunning, mode, onStart, onPause, onReset, onToggleMode }) {
  const isWork = mode === 'work';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mainBtnTouch}
        activeOpacity={0.8}
        onPress={isRunning ? onPause : onStart}
      >
        <View style={[styles.mainBtn, { backgroundColor: isRunning ? 'rgba(79, 28, 81, 0.5)' : (isWork ? '#A55B4B' : '#4F1C51') }]}>
          <View style={styles.btnContent}>
            <Text style={{ fontSize: 24, color: isRunning ? "#DCA06D" : (isWork ? "#210F37" : "#DCA06D") }}>{isRunning ? "⏸️" : "▶️"}</Text>
            <Text style={[
              styles.mainBtnText, 
              { 
                color: isRunning ? "#DCA06D" : (isWork ? "#210F37" : "#DCA06D"),
                textShadowColor: (isWork && !isRunning) ? 'transparent' : 'rgba(0,0,0,0.5)'
              }
            ]}>
              {isRunning ? 'ПАУЗА' : 'СТАРТ'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.secondaryRow}>
        <TouchableOpacity
          style={styles.secondaryBtnTouch}
          activeOpacity={0.7}
          onPress={onReset}
        >
          <View style={[styles.secondaryBtn, { backgroundColor: 'rgba(79, 28, 81, 0.7)' }]}>
            <View style={styles.btnContent}>
              <Text style={{ fontSize: 16, color: "#DCA06D" }}>🔄</Text>
              <Text style={styles.secondaryBtnText}>Скинути</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtnTouch}
          activeOpacity={0.7}
          onPress={onToggleMode}
        >
          <View style={[styles.secondaryBtn, { backgroundColor: 'rgba(79, 28, 81, 0.7)' }]}>
            <View style={styles.btnContent}>
              <Text style={{ fontSize: 16, color: "#DCA06D" }}>{isWork ? "☕" : "🎯"}</Text>
              <Text style={styles.secondaryBtnText}>
                {isWork ? 'На перерву' : 'До роботи'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

TimerControls.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['work', 'break']).isRequired,
  onStart: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onToggleMode: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  mainBtnTouch: {
    width: '100%',
    marginBottom: 14,
  },
  mainBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 100, // Bubble shape
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mainBtnText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  secondaryBtnTouch: {
    flex: 1,
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24, // Bubbly
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(220, 160, 109, 0.1)',
    backgroundColor: 'rgba(79, 28, 81, 0.25)',
  },
  secondaryBtnText: {
    color: 'rgba(220, 160, 109, 0.6)',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
