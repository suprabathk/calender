import { View } from "@/types/types";
import { Dispatch, SetStateAction, useState } from "react";

export interface DatePickerHooks {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  selectedDate: Date;
  handleSelectYear: (year: number) => void;
  handleSelectMonth: (month: number) => void;
  handleSelectDay: (day: number) => void;
  getIsDateDisabled: (date: Date) => boolean;
  getAvailableYears: () => number[];
}

export interface DatePickerProps {
  selectedDate: Date;
  handleChangeDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const useDatePicker = ({
  selectedDate,
  handleChangeDate,
  minDate,
  maxDate,
}: DatePickerProps): DatePickerHooks => {
  const [view, setView] = useState<View>("month");

  const getIsDateDisabled: DatePickerHooks["getIsDateDisabled"] = (date) => {
    if (view === "year") {
      const startOfMonth = +new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = +new Date(date.getFullYear(), date.getMonth() + 1, 0);

      if (minDate && endOfMonth < +new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
        return true;
      }
      if (maxDate && startOfMonth > +new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) {
        return true;
      }

      return false;
    }

    const timestamp = +date;
    const minTimestamp = minDate ? +new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : -Infinity;
    const maxTimestamp = maxDate ? +new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()) : Infinity;

    return timestamp < minTimestamp || timestamp > maxTimestamp;
  };

  const findNearestValidDate = (year: number, month: number, day: number): Date => {
    const timestamp = +new Date(year, month, day);
    const minTimestamp = minDate ? +new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : -Infinity;
    const maxTimestamp = maxDate ? +new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()) : Infinity;

    if (timestamp < minTimestamp) return new Date(minDate!);
    if (timestamp > maxTimestamp) return new Date(maxDate!);
    return new Date(year, month, day);
  };

  const getAvailableYears: DatePickerHooks["getAvailableYears"] = () => {
    const startYear = minDate?.getFullYear() ?? selectedDate.getFullYear() - 6;
    const endYear = maxDate?.getFullYear() ?? selectedDate.getFullYear() + 5;
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
  };

  const handleSelectYear: DatePickerHooks["handleSelectYear"] = (year) => {
    const validDate = findNearestValidDate(year, selectedDate.getMonth(), selectedDate.getDate());
    handleChangeDate(validDate);
    setView("year");
  };

  const handleSelectMonth: DatePickerHooks["handleSelectMonth"] = (month) => {
    const validDate = findNearestValidDate(selectedDate.getFullYear(), month, selectedDate.getDate());
    handleChangeDate(validDate);
    setView("month");
  };

  const handleSelectDay: DatePickerHooks["handleSelectDay"] = (day) => {
    const date = findNearestValidDate(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    if (!getIsDateDisabled(date)) {
      handleChangeDate(date);
    }
  };

  return {
    view,
    setView,
    selectedDate,
    handleSelectYear,
    handleSelectMonth,
    handleSelectDay,
    getIsDateDisabled,
    getAvailableYears,
  };
};