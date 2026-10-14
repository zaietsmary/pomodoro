import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { formatTime } from '../utils/formatTime';

export default function TimerDisplay({ timeLeft, totalDuration, mode, isRunning }) {
  const isWork = mode === 'work';

  // Calculate percentage remaining
  const percentage = totalDuration > 0 ? Math.max(0, Math.min(100, (timeLeft / totalDuration) * 100)) : 0;

  const getStatusContent = () => {
    if (timeLeft === 0) return { icon: "✅", text: 'Час вийшов!' };
    if (isRunning) return isWork ? { icon: "🎯", text: 'Фокус на завданні' } : { icon: "☕", text: 'Час перерви' };
    return { icon: "⏸️", text: 'Таймер на паузі' };
  };

  const status = getStatusContent();

  return (
    <View 
      style={[styles.card, isWork ? styles.workCard : styles.breakCard, { backgroundColor: 'rgba(79, 28, 81, 0.7)' }]}
    >
      <View style={styles.statusRow}>
        <Text style={{ fontSize: 16, color: "rgba(220, 160, 109, 0.6)" }}>{status.icon}</Text>
        <Text style={styles.statusLabel}>{status.text}</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, isWork ? styles.workTimeText : styles.breakTimeText]}>
          {formatTime(timeLeft)}
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View 
          style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: isWork ? '#DCA06D' : '#A55B4B' }]}
        />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.percentageText}>
          {Math.round(percentage)}% залишилось
        </Text>
        <Text style={styles.modeSubtext}>
          {isWork ? 'Мета: Робота' : 'Мета: Відпочинок'}
        </Text>
      </View>
    </View>
  );
}

TimerDisplay.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  mode: PropTypes.oneOf(['work', 'break']).isRequired,
  isRunning: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 40, // More rounded for bubble style
    padding: 28,
    alignItems: 'center',
    marginVertical: 12,
    borderWidth: 1,
    overflow: 'hidden', // Fix Android blur bounds
  },
  workCard: {
    borderColor: 'rgba(220, 160, 109, 0.1)',
    backgroundColor: 'rgba(79, 28, 81, 0.25)',
  },
  breakCard: {
    borderColor: 'rgba(220, 160, 109, 0.1)',
    backgroundColor: 'rgba(79, 28, 81, 0.25)',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(220, 160, 109, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  timeContainer: {
    paddingVertical: 10,
  },
  timeText: {
    fontSize: 68,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  workTimeText: {
    color: '#DCA06D',
  },
  breakTimeText: {
    color: '#DCA06D',
  },
  progressTrack: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  percentageText: {
    color: 'rgba(220, 160, 109, 0.6)',
    fontSize: 12,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  modeSubtext: {
    color: 'rgba(220, 160, 109, 0.6)',
    fontSize: 12,
    fontWeight: '500',
  },
});
