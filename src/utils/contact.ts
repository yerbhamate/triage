import { Alert, Linking, Platform } from 'react-native';

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
  Alert.alert('Call from a phone', `This device cannot place calls. Dial ${displayLabel} from a phone.`);
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
  Alert.alert('Text from a phone', `This device cannot send texts. ${displayLabel} from a phone.`);
}

export async function openLink(href: string): Promise<void> {
  try {
    await Linking.openURL(href);
  } catch {
    Alert.alert('Could not open link', 'This link needs an internet connection.');
  }
}
