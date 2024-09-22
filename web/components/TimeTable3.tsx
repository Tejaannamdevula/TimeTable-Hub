"use client";

import * as TimeTableTypes from "@/types/timeTable";
import React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "./ui/badge";
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

const InstructorFunction = ({
  data,
}: {
  data: TimeTableTypes.Instructor[];
}): JSX.Element => {
  const [selectedInstructor, setSelectedInstructor] = useState<string>("");
  return (
    <>
      <Select value={selectedInstructor} onValueChange={setSelectedInstructor}>
        <SelectTrigger className="w-[180]px">
          <SelectValue placeholder="Slect an instructor" />
        </SelectTrigger>
        <SelectContent>
          {data.map((instructor: any, index: number) => (
            <SelectItem key={index} value={instructor.name}>
              {instructor.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedInstructor && (
        <div>
          <h3 className=" mx-4 p-4  font-medium"> Subject: </h3>
          <Badge variant={"secondary"}>
            {data.find((ins) => ins.name === selectedInstructor)?.subject}
          </Badge>
        </div>
      )}
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

      <Tabs defaultValue="schedule" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="schedule">TimeTable</TabsTrigger>
          <TabsTrigger value="instructor">Instructors</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <Table>
            <TableHeader>
              <TableRow className="bg-cal-white">
                <TableHead className="bg-cal-white text-bg-cal-black text-3xl">
                  Day/Hour
                </TableHead>
                {data.timeslots.map(
                  (item: TimeTableTypes.Slots, index: number) => (
                    <TableHead key={index}>
                      <SlotFunction props={item} />
                    </TableHead>
                  )
                )}
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
        </TabsContent>
        <TabsContent value="instructor">
          <InstructorFunction data={data.instructors}></InstructorFunction>
        </TabsContent>
      </Tabs>
    </div>
  );
}
