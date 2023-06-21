import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const daysss = dayjs().add(60, "day");

export default function MyDatePicker({ setDate }) {
  const { bookedDatesOfPlace } = useSelector((state) => state.place);
  // console.log(selectedDates);

  const getFormattedDate = (date) => {
    const today = date.$d;
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    return dd + "/" + mm + "/" + yyyy;
  };

  const shouldDisable = (date) => {
    const formattedDate = getFormattedDate(date);
    // let blackoutDates = ["9/6/2023", "12/6/2023", "20/6/2023", "21/6/2023"];

    return bookedDatesOfPlace.includes(formattedDate);
  };

  const dateChangeHandler = (date) => {
    const formattedDate = getFormattedDate(date);
    setDate(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Basic date picker"
          disablePast
          maxDate={dayjs(daysss.$d)}
          shouldDisableDate={shouldDisable}
          onChange={dateChangeHandler}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
