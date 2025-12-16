import { CalendarDay } from './CalendarDay';
import { generateCalendarGrid, formatDateKey, isToday as checkIsToday, isSameDay } from './utils';
import type { WhaleCalendarProps } from './types';

const WEEKDAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES_KO = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
];
const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function WhaleCalendar({
  year: initialYear,
  month: initialMonth,
  data = {},
  selectedDate,
  showToday = true,
  showAdjacentDays = true,
  onMonthChange,
  onDayClick,
  onDayHover,
  onScheduleClick,
  className,
  locale = 'ko',
}: WhaleCalendarProps) {
  const now = new Date();
  const year = initialYear ?? now.getFullYear();
  const month = initialMonth ?? now.getMonth() + 1;

  const grid = generateCalendarGrid(year, month);
  const weekdays = locale === 'ko' ? WEEKDAYS_KO : WEEKDAYS_EN;
  const monthNames = locale === 'ko' ? MONTH_NAMES_KO : MONTH_NAMES_EN;

  const title =
    locale === 'ko'
      ? `${month}월 스케줄`
      : `${monthNames[month - 1]} Schedule`;

  const handlePrevMonth = () => {
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    onMonthChange?.(prevYear, prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    onMonthChange?.(nextYear, nextMonth);
  };

  const calendarClass = ['whale-calendar', className].filter(Boolean).join(' ');

  return (
    <div className={calendarClass}>
      <div className="whale-calendar__nav">
        <button
          className="whale-calendar__nav-button"
          aria-label="이전 달"
          onClick={handlePrevMonth}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M18.5 12L14.5 16L18.5 20"
              stroke="#777777"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="whale-calendar__title">{title}</div>
        <button
          className="whale-calendar__nav-button"
          aria-label="다음 달"
          onClick={handleNextMonth}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M14.5 20L18.5 16L14.5 12"
              stroke="#777777"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="whale-calendar__grid">
        <div className="whale-calendar__week-header">
          {weekdays.map((day, index) => (
            <div key={day} className="whale-calendar__weekday">
              <div
                className={`whale-calendar__weekday-text ${
                  index === 0
                    ? 'whale-calendar__weekday-text--sunday'
                    : index === 6
                      ? 'whale-calendar__weekday-text--saturday'
                      : ''
                }`}
              >
                {day}
              </div>
            </div>
          ))}
        </div>

        {grid.map((week, weekIndex) => (
          <div key={weekIndex} className="whale-calendar__week-row">
            {week.map((cell) => {
              const dateKey = formatDateKey(cell.date);
              const dayData = data[dateKey];

              if (!showAdjacentDays && !cell.isCurrentMonth) {
                return (
                  <div key={dateKey} className="whale-calendar__day">
                    <div className="whale-calendar__day-header" />
                  </div>
                );
              }

              return (
                <CalendarDay
                  key={dateKey}
                  date={cell.date}
                  day={cell.day}
                  isCurrentMonth={cell.isCurrentMonth}
                  isSunday={cell.isSunday}
                  isSaturday={cell.isSaturday}
                  isToday={showToday && checkIsToday(cell.date)}
                  isSelected={selectedDate ? isSameDay(cell.date, selectedDate) : false}
                  schedules={dayData?.schedules}
                  holiday={dayData?.holiday}
                  highlight={dayData?.highlight}
                  onDayClick={onDayClick}
                  onDayHover={onDayHover}
                  onScheduleClick={onScheduleClick}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
