import React from "react";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TimeTable2 } from "@/components/Timetable2";
import * as TimeTableTypes from "@/types/timeTable";
import { TimeTable } from "@/components/TimeTable";
import { TimeTable3 } from "@/components/TimeTable3";
const URL: string = process.env.NEXT_PUBLIC_TIMETABLE_URL || "default_url";

const cleanData = (data: any): TimeTableTypes.TimeTableData => {
  if (data.length == 0) {
    throw new Error("Data is Empty");
  }
  const N = data.length;
  // console.log("N", N);
  // console.log("data", data[N - 1]);

  const filterBreak = data[N - 1].filter(
    (i: any) => i != undefined && i != null
  );
  const breakTimings: TimeTableTypes.BreakTimings[] = filterBreak[1].split(",");
  console.log("break", breakTimings);
  const [secName, roomNo] = data[0][0].split("-");
  const section: TimeTableTypes.Section = {
    secName: secName,
    roomNo: roomNo,
  };
  const timeslots: TimeTableTypes.TimeSlots = [];

  for (let i = 0; i < data[1].length; i++) {
    let item = data[1][i];
    if (item) {
      let [startTime, endTime] = item.split("-");
      timeslots.push({
        startTime: startTime,
        endTime: endTime,
      });
    }
  }

  const days: TimeTableTypes.Day[] = data.slice(2, 8).map((day: any) => {
    let dayName = day[0];
    const periods: TimeTableTypes.Period[] = [];

    // For handling sparse arrays
    for (let i = 1; i < day.length; i++) {
      if (day[i]) {
        periods.push({ subject: day[i] });
      } else if (breakTimings.includes(data[1][i]) && i < N - 1) {
        periods.push({ subject: "BREAK" });
      } else {
        periods.push({ subject: "empty" });
      }
    }
    return {
      dayName,
      periods,
    };
  });

  const instructors: TimeTableTypes.Instructor[] = data
    .slice(8, N - 1)
    .map((item: any) => {
      console.log("hi");
      console.log("ddddd", item);
      const filterItem = item.filter((i: any) => i != undefined && i != null);
      let [subject, name] = filterItem;
      return {
        name,
        subject,
      };
    });
  console.log("instructors", instructors);
  let TimeTableData: TimeTableTypes.TimeTableData = {
    section: section,
    instructors: instructors,
    days: days,
    timeslots: timeslots,
  };
  return TimeTableData;
};
const Page = async () => {
  const fetchExcelData = async (URL: string) => {
    // const response = await fetch(URL);
    const response = await fetch(URL, { cache: "no-store" });
    const data = await response.arrayBuffer();
    return data;
  };

  try {
    const data = await fetchExcelData(URL);
    const workBook = XLSX.read(data, { type: "array" });

    const sheetName = workBook.SheetNames[0];
    const sheet = workBook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log("Json", jsonData);
    let arr: TimeTableTypes.TimeTableData = cleanData(jsonData);
    // console.log(arr);
    console.log(arr.section.secName);

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex  flex-col items-center justify-around  space-y-4">
          {/* <TimeTable data={arr}></TimeTable> */}
          <TimeTable2 data={arr}></TimeTable2>
          <TimeTable3 data={arr}></TimeTable3>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching or processing Excel data:", error);
    return <div>Error loading data</div>;
  }
};

export default Page;
