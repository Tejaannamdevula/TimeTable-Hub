// import { time } from "console";

export type TimeTableData = {
  section: Section;
  instructors: Instructor[];
  days: Day[];
  timeslots: TimeSlots;
};

export type TimeTableProps = {
  data: TimeTableData;
};

export type Section = {
  secName: string;
  roomNo: number | string;
};

export type Instructor = {
  name: string;
  subject: string;
};

export type TimeSlots = Slots[];

export type Slots = {
  startTime: string;
  endTime: string;
};

export enum DayName {
  MON = "MON",
  TUE = "TUE",
  WED = "WED",
  THU = "THU",
  FRI = "FRI",
  SAT = "SAT",
}

export type Day = {
  dayName: DayName;
  periods: (Period | null)[];
};

export type Period = {
  subject: string;
};
