"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CalendarDay: () => CalendarDay,
  WhaleCalendar: () => WhaleCalendar,
  formatDateKey: () => formatDateKey,
  generateCalendarGrid: () => generateCalendarGrid,
  getDayOfWeek: () => getDayOfWeek,
  isToday: () => isToday,
  parseDateKey: () => parseDateKey
});
module.exports = __toCommonJS(index_exports);

// src/CalendarDay.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function CalendarDay({
  date,
  day,
  isCurrentMonth,
  isSunday,
  isSaturday,
  isToday: isToday2 = false,
  schedules,
  holiday,
  highlight = false,
  onDayClick,
  onDayHover,
  onScheduleClick
}) {
  const hasSchedule = schedules && schedules.length > 0;
  const getDayNumberClass = () => {
    const classes = ["whale-calendar__day-number"];
    if (isToday2) {
      classes.push("whale-calendar__day-number--today");
    } else if (hasSchedule) {
      classes.push("whale-calendar__day-number--has-schedule");
    }
    if (!isCurrentMonth) {
      if (isSunday) {
        classes.push("whale-calendar__day-number--other-month-sunday");
      } else if (isSaturday) {
        classes.push("whale-calendar__day-number--other-month-saturday");
      } else {
        classes.push("whale-calendar__day-number--other-month");
      }
    } else if (isSunday || holiday) {
      classes.push("whale-calendar__day-number--sunday");
    } else if (isSaturday) {
      classes.push("whale-calendar__day-number--saturday");
    }
    return classes.join(" ");
  };
  const dayClass = [
    "whale-calendar__day",
    highlight ? "whale-calendar__day--highlight" : ""
  ].filter(Boolean).join(" ");
  const handleDayClick = () => {
    onDayClick?.(date);
  };
  const handleDayMouseEnter = () => {
    onDayHover?.(date);
  };
  const handleDayMouseLeave = () => {
    onDayHover?.(null);
  };
  const handleScheduleClick = (schedule, e) => {
    e.stopPropagation();
    onScheduleClick?.(date, schedule);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: dayClass,
      onClick: handleDayClick,
      onMouseEnter: handleDayMouseEnter,
      onMouseLeave: handleDayMouseLeave,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "whale-calendar__day-header", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: `whale-calendar__day-number-wrapper ${isToday2 ? "whale-calendar__day-number-wrapper--today" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: getDayNumberClass(), children: day })
          }
        ) }),
        schedules?.map((schedule) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "whale-calendar__schedule-badge",
            style: schedule.color ? { backgroundColor: schedule.color } : void 0,
            onClick: (e) => handleScheduleClick(schedule, e),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "whale-calendar__schedule-badge-text", children: schedule.label })
          },
          schedule.id
        )),
        holiday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "whale-calendar__holiday", children: holiday })
      ]
    }
  );
}

// src/utils.ts
function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function parseDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}
function isToday(date) {
  const today = /* @__PURE__ */ new Date();
  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
}
function getDayOfWeek(date) {
  return date.getDay();
}
function generateCalendarGrid(year, month) {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const lastDayOfMonth = new Date(year, month, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const weeksNeeded = Math.ceil((startDayOfWeek + daysInMonth) / 7);
  const startDate = new Date(year, month - 1, 1 - startDayOfWeek);
  const grid = [];
  for (let week = 0; week < weeksNeeded; week++) {
    const weekRow = [];
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + week * 7 + day);
      const dayOfWeek = currentDate.getDay();
      weekRow.push({
        date: currentDate,
        day: currentDate.getDate(),
        isCurrentMonth: currentDate.getMonth() === month - 1,
        isSunday: dayOfWeek === 0,
        isSaturday: dayOfWeek === 6
      });
    }
    grid.push(weekRow);
  }
  return grid;
}

// src/WhaleCalendar.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var WEEKDAYS_KO = ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"];
var WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var MONTH_NAMES_KO = [
  "1\uC6D4",
  "2\uC6D4",
  "3\uC6D4",
  "4\uC6D4",
  "5\uC6D4",
  "6\uC6D4",
  "7\uC6D4",
  "8\uC6D4",
  "9\uC6D4",
  "10\uC6D4",
  "11\uC6D4",
  "12\uC6D4"
];
var MONTH_NAMES_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function WhaleCalendar({
  year: initialYear,
  month: initialMonth,
  data = {},
  showToday = true,
  showAdjacentDays = true,
  onMonthChange,
  onDayClick,
  onDayHover,
  onScheduleClick,
  className,
  locale = "ko"
}) {
  const now = /* @__PURE__ */ new Date();
  const year = initialYear ?? now.getFullYear();
  const month = initialMonth ?? now.getMonth() + 1;
  const grid = generateCalendarGrid(year, month);
  const weekdays = locale === "ko" ? WEEKDAYS_KO : WEEKDAYS_EN;
  const monthNames = locale === "ko" ? MONTH_NAMES_KO : MONTH_NAMES_EN;
  const title = locale === "ko" ? `${month}\uC6D4 \uC2A4\uCF00\uC904` : `${monthNames[month - 1]} Schedule`;
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
  const calendarClass = ["whale-calendar", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: calendarClass, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "whale-calendar__nav", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          className: "whale-calendar__nav-button",
          "aria-label": "\uC774\uC804 \uB2EC",
          onClick: handlePrevMonth,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              d: "M18.5 12L14.5 16L18.5 20",
              stroke: "#777777",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "whale-calendar__title", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          className: "whale-calendar__nav-button",
          "aria-label": "\uB2E4\uC74C \uB2EC",
          onClick: handleNextMonth,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              d: "M14.5 20L18.5 16L14.5 12",
              stroke: "#777777",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "whale-calendar__grid", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "whale-calendar__week-header", children: weekdays.map((day, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "whale-calendar__weekday", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: `whale-calendar__weekday-text ${index === 0 ? "whale-calendar__weekday-text--sunday" : index === 6 ? "whale-calendar__weekday-text--saturday" : ""}`,
          children: day
        }
      ) }, day)) }),
      grid.map((week, weekIndex) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "whale-calendar__week-row", children: week.map((cell) => {
        const dateKey = formatDateKey(cell.date);
        const dayData = data[dateKey];
        if (!showAdjacentDays && !cell.isCurrentMonth) {
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "whale-calendar__day", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "whale-calendar__day-header" }) }, dateKey);
        }
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          CalendarDay,
          {
            date: cell.date,
            day: cell.day,
            isCurrentMonth: cell.isCurrentMonth,
            isSunday: cell.isSunday,
            isSaturday: cell.isSaturday,
            isToday: showToday && isToday(cell.date),
            schedules: dayData?.schedules,
            holiday: dayData?.holiday,
            highlight: dayData?.highlight,
            onDayClick,
            onDayHover,
            onScheduleClick
          },
          dateKey
        );
      }) }, weekIndex))
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalendarDay,
  WhaleCalendar,
  formatDateKey,
  generateCalendarGrid,
  getDayOfWeek,
  isToday,
  parseDateKey
});
//# sourceMappingURL=index.js.map