import AsyncStorage from '@react-native-async-storage/async-storage';

const getKey = (dateStr: string) => `checkedItems_${dateStr}`;

export const getDateString = (offset = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0]; // e.g. "2026-06-01"
};

export const loadChecked = async (dateStr: string): Promise<Record<string, boolean>> => {
  try {
    const raw = await AsyncStorage.getItem(getKey(dateStr));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const saveChecked = async (dateStr: string, checked: Record<string, boolean>): Promise<void> => {
  try {
    await AsyncStorage.setItem(getKey(dateStr), JSON.stringify(checked));
  } catch (e) {
    console.error('Failed to save:', e);
  }
};