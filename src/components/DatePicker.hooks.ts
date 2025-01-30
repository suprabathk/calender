import { View } from "@/types/types";
import { Dispatch, SetStateAction, useState } from "react";

export interface DatePickerHooks {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  selectedDate: Date;
  handleSelectYear: (year: number) => void;
  handleSelectMonth: (month: number) => void;
  handleSelectDay: (day: number) => void;
}

export interface DatePickerProps {
  selectedDate: Date;
  handleChangeDate: (date: Date) => void;
}

export const useDatePicker = ({
  selectedDate,
  handleChangeDate,
}: DatePickerProps): DatePickerHooks => {
  const [view, setView] = useState<View>("month");

  const handleSelectYear = (year: number) => {
    const newDate = new Date(selectedDate.setFullYear(year));
    handleChangeDate(newDate);
    setView("year");
  };

  const handleSelectMonth = (monthIndex: number) => {
    const newDate = new Date(selectedDate.setMonth(monthIndex));
    handleChangeDate(newDate);
    setView("month");
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(selectedDate.setDate(day));
    handleChangeDate(newDate);
  };

  return {
    view,
    setView,
    selectedDate,
    handleSelectYear,
    handleSelectMonth,
    handleSelectDay,
  };
};
