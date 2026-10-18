import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Share,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SYMPTOMS, URGENCY_META, UrgencyLevel } from '../data/triageData';

interface VisitPrepProps {
  symptomId: string;
  urgency: UrgencyLevel;
  checkedFlagIds: string[];
  onBack: () => void;
}

const SUGGESTED_QUESTIONS = [
  'What do you think is causing this?',
  'What tests or treatments do you recommend, and what will they cost?',
  'Are there lower-cost options?',
  'What can I do at home, and what signs mean I should come back or go to the ER?',
  'Can you explain that in simpler words, or write it down for me?',
  'When should I expect to feel better?',
];

/**
 * Doctors have limited time, and many people freeze up or struggle to explain things. This builds a
 * short summary from what the person already told the app. Nothing here is saved or sent anywhere
 * unless the person taps Share.
 */
export function VisitPrepScreen({ symptomId, urgency, checkedFlagIds, onBack }: VisitPrepProps) {
  const symptom = SYMPTOMS.find((s) => s.id === symptomId)!;
  const [started, setStarted] = useState('');
  const [meds, setMeds] = useState('');
  const [picked, setPicked] = useState<Set<number>>(new Set([0, 3]));

  const reportedSigns = useMemo(() => {
    const all = [...symptom.redFlags, ...symptom.moderateFlags, ...(symptom.softFlags ?? [])];
    return all.filter((f) => checkedFlagIds.includes(f.id)).map((f) => f.label);
  }, [symptom, checkedFlagIds]);

  const toggle = (i: number) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const summary = useMemo(() => {
    const lines: string[] = [];
    lines.push(`Visit summary (prepared with Triage on ${new Date().toLocaleDateString()})`);
    lines.push('');
    lines.push(`Reason for visit: ${symptom.label}`);
    lines.push(`Triage guidance I received: ${URGENCY_META[urgency].label}`);
    lines.push('');
    lines.push('Signs I reported:');
    if (reportedSigns.length === 0) lines.push('- None of the listed warning signs');
    reportedSigns.forEach((s) => lines.push(`- ${s}`));
    if (started.trim()) {
      lines.push('');
      lines.push(`When it started: ${started.trim()}`);
    }
    if (meds.trim()) {
      lines.push('');
      lines.push(`Medicines and allergies: ${meds.trim()}`);
    }
    if (picked.size > 0) {
      lines.push('');
      lines.push('Questions I want to ask:');
      SUGGESTED_QUESTIONS.forEach((q, i) => {
        if (picked.has(i)) lines.push(`- ${q}`);
      });
    }
    return lines.join('\n');
  }, [symptom.label, urgency, reportedSigns, started, meds, picked]);

  const share = async () => {
    try {
      await Share.share({ message: summary });
    } catch {
      // person closed the share sheet; nothing to do
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'\u2190'} Back</Text>
      </Pressable>
      <Text style={styles.title}>Prepare for Your Visit</Text>
      <Text style={styles.subtitle}>
        Doctors have limited time. A short summary helps you say what matters. Nothing here is saved or sent unless you tap Share.
      </Text>

      <ScrollView contentContainerStyle={styles.list} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>When did it start?</Text>
          <TextInput
            style={styles.input}
            value={started}
            onChangeText={setStarted}
            placeholder="e.g. 3 days ago, after a fall"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Medicines and allergies</Text>
          <TextInput
            style={[styles.input, styles.inputTall]}
            value={meds}
            onChangeText={setMeds}
            placeholder="Anything you take regularly, and anything you are allergic to"
            placeholderTextColor="#6B7280"
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Questions to ask</Text>
          <Text style={styles.hint}>Tap the ones you want to bring.</Text>
          {SUGGESTED_QUESTIONS.map((q, i) => {
            const on = picked.has(i);
            return (
              <Pressable key={q} style={[styles.question, on && styles.questionOn]} onPress={() => toggle(i)}>
                <Text style={[styles.checkbox, on && styles.checkboxOn]}>{on ? '\u2713' : ''}</Text>
                <Text style={styles.questionText}>{q}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.previewLabel}>Your summary</Text>
        <View style={styles.preview}>
          <Text style={styles.previewText}>{summary}</Text>
        </View>

        <Pressable style={styles.shareButton} onPress={share}>
          <Text style={styles.shareButtonText}>Share or copy this summary</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingTop: 56, paddingHorizontal: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: '#5B8DEF', fontSize: 15, fontWeight: '600' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#8A8F98', fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 12 },
  list: { paddingBottom: 48 },
  card: { backgroundColor: '#161B22', borderRadius: 14, padding: 14, marginBottom: 12 },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: '800', marginBottom: 8 },
  hint: { color: '#8A8F98', fontSize: 12, marginTop: -4, marginBottom: 8 },
  input: { backgroundColor: '#0D1117', borderRadius: 10, color: '#fff', fontSize: 15, padding: 10 },
  inputTall: { minHeight: 72 },
  question: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  questionOn: {},
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4A5568',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 18,
    fontSize: 13,
    fontWeight: '800',
    overflow: 'hidden',
  },
  checkboxOn: { backgroundColor: '#5B8DEF', borderColor: '#5B8DEF' },
  questionText: { color: '#E6EDF3', fontSize: 14, lineHeight: 20, flex: 1 },
  previewLabel: { color: '#fff', fontSize: 15, fontWeight: '800', marginTop: 6, marginBottom: 8 },
  preview: { backgroundColor: '#161B22', borderRadius: 14, padding: 14, marginBottom: 14 },
  previewText: { color: '#C9D1D9', fontSize: 13, lineHeight: 20 },
  shareButton: { backgroundColor: '#5B8DEF', borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  shareButtonText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
