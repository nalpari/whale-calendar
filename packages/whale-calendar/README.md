# whale-calendar

A Korean-style monthly schedule calendar component for React.

## Installation

```bash
npm install whale-calendar
# or
pnpm add whale-calendar
```

## Usage

```tsx
import { WhaleCalendar } from 'whale-calendar';
import 'whale-calendar/styles.css';

function App() {
  return <WhaleCalendar />;
}
```

## With Schedule Data

```tsx
import { WhaleCalendar, CalendarData } from 'whale-calendar';
import 'whale-calendar/styles.css';

function App() {
  const data: CalendarData = {
    '2024-12-05': {
      schedules: [
        { id: '1', label: '10:00~18:00' },
        { id: '2', label: '19:00~22:00', color: '#90C96E' }
      ],
      highlight: true
    },
    '2024-12-25': {
      holiday: '크리스마스'
    }
  };

  return (
    <WhaleCalendar
      year={2024}
      month={12}
      data={data}
      onDayClick={(date) => console.log(date)}
      onMonthChange={(y, m) => console.log(y, m)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| year | number | current year | Year to display |
| month | number | current month | Month to display (1-12) |
| data | CalendarData | {} | Schedule data by date |
| showToday | boolean | true | Highlight today |
| showAdjacentDays | boolean | true | Show adjacent month days |
| onMonthChange | (year, month) => void | - | Month change callback |
| onDayClick | (date) => void | - | Day click callback |
| onDayHover | (date \| null) => void | - | Day hover callback |
| onScheduleClick | (date, schedule) => void | - | Schedule click callback |
| className | string | - | Custom class name |
| locale | 'ko' \| 'en' | 'ko' | Locale |

## Theming

Customize with CSS variables:

```css
:root {
  --whale-calendar-primary: #6F70FA;
  --whale-calendar-sunday: #C93B48;
  --whale-calendar-saturday: #5A9AEA;
  --whale-calendar-text: #1A1A1A;
  --whale-calendar-border: #EDEDED;
  --whale-calendar-bg: #FFFFFF;
}
```

## License

MIT
