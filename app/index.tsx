import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SECTIONS = ['Morning', 'Work', 'Evening'] as const;

const SECTION_ICONS: Record<string, string> = {
  Morning: '☀️',
  Work: '💼',
  Evening: '🌙',
};

const DEFAULT_ROUTINES = [
  { id: '1', time: '6:00 AM', title: 'Wake up & hydrate', duration: '5 min', category: 'morning', section: 'Morning' },
  { id: '2', time: '6:05 AM', title: 'Morning stretch', duration: '15 min', category: 'health', section: 'Morning' },
  { id: '3', time: '6:30 AM', title: 'Shower & get ready', duration: '20 min', category: 'morning', section: 'Morning' },
  { id: '4', time: '7:00 AM', title: 'Breakfast', duration: '20 min', category: 'health', section: 'Morning' },
  { id: '5', time: '7:30 AM', title: 'Plan the day', duration: '10 min', category: 'work', section: 'Morning' },
  { id: '6', time: '8:00 AM', title: 'Deep work block', duration: '2 hr', category: 'work', section: 'Work' },
  { id: '7', time: '10:00 AM', title: 'Check emails', duration: '20 min', category: 'work', section: 'Work' },
  { id: '8', time: '10:30 AM', title: 'Team standup', duration: '30 min', category: 'work', section: 'Work' },
  { id: '9', time: '12:00 PM', title: 'Lunch break', duration: '45 min', category: 'health', section: 'Work' },
  { id: '10', time: '1:00 PM', title: 'Afternoon focus', duration: '2 hr', category: 'work', section: 'Work' },
  { id: '11', time: '3:00 PM', title: 'Review tasks', duration: '30 min', category: 'task', section: 'Work' },
  { id: '12', time: '4:00 PM', title: 'Workout / walk', duration: '45 min', category: 'health', section: 'Work' },
  { id: '13', time: '5:00 PM', title: 'Wrap up work', duration: '30 min', category: 'work', section: 'Evening' },
  { id: '14', time: '6:00 PM', title: 'Cook & dinner', duration: '45 min', category: 'health', section: 'Evening' },
  { id: '15', time: '7:30 PM', title: 'Reading', duration: '30 min', category: 'evening', section: 'Evening' },
  { id: '16', time: '8:30 PM', title: 'Wind down', duration: '30 min', category: 'evening', section: 'Evening' },
  { id: '17', time: '9:30 PM', title: 'Lights out', duration: '—', category: 'evening', section: 'Evening' },
];

const ACCENT: Record<string, string> = {
  morning: '#7F77DD', work: '#378ADD', health: '#639922', task: '#888780', evening: '#EF9F27',
};
const TAG_BG: Record<string, string> = {
  morning: '#EEEDFE', work: '#E6F1FB', health: '#EAF3DE', task: '#F1EFE8', evening: '#FAEEDA',
};
const TAG_TEXT: Record<string, string> = {
  morning: '#3C3489', work: '#0C447C', health: '#27500A', task: '#444441', evening: '#633806',
};
const TAG_LABEL: Record<string, string> = {
  morning: 'Morning', work: 'Work', health: 'Health', task: 'Tasks', evening: 'Evening',
};

