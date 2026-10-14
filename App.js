import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { vibrate } from './utils';

import Header from './src/components/Header';
import TimerDisplay from './src/components/TimerDisplay';
import TimerControls from './src/components/TimerControls';
import TimeSettings from './src/components/TimeSettings';
import StatsCard from './src/components/StatsCard';

export default function App() {
  // Timer mode: 'work' | 'break'
  const [mode, setMode] = useState('work');

  // Custom durations in seconds (defaults: 25 min work, 5 min break)
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);

  // Remaining time in seconds for active session
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  // Timer running state
  const [isRunning, setIsRunning] = useState(false);

  // Custom input state values (strings)
  const [workMin, setWorkMin] = useState('25');
  const [workSec, setWorkSec] = useState('00');
  const [breakMin, setBreakMin] = useState('5');
  const [breakSec, setBreakSec] = useState('00');

  // Statistics state
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalWorkSeconds, setTotalWorkSeconds] = useState(0);
  const [totalBreakSeconds, setTotalBreakSeconds] = useState(0);

  // Ref to hold the interval ID
  const timerRef = useRef(null);

  // Active total duration based on current mode
  const currentTotalDuration = mode === 'work' ? workDuration : breakDuration;

  // Handle countdown interval
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            handleTimerCompletion();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, mode, workDuration, breakDuration]);

  // Handle signal / vibration & mode switching when timer reaches 00:00
  const handleTimerCompletion = () => {
    // Trigger vibration signal on phone / device
    try {
      vibrate();
    } catch (e) {
      console.log('Vibration error:', e);
    }

    if (mode === 'work') {
      setCompletedSessions((prev) => prev + 1);
      setTotalWorkSeconds((prev) => prev + workDuration);

      // Switch to break mode
      setMode('break');
      setTimeLeft(breakDuration);
    } else {
      setTotalBreakSeconds((prev) => prev + breakDuration);

      // Switch back to work mode
      setMode('work');
      setTimeLeft(workDuration);
    }
  };

  // Timer controls
  const handleStart = () => {
    if (timeLeft <= 0) {
      setTimeLeft(currentTotalDuration);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(currentTotalDuration);
  };

  const handleToggleMode = () => {
    setIsRunning(false);
    const nextMode = mode === 'work' ? 'break' : 'work';
    setMode(nextMode);
    setTimeLeft(nextMode === 'work' ? workDuration : breakDuration);
  };

  // Custom time inputs application
  const applyTimeValues = (wM, wS, bM, bS) => {
    const wmNum = parseInt(wM, 10) || 0;
    const wsNum = parseInt(wS, 10) || 0;
    const bmNum = parseInt(bM, 10) || 0;
    const bsNum = parseInt(bS, 10) || 0;

    const newWorkDuration = wmNum * 60 + wsNum;
    const newBreakDuration = bmNum * 60 + bsNum;

    if (newWorkDuration <= 0 || newBreakDuration <= 0) {
      Alert.alert(
        'Некоректний час',
        'Час роботи та перерви повинен бути більшим за 0 секунд.'
      );
      return;
    }

    setWorkDuration(newWorkDuration);
    setBreakDuration(newBreakDuration);

    setWorkMin(String(wmNum));
    setWorkSec(wsNum < 10 ? `0${wsNum}` : String(wsNum));
    setBreakMin(String(bmNum));
    setBreakSec(bsNum < 10 ? `0${bsNum}` : String(bsNum));

    // Update current active timer left if not running
    if (mode === 'work') {
      setTimeLeft(newWorkDuration);
    } else {
      setTimeLeft(newBreakDuration);
    }
  };

  const handleApplyCustomTime = () => {
    applyTimeValues(workMin, workSec, breakMin, breakSec);
  };

  const handleApplyPreset = (wM, wS, bM, bS) => {
    applyTimeValues(String(wM), String(wS), String(bM), String(bS));
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#210F37" />


      <View style={styles.safeAreaInner}>
        <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header mode={mode} completedSessions={completedSessions} />

        <TimerDisplay
          timeLeft={timeLeft}
          totalDuration={currentTotalDuration}
          mode={mode}
          isRunning={isRunning}
        />

        <TimerControls
          isRunning={isRunning}
          mode={mode}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onToggleMode={handleToggleMode}
        />

        <StatsCard
          completedSessions={completedSessions}
          totalWorkMinutes={Math.round(totalWorkSeconds / 60)}
          totalBreakMinutes={Math.round(totalBreakSeconds / 60)}
        />

        <TimeSettings
          workMin={workMin}
          workSec={workSec}
          breakMin={breakMin}
          breakSec={breakSec}
          onChangeWorkMin={setWorkMin}
          onChangeWorkSec={setWorkSec}
          onChangeBreakMin={setBreakMin}
          onChangeBreakSec={setBreakSec}
          onApplyCustomTime={handleApplyCustomTime}
          onApplyPreset={handleApplyPreset}
          isDisabled={isRunning}
        />
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#210F37',
  },
  safeAreaInner: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40, 
    paddingTop: 10,
    flexGrow: 1,
  },
});
