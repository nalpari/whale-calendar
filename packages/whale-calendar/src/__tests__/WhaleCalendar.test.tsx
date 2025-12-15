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
    expect(screen.getByText('10:00~18:00')).toBeInTheDocument();
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
});
