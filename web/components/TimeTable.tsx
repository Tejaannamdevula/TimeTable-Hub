"use client";

type TimeTableData = {
  section: Section;
  instructors: Instructor[];
  days: Day[];
  timeslots: TimeSlots;
};

type TimeTableProps = {
  data: TimeTableData;
};

type Section = {
  secName: string;
  roomNo: number | string;
};
type Instructor = {
  name: string;
  subject: string;
};

type TimeSlots = Slots[];

type Slots = {
  startTime: string;
  endTime: string;
};

enum DayName {
  MON = "MON",
  TUE = "TUE",
  WED = "WED",
  THU = "THU",
  FRI = "FRI",
  SAT = "SAT",
}
type Day = {
  dayName: DayName;
  periods: (Period | null)[];
};

type Period = {
  subject: string;
  specialRoom?: string;
  isLab: boolean;
  isBreak: boolean;
};

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SlotFunction = ({
  data,
  periodNo,
}: {
  data: Slots;
  periodNo: number;
}): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">{periodNo}</div>
      <div className="w-full">
        {data.startTime} - {data.endTime}
      </div>
    </div>
  );
};

const DayClassFunction = ({ data }: { data: Day }): JSX.Element => {
  return (
    <>
      <TableCell>{data.dayName}</TableCell>
      {data.periods.map((period, index) => (
        <TableCell key={index}>{period ? period.subject : " "}</TableCell>
      ))}
    </>
  );
};
const InstructorFunction = ({ data }: { data: Instructor }): JSX.Element => {
  return (
    <TableRow>
      <TableCell className=" text-center">{data.name}</TableCell>
      <TableCell className=" text-center">{data.subject}</TableCell>
    </TableRow>
  );
};
export function TimeTable({ data }: TimeTableProps): JSX.Element {
  return (
    <div>
      <div className="flex w-full  justify-center items-center mb-4 space-x-5 ">
        <div className="text-lg font-bold">{data.section.secName}</div>
        <div className="text-lg">{data.section.roomNo}</div>
      </div>
      <Table className=" w-[1000px]">
        <TableHeader>
          <TableRow className="w-full">
            <TableHead className="w-[100px] text-center">DAY/HOUR</TableHead>

            {data.timeslots.map((item, index) => (
              <TableHead className="w-[100px] text-center" key={index}>
                <SlotFunction data={item} periodNo={index + 1} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.days.map((day, index) => (
            <TableRow key={index}>
              <DayClassFunction data={day}></DayClassFunction>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <Table>
          <TableBody>
            {data.instructors.map((instructor, index) => (
              <InstructorFunction
                key={index}
                data={instructor}
              ></InstructorFunction>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
