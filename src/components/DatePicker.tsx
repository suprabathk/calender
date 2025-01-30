import { daysOfWeek, months } from "@/constants/constants";
import { DatePickerProps, useDatePicker } from "./DatePicker.hooks";
import { cx } from "@/utils/utils";
import { FC } from "react";

const DatePicker: FC<DatePickerProps> = (props) => {
  const {
    view,
    setView,
    handleSelectYear,
    handleSelectMonth,
    handleSelectDay,
  } = useDatePicker(props);

  const { selectedDate } = props;

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1,
  ).getDay();

  const prevMonthDays = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    0,
  ).getDate();
  const totalSlots = firstDay + daysInMonth;
  const nextMonthDays = totalSlots > 35 ? 42 - totalSlots : 35 - totalSlots;

  return (
    <div className="min-w-80 h-fit p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="flex space-x-2">
          <select
            className="text-gray-700 border rounded-md px-2 py-[0.5]"
            value={selectedDate.getFullYear()}
            onChange={(e) => handleSelectYear(Number(e.target.value))}
          >
            {[...Array(12)].map((_, i) => {
              const year = selectedDate.getFullYear() - 6 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>

          {view !== "year" && (
            <select
              className="text-gray-700 border rounded-md px-1"
              value={selectedDate.getMonth()}
              onChange={(e) => handleSelectMonth(Number(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex">
          <button
            className={cx(`rounded-l-lg px-2`, {
              "border-blue-500 text-blue-700 border": view === "month",
              "border-gray-300 text-gray-700 border-y border-l":
                view !== "month",
            })}
            onClick={() => setView("month")}
          >
            Month
          </button>
          <button
            className={cx(`rounded-r-lg px-2 `, {
              "border-blue-500 text-blue-700 border": view === "year",
              "border-gray-300 text-gray-700 border-y border-r":
                view !== "year",
            })}
            onClick={() => setView("year")}
          >
            Year
          </button>
        </div>
      </div>

      {view === "year" && (
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => (
            <button
              key={index}
              className={`p-2 rounded-lg ${selectedDate.getMonth() === index ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
              onClick={() => handleSelectMonth(index)}
            >
              {month}
            </button>
          ))}
        </div>
      )}

      {view === "month" && (
        <div>
          <div className="grid grid-cols-7 gap-2 text-black font-semibold mb-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {[...Array(firstDay)].map((_, i) => (
              <div key={i} className="p-2 text-gray-400">
                {prevMonthDays - firstDay + i + 1}
              </div>
            ))}
            {[...Array(daysInMonth)].map((_, day) => (
              <button
                key={day}
                className={`p-2 rounded-lg ${selectedDate.getDate() === day + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                onClick={() => handleSelectDay(day + 1)}
              >
                {day + 1}
              </button>
            ))}
            {[...Array(nextMonthDays)].map((_, i) => (
              <div key={i} className="p-2 text-gray-400">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
