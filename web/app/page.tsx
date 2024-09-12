import { Button } from "@/components/ui/button";
import Image from "next/image";

import { TimeTable } from "@/components/TimeTable";
import { start } from "repl";
import { TimeTable2 } from "@/components/Timetable2";
export enum DayName {
  MON = "MON",
  TUE = "TUE",
  WED = "WED",
  THU = "THU",
  FRI = "FRI",
  SAT = "SAT",
}
const data = {
  section: {
    secName: "4D",
    roomNo: 504,
  },
  instructors: [
    {
      name: "Mrs.S.Anitha",
      subject: "Computing Ethics",
    },
    {
      name: "Mrs.V Anusha",
      subject: "Cryptography and Network Security",
    },
    {
      name: "Ms.Lalitha",
      subject: "Big Data and Analytics",
    },
    {
      name: "Ms.Suvarna",
      subject: "NPTEL",
    },
    {
      name: "Dr. N. Sameera",
      subject: "Cloud Computing",
    },
    {
      name: "Dr. S.V. Phani Kumar",
      subject: "Deep Learning",
    },
  ],
  days: [
    {
      dayName: DayName.MON,
      periods: [
        { subject: "CNS", isLab: false, isBreak: false },
        { subject: "DL", isLab: false, isBreak: false },
        { subject: "Break", isLab: false, isBreak: true },
        { subject: "CE", isLab: false, isBreak: false },
        { subject: "CC (L)", isLab: true, isBreak: false },
        { subject: "CC (L)", isLab: true, isBreak: false },
        { subject: "Break", isLab: false, isBreak: true },
        { subject: "BDA (L)", isLab: true, isBreak: false },
        { subject: "BDA (L)", isLab: true, isBreak: false },
      ],
    },
    {
      dayName: DayName.TUE,
      periods: [
        {
          subject: "BDA",
          specialRoom: "307",
          isLab: false,
          isBreak: false,
        },
        {
          subject: "NPTEL",
          specialRoom: "307",
          isLab: false,
          isBreak: false,
        },
        { subject: "Break", isLab: false, isBreak: true },
        { subject: "DL", isLab: false, isBreak: false },
        { subject: "CC", isLab: false, isBreak: false },
        { subject: "BDA", isLab: false, isBreak: false },
        { subject: "Break", isLab: false, isBreak: true },
        { subject: "FSD", isLab: true, isBreak: false },
        { subject: "FSD", isLab: true, isBreak: false },
      ],
    },
    {
      dayName: DayName.WED,
      periods: [
        { subject: "DL (L)", isLab: true, isBreak: false },
        { subject: "DL (L)", isLab: true, isBreak: false },
        { subject: "Break", isLab: false, isBreak: true },
        { subject: "FSD", isLab: true, isBreak: false },
        { subject: "FSD", isLab: true, isBreak: false },
        { subject: "CNS", isLab: false, isBreak: false },
        { subject: "Break", isLab: false, isBreak: true },
        {
          subject: "NPTEL",
          specialRoom: "308",
          isLab: false,
          isBreak: false,
        },
        { subject: "CE", specialRoom: "308", isLab: false, isBreak: false },
      ],
    },
    {
      dayName: DayName.THU,
      periods: [
        { subject: "FSD", isLab: true, isBreak: false },
        { subject: "FSD", isLab: true, isBreak: false },
        { subject: "Break", isLab: false, isBreak: true },
        { subject: "CNS (L)", isLab: true, isBreak: false },
        { subject: "CNS (L)", isLab: true, isBreak: false },
        { subject: "BDA", isLab: false, isBreak: false },
        { subject: "Break", isLab: false, isBreak: true },
        { subject: "CC", specialRoom: "307", isLab: false, isBreak: false },
        { subject: "CE", specialRoom: "307", isLab: false, isBreak: false },
      ],
    },
    {
      dayName: DayName.FRI,
      periods: [
        { subject: "DL (L)", isLab: true, isBreak: false },
        { subject: "DL (L)", isLab: true, isBreak: false },
        { subject: "Break", isLab: false, isBreak: true },
        { subject: "FSD", isLab: true, isBreak: false },
        { subject: "FSD", isLab: true, isBreak: false },
        { subject: "CC", isLab: false, isBreak: false },
        { subject: "Break", isLab: false, isBreak: true },
        null,
        null,
      ],
    },
    {
      dayName: DayName.SAT,
      periods: [null, null, null, null, null, null, null, null, null],
    },
  ],
  timeslots: [
    {
      startTime: "08:15",
      endTime: "9:10",
    },
    {
      startTime: "09:10",
      endTime: "10:05",
    },
    {
      startTime: "10:05",
      endTime: "10:20",
    },
    {
      startTime: "10:20",
      endTime: "11:15",
    },
    {
      startTime: "11:15",
      endTime: "12:10",
    },
    {
      startTime: "12:10",
      endTime: "01:05",
    },
    {
      startTime: "01:05",
      endTime: "02:00",
    },
    {
      startTime: "02:00",
      endTime: "02:55",
    },
    {
      startTime: "02:55",
      endTime: "03:50",
    },
  ],
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex  flex-col items-center justify-around  space-y-4">
        <Button>TimeTable App</Button>
        <TimeTable data={data}></TimeTable>
        <TimeTable2 data={data}></TimeTable2>
      </div>
    </main>
  );
}
