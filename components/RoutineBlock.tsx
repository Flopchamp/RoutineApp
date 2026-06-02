import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Routine } from '../constants/routines';

const ACCENT: Record<string, string> = {
  morning: '#7F77DD',
  work:    '#378ADD',
  health:  '#639922',
  task:    '#888780',
  evening: '#EF9F27',
};

const TAG_BG: Record<string, string> = {
  morning: '#EEEDFE',
  work:    '#E6F1FB',
  health:  '#EAF3DE',
  task:    '#F1EFE8',
  evening: '#FAEEDA',
};

const TAG_TEXT: Record<string, string> = {
  morning: '#3C3489',
  work:    '#0C447C',
  health:  '#27500A',
  task:    '#444441',
  evening: '#633806',
};

const TAG_LABEL: Record<string, string> = {
  morning: 'Morning',
  work:    'Work',
  health:  'Health',
  task:    'Tasks',
  evening: 'Evening',
};

interface Props {
  routine: Routine;
  checked: boolean;
  onToggle: () => void;
}

export default function RoutineBlock({ routine, checked, onToggle }: Props) {
  return (
    <TouchableOpacity
      style={[styles.block, checked && styles.blockDone]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.timeCol}>
        <Text style={styles.timeText}>{routine.time.split(' ')[0]}</Text>
        <Text style={styles.amPm}>{routine.time.split(' ')[1]}</Text>
      </View>

      <View style={[styles.accent, { backgroundColor: ACCENT[routine.category] }]} />

      <View style={styles.body}>
        <Text style={[styles.title, checked && styles.titleDone]}>{routine.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.duration}>{routine.duration}</Text>
          <View style={[styles.tag, { backgroundColor: TAG_BG[routine.category] }]}>
            <Text style={[styles.tagText, { color: TAG_TEXT[routine.category] }]}>
              {TAG_LABEL[routine.category]}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.check, checked && styles.checkDone]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E0DED8',
    marginBottom: 6,
    overflow: 'hidden',
  },
  blockDone: { opacity: 0.55 },
  timeCol: {
    width: 56,
    paddingVertical: 12,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#E0DED8',
  },
  timeText: { fontSize: 12, color: '#888780', fontWeight: '500' },
  amPm:     { fontSize: 10, color: '#B4B2A9' },
  accent:   { width: 4, alignSelf: 'stretch' },
  body:     { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
  title:    { fontSize: 14, fontWeight: '500', color: '#1a1a1a', marginBottom: 3 },
  titleDone:{ textDecorationLine: 'line-through', color: '#888780' },
  meta:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  duration: { fontSize: 12, color: '#B4B2A9' },
  tag:      { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  tagText:  { fontSize: 11, fontWeight: '500' },
  check: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#D3D1C7',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  checkDone:  { backgroundColor: '#1D9E75', borderColor: '#1D9E75' },
  checkmark:  { color: '#fff', fontSize: 13, fontWeight: '600' },
});