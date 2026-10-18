import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { FIRST_AID } from '../data/firstAid';
import { callNumber } from '../utils/contact';

export function FirstAidScreen({ onBack }: { onBack: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'\u2190'} Back</Text>
      </Pressable>
      <Text style={styles.title}>First Aid Guides</Text>
      <Text style={styles.subtitle}>
        Step-by-step basics that work offline. In any life-threatening emergency, call 911 first.
      </Text>

      <Pressable style={styles.callBar} onPress={() => callNumber('911', '911')}>
        <Text style={styles.callBarText}>{'\u{1F6A8}'} Call 911</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.list}>
        {FIRST_AID.map((guide) => {
          const open = openId === guide.id;
          return (
            <View key={guide.id} style={styles.card}>
              <Pressable style={styles.cardHeader} onPress={() => setOpenId(open ? null : guide.id)}>
                <Text style={styles.cardIcon}>{guide.icon}</Text>
                <View style={styles.cardHeaderText}>
                  <Text style={styles.cardTitle}>{guide.title}</Text>
                  <Text style={styles.cardWhen}>{guide.when}</Text>
                </View>
                <Text style={styles.chevron}>{open ? '\u2212' : '+'}</Text>
              </Pressable>

              {open && (
                <View style={styles.steps}>
                  {guide.steps.map((step, i) => (
                    <View key={i} style={styles.stepRow}>
                      <Text style={styles.stepNum}>{i + 1}</Text>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                  {guide.note && <Text style={styles.note}>{guide.note}</Text>}
                  <Text style={styles.disclaimer}>
                    This is a quick reminder, not a replacement for a certified first aid or CPR course.
                  </Text>
                </View>
              )}
            </View>
          );
        })}
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
  callBar: {
    backgroundColor: '#3A1D21',
    borderColor: '#E5484D',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 14,
  },
  callBarText: { color: '#FF8A8E', fontSize: 14, fontWeight: '800' },
  list: { paddingBottom: 32 },
  card: { backgroundColor: '#161B22', borderRadius: 14, marginBottom: 10, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  cardIcon: { fontSize: 28 },
  cardHeaderText: { flex: 1 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cardWhen: { color: '#8A8F98', fontSize: 12, lineHeight: 17, marginTop: 2 },
  chevron: { color: '#5B8DEF', fontSize: 24, fontWeight: '700', width: 24, textAlign: 'center' },
  steps: { paddingHorizontal: 14, paddingBottom: 14 },
  stepRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  stepNum: {
    color: '#fff',
    backgroundColor: '#5B8DEF',
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
  },
  stepText: { color: '#E6EDF3', fontSize: 14, lineHeight: 21, flex: 1 },
  note: { color: '#F5A623', fontSize: 12, lineHeight: 18, marginTop: 4 },
  disclaimer: { color: '#6B7280', fontSize: 11, marginTop: 10 },
});
