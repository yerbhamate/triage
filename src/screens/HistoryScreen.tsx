import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Alert } from 'react-native';
import { getHistory, clearHistory, HistoryEntry } from '../storage/historyStorage';
import { SYMPTOMS } from '../data/triageData';
import { useLang } from '../i18n/LanguageContext';
import { localizeSymptom, localizeUrgency } from '../i18n/localize';

interface HistoryScreenProps {
  onBack: () => void;
}

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const { lang } = useLang();
  const es = lang === 'es';
  const labelFor = (item: HistoryEntry) => {
    const base = SYMPTOMS.find((s) => s.id === item.symptomId);
    return base ? localizeSymptom(base, lang).label : item.symptomLabel;
  };
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    getHistory().then(setEntries);
  }, []);

  const confirmClear = () => {
    Alert.alert(
      es ? '¿Borrar todas las revisiones anteriores?' : 'Clear all past checks?',
      es ? 'Esto las elimina de este dispositivo. No se puede deshacer.' : 'This removes them from this device. It cannot be undone.',
      [
      { text: es ? 'Cancelar' : 'Cancel', style: 'cancel' },
      {
        text: es ? 'Borrar todo' : 'Clear all',
        style: 'destructive',
        onPress: async () => {
          await clearHistory();
          setEntries([]);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'\u2190'} {es ? 'Atrás' : 'Back'}</Text>
      </Pressable>
      <Text style={styles.title}>{es ? 'Revisiones anteriores' : 'Past Checks'}</Text>
      <Text style={styles.subtitle}>
        {es
          ? 'Se guardan solo en este dispositivo. Los temas sensibles nunca se guardan aquí.'
          : 'Stored only on this device. Sensitive topics are never saved here.'}
      </Text>

      {entries.length === 0 ? (
        <Text style={styles.emptyText}>{es ? 'Todavía no hay revisiones.' : 'No checks yet.'}</Text>
      ) : (
        <>
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              const meta = localizeUrgency(item.urgency, lang);
              return (
                <View style={styles.row}>
                  <View style={[styles.dot, { backgroundColor: meta.color }]} />
                  <View style={styles.rowText}>
                    <Text style={styles.rowLabel}>{labelFor(item)}</Text>
                    <Text style={styles.rowDate}>{new Date(item.timestamp).toLocaleString(es ? 'es-US' : undefined)}</Text>
                  </View>
                  <Text style={[styles.rowUrgency, { color: meta.color }]}>{meta.label}</Text>
                </View>
              );
            }}
          />
          <Pressable style={styles.clearButton} onPress={confirmClear}>
            <Text style={styles.clearButtonText}>{es ? 'Borrar todas las revisiones anteriores' : 'Clear all past checks'}</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingTop: 56, paddingHorizontal: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: '#5B8DEF', fontSize: 15, fontWeight: '600' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#8A8F98', fontSize: 13, marginTop: 6, marginBottom: 16 },
  emptyText: { color: '#8A8F98', fontSize: 15, marginTop: 32, textAlign: 'center' },
  list: { paddingBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#161B22', borderRadius: 12, padding: 14, marginBottom: 10 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  rowText: { flex: 1 },
  rowLabel: { color: '#fff', fontSize: 15, fontWeight: '600' },
  rowDate: { color: '#8A8F98', fontSize: 12, marginTop: 2 },
  rowUrgency: { fontSize: 12, fontWeight: '700' },
  clearButton: { backgroundColor: '#161B22', borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginBottom: 28 },
  clearButtonText: { color: '#FF8A8E', fontWeight: '700', fontSize: 14 },
});
