import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Resource } from '../data/resources';
import { callNumber, textNumber, openLink } from '../utils/contact';
import { RESOURCES_ES } from '../data/es/resources.es';
import { useLang } from '../i18n/LanguageContext';

export function ResourceCard({ resource }: { resource: Resource }) {
  const { lang } = useLang();
  const es = lang === 'es';
  const tx = es ? RESOURCES_ES[resource.id] : undefined;
  const { call, text, url } = resource;
  const name = tx?.name ?? resource.name;
  const hours = tx?.hours ?? resource.hours;
  const blurb = tx?.blurb ?? resource.blurb;
  const textLabel = tx?.textLabel ?? text?.label ?? '';
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.hours}>{hours}</Text>
      <Text style={styles.blurb}>{blurb}</Text>
      <View style={styles.buttons}>
        {call && (
          <Pressable style={[styles.button, styles.callButton]} onPress={() => callNumber(call.number, call.label)}>
            <Text style={styles.buttonText}>{'\u{1F4DE}'} {es ? 'Llamar' : 'Call'} {call.label}</Text>
          </Pressable>
        )}
        {text && (
          <Pressable style={styles.button} onPress={() => textNumber(text.to, text.body, textLabel)}>
            <Text style={styles.buttonText}>{'\u{1F4AC}'} {textLabel}</Text>
          </Pressable>
        )}
        {url && (
          <Pressable style={styles.button} onPress={() => openLink(url.href)}>
            <Text style={styles.buttonText}>{'\u{1F310}'} {url.label}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#161B22', borderRadius: 14, padding: 16, marginBottom: 12 },
  name: { color: '#fff', fontSize: 16, fontWeight: '700' },
  hours: { color: '#30A46C', fontSize: 12, fontWeight: '700', marginTop: 2 },
  blurb: { color: '#C9D1D9', fontSize: 14, lineHeight: 20, marginTop: 8 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  button: { backgroundColor: '#242C38', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 14 },
  callButton: { backgroundColor: '#5B8DEF' },
  buttonText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
