import type { CalendarCell } from './types';

/**
 * 날짜를 'YYYY-MM-DD' 형식으로 변환
 */
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 'YYYY-MM-DD' 문자열을 Date로 변환
 */
export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * 해당 날짜가 오늘인지 확인
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

/**
 * 두 날짜가 같은 날인지 비교
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * 요일 인덱스 반환 (0=일, 6=토)
 */
export function getDayOfWeek(date: Date): number {
  return date.getDay();
}

/**
 * 해당 월의 캘린더 그리드 생성 (현재 달 날짜가 포함된 주까지만)
 */
export function generateCalendarGrid(year: number, month: number): CalendarCell[][] {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();

  // 해당 월의 마지막 날
  const lastDayOfMonth = new Date(year, month, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  // 필요한 주 수 계산
  const weeksNeeded = Math.ceil((startDayOfWeek + daysInMonth) / 7);

  // 그리드 시작일 (이전 달 포함)
  const startDate = new Date(year, month - 1, 1 - startDayOfWeek);

  const grid: CalendarCell[][] = [];

  for (let week = 0; week < weeksNeeded; week++) {
    const weekRow: CalendarCell[] = [];
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + week * 7 + day);

      const dayOfWeek = currentDate.getDay();

      weekRow.push({
        date: currentDate,
        day: currentDate.getDate(),
        isCurrentMonth: currentDate.getMonth() === month - 1,
        isSunday: dayOfWeek === 0,
        isSaturday: dayOfWeek === 6,
      });
    }
    grid.push(weekRow);
  }

  return grid;
}
