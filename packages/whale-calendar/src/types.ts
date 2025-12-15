/** 날짜별 데이터 맵 */
export type CalendarData = {
  [dateKey: string]: DayData;
};

/** 개별 날짜 데이터 */
export interface DayData {
  /** 스케줄 목록 */
  schedules?: ScheduleItem[];
  /** 공휴일/기념일 이름 */
  holiday?: string;
  /** 배경 하이라이트 여부 */
  highlight?: boolean;
}

/** 스케줄 아이템 */
export interface ScheduleItem {
  /** 고유 ID */
  id: string;
  /** 표시 텍스트 (예: '10:00~18:00') */
  label: string;
  /** 뱃지 배경색 (기본값: primary color) */
  color?: string;
}

/** 캘린더 셀 (내부용) */
export interface CalendarCell {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isSunday: boolean;
  isSaturday: boolean;
}

/** WhaleCalendar 컴포넌트 Props */
export interface WhaleCalendarProps {
  /** 표시할 연도 (기본값: 현재 연도) */
  year?: number;
  /** 표시할 월 1-12 (기본값: 현재 월) */
  month?: number;
  /** 날짜별 데이터 */
  data?: CalendarData;
  /** 오늘 날짜 하이라이트 여부 (기본값: true) */
  showToday?: boolean;
  /** 이전/다음 달 날짜 표시 여부 (기본값: true) */
  showAdjacentDays?: boolean;
  /** 월 변경 시 콜백 */
  onMonthChange?: (year: number, month: number) => void;
  /** 날짜 클릭 시 콜백 */
  onDayClick?: (date: Date) => void;
  /** 날짜 호버 시 콜백 */
  onDayHover?: (date: Date | null) => void;
  /** 스케줄 클릭 시 콜백 */
  onScheduleClick?: (date: Date, schedule: ScheduleItem) => void;
  /** 커스텀 클래스명 */
  className?: string;
  /** 로케일 (기본값: 'ko') */
  locale?: 'ko' | 'en';
}
