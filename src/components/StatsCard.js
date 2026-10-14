import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function StatsCard({ completedSessions, totalWorkMinutes, totalBreakMinutes }) {
  return (
    <View style={[styles.container, { backgroundColor: 'rgba(79, 28, 81, 0.7)' }]}>
      <View style={styles.titleRow}>
        <Text style={{ fontSize: 20, color: '#DCA06D' }}>📊</Text>
        <Text style={styles.sectionTitle}>Статистика</Text>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completedSessions}</Text>
          <Text style={styles.statLabel}>Сесій</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalWorkMinutes}</Text>
          <Text style={styles.statLabel}>Хв роботи</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalBreakMinutes}</Text>
          <Text style={styles.statLabel}>Хв перерви</Text>
        </View>
      </View>
    </View>
  );
}

StatsCard.propTypes = {
  completedSessions: PropTypes.number.isRequired,
  totalWorkMinutes: PropTypes.number.isRequired,
  totalBreakMinutes: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 32, 
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#DCA06D',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(220, 160, 109, 0.6)',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(220, 160, 109, 0.1)',
  }
});
