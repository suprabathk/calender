"use client";

import DatePicker from "@/components/DatePicker";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-200">
      {/* Added for demo */}
      <div className="m-5 flex flex-col items-center">
        <div className="flex gap-2 items-center mb-2">
          <p>Selected date is</p>
          <p className="font-semibold">{date.toDateString()}</p>
        </div>
        <p>
          (The above text does not belong to the component, it is just for the
          demo.)
        </p>
      </div>

      {/* Usage of component */}
      <DatePicker selectedDate={date} handleChangeDate={setDate} />
    </div>
  );
}
