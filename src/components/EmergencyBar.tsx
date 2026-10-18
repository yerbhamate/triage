import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { callNumber } from '../utils/contact';
import { useLang } from '../i18n/LanguageContext';

export function EmergencyBar() {
  const { lang } = useLang();
  return (
    <Pressable style={styles.bar} onPress={() => callNumber('911', '911')}>
      <Text style={styles.text}>{'\u{1F6A8}'} {lang === 'es' ? '¿Peligro inmediato? Toque para llamar al 911' : 'In immediate danger? Tap to call 911'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: '#3A1D21',
    borderColor: '#E5484D',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  text: { color: '#FF8A8E', fontSize: 14, fontWeight: '700' },
});
