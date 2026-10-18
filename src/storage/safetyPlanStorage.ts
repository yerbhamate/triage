import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@triage/safetyplan';

export interface SafetyPlan {
  warningSigns: string;
  copingSteps: string;
  placesPeople: string;
  peopleToAsk: string;
  professionals: string;
  saferSpace: string;
  reason: string;
}

export const EMPTY_PLAN: SafetyPlan = {
  warningSigns: '',
  copingSteps: '',
  placesPeople: '',
  peopleToAsk: '',
  professionals: '',
  saferSpace: '',
  reason: '',
};

export async function getSafetyPlan(): Promise<SafetyPlan> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...EMPTY_PLAN, ...JSON.parse(raw) } : EMPTY_PLAN;
  } catch {
    return EMPTY_PLAN;
  }
}

export async function saveSafetyPlan(plan: SafetyPlan): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(plan));
}

export async function clearSafetyPlan(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
