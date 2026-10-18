import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import { useLang } from '../i18n/LanguageContext';

type Phase = 'Ready' | 'Breathe in' | 'Hold' | 'Breathe out';

const PHASE_ES: Record<Phase, string> = {
  'Ready': 'Listo',
  'Breathe in': 'Inhale',
  'Hold': 'Mantenga',
  'Breathe out': 'Exhale',
};

const SMALL = 0.55;
const BIG = 1;

/** Slow breathing: in for 4, hold for 4, out for 6. Runs entirely on-device. */
export function BreathingScreen({ onBack }: { onBack: () => void }) {
  const { lang } = useLang();
  const es = lang === 'es';
  const scale = useRef(new Animated.Value(SMALL)).current;
  const runningRef = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [phase, setPhase] = useState<Phase>('Ready');
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  const runCycle = useCallback(() => {
    if (!runningRef.current) return;
    setPhase('Breathe in');
    Animated.timing(scale, {
      toValue: BIG,
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished || !runningRef.current) return;
      setPhase('Hold');
      holdTimer.current = setTimeout(() => {
        if (!runningRef.current) return;
        setPhase('Breathe out');
        Animated.timing(scale, {
          toValue: SMALL,
          duration: 6000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(({ finished: done }) => {
          if (!done || !runningRef.current) return;
          setCycles((c) => c + 1);
          runCycle();
        });
      }, 4000);
    });
  }, [scale]);

  const stop = useCallback(() => {
    runningRef.current = false;
    if (holdTimer.current) clearTimeout(holdTimer.current);
    scale.stopAnimation();
    scale.setValue(SMALL);
    setRunning(false);
    setPhase('Ready');
  }, [scale]);

  const start = useCallback(() => {
    runningRef.current = true;
    setRunning(true);
    setCycles(0);
    runCycle();
  }, [runCycle]);

  useEffect(() => stop, [stop]);

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'\u2190'} {es ? 'Atrás' : 'Back'}</Text>
      </Pressable>
      <Text style={styles.title}>{es ? 'Respiración guiada' : 'Guided Breathing'}</Text>
      <Text style={styles.subtitle}>
        {es
          ? 'Inhale 4 \u00B7 mantenga 4 \u00B7 exhale 6. Siga el círculo. Respirar despacio puede ayudar a calmar un corazón y una mente acelerados.'
          : 'In for 4 \u00B7 hold for 4 \u00B7 out for 6. Follow the circle. Slow breathing can help a racing heart and mind settle.'}
      </Text>

      <View style={styles.circleArea}>
        <Animated.View style={[styles.circle, { transform: [{ scale }] }]} />
        <Text style={styles.phase}>{es ? PHASE_ES[phase] : phase}</Text>
      </View>

      <Text style={styles.cycles}>{running ? (es ? `Respiraciones completadas: ${cycles}` : `Breaths completed: ${cycles}`) : (es ? 'Toque Iniciar cuando esté listo' : 'Tap start when you are ready')}</Text>

      <Pressable style={[styles.button, running && styles.buttonStop]} onPress={running ? stop : start}>
        <Text style={styles.buttonText}>{running ? (es ? 'Detener' : 'Stop') : (es ? 'Iniciar' : 'Start')}</Text>
      </Pressable>

      <Text style={styles.note}>
        {es
          ? 'Si siente mareo, deténgase y respire con normalidad. Si está en crisis, llame o envíe un texto al 988.'
          : 'If you feel faint, stop and breathe normally. If you are in crisis, call or text 988.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingTop: 56, paddingHorizontal: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: '#5B8DEF', fontSize: 15, fontWeight: '600' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#8A8F98', fontSize: 13, lineHeight: 19, marginTop: 6 },
  circleArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: { width: 240, height: 240, borderRadius: 120, backgroundColor: '#5B8DEF', opacity: 0.85, position: 'absolute' },
  phase: { color: '#fff', fontSize: 24, fontWeight: '800' },
  cycles: { color: '#8A8F98', textAlign: 'center', fontSize: 14, marginBottom: 16 },
  button: { backgroundColor: '#5B8DEF', borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  buttonStop: { backgroundColor: '#3A4252' },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  note: { color: '#6B7280', fontSize: 12, textAlign: 'center', marginTop: 14, marginBottom: 28 },
});
