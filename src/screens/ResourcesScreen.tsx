import React from 'react';
import { View, Text, StyleSheet, Pressable, SectionList } from 'react-native';
import { RESOURCES, GROUP_TITLES, ResourceGroup } from '../data/resources';
import { ResourceCard } from '../components/ResourceCard';

const ORDER: ResourceGroup[] = ['crisis', 'safety', 'substance', 'poison', 'parents', 'caregivers', 'care'];

const SECTIONS = ORDER.map((group) => ({
  title: GROUP_TITLES[group],
  data: RESOURCES.filter((r) => r.group === group),
})).filter((s) => s.data.length > 0);

export function ResourcesScreen({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'\u2190'} Back</Text>
      </Pressable>
      <Text style={styles.title}>Free Help Lines</Text>
      <Text style={styles.subtitle}>
        Phone and text lines work without internet (you only need a signal). Website links need internet. These are U.S. services.
      </Text>

      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => <Text style={styles.sectionTitle}>{section.title}</Text>}
        renderItem={({ item }) => <ResourceCard resource={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingTop: 56, paddingHorizontal: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: '#5B8DEF', fontSize: 15, fontWeight: '600' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#8A8F98', fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 8 },
  list: { paddingBottom: 32 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginTop: 18, marginBottom: 10 },
});
