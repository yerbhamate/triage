import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { SYMPTOMS, URGENCY_META, UrgencyLevel } from '../data/triageData';
import { medicinesFor } from '../data/medicines';
import { resourcesFor } from '../data/resources';
import { logTriageResult } from '../storage/historyStorage';
import { callNumber } from '../utils/contact';
import { MedIcon } from '../components/MedIcon';
import { ResourceCard } from '../components/ResourceCard';
import { useLang } from '../i18n/LanguageContext';
import { localizeSymptom, localizeUrgency } from '../i18n/localize';
import { MEDICINES_ES } from '../data/es/medicines.es';

interface ResultScreenProps {
  symptomId: string;
  urgency: UrgencyLevel;
  onDone: () => void;
  onOpenResources: () => void;
  onPrepareVisit: () => void;
  onOpenSafetyPlan: () => void;
}

/** Conditions where a personal safety plan is worth offering. */
const SAFETY_PLAN_SYMPTOMS = [
  'mental_health_crisis',
  'depression_signs',
  'loneliness',
  'panic_anxiety',
  'trauma',
  'postpartum',
  'eating_concerns',
  'substance_concern',
  'low_motivation',
  'self_esteem',
];

export function ResultScreen({ symptomId, urgency, onDone, onOpenResources, onPrepareVisit, onOpenSafetyPlan }: ResultScreenProps) {
  const { lang } = useLang();
  const es = lang === 'es';
  const baseSymptom = SYMPTOMS.find((s) => s.id === symptomId)!;
  const symptom = localizeSymptom(baseSymptom, lang);
  const meta = localizeUrgency(urgency, lang);
  const advice = symptom.advice[urgency];
  const isEmergency = urgency === 'emergency';
  const canPrepVisit = !symptom.private && (urgency === 'urgent_care' || urgency === 'see_doctor');
  const showSafetyPlan = SAFETY_PLAN_SYMPTOMS.includes(symptomId);

  const medicines = useMemo(
    () => medicinesFor(symptomId, urgency).map((m) => (es && MEDICINES_ES[m.id] ? { ...m, ...MEDICINES_ES[m.id] } : m)),
    [symptomId, urgency, es],
  );
  const resources = useMemo(() => resourcesFor(baseSymptom, urgency), [baseSymptom, urgency]);

  useEffect(() => {
    // Sensitive topics are never saved, so nobody who picks up the device can see them.
    if (!symptom.private) {
      logTriageResult({ symptomId, symptomLabel: baseSymptom.label, urgency, timestamp: Date.now() });
    }
    return () => {
      Speech.stop();
    };
  }, [symptomId, baseSymptom.label, symptom.private, urgency]);

  const speakAdvice = () => {
    Speech.stop();
    Speech.speak(`${meta.label}. ${advice}`, { language: es ? 'es-US' : 'en-US', rate: 0.95 });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.badge, { backgroundColor: meta.color }]}>
          <Text style={styles.badgeText}>{meta.label}</Text>
        </View>

        <Text style={styles.symptomLabel}>{symptom.icon} {symptom.label}</Text>

        <View style={styles.adviceCard}>
          <Text style={styles.adviceText}>{advice}</Text>
        </View>

        {isEmergency && (
          <Pressable style={styles.callButton} onPress={() => callNumber('911', '911')}>
            <Text style={styles.callButtonText}>{es ? 'Llamar a emergencias (911)' : 'Call Emergency Services (911)'}</Text>
          </Pressable>
        )}

        <Pressable style={styles.speakButton} onPress={speakAdvice}>
          <Text style={styles.speakButtonText}>{'\u{1F50A}'} {es ? 'Leer en voz alta' : 'Read This Aloud'}</Text>
        </Pressable>

        {canPrepVisit && (
          <Pressable style={styles.speakButton} onPress={onPrepareVisit}>
            <Text style={styles.speakButtonText}>{'\u{1F4DD}'} {es ? 'Prepararme para mi visita' : 'Prepare for your visit'}</Text>
          </Pressable>
        )}

        {showSafetyPlan && (
          <Pressable style={styles.speakButton} onPress={onOpenSafetyPlan}>
            <Text style={styles.speakButtonText}>{'\u{1F6E1}\u{FE0F}'} {es ? 'Crear mi plan de seguridad personal' : 'Make my personal safety plan'}</Text>
          </Pressable>
        )}

        {medicines.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{es ? 'Bueno saber' : 'Good to know about'}</Text>
            {medicines.map((m) => (
              <View key={m.id} style={styles.medRow}>
                <MedIcon kind={m.icon} size={44} />
                <View style={styles.medText}>
                  <Text style={styles.medName}>{m.name}</Text>
                  <Text style={styles.medFor}>{m.usedFor}</Text>
                  <Text style={styles.medNote}>{m.goodToKnow}</Text>
                </View>
              </View>
            ))}
            <Text style={styles.medDisclaimer}>
              {es
                ? 'Siga siempre la etiqueta del envase y pregunte a un farmacéutico si tiene dudas. Las dosis dependen de la edad, el peso y la salud.'
                : 'Always follow the package label, and ask a pharmacist if you are unsure. Doses depend on age, weight, and health.'}
            </Text>
          </View>
        )}

        {resources.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{es ? 'Ayuda gratuita a la que puede acudir ahora' : 'Free help you can reach right now'}</Text>
            {resources.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
            <Pressable onPress={onOpenResources}>
              <Text style={styles.moreLink}>{es ? 'Ver todos los recursos gratuitos' : 'See all free resources'} {'\u2192'}</Text>
            </Pressable>
          </View>
        )}

        {symptom.private && (
          <Text style={styles.privateNote}>
            {es ? 'Para proteger su privacidad, esta revisión no se guarda en este dispositivo.' : 'For your privacy, this check is not saved to this device.'}
          </Text>
        )}

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            {es
              ? 'Esta es una orientación general, no un diagnóstico médico. Si alguna vez tiene dudas, siempre es más seguro buscar atención. En una emergencia que ponga en peligro la vida, llame de inmediato a su número local de emergencias. Los recursos mostrados son para Estados Unidos.'
              : 'This is general guidance, not a medical diagnosis. If you are ever unsure, it is always safer to seek care. In a life-threatening emergency, call your local emergency number immediately. Resources shown are for the United States.'}
          </Text>
        </View>
      </ScrollView>

      <Pressable style={styles.doneButton} onPress={onDone}>
        <Text style={styles.doneButtonText}>{es ? 'Listo' : 'Done'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117' },
  scrollContent: { padding: 20, paddingTop: 56, paddingBottom: 24 },
  badge: { alignSelf: 'flex-start', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16, marginBottom: 16 },
  badgeText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  symptomLabel: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 16 },
  adviceCard: { backgroundColor: '#161B22', borderRadius: 14, padding: 18, marginBottom: 16 },
  adviceText: { color: '#E6EDF3', fontSize: 16, lineHeight: 24 },
  callButton: { backgroundColor: '#E5484D', borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  callButtonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  speakButton: { backgroundColor: '#161B22', borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginBottom: 12 },
  speakButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  section: { marginBottom: 12 },
  sectionTitle: { color: '#fff', fontSize: 17, fontWeight: '800', marginBottom: 12 },
  medRow: { flexDirection: 'row', backgroundColor: '#161B22', borderRadius: 14, padding: 12, marginBottom: 10, gap: 12 },
  medText: { flex: 1 },
  medName: { color: '#fff', fontSize: 15, fontWeight: '700' },
  medFor: { color: '#C9D1D9', fontSize: 13, marginTop: 2 },
  medNote: { color: '#8A8F98', fontSize: 12, lineHeight: 17, marginTop: 4 },
  medDisclaimer: { color: '#8A8F98', fontSize: 12, fontStyle: 'italic', marginTop: 2 },
  moreLink: { color: '#5B8DEF', fontSize: 14, fontWeight: '700', marginTop: 4 },
  privateNote: { color: '#8A8F98', fontSize: 12, marginTop: 8, marginBottom: 8 },
  disclaimer: { borderTopWidth: 1, borderTopColor: '#2A2F3A', paddingTop: 16, marginTop: 8 },
  disclaimerText: { color: '#8A8F98', fontSize: 12, lineHeight: 18 },
  doneButton: { backgroundColor: '#5B8DEF', margin: 20, borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  doneButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
