export type Category = 'morning' | 'work' | 'health' | 'task' | 'evening';

export interface Routine {
  id: string;
  time: string;
  title: string;
  duration: string;
  category: Category;
  section: 'Morning' | 'Work' | 'Evening';
}

export const DEFAULT_ROUTINES: Routine[] = [
  { id: '1',  time: '6:00 AM',  title: 'Wake up & hydrate',     duration: '5 min',  category: 'morning', section: 'Morning' },
  { id: '2',  time: '6:05 AM',  title: 'Morning stretch',        duration: '15 min', category: 'health',  section: 'Morning' },
  { id: '3',  time: '6:30 AM',  title: 'Shower & get ready',     duration: '20 min', category: 'morning', section: 'Morning' },
  { id: '4',  time: '7:00 AM',  title: 'Breakfast',              duration: '20 min', category: 'health',  section: 'Morning' },
  { id: '5',  time: '7:30 AM',  title: 'Plan the day',           duration: '10 min', category: 'work',    section: 'Morning' },
  { id: '6',  time: '8:00 AM',  title: 'Deep work block',        duration: '2 hr',   category: 'work',    section: 'Work'    },
  { id: '7',  time: '10:00 AM', title: 'Check emails',           duration: '20 min', category: 'work',    section: 'Work'    },
  { id: '8',  time: '10:30 AM', title: 'Team standup',           duration: '30 min', category: 'work',    section: 'Work'    },
  { id: '9',  time: '12:00 PM', title: 'Lunch break',            duration: '45 min', category: 'health',  section: 'Work'    },
  { id: '10', time: '1:00 PM',  title: 'Afternoon focus',        duration: '2 hr',   category: 'work',    section: 'Work'    },
  { id: '11', time: '3:00 PM',  title: 'Review tasks',           duration: '30 min', category: 'task',    section: 'Work'    },
  { id: '12', time: '4:00 PM',  title: 'Workout / walk',         duration: '45 min', category: 'health',  section: 'Work'    },
  { id: '13', time: '5:00 PM',  title: 'Wrap up work',           duration: '30 min', category: 'work',    section: 'Evening' },
  { id: '14', time: '6:00 PM',  title: 'Cook & dinner',          duration: '45 min', category: 'health',  section: 'Evening' },
  { id: '15', time: '7:30 PM',  title: 'Reading',                duration: '30 min', category: 'evening', section: 'Evening' },
  { id: '16', time: '8:30 PM',  title: 'Wind down',              duration: '30 min', category: 'evening', section: 'Evening' },
  { id: '17', time: '9:30 PM',  title: 'Lights out',             duration: '—',      category: 'evening', section: 'Evening' },
];