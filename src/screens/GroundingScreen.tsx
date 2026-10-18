import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const STEPS = [
  { count: 5, sense: 'see', prompt: 'Look around. Name 5 things you can see.' },
  { count: 4, sense: 'feel', prompt: 'Notice 4 things you can touch or feel, like your feet on the floor or the fabric of your clothes.' },
  { count: 3, sense: 'hear', prompt: 'Listen. Name 3 things you can hear.' },
  { count: 2, sense: 'smell', prompt: 'Name 2 things you can smell, or 2 smells you like.' },
  { count: 1, sense: 'taste', prompt: 'Name 1 thing you can taste, or 1 thing you would like to taste.' },
];

/** A classic grounding exercise for anxiety and panic. Tap once for each thing you notice. */
export function GroundingScreen({ onBack }: { onBack: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [found, setFound] = useState(0);

  const finished = stepIndex >= STEPS.length;
  const step = STEPS[stepIndex];

  const tapFound = () => {
    const next = found + 1;
    if (next >= step.count) {
      setStepIndex((i) => i + 1);
      setFound(0);
    } else {
      setFound(next);
    }
  };

  const restart = () => {
    setStepIndex(0);
    setFound(0);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'\u2190'} Back</Text>
      </Pressable>
      <Text style={styles.title}>5-4-3-2-1 Grounding</Text>
      <Text style={styles.subtitle}>
        Helps bring you back to the present when anxiety or panic takes over. Go slowly.
      </Text>

      {finished ? (
        <View style={styles.body}>
          <Text style={styles.bigIcon}>{'\u{1F331}'}</Text>
          <Text style={styles.doneTitle}>Nice work.</Text>
          <Text style={styles.prompt}>Take one slow breath in, and let it out. You are here, and you are okay in this moment.</Text>
          <Pressable style={styles.button} onPress={restart}>
            <Text style={styles.buttonText}>Do it again</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.body}>
          <Text style={styles.bigNumber}>{step.count - found}</Text>
          <Text style={styles.sense}>left to {step.sense}</Text>
          <Text style={styles.prompt}>{step.prompt}</Text>
          <Pressable style={styles.button} onPress={tapFound}>
            <Text style={styles.buttonText}>I noticed one</Text>
          </Pressable>
          <Text style={styles.progress}>Step {stepIndex + 1} of {STEPS.length}</Text>
        </View>
      )}

      <Text style={styles.note}>If you are in crisis, call or text 988.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingTop: 56, paddingHorizontal: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: '#5B8DEF', fontSize: 15, fontWeight: '600' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#8A8F98', fontSize: 13, lineHeight: 19, marginTop: 6 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 },
  bigNumber: { color: '#5B8DEF', fontSize: 96, fontWeight: '900' },
  bigIcon: { fontSize: 72 },
  sense: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 14 },
  doneTitle: { color: '#fff', fontSize: 26, fontWeight: '800', marginTop: 8, marginBottom: 10 },
  prompt: { color: '#C9D1D9', fontSize: 17, lineHeight: 26, textAlign: 'center', marginBottom: 28 },
  button: { backgroundColor: '#5B8DEF', borderRadius: 30, paddingVertical: 16, paddingHorizontal: 40 },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  progress: { color: '#6B7280', fontSize: 12, marginTop: 16 },
  note: { color: '#6B7280', fontSize: 12, textAlign: 'center', marginBottom: 28 },
});
