import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarDay } from '../CalendarDay';

describe('CalendarDay', () => {
  const baseProps = {
    date: new Date(2024, 11, 5),
    day: 5,
    isCurrentMonth: true,
    isSunday: false,
    isSaturday: false,
    isToday: false,
  };

  it('should render day number', () => {
    render(<CalendarDay {...baseProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should apply today class when isToday is true', () => {
    render(<CalendarDay {...baseProps} isToday />);
    const wrapper = screen.getByText('5').closest('.whale-calendar__day-number-wrapper');
    expect(wrapper).toHaveClass('whale-calendar__day-number-wrapper--today');
  });

  it('should render schedule badge when schedule is provided', () => {
    const schedule = { id: '1', label: '10:00~18:00' };
    render(<CalendarDay {...baseProps} schedules={[schedule]} />);
    // 구분자로 분리되어 두 줄로 표시됨
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('18:00')).toBeInTheDocument();
  });

  it('should render holiday text', () => {
    render(<CalendarDay {...baseProps} holiday="크리스마스" />);
    expect(screen.getByText('크리스마스')).toBeInTheDocument();
  });

  it('should call onDayClick when clicked', () => {
    const onDayClick = vi.fn();
    render(<CalendarDay {...baseProps} onDayClick={onDayClick} />);
    fireEvent.click(screen.getByText('5').closest('.whale-calendar__day')!);
    expect(onDayClick).toHaveBeenCalledWith(baseProps.date);
  });

  it('should call onScheduleClick when schedule badge is clicked', () => {
    const onScheduleClick = vi.fn();
    const schedule = { id: '1', label: '10:00~18:00' };
    render(
      <CalendarDay {...baseProps} schedules={[schedule]} onScheduleClick={onScheduleClick} />
    );
    // 분리된 텍스트 요소를 통해 뱃지 클릭
    const badge = screen.getByText('10:00').closest('.whale-calendar__schedule-badge');
    fireEvent.click(badge!);
    expect(onScheduleClick).toHaveBeenCalledWith(baseProps.date, schedule);
  });

  it('should apply highlight class when highlight is true', () => {
    render(<CalendarDay {...baseProps} highlight />);
    const dayCell = screen.getByText('5').closest('.whale-calendar__day');
    expect(dayCell).toHaveClass('whale-calendar__day--highlight');
  });
});
