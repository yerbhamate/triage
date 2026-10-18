import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SYMPTOMS } from '../data/triageData';
import { evaluateTriage } from '../utils/triageEngine';

interface FlagCheckScreenProps {
  symptomId: string;
  onResult: (symptomId: string, checkedFlagIds: Set<string>) => void;
  onBack: () => void;
}

export function FlagCheckScreen({ symptomId, onResult, onBack }: FlagCheckScreenProps) {
  const symptom = SYMPTOMS.find((s) => s.id === symptomId)!;
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleFlag = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const softFlags = symptom.softFlags ?? [];
  const hasAnyFlags = symptom.redFlags.length > 0 || symptom.moderateFlags.length > 0 || softFlags.length > 0;

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'\u2190'} Back</Text>
      </Pressable>

      <Text style={styles.icon}>{symptom.icon}</Text>
      <Text style={styles.title}>{symptom.label}</Text>
      <Text style={styles.subtitle}>Check anything that applies right now:</Text>

      <ScrollView contentContainerStyle={styles.flagList}>
        {symptom.redFlags.map((flag) => (
          <FlagRow key={flag.id} label={flag.label} checked={checked.has(flag.id)} onToggle={() => toggleFlag(flag.id)} severe />
        ))}
        {symptom.moderateFlags.map((flag) => (
          <FlagRow key={flag.id} label={flag.label} checked={checked.has(flag.id)} onToggle={() => toggleFlag(flag.id)} />
        ))}
        {softFlags.map((flag) => (
          <FlagRow key={flag.id} label={flag.label} checked={checked.has(flag.id)} onToggle={() => toggleFlag(flag.id)} />
        ))}
        {!hasAnyFlags && (
          <Text style={styles.noFlagsText}>No additional warning signs to check for this one.</Text>
        )}
      </ScrollView>

      <Pressable style={styles.continueButton} onPress={() => onResult(symptomId, checked)}>
        <Text style={styles.continueButtonText}>Get Guidance</Text>
      </Pressable>
    </View>
  );
}

function FlagRow({ label, checked, onToggle, severe }: { label: string; checked: boolean; onToggle: () => void; severe?: boolean }) {
  return (
    <Pressable style={[styles.flagRow, checked && styles.flagRowChecked]} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked, severe && styles.checkboxSevere]}>
        {checked && <Text style={styles.checkmark}>{'\u2713'}</Text>}
      </View>
      <Text style={styles.flagLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingTop: 56, paddingHorizontal: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: '#5B8DEF', fontSize: 15, fontWeight: '600' },
  icon: { fontSize: 40 },
  title: { color: '#fff', fontSize: 24, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#8A8F98', fontSize: 14, marginTop: 6, marginBottom: 16 },
  flagList: { paddingBottom: 24 },
  flagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161B22',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  flagRowChecked: { backgroundColor: '#1E2530' },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4A5568',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSevere: { borderColor: '#E5484D' },
  checkboxChecked: { backgroundColor: '#5B8DEF', borderColor: '#5B8DEF' },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: '800' },
  flagLabel: { color: '#fff', fontSize: 15, flex: 1 },
  noFlagsText: { color: '#8A8F98', fontSize: 14, fontStyle: 'italic', marginTop: 12 },
  continueButton: {
    backgroundColor: '#5B8DEF',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  continueButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
