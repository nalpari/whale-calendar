import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  formatDateKey,
  parseDateKey,
  isToday,
  getDayOfWeek,
  generateCalendarGrid,
} from '../utils';

describe('formatDateKey', () => {
  it('should format date as YYYY-MM-DD', () => {
    const date = new Date(2024, 11, 5); // Dec 5, 2024
    expect(formatDateKey(date)).toBe('2024-12-05');
  });

  it('should pad single digit month and day', () => {
    const date = new Date(2024, 0, 1); // Jan 1, 2024
    expect(formatDateKey(date)).toBe('2024-01-01');
  });
});

describe('parseDateKey', () => {
  it('should parse YYYY-MM-DD string to Date', () => {
    const date = parseDateKey('2024-12-05');
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(11); // 0-indexed
    expect(date.getDate()).toBe(5);
  });
});

describe('isToday', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 11, 15)); // Dec 15, 2024
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return true for today', () => {
    const today = new Date(2024, 11, 15);
    expect(isToday(today)).toBe(true);
  });

  it('should return false for other days', () => {
    const otherDay = new Date(2024, 11, 16);
    expect(isToday(otherDay)).toBe(false);
  });
});

describe('getDayOfWeek', () => {
  it('should return 0 for Sunday', () => {
    const sunday = new Date(2024, 11, 15); // Dec 15, 2024 is Sunday
    expect(getDayOfWeek(sunday)).toBe(0);
  });

  it('should return 6 for Saturday', () => {
    const saturday = new Date(2024, 11, 14); // Dec 14, 2024 is Saturday
    expect(getDayOfWeek(saturday)).toBe(6);
  });
});

describe('generateCalendarGrid', () => {
  it('should generate 6 weeks (42 days)', () => {
    const grid = generateCalendarGrid(2024, 12);
    expect(grid).toHaveLength(6);
    expect(grid.flat()).toHaveLength(42);
  });

  it('should start with Sunday', () => {
    const grid = generateCalendarGrid(2024, 12);
    expect(grid[0][0].isSunday).toBe(true);
  });

  it('should mark current month days correctly', () => {
    const grid = generateCalendarGrid(2024, 12);
    const flatGrid = grid.flat();
    const currentMonthDays = flatGrid.filter((cell) => cell.isCurrentMonth);
    expect(currentMonthDays).toHaveLength(31); // December has 31 days
  });

  it('should handle February leap year', () => {
    const grid = generateCalendarGrid(2024, 2);
    const flatGrid = grid.flat();
    const currentMonthDays = flatGrid.filter((cell) => cell.isCurrentMonth);
    expect(currentMonthDays).toHaveLength(29); // 2024 is leap year
  });

  it('should handle February non-leap year', () => {
    const grid = generateCalendarGrid(2023, 2);
    const flatGrid = grid.flat();
    const currentMonthDays = flatGrid.filter((cell) => cell.isCurrentMonth);
    expect(currentMonthDays).toHaveLength(28);
  });
});
