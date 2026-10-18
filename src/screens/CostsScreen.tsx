import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COST_SECTIONS } from '../data/costsRights';
import { RESOURCES } from '../data/resources';
import { ResourceCard } from '../components/ResourceCard';

const HELP_IDS = ['211', 'hrsa'];

export function CostsScreen({ onBack }: { onBack: () => void }) {
  const help = RESOURCES.filter((r) => HELP_IDS.includes(r.id));

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'\u2190'} Back</Text>
      </Pressable>
      <Text style={styles.title}>Costs & Your Rights</Text>
      <Text style={styles.subtitle}>
        Fear of the bill keeps people from getting care. Here is what you should know. General information for the United States, not legal advice. Rules vary by state and hospital.
      </Text>

      <ScrollView contentContainerStyle={styles.list}>
        {COST_SECTIONS.map((section) => (
          <View key={section.id} style={styles.card}>
            <Text style={styles.cardTitle}>{section.icon}  {section.title}</Text>
            {section.points.map((point, i) => (
              <View key={i} style={styles.pointRow}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.helpTitle}>Help finding low-cost care</Text>
        {help.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingTop: 56, paddingHorizontal: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: '#5B8DEF', fontSize: 15, fontWeight: '600' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#8A8F98', fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 12 },
  list: { paddingBottom: 32 },
  card: { backgroundColor: '#161B22', borderRadius: 14, padding: 16, marginBottom: 12 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 10 },
  pointRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  bullet: { color: '#5B8DEF', fontSize: 16, lineHeight: 21 },
  pointText: { color: '#E6EDF3', fontSize: 14, lineHeight: 21, flex: 1 },
  helpTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginTop: 8, marginBottom: 10 },
});
