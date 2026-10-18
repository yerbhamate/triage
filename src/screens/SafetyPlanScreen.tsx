import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  EMPTY_PLAN,
  SafetyPlan,
  getSafetyPlan,
  saveSafetyPlan,
  clearSafetyPlan,
} from '../storage/safetyPlanStorage';
import { RESOURCES } from '../data/resources';
import { ResourceCard } from '../components/ResourceCard';
import { useLang } from '../i18n/LanguageContext';

interface Field {
  key: keyof SafetyPlan;
  title: string;
  prompt: string;
  placeholder: string;
}

const FIELD_ES: Record<string, { title: string; prompt: string; placeholder: string }> = {
  warningSigns: {
    title: '1. Mis señales de alerta',
    prompt: 'Pensamientos, sentimientos o situaciones que me indican que las cosas se están poniendo difíciles.',
    placeholder: 'p. ej., no dormir, alejarme de la gente, sentir que soy una carga',
  },
  copingSteps: {
    title: '2. Cosas que puedo hacer por mi cuenta para calmarme',
    prompt: 'Pasos pequeños que me han ayudado antes.',
    placeholder: 'p. ej., respirar despacio, caminar, ducharme, escuchar música, la técnica 5-4-3-2-1',
  },
  placesPeople: {
    title: '3. Personas y lugares que me ayudan a sentirme mejor',
    prompt: 'Un lugar o una persona que me distraiga bien, aun sin hablar del problema.',
    placeholder: 'p. ej., un amigo con quien puedo sentarme, la biblioteca, un parque',
  },
  peopleToAsk: {
    title: '4. Personas a quienes puedo pedir ayuda',
    prompt: 'Personas de mi confianza. Anote sus números de teléfono.',
    placeholder: 'Nombre y número de teléfono',
  },
  saferSpace: {
    title: '6. Hacer mi espacio más seguro',
    prompt: 'Pasos que hacen más difícil actuar según pensamientos oscuros, como pedirle a alguien de confianza que guarde cosas con las que podría hacerme daño.',
    placeholder: 'Qué puedo hacer y quién puede ayudarme',
  },
  reason: {
    title: '7. Una razón que me importa',
    prompt: 'Una persona, una mascota, una meta, cualquier cosa que me importe.',
    placeholder: 'Escríbalo con sus propias palabras',
  },
};

const FIELDS_BEFORE: Field[] = [
  {
    key: 'warningSigns',
    title: '1. My warning signs',
    prompt: 'Thoughts, feelings, or situations that tell me things are getting hard.',
    placeholder: 'e.g. not sleeping, pulling away from people, feeling like a burden',
  },
  {
    key: 'copingSteps',
    title: '2. Things I can do on my own to feel calmer',
    prompt: 'Small steps that have helped before.',
    placeholder: 'e.g. slow breathing, a walk, a shower, music, the grounding exercise',
  },
  {
    key: 'placesPeople',
    title: '3. People and places that help me feel better',
    prompt: 'Somewhere or someone that is a good distraction, even without talking about the problem.',
    placeholder: 'e.g. a friend I can sit with, the library, a park',
  },
  {
    key: 'peopleToAsk',
    title: '4. People I can ask for help',
    prompt: 'People I trust. Add their phone numbers.',
    placeholder: 'Name and phone number',
  },
];

const FIELDS_AFTER: Field[] = [
  {
    key: 'saferSpace',
    title: '6. Making my space safer',
    prompt: 'Steps that make it harder to act on dark thoughts, such as asking someone I trust to hold onto things that could be used to hurt me.',
    placeholder: 'What I can do, and who can help',
  },
  {
    key: 'reason',
    title: '7. One reason that matters to me',
    prompt: 'A person, a pet, a goal, anything that matters to me.',
    placeholder: 'Write it in your own words',
  },
];

