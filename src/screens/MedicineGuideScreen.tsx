import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { MEDICINES } from '../data/medicines';
import { MedIcon } from '../components/MedIcon';

export function MedicineGuideScreen({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'\u2190'} Back</Text>
      </Pressable>
      <Text style={styles.title}>Medicine & Supplies Guide</Text>
      <Text style={styles.subtitle}>
        What common medicines and supplies are for. No doses are listed on purpose. Always follow the package label and ask a pharmacist if you are unsure.
      </Text>

      <FlatList
        data={MEDICINES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <MedIcon kind={item.icon} size={52} />
            <View style={styles.rowText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.usedFor}>{item.usedFor}</Text>
              <Text style={styles.note}>{item.goodToKnow}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingTop: 56, paddingHorizontal: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: '#5B8DEF', fontSize: 15, fontWeight: '600' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#8A8F98', fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 16 },
  list: { paddingBottom: 32 },
  row: { flexDirection: 'row', backgroundColor: '#161B22', borderRadius: 14, padding: 12, marginBottom: 10, gap: 12 },
  rowText: { flex: 1 },
  name: { color: '#fff', fontSize: 15, fontWeight: '700' },
  usedFor: { color: '#C9D1D9', fontSize: 13, marginTop: 3 },
  note: { color: '#8A8F98', fontSize: 12, lineHeight: 17, marginTop: 5 },
});
