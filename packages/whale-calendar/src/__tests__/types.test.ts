import { describe, it, expect } from 'vitest';
import type { CalendarData, DayData, ScheduleItem, WhaleCalendarProps } from '../types';

describe('types', () => {
  it('should allow valid CalendarData structure', () => {
    const data: CalendarData = {
      '2024-12-05': {
        schedules: [{ id: '1', label: '10:00~18:00' }],
        holiday: undefined,
        highlight: true,
      },
    };
    expect(data['2024-12-05'].schedules).toHaveLength(1);
  });

  it('should allow DayData with optional fields', () => {
    const dayData: DayData = {};
    expect(dayData.schedules).toBeUndefined();
    expect(dayData.holiday).toBeUndefined();
    expect(dayData.highlight).toBeUndefined();
  });

  it('should allow ScheduleItem with optional color', () => {
    const item: ScheduleItem = { id: '1', label: '10:00~18:00' };
    expect(item.color).toBeUndefined();

    const itemWithColor: ScheduleItem = { id: '2', label: '19:00~22:00', color: '#90C96E' };
    expect(itemWithColor.color).toBe('#90C96E');
  });
});
