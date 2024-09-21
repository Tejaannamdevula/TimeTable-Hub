import * as TimeTableTypes from "@/types/timeTable";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { jsx } from "react/jsx-runtime";
import { TimeTable2 } from "./Timetable2";

import { Button } from "./ui/button";

const SlotFunction = ({
  props,
}: {
  props: TimeTableTypes.Slots;
}): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-extrabold text-xl text-cal-black">
        {props.periodNo ? props.periodNo : <>&nbsp;</>}
      </div>
      <div className="text-xl text-cal-black">
        {props.startTime} - {props.endTime}
      </div>
    </div>
  );
};
const DayClassFunction = ({
  data,
}: {
  data: TimeTableTypes.Day;
}): JSX.Element => {
  return (
    <>
      <TableCell className="font-semibold">{data.dayName}</TableCell>

      {data.periods.map((period, index) => (
        <TableCell key={index} className="">
          {period ? (
            <div className="">
              {" "}
              <span>{period.subject}</span>{" "}
            </div>
          ) : (
            <div className="">
              {" "}
              <span>-</span>
            </div>
          )}
        </TableCell>
      ))}
    </>
  );
};
// matter sanserif
export function TimeTable3({ data }: TimeTableTypes.TimeTableProps) {
  return (
    <div className="container bg-cal-white mx-auto p-6 rounded-lg shadow-sm border-gray-300">
      <div className="flex justify-center items-center space-x-4">
        <h1 className="text-3xl font-bold">{data.section.secName}</h1>
        <h1 className="text-xl">Room No: {data.section.roomNo}</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-cal-white">
            <TableHead className="bg-cal-white text-bg-cal-black text-3xl">
              Day/Hour
            </TableHead>
            {data.timeslots.map((item: TimeTableTypes.Slots, index: number) => (
              <TableHead key={index}>
                <SlotFunction props={item} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.days.map((day, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : ""}
            >
              <DayClassFunction data={day}></DayClassFunction>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
