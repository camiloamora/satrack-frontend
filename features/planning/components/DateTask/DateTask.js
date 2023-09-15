import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTask = ({ endDate, setEndDate }) => {
  return (
    <div className="date--picker">
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        dateFormat={"yyyy/MM/dd"}
      />
    </div>
  );
};

export default DateTask;
