import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WhaleCalendar } from '../WhaleCalendar';
import type { CalendarData } from '../types';

describe('WhaleCalendar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 11, 15)); // Dec 15, 2024
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render current month by default', () => {
    render(<WhaleCalendar />);
    expect(screen.getByText('12월 스케줄')).toBeInTheDocument();
  });

  it('should render specified year and month', () => {
    render(<WhaleCalendar year={2024} month={1} />);
    expect(screen.getByText('1월 스케줄')).toBeInTheDocument();
  });

  it('should render English locale', () => {
    render(<WhaleCalendar year={2024} month={12} locale="en" />);
    expect(screen.getByText('December Schedule')).toBeInTheDocument();
  });

  it('should call onMonthChange when prev button clicked', () => {
    const onMonthChange = vi.fn();
    render(<WhaleCalendar year={2024} month={12} onMonthChange={onMonthChange} />);
    fireEvent.click(screen.getByLabelText('이전 달'));
    expect(onMonthChange).toHaveBeenCalledWith(2024, 11);
  });

  it('should call onMonthChange when next button clicked', () => {
    const onMonthChange = vi.fn();
    render(<WhaleCalendar year={2024} month={12} onMonthChange={onMonthChange} />);
    fireEvent.click(screen.getByLabelText('다음 달'));
    expect(onMonthChange).toHaveBeenCalledWith(2025, 1);
  });

  it('should render schedule data', () => {
    const data: CalendarData = {
      '2024-12-05': {
        schedules: [{ id: '1', label: '10:00~18:00' }],
      },
    };
    render(<WhaleCalendar year={2024} month={12} data={data} />);
    // 구분자로 분리되어 두 줄로 표시됨
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('18:00')).toBeInTheDocument();
  });

  it('should render holiday', () => {
    const data: CalendarData = {
      '2024-12-25': {
        holiday: '크리스마스',
      },
    };
    render(<WhaleCalendar year={2024} month={12} data={data} />);
    expect(screen.getByText('크리스마스')).toBeInTheDocument();
  });

  it('should highlight today when showToday is true', () => {
    render(<WhaleCalendar year={2024} month={12} showToday />);
    const todayWrapper = document.querySelector('.whale-calendar__day-number-wrapper--today');
    expect(todayWrapper).toBeInTheDocument();
  });

  it('should not highlight today when showToday is false', () => {
    render(<WhaleCalendar year={2024} month={12} showToday={false} />);
    const todayWrapper = document.querySelector('.whale-calendar__day-number-wrapper--today');
    expect(todayWrapper).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<WhaleCalendar className="my-calendar" />);
    const calendar = document.querySelector('.whale-calendar');
    expect(calendar).toHaveClass('my-calendar');
  });

  it('should show selected date style when selectedDate is provided', () => {
    const selectedDate = new Date(2024, 11, 20); // Dec 20, 2024
    render(<WhaleCalendar year={2024} month={12} selectedDate={selectedDate} />);
    const selectedElement = document.querySelector('.whale-calendar__day-number--selected');
    expect(selectedElement).toBeInTheDocument();
    expect(selectedElement).toHaveTextContent('20');
  });

  it('should not show selected date style when selectedDate is not provided', () => {
    render(<WhaleCalendar year={2024} month={12} />);
    const selectedElement = document.querySelector('.whale-calendar__day-number--selected');
    expect(selectedElement).not.toBeInTheDocument();
  });

  it('should show selected date in adjacent month area', () => {
    // December 2024 starts on Sunday, so no previous month days visible in first row
    // But let's use a month where adjacent days are visible
    // November 2024 ends on Saturday, December 1 is Sunday
    // So December grid will show some November days if we look at different scenario
    // Let's test January 2025 which will show December days
    const selectedDate = new Date(2024, 11, 31); // Dec 31, 2024 (adjacent day in Jan 2025)
    render(<WhaleCalendar year={2025} month={1} selectedDate={selectedDate} />);
    const selectedElement = document.querySelector('.whale-calendar__day-number--selected');
    expect(selectedElement).toBeInTheDocument();
    expect(selectedElement).toHaveTextContent('31');
  });

  it('should call onDayClick when date is clicked', () => {
    const onDayClick = vi.fn();
    render(<WhaleCalendar year={2024} month={12} onDayClick={onDayClick} />);
    // Find day 20 and click it
    const dayElements = document.querySelectorAll('.whale-calendar__day-number');
    const day20 = Array.from(dayElements).find(el => el.textContent === '20');
    if (day20?.parentElement?.parentElement) {
      fireEvent.click(day20.parentElement.parentElement);
    }
    expect(onDayClick).toHaveBeenCalled();
    const calledDate = onDayClick.mock.calls[0][0];
    expect(calledDate.getDate()).toBe(20);
    expect(calledDate.getMonth()).toBe(11); // December (0-indexed)
  });
});
