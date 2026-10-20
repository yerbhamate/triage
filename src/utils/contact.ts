import { Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function isSpanish(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem('@triage/lang')) === 'es';
  } catch {
    return false;
  }
}

/**
 * Open the phone dialer. If this device cannot place calls (an iPad, an emulator), show the number
 * clearly instead of failing silently, so the person can dial it from another phone.
 */
export async function callNumber(number: string, displayLabel: string): Promise<void> {
  const url = `tel:${number}`;
  try {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
      return;
    }
  } catch {
    // fall through to the alert
  }
  const es = await isSpanish();
  Alert.alert(
    es ? 'Llame desde un teléfono' : 'Call from a phone',
    es
      ? `Este dispositivo no puede hacer llamadas. Marque ${displayLabel} desde un teléfono.`
      : `This device cannot place calls. Dial ${displayLabel} from a phone.`,
  );
}

/** Open the messages app with the number and starting text filled in. */
export async function textNumber(to: string, body: string, displayLabel: string): Promise<void> {
  const separator = Platform.OS === 'ios' ? '&' : '?';
  const url = body ? `sms:${to}${separator}body=${encodeURIComponent(body)}` : `sms:${to}`;
  try {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
      return;
    }
  } catch {
    // fall through to the alert
  }
  const es = await isSpanish();
  Alert.alert(
    es ? 'Envíe el texto desde un teléfono' : 'Text from a phone',
    es
      ? `Este dispositivo no puede enviar textos. ${displayLabel} desde un teléfono.`
      : `This device cannot send texts. ${displayLabel} from a phone.`,
  );
}

export async function openLink(href: string): Promise<void> {
  try {
    await Linking.openURL(href);
  } catch {
    const es = await isSpanish();
    Alert.alert(
      es ? 'No se pudo abrir el enlace' : 'Could not open link',
      es ? 'Este enlace necesita conexión a internet.' : 'This link needs an internet connection.',
    );
  }
}
