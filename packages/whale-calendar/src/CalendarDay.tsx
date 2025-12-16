import type { ScheduleItem } from './types';

interface CalendarDayProps {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isSunday: boolean;
  isSaturday: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  schedules?: ScheduleItem[];
  holiday?: string;
  highlight?: boolean;
  onDayClick?: (date: Date) => void;
  onDayHover?: (date: Date | null) => void;
  onScheduleClick?: (date: Date, schedule: ScheduleItem) => void;
}

export function CalendarDay({
  date,
  day,
  isCurrentMonth,
  isSunday,
  isSaturday,
  isToday = false,
  isSelected = false,
  schedules,
  holiday,
  highlight = false,
  onDayClick,
  onDayHover,
  onScheduleClick,
}: CalendarDayProps) {
  const hasSchedule = schedules && schedules.length > 0;

  const getDayNumberClass = () => {
    const classes = ['whale-calendar__day-number'];

    // 선택 상태가 최우선
    if (isSelected) {
      classes.push('whale-calendar__day-number--selected');
    } else if (isToday) {
      classes.push('whale-calendar__day-number--today');
    } else if (hasSchedule) {
      classes.push('whale-calendar__day-number--has-schedule');
    }

    if (!isCurrentMonth) {
      classes.push('whale-calendar__day-number--other-month');
      if (isSunday) {
        classes.push('whale-calendar__day-number--other-month-sunday');
      } else if (isSaturday) {
        classes.push('whale-calendar__day-number--other-month-saturday');
      }
    } else if (isSunday || holiday) {
      classes.push('whale-calendar__day-number--sunday');
    } else if (isSaturday) {
      classes.push('whale-calendar__day-number--saturday');
    }

    return classes.join(' ');
  };

  const dayClass = [
    'whale-calendar__day',
    highlight ? 'whale-calendar__day--highlight' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleDayClick = () => {
    onDayClick?.(date);
  };

  const handleDayMouseEnter = () => {
    onDayHover?.(date);
  };

  const handleDayMouseLeave = () => {
    onDayHover?.(null);
  };

  const handleScheduleClick = (schedule: ScheduleItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onScheduleClick?.(date, schedule);
  };

  return (
    <div
      className={dayClass}
      onClick={handleDayClick}
      onMouseEnter={handleDayMouseEnter}
      onMouseLeave={handleDayMouseLeave}
    >
      <div className="whale-calendar__day-header">
        <div
          className={`whale-calendar__day-number-wrapper ${
            isToday ? 'whale-calendar__day-number-wrapper--today' : ''
          }`}
        >
          <div className={getDayNumberClass()}>{day}</div>
        </div>
      </div>
      {schedules?.map((schedule) => (
        <div
          key={schedule.id}
          className="whale-calendar__schedule-badge"
          style={schedule.color ? { backgroundColor: schedule.color } : undefined}
          onClick={(e) => handleScheduleClick(schedule, e)}
        >
          <div className="whale-calendar__schedule-badge-text">{schedule.label}</div>
        </div>
      ))}
      {holiday && <div className="whale-calendar__holiday">{holiday}</div>}
    </div>
  );
}
