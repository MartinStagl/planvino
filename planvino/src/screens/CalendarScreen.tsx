import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, IconButton, ProgressBar } from 'react-native-paper';
import { format, addDays, startOfWeek, subWeeks, addWeeks, startOfWeek as getStartOfWeek } from 'date-fns';
import { de } from 'date-fns/locale';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mockWeekData, WeatherType, Activity, getWeekTasks } from '../data/mockData';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  TaskDetails: {
    task: Activity;
    date: Date;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type WeekDay = {
  date: Date;
  dayName: string;
  dayNumber: string;
  shortName: string;
};

const weatherIcons: Record<WeatherType, keyof typeof MaterialCommunityIcons.glyphMap> = {
  'sunny': 'weather-sunny',
  'cloudy': 'weather-cloudy',
  'rainy': 'weather-rainy',
  'partly-cloudy': 'weather-partly-cloudy',
  'stormy': 'weather-lightning-rainy',
};

const WINDOW_WIDTH = Dimensions.get('window').width;
const DAY_ITEM_WIDTH = 100; // Width of each day item including margin
const VISIBLE_DAYS = Math.floor(WINDOW_WIDTH / DAY_ITEM_WIDTH);

export default function CalendarScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [weeks, setWeeks] = useState<Date[]>([subWeeks(new Date(), 1), new Date(), addWeeks(new Date(), 1)]);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Generate days for multiple weeks
  const getAllDays = () => {
    return weeks.flatMap((week) => getWeekDays(week));
  };

  const getWeekDays = (date: Date): WeekDay[] => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Start week on Monday
    return Array.from({ length: 7 }, (_, i) => {
      const day = addDays(start, i);
      return {
        date: day,
        dayName: format(day, 'EEEEEE', { locale: de }), // Short day name in German
        dayNumber: format(day, 'd'),
        shortName: format(day, 'EEEEEE', { locale: de }).toUpperCase(),
      };
    });
  };

  const loadMoreWeeks = (direction: 'before' | 'after') => {
    setWeeks(currentWeeks => {
      if (direction === 'before') {
        const firstWeek = currentWeeks[0];
        return [subWeeks(firstWeek, 1), ...currentWeeks];
      } else {
        const lastWeek = currentWeeks[currentWeeks.length - 1];
        return [...currentWeeks, addWeeks(lastWeek, 1)];
      }
    });
  };

  const handleScroll = (event: any) => {
    if (isScrolling) return;

    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollPosition = contentOffset.x;
    const scrollViewWidth = layoutMeasurement.width;
    const contentWidth = contentSize.width;

    // Load more weeks when scrolling near the edges
    if (scrollPosition < scrollViewWidth * 0.2) {
      loadMoreWeeks('before');
    } else if (scrollPosition > contentWidth - scrollViewWidth * 1.2) {
      loadMoreWeeks('after');
    }
  };

  const getActivitiesForModule = (activities: Activity[], module: string) => {
    return activities.filter(activity => activity.module === module);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getWeekProgress = () => {
    const weekStart = getStartOfWeek(selectedDay, { weekStartsOn: 1 });
    const allWeekTasks = getWeekTasks(weekStart, mockWeekData);
    const completedCount = allWeekTasks.filter(task => completedTasks[task.id]).length;
    const totalTasks = allWeekTasks.length;
    
    return {
      completed: completedCount,
      total: totalTasks,
      progress: totalTasks > 0 ? completedCount / totalTasks : 0
    };
  };

  const handleTaskDetails = (activity: Activity, date: Date) => {
    navigation.navigate('TaskDetails', { task: activity, date });
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDay(today);
    
    // Find the index of today in the allDays array
    const allDays = getAllDays();
    const todayIndex = allDays.findIndex(day => 
      format(day.date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
    );
    
    if (todayIndex !== -1) {
      // Calculate the scroll position to center today's date
      const scrollPosition = todayIndex * DAY_ITEM_WIDTH;
      
      // Scroll to the position with animation
      scrollViewRef.current?.scrollTo({
        x: scrollPosition,
        animated: true
      });
    } else {
      // If today is not in the current weeks, add it
      setWeeks([subWeeks(today, 1), today, addWeeks(today, 1)]);
    }
  };

  const allDays = getAllDays();
  const selectedWeekNumber = format(selectedDay, 'w');
  const selectedDateRange = `${format(startOfWeek(selectedDay, { weekStartsOn: 1 }), 'dd.MM.')}-${format(addDays(startOfWeek(selectedDay, { weekStartsOn: 1 }), 6), 'dd.MM.yyyy')}`;
  const weekProgress = getWeekProgress();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.weekHeader}>
        <View style={styles.weekHeaderRow}>
          <Text style={styles.weekTitle}>Woche {selectedWeekNumber}</Text>
          <TouchableOpacity 
            style={styles.todayButton}
            onPress={goToToday}
          >
            <Text style={styles.todayButtonText}>Heute</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.dateRange}>{selectedDateRange}</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollBegin={() => setIsScrolling(true)}
        onMomentumScrollEnd={() => setIsScrolling(false)}
        onScrollBeginDrag={() => setIsScrolling(true)}
        onScrollEndDrag={() => setIsScrolling(false)}
      >
        {allDays.map((day, index) => {
          const dayData = mockWeekData[day.shortName];
          const weatherIcon = dayData ? weatherIcons[dayData.weather] : 'weather-sunny';
          const isSelected = format(day.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd');
          
          return (
            <TouchableOpacity
              key={format(day.date, 'yyyy-MM-dd')}
              onPress={() => setSelectedDay(day.date)}
              style={[
                styles.dayColumn,
                isSelected && styles.selectedDay,
              ]}
            >
              <Text style={[
                styles.dayName,
                isSelected && styles.selectedDayText
              ]}>
                {day.dayName}
              </Text>
              <Text style={[
                styles.dayNumber,
                isSelected && styles.selectedDayText
              ]}>
                {day.dayNumber}
              </Text>
              <MaterialCommunityIcons
                name={weatherIcon}
                size={24}
                color={isSelected ? '#fff' : '#3E6947'}
                style={styles.weatherIcon}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.tasksContainer}>
        {['Weingarten', 'Kellerwirtschaft', 'Marketing'].map((module) => {
          const selectedDayShortName = format(selectedDay, 'EEEEEE', { locale: de }).toUpperCase();
          const selectedDayData = mockWeekData[selectedDayShortName];
          const activities = selectedDayData ? getActivitiesForModule(selectedDayData.activities, module) : [];

          return (
            <View key={module} style={styles.moduleSection}>
              <Text style={styles.moduleTitle}>{module}</Text>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <TouchableOpacity
                    key={activity.id}
                    onPress={() => toggleTaskCompletion(activity.id)}
                    style={[
                      styles.taskItem,
                      completedTasks[activity.id] && styles.taskItemCompleted
                    ]}
                  >
                    <View style={styles.taskContent}>
                      <View style={styles.taskTextContainer}>
                        <Text style={[
                          styles.taskText,
                          completedTasks[activity.id] && styles.taskTextCompleted
                        ]}>
                          {activity.title}
                        </Text>
                        <View style={styles.tagContainer}>
                          <Text style={styles.tagText}>
                            {activity.vineyard || 'ALLE'}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.taskActions}>
                        <TouchableOpacity
                          onPress={() => handleTaskDetails(activity, selectedDay)}
                          style={styles.detailsButton}
                        >
                          <MaterialCommunityIcons
                            name="information-outline"
                            size={24}
                            color="#3E6947"
                          />
                        </TouchableOpacity>
                        {completedTasks[activity.id] && (
                          <MaterialCommunityIcons
                            name="check-circle"
                            size={24}
                            color="#3E6947"
                            style={styles.checkIcon}
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.taskItem}>
                  <Text style={styles.noTasksText}>Keine Aufgaben für heute</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Wochenfortschritt</Text>
          <Text style={styles.progressText}>
            {weekProgress.completed} von {weekProgress.total} Aufgaben erledigt
          </Text>
        </View>
        <ProgressBar
          progress={weekProgress.progress}
          color="#3E6947"
          style={styles.progressBar}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF2EE',
  },
  weekHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  weekHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  weekTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E6947',
  },
  dateRange: {
    fontSize: 16,
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  dayColumn: {
    alignItems: 'center',
    width: DAY_ITEM_WIDTH - 24, // Subtract margin
    marginRight: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  selectedDay: {
    backgroundColor: '#3E6947',
  },
  dayName: {
    fontSize: 14,
    marginBottom: 4,
    textTransform: 'uppercase',
    color: '#3E6947',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E6947',
    marginBottom: 8,
  },
  selectedDayText: {
    color: '#fff',
  },
  weatherIcon: {
    marginTop: 4,
  },
  tasksContainer: {
    paddingHorizontal: 16,
  },
  moduleSection: {
    marginBottom: 24,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#3E6947',
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  noTasksText: {
    color: '#666',
    fontStyle: 'italic',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  taskTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskText: {
    flex: 1,
    color: '#000',
  },
  taskTextCompleted: {
    color: '#3E6947',
    textDecorationLine: 'line-through',
  },
  taskItemCompleted: {
    backgroundColor: '#EBF2EE',
    borderColor: '#3E6947',
    borderWidth: 1,
  },
  checkIcon: {
    marginLeft: 12,
  },
  tagContainer: {
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E6947',
  },
  progressText: {
    color: '#666',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EBF2EE',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailsButton: {
    padding: 4,
  },
  todayButton: {
    backgroundColor: '#3E6947',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  todayButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
}); 