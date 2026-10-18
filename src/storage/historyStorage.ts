import AsyncStorage from '@react-native-async-storage/async-storage';
import { UrgencyLevel } from '../data/triageData';

const HISTORY_KEY = '@triage/history';
const MAX_ENTRIES = 50;

export interface HistoryEntry {
  id: string;
  symptomId: string;
  symptomLabel: string;
  urgency: UrgencyLevel;
  timestamp: number;
}

export async function logTriageResult(entry: Omit<HistoryEntry, 'id'>): Promise<void> {
  const existing = await getHistory();
  const newEntry: HistoryEntry = { ...entry, id: `${entry.timestamp}-${Math.random().toString(36).slice(2, 8)}` };
  const updated = [newEntry, ...existing].slice(0, MAX_ENTRIES);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export async function getHistory(): Promise<HistoryEntry[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(HISTORY_KEY);
}