export function SafetyPlanScreen({ onBack }: { onBack: () => void }) {
  const { lang } = useLang();
  const es = lang === 'es';
  const [plan, setPlan] = useState<SafetyPlan>(EMPTY_PLAN);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getSafetyPlan().then((p) => {
      setPlan(p);
      setLoaded(true);
    });
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const update = useCallback((key: keyof SafetyPlan, value: string) => {
    setPlan((prev) => {
      const next = { ...prev, [key]: value };
      setSaved(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        saveSafetyPlan(next).then(() => setSaved(true));
      }, 500);
      return next;
    });
  }, []);

  const confirmClear = () => {
    Alert.alert(
      es ? '¿Borrar su plan de seguridad?' : 'Clear your safety plan?',
      es ? 'Esto lo elimina de este dispositivo. No se puede deshacer.' : 'This removes it from this device. It cannot be undone.',
      [
      { text: es ? 'Cancelar' : 'Cancel', style: 'cancel' },
      {
        text: es ? 'Borrar plan' : 'Clear plan',
        style: 'destructive',
        onPress: async () => {
          await clearSafetyPlan();
          setPlan(EMPTY_PLAN);
          setSaved(false);
        },
      },
    ]);
  };

  const lines = RESOURCES.filter((r) => r.id === '988' || r.id === 'crisis_text');
  const loc = (f: Field): Field => (es && FIELD_ES[f.key] ? { ...f, ...FIELD_ES[f.key] } : f);

  const renderField = (f: Field) => (
    <View key={f.key} style={styles.card}>
      <Text style={styles.cardTitle}>{f.title}</Text>
      <Text style={styles.prompt}>{f.prompt}</Text>
      <TextInput
        style={styles.input}
        value={plan[f.key]}
        onChangeText={(t) => update(f.key, t)}
        placeholder={f.placeholder}
        placeholderTextColor="#6B7280"
        multiline
        textAlignVertical="top"
      />
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'\u2190'} {es ? 'Atrás' : 'Back'}</Text>
      </Pressable>
      <Text style={styles.title}>{es ? 'Mi plan de seguridad' : 'My Safety Plan'}</Text>
      <Text style={styles.subtitle}>
        {es
          ? 'Un plan de seguridad es una lista corta y escrita de pasos que se usan cuando los pensamientos se vuelven oscuros. Los profesionales de la salud suelen usar este formato. Complételo mientras se siente bien, para que esté listo cuando lo necesite.'
          : 'A safety plan is a short written list of steps to use when thoughts get dark. Clinicians commonly use this format. Fill it in while you are feeling okay, so it is ready when you need it.'}
      </Text>

      <ScrollView contentContainerStyle={styles.list} keyboardShouldPersistTaps="handled">
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            {es
              ? 'Esto se guarda solo en este dispositivo, y cualquiera que abra esta app puede verlo. No escriba nada que no quisiera que otros lean. Si está en peligro ahora mismo, llame o envíe un texto al 988, o llame al 911.'
              : 'This is saved only on this device, and anyone who opens this app can see it. Do not write anything you would not want others to read. If you are in danger right now, call or text 988, or call 911.'}
          </Text>
        </View>

        {!loaded ? <Text style={styles.prompt}>{es ? 'Cargando...' : 'Loading...'}</Text> : null}

        {FIELDS_BEFORE.map(loc).map(renderField)}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{es ? '5. Profesionales y líneas de crisis' : '5. Professionals and crisis lines'}</Text>
          {lines.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
          <Text style={styles.prompt}>{es ? 'Mi médico, terapeuta o clínica:' : 'My doctor, therapist, or clinic:'}</Text>
          <TextInput
            style={styles.input}
            value={plan.professionals}
            onChangeText={(t) => update('professionals', t)}
            placeholder={es ? 'Nombre y número de teléfono' : 'Name and phone number'}
            placeholderTextColor="#6B7280"
            multiline
            textAlignVertical="top"
          />
        </View>

        {FIELDS_AFTER.map(loc).map(renderField)}

        <Text style={styles.status}>{saved ? (es ? 'Guardado en este dispositivo' : 'Saved on this device') : ' '}</Text>

        <Pressable style={styles.clearButton} onPress={confirmClear}>
          <Text style={styles.clearButtonText}>{es ? 'Borrar mi plan de seguridad' : 'Clear my safety plan'}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingTop: 56, paddingHorizontal: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: '#5B8DEF', fontSize: 15, fontWeight: '600' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#8A8F98', fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 12 },
  list: { paddingBottom: 48 },
  warning: { backgroundColor: '#2A2314', borderColor: '#F5A623', borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 14 },
  warningText: { color: '#F5C26B', fontSize: 12, lineHeight: 18 },
  card: { backgroundColor: '#161B22', borderRadius: 14, padding: 14, marginBottom: 12 },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: '800', marginBottom: 4 },
  prompt: { color: '#8A8F98', fontSize: 12, lineHeight: 17, marginBottom: 8 },
  input: {
    backgroundColor: '#0D1117',
    borderRadius: 10,
    color: '#fff',
    fontSize: 15,
    minHeight: 72,
    padding: 10,
  },
  status: { color: '#30A46C', fontSize: 12, textAlign: 'center', marginVertical: 6 },
  clearButton: { backgroundColor: '#161B22', borderRadius: 30, paddingVertical: 14, alignItems: 'center' },
  clearButtonText: { color: '#FF8A8E', fontWeight: '700', fontSize: 14 },
});
