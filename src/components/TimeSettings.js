import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default function TimeSettings({
  workMin,
  workSec,
  breakMin,
  breakSec,
  onChangeWorkMin,
  onChangeWorkSec,
  onChangeBreakMin,
  onChangeBreakSec,
  onApplyCustomTime,
  onApplyPreset,
  isDisabled,
}) {
  return (
    <View style={[styles.container, { backgroundColor: 'rgba(79, 28, 81, 0.7)' }]}>
      <View style={styles.titleRow}>
        <Text style={{ fontSize: 20, color: '#DCA06D' }}>⚙️</Text>
        <Text style={styles.sectionTitle}>Налаштування</Text>
      </View>

      <View style={styles.presetsRow}>
        <TouchableOpacity
          style={[styles.presetBtn, isDisabled && styles.disabledPresetBtn]}
          onPress={() => onApplyPreset(25, 0, 5, 0)}
          disabled={isDisabled}
        >
          <Text style={styles.presetBtnText}>25 / 5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.presetBtn, isDisabled && styles.disabledPresetBtn]}
          onPress={() => onApplyPreset(45, 0, 10, 0)}
          disabled={isDisabled}
        >
          <Text style={styles.presetBtnText}>45 / 10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.presetBtn, isDisabled && styles.disabledPresetBtn]}
          onPress={() => onApplyPreset(50, 0, 10, 0)}
          disabled={isDisabled}
        >
          <Text style={styles.presetBtnText}>50 / 10</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Робота (хв:сек)</Text>
          <View style={styles.timeInputs}>
            <TextInput
              style={[styles.input, isDisabled && styles.disabledInput]}
              value={workMin}
              onChangeText={onChangeWorkMin}
              keyboardType="numeric"
              maxLength={3}
              editable={!isDisabled}
            />
            <Text style={styles.colon}>:</Text>
            <TextInput
              style={[styles.input, isDisabled && styles.disabledInput]}
              value={workSec}
              onChangeText={onChangeWorkSec}
              keyboardType="numeric"
              maxLength={2}
              editable={!isDisabled}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Перерва (хв:сек)</Text>
          <View style={styles.timeInputs}>
            <TextInput
              style={[styles.input, isDisabled && styles.disabledInput]}
              value={breakMin}
              onChangeText={onChangeBreakMin}
              keyboardType="numeric"
              maxLength={3}
              editable={!isDisabled}
            />
            <Text style={styles.colon}>:</Text>
            <TextInput
              style={[styles.input, isDisabled && styles.disabledInput]}
              value={breakSec}
              onChangeText={onChangeBreakSec}
              keyboardType="numeric"
              maxLength={2}
              editable={!isDisabled}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.applyBtn, isDisabled && styles.disabledApplyBtn]}
        onPress={onApplyCustomTime}
        disabled={isDisabled}
      >
        <View style={[styles.applyBtnGradient, { backgroundColor: '#A55B4B' }]}>
          <Text style={styles.applyBtnText}>ЗБЕРЕГТИ</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

TimeSettings.propTypes = {
  workMin: PropTypes.string.isRequired,
  workSec: PropTypes.string.isRequired,
  breakMin: PropTypes.string.isRequired,
  breakSec: PropTypes.string.isRequired,
  onChangeWorkMin: PropTypes.func.isRequired,
  onChangeWorkSec: PropTypes.func.isRequired,
  onChangeBreakMin: PropTypes.func.isRequired,
  onChangeBreakSec: PropTypes.func.isRequired,
  onApplyCustomTime: PropTypes.func.isRequired,
  onApplyPreset: PropTypes.func,
  isDisabled: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 32, // Bubbly shape
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(220, 160, 109, 0.1)',
    backgroundColor: 'rgba(79, 28, 81, 0.25)',
    overflow: 'hidden',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    color: '#DCA06D',
    fontSize: 18,
    fontWeight: '700',
  },
  presetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  presetBtn: {
    flex: 1,
    backgroundColor: 'rgba(79, 28, 81, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(220, 160, 109, 0.1)',
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
  },
  disabledPresetBtn: {
    opacity: 0.5,
  },
  presetBtnText: {
    color: 'rgba(220, 160, 109, 0.6)',
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: 'rgba(220, 160, 109, 0.6)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  timeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(79, 28, 81, 0.2)',
    color: '#DCA06D',
    fontSize: 20,
    fontWeight: '600',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 60,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(220, 160, 109, 0.1)',
  },
  disabledInput: {
    opacity: 0.5,
  },
  colon: {
    color: '#DCA06D',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  applyBtn: {
    paddingVertical: 14,
    borderRadius: 100, 
    alignItems: 'center',
    overflow: 'hidden',
  },
  applyBtnGradient: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
  },
  disabledApplyBtn: {
    opacity: 0.5,
  },
  applyBtnText: {
    color: '#DCA06D',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