export default function TodayScreen() {
  const [dayOffset, setDayOffset] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

   React.useEffect(() => {
    AsyncStorage.getItem(`checked_${dayOffset}`)
      .then(raw => { if (raw) setChecked(JSON.parse(raw)); else setChecked({}); })
      .catch(() => setChecked({}));
  }, [dayOffset]);

  React.useEffect(() => {
  Notifications.requestPermissionsAsync();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}, []);

  const dateLabel = () => {
    if (dayOffset === 0) return 'Today';
    if (dayOffset === -1) return 'Yesterday';
    if (dayOffset === 1) return 'Tomorrow';
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const fullDateLabel = () => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const toggle = async (id: string) => {
  const updated = { ...checked, [id]: !checked[id] };
  setChecked(updated);
  try {
    await AsyncStorage.setItem(`checked_${dayOffset}`, JSON.stringify(updated));
  } catch (e) {
    console.error('Save failed:', e);
  }
};

  const total = DEFAULT_ROUTINES.length;
  const doneCount = DEFAULT_ROUTINES.filter(r => checked[r.id]).length;
  const pct = Math.round((doneCount / total) * 100);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{dateLabel()}</Text>
          <Text style={styles.headerSub}>{fullDateLabel()}</Text>
        </View>
        <View style={styles.dayNav}>
          <TouchableOpacity style={styles.navBtn} onPress={() => setDayOffset(d => d - 1)}>
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => setDayOffset(d => d + 1)}>
            <Text style={styles.navArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>{doneCount}</Text>
          <Text style={styles.statLbl}>Done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>{total - doneCount}</Text>
          <Text style={styles.statLbl}>Remaining</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>{pct}%</Text>
          <Text style={styles.statLbl}>Complete</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct}%` as any }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {SECTIONS.map(section => {
          const items = DEFAULT_ROUTINES.filter(r => r.section === section);
          return (
            <View key={section}>
              <Text style={styles.sectionLabel}>
                {SECTION_ICONS[section]}  {section}
              </Text>
              {items.map(routine => (
                <TouchableOpacity
                  key={routine.id}
                  style={[styles.block, checked[routine.id] && styles.blockDone]}
                  onPress={() => toggle(routine.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.timeCol}>
                    <Text style={styles.timeText}>{routine.time.split(' ')[0]}</Text>
                    <Text style={styles.amPm}>{routine.time.split(' ')[1]}</Text>
                  </View>
                  <View style={[styles.accentBar, { backgroundColor: ACCENT[routine.category] }]} />
                  <View style={styles.body}>
                    <Text style={[styles.blockTitle, checked[routine.id] && styles.blockTitleDone]}>
                      {routine.title}
                    </Text>
                    <View style={styles.meta}>
                      <Text style={styles.dur}>{routine.duration}</Text>
                      <View style={[styles.tag, { backgroundColor: TAG_BG[routine.category] }]}>
                        <Text style={[styles.tagText, { color: TAG_TEXT[routine.category] }]}>
                          {TAG_LABEL[routine.category]}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.check, checked[routine.id] && styles.checkDone]}>
                    {checked[routine.id] && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F7F4' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle: { fontSize: 22, fontWeight: '600', color: '#1a1a1a' },
  headerSub: { fontSize: 13, color: '#888780', marginTop: 2 },
  dayNav: { flexDirection: 'row', gap: 8 },
  navBtn: { width: 32, height: 32, borderRadius: 8, borderWidth: 0.5, borderColor: '#D3D1C7', alignItems: 'center', justifyContent: 'center' },
  navArrow: { fontSize: 18, color: '#5F5E5A' },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 12 },
  statCard: { flex: 1, backgroundColor: '#EEECEA', borderRadius: 10, padding: 12, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '600', color: '#1a1a1a' },
  statLbl: { fontSize: 11, color: '#888780', marginTop: 2 },
  progressTrack: { height: 4, backgroundColor: '#E0DED8', marginHorizontal: 20, borderRadius: 2, marginBottom: 16, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: '#1D9E75', borderRadius: 2 },
  scroll: { paddingHorizontal: 20 },
  sectionLabel: { fontSize: 13, fontWeight: '500', color: '#888780', marginTop: 12, marginBottom: 8 },
  block: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, borderWidth: 0.5, borderColor: '#E0DED8', marginBottom: 6, overflow: 'hidden' },
  blockDone: { opacity: 0.55 },
  timeCol: { width: 56, paddingVertical: 12, alignItems: 'center', borderRightWidth: 0.5, borderRightColor: '#E0DED8' },
  timeText: { fontSize: 12, color: '#888780', fontWeight: '500' },
  amPm: { fontSize: 10, color: '#B4B2A9' },
  accentBar: { width: 4, alignSelf: 'stretch' },
  body: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
  blockTitle: { fontSize: 14, fontWeight: '500', color: '#1a1a1a', marginBottom: 3 },
  blockTitleDone: { textDecorationLine: 'line-through', color: '#888780' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dur: { fontSize: 12, color: '#B4B2A9' },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  tagText: { fontSize: 11, fontWeight: '500' },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, borderColor: '#D3D1C7', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  checkDone: { backgroundColor: '#1D9E75', borderColor: '#1D9E75' },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '600' },
});