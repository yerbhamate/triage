import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Alert } from 'react-native';
import { getHistory, clearHistory, HistoryEntry } from '../storage/historyStorage';
import { URGENCY_META } from '../data/triageData';

interface HistoryScreenProps {
  onBack: () => void;
}

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    getHistory().then(setEntries);
  }, []);

  const confirmClear = () => {
    Alert.alert('Clear all past checks?', 'This removes them from this device. It cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear all',
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
        <Text style={styles.backText}>{'\u2190'} Back</Text>
      </Pressable>
      <Text style={styles.title}>Past Checks</Text>
      <Text style={styles.subtitle}>
        Stored only on this device. Sensitive topics are never saved here.
      </Text>

      {entries.length === 0 ? (
        <Text style={styles.emptyText}>No checks yet.</Text>
      ) : (
        <>
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              const meta = URGENCY_META[item.urgency];
              return (
                <View style={styles.row}>
                  <View style={[styles.dot, { backgroundColor: meta.color }]} />
                  <View style={styles.rowText}>
                    <Text style={styles.rowLabel}>{item.symptomLabel}</Text>
                    <Text style={styles.rowDate}>{new Date(item.timestamp).toLocaleString()}</Text>
                  </View>
                  <Text style={[styles.rowUrgency, { color: meta.color }]}>{meta.label}</Text>
                </View>
              );
            }}
          />
          <Pressable style={styles.clearButton} onPress={confirmClear}>
            <Text style={styles.clearButtonText}>Clear all past checks</Text>
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
