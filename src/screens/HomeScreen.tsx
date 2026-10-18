import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, TextInput } from 'react-native';
import { SYMPTOMS } from '../data/triageData';
import { EmergencyBar } from '../components/EmergencyBar';
import { useLang } from '../i18n/LanguageContext';
import { localizeSymptom } from '../i18n/localize';

export type HomeTab = 'physical' | 'mental' | 'tools';
export type ToolId = 'breathing' | 'grounding' | 'firstaid' | 'medicine' | 'resources' | 'costs' | 'safetyplan';

interface HomeScreenProps {
  tab: HomeTab;
  onTabChange: (tab: HomeTab) => void;
  onSelectSymptom: (symptomId: string) => void;
  onOpenTool: (tool: ToolId) => void;
  onOpenHistory: () => void;
}

interface GridItem {
  id: string;
  label: string;
  icon: string;
  kind: 'symptom' | 'tool' | 'spacer';
}

const TOOLS: GridItem[] = [
  { id: 'breathing', label: 'Guided Breathing', icon: '\u{1F32C}\u{FE0F}', kind: 'tool' },
  { id: 'grounding', label: '5-4-3-2-1 Grounding', icon: '\u{1F331}', kind: 'tool' },
  { id: 'firstaid', label: 'First Aid Guides', icon: '\u{1FA7A}', kind: 'tool' },
  { id: 'medicine', label: 'Medicine & Supplies Guide', icon: '\u{1F48A}', kind: 'tool' },
  { id: 'resources', label: 'Free Help Lines', icon: '\u{1F4DE}', kind: 'tool' },
  { id: 'costs', label: 'Costs & Your Rights', icon: '\u{1F4B5}', kind: 'tool' },
  { id: 'safetyplan', label: 'My Safety Plan', icon: '\u{1F6E1}\u{FE0F}', kind: 'tool' },
];

const TOOL_LABELS_ES: Record<string, string> = {
  breathing: 'Respiración guiada',
  grounding: 'Técnica 5-4-3-2-1',
  firstaid: 'Guías de primeros auxilios',
  medicine: 'Guía de medicinas y suministros',
  resources: 'Líneas de ayuda gratuitas',
  costs: 'Costos y sus derechos',
  safetyplan: 'Mi plan de seguridad',
};

const TAB_LABELS_ES: Record<HomeTab, string> = {
  physical: 'Físico',
  mental: 'Mental y emocional',
  tools: 'Herramientas y ayuda',
};

const TAB_LABELS: Record<HomeTab, string> = {
  physical: 'Physical',
  mental: 'Mental & Emotional',
  tools: 'Tools & Help',
};

export function HomeScreen({ tab, onTabChange, onSelectSymptom, onOpenTool, onOpenHistory }: HomeScreenProps) {
  const [query, setQuery] = useState('');
  const { lang, setLang } = useLang();
  const syms = useMemo(() => SYMPTOMS.map((s) => localizeSymptom(s, lang)), [lang]);
  const es = lang === 'es';

  const items: GridItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list: GridItem[];
    if (q) {
      list = syms.filter((s) => s.label.toLowerCase().includes(q)).map((s) => ({
        id: s.id,
        label: s.label,
        icon: s.icon,
        kind: 'symptom' as const,
      }));
    } else if (tab === 'tools') {
      list = TOOLS.map((t) => ({ ...t, label: es ? TOOL_LABELS_ES[t.id] : t.label }));
    } else {
      list = syms.filter((s) => s.category === tab).map((s) => ({
        id: s.id,
        label: s.label,
        icon: s.icon,
        kind: 'symptom' as const,
      }));
    }
    // Keep the last row from stretching when there is an odd number of cards.
    return list.length % 2 === 1 ? [...list, { id: '__spacer', label: '', icon: '', kind: 'spacer' }] : list;
  }, [query, tab, es, syms]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{es ? '¿Qué está pasando?' : "What's going on?"}</Text>
          <Pressable style={styles.langBtn} onPress={() => setLang(es ? 'en' : 'es')}>
            <Text style={styles.langBtnText}>{es ? 'English' : 'Español'}</Text>
          </Pressable>
        </View>
        <Text style={styles.subtitle}>
          {es
            ? 'Funciona sin conexión. Sin cuenta, sin costo, nada sale de su teléfono.'
            : 'Works fully offline. No account, no cost, nothing leaves your phone.'}
        </Text>
      </View>

      <EmergencyBar />

      <TextInput
        style={styles.search}
        value={query}
        onChangeText={setQuery}
        placeholder={es ? 'Buscar (p. ej., dolor de cabeza, pánico, quemadura)' : 'Search (e.g. headache, panic, burn)'}
        placeholderTextColor="#6B7280"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      {!query && (
        <View style={styles.tabRow}>
          {(Object.keys(TAB_LABELS) as HomeTab[]).map((t) => (
            <Pressable key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => onTabChange(t)}>
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{es ? TAB_LABELS_ES[t] : TAB_LABELS[t]}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={2}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<Text style={styles.empty}>{es ? 'Nada coincide con esa búsqueda.' : 'Nothing matches that search.'}</Text>}
        renderItem={({ item }) => {
          if (item.kind === 'spacer') return <View style={styles.spacer} />;
          return (
            <Pressable
              style={styles.card}
              onPress={() => (item.kind === 'tool' ? onOpenTool(item.id as ToolId) : onSelectSymptom(item.id))}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.cardLabel}>{item.label}</Text>
            </Pressable>
          );
        }}
      />

      <Pressable style={styles.historyButton} onPress={onOpenHistory}>
        <Text style={styles.historyButtonText}>{es ? 'Ver revisiones anteriores' : 'View Past Checks'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingTop: 56 },
  header: { paddingHorizontal: 20, marginBottom: 14 },
  title: { color: '#fff', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#8A8F98', fontSize: 14, marginTop: 6 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  langBtn: { backgroundColor: '#161B22', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12, borderColor: '#5B8DEF', borderWidth: 1 },
  langBtnText: { color: '#5B8DEF', fontSize: 13, fontWeight: '700' },
  search: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: '#161B22',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: '#fff',
    fontSize: 15,
  },
  tabRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 14, gap: 8 },
  tab: { flex: 1, backgroundColor: '#161B22', borderRadius: 20, paddingVertical: 10, alignItems: 'center' },
  tabActive: { backgroundColor: '#5B8DEF' },
  tabText: { color: '#8A8F98', fontSize: 12, fontWeight: '700', textAlign: 'center' },
  tabTextActive: { color: '#fff' },
  grid: { paddingHorizontal: 12, paddingBottom: 16 },
  row: { gap: 12, marginBottom: 12 },
  card: {
    flex: 1,
    backgroundColor: '#161B22',
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  spacer: { flex: 1 },
  icon: { fontSize: 36, marginBottom: 8 },
  cardLabel: { color: '#fff', fontSize: 14, fontWeight: '600', textAlign: 'center', paddingHorizontal: 8 },
  empty: { color: '#8A8F98', textAlign: 'center', marginTop: 32 },
  historyButton: {
    marginHorizontal: 20,
    marginBottom: 24,
    marginTop: 8,
    backgroundColor: '#161B22',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  historyButtonText: { color: '#8A8F98', fontWeight: '700', fontSize: 14 },
});
