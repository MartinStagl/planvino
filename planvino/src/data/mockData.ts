import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy' | 'stormy';

export type Activity = {
  id: string;
  title: string;
  description?: string;
  module: string;
  vineyard?: string; // Optional vineyard name, if undefined then it's for all vineyards
  completed?: boolean;
};

export type DayData = {
  weather: WeatherType;
  activities: Activity[];
};

export type WeekData = {
  [key: string]: DayData;
};

// Helper function to get the week number from a date
export const getWeekNumber = (date: Date): string => {
  return format(date, 'w', { locale: de });
};

// Helper function to get all tasks for a specific week
export const getWeekTasks = (startDate: Date, weekData: WeekData): Activity[] => {
  const tasks: Activity[] = [];
  Object.values(weekData).forEach(day => {
    tasks.push(...day.activities);
  });
  return tasks;
};

export const mockWeekData: WeekData = {
  'MO': {
    weather: 'sunny',
    activities: [
      {
        id: '1',
        title: 'Rebschnitt durchführen',
        module: 'Weingarten',
        vineyard: 'North Block'
      },
      {
        id: '2',
        title: 'Bodenproben nehmen',
        module: 'Weingarten'
      },
      {
        id: '3',
        title: 'Weinprobe organisieren',
        module: 'Marketing'
      }
    ]
  },
  'DI': {
    weather: 'partly-cloudy',
    activities: [
      {
        id: '4',
        title: 'Düngung planen',
        module: 'Weingarten',
        vineyard: 'South Block'
      },
      {
        id: '5',
        title: 'Fässer überprüfen',
        module: 'Kellerwirtschaft'
      }
    ]
  },
  'MI': {
    weather: 'cloudy',
    activities: [
      {
        id: '6',
        title: 'Pflanzenschutz durchführen',
        module: 'Weingarten'
      },
      {
        id: '7',
        title: 'Weinabfüllung vorbereiten',
        module: 'Kellerwirtschaft'
      }
    ]
  },
  'DO': {
    weather: 'rainy',
    activities: [
      {
        id: '8',
        title: 'Rebschnitt fortsetzen',
        module: 'Weingarten',
        vineyard: 'North Block'
      },
      {
        id: '9',
        title: 'Social Media Posts erstellen',
        module: 'Marketing'
      }
    ]
  },
  'FR': {
    weather: 'sunny',
    activities: [
      {
        id: '10',
        title: 'Bodenbearbeitung',
        module: 'Weingarten'
      },
      {
        id: '11',
        title: 'Weinprobe durchführen',
        module: 'Kellerwirtschaft'
      }
    ]
  },
  'SA': {
    weather: 'partly-cloudy',
    activities: [
      {
        id: '12',
        title: 'Weinführung vorbereiten',
        module: 'Marketing'
      }
    ]
  },
  'SO': {
    weather: 'sunny',
    activities: []
  }
}; 