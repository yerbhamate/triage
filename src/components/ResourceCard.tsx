import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Resource } from '../data/resources';
import { callNumber, textNumber, openLink } from '../utils/contact';

export function ResourceCard({ resource }: { resource: Resource }) {
  const { call, text, url } = resource;
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{resource.name}</Text>
      <Text style={styles.hours}>{resource.hours}</Text>
      <Text style={styles.blurb}>{resource.blurb}</Text>
      <View style={styles.buttons}>
        {call && (
          <Pressable style={[styles.button, styles.callButton]} onPress={() => callNumber(call.number, call.label)}>
            <Text style={styles.buttonText}>{'\u{1F4DE}'} Call {call.label}</Text>
          </Pressable>
        )}
        {text && (
          <Pressable style={styles.button} onPress={() => textNumber(text.to, text.body, text.label)}>
            <Text style={styles.buttonText}>{'\u{1F4AC}'} {text.label}</Text>
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
