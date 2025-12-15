import * as react_jsx_runtime from 'react/jsx-runtime';

/** 날짜별 데이터 맵 */
type CalendarData = {
    [dateKey: string]: DayData;
};
/** 개별 날짜 데이터 */
interface DayData {
    /** 스케줄 목록 */
    schedules?: ScheduleItem[];
    /** 공휴일/기념일 이름 */
    holiday?: string;
    /** 배경 하이라이트 여부 */
    highlight?: boolean;
}
/** 스케줄 아이템 */
interface ScheduleItem {
    /** 고유 ID */
    id: string;
    /** 표시 텍스트 (예: '10:00~18:00') */
    label: string;
    /** 뱃지 배경색 (기본값: primary color) */
    color?: string;
}
/** 캘린더 셀 (내부용) */
interface CalendarCell {
    date: Date;
    day: number;
    isCurrentMonth: boolean;
    isSunday: boolean;
    isSaturday: boolean;
}
/** WhaleCalendar 컴포넌트 Props */
interface WhaleCalendarProps {
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

declare function WhaleCalendar({ year: initialYear, month: initialMonth, data, showToday, showAdjacentDays, onMonthChange, onDayClick, onDayHover, onScheduleClick, className, locale, }: WhaleCalendarProps): react_jsx_runtime.JSX.Element;

interface CalendarDayProps {
    date: Date;
    day: number;
    isCurrentMonth: boolean;
    isSunday: boolean;
    isSaturday: boolean;
    isToday?: boolean;
    schedules?: ScheduleItem[];
    holiday?: string;
    highlight?: boolean;
    onDayClick?: (date: Date) => void;
    onDayHover?: (date: Date | null) => void;
    onScheduleClick?: (date: Date, schedule: ScheduleItem) => void;
}
declare function CalendarDay({ date, day, isCurrentMonth, isSunday, isSaturday, isToday, schedules, holiday, highlight, onDayClick, onDayHover, onScheduleClick, }: CalendarDayProps): react_jsx_runtime.JSX.Element;

/**
 * 날짜를 'YYYY-MM-DD' 형식으로 변환
 */
declare function formatDateKey(date: Date): string;
/**
 * 'YYYY-MM-DD' 문자열을 Date로 변환
 */
declare function parseDateKey(key: string): Date;
/**
 * 해당 날짜가 오늘인지 확인
 */
declare function isToday(date: Date): boolean;
/**
 * 요일 인덱스 반환 (0=일, 6=토)
 */
declare function getDayOfWeek(date: Date): number;
/**
 * 해당 월의 캘린더 그리드 생성 (현재 달 날짜가 포함된 주까지만)
 */
declare function generateCalendarGrid(year: number, month: number): CalendarCell[][];

export { type CalendarCell, type CalendarData, CalendarDay, type DayData, type ScheduleItem, WhaleCalendar, type WhaleCalendarProps, formatDateKey, generateCalendarGrid, getDayOfWeek, isToday, parseDateKey };
