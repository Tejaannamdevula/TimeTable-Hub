type TimeTabledata = {
  section: Section;
  instructors: Instructor[];
  days: Day[];
  timeslots: TimeSlots;
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
  periods: Period[];
};

type Period = {
  subject: string;
  specialRoom?: string;
  isLab: boolean;
  isBreak: boolean;
};
