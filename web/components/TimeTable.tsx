// "use client";

// type TimeTableData = {
//   section: Section;
//   instructors: Instructor[];
//   days: Day[];
//   timeslots: TimeSlots;
// };

// type TimeTableProps = {
//   data: TimeTableData;
// };

// type Section = {
//   secName: string;
//   roomNo: number | string;
// };
// type Instructor = {
//   name: string;
//   subject: string;
// };

// type TimeSlots = Slots[];

// type Slots = {
//   startTime: string;
//   endTime: string;
// };

// enum DayName {
//   MON = "MON",
//   TUE = "TUE",
//   WED = "WED",
//   THU = "THU",
//   FRI = "FRI",
//   SAT = "SAT",
// }
// type Day = {
//   dayName: DayName;
//   periods: (Period | null)[];
// };

// type Period = {
//   subject: string;
//   specialRoom?: string;
//   isLab?: boolean;
//   isBreak?: boolean;
// };
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

const SlotFunction = ({
  data,
  periodNo,
}: {
  data: TimeTableTypes.Slots;
  periodNo: number | null;
}): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">{periodNo ? periodNo : ""}</div>
      <div className="w-full">
        {data.startTime} - {data.endTime}
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
      <TableCell>{data.dayName}</TableCell>
      {data.periods.map((period, index) => (
        <TableCell key={index}>{period ? period.subject : " "}</TableCell>
      ))}
    </>
  );
};
const InstructorFunction = ({
  data,
}: {
  data: TimeTableTypes.Instructor;
}): JSX.Element => {
  return (
    <TableRow>
      <TableCell className=" text-center">{data.name}</TableCell>
      <TableCell className=" text-center">{data.subject}</TableCell>
    </TableRow>
  );
};
export function TimeTable({
  data,
}: TimeTableTypes.TimeTableProps): JSX.Element {
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
                <SlotFunction data={item} periodNo={item.periodNo} />
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

//WITH  meging periods

// import * as TimeTableTypes from "@/types/timeTable";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const SlotFunction = ({
//   data,
//   periodNo,
// }: {
//   data: TimeTableTypes.Slots;
//   periodNo: number;
// }): JSX.Element => {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="font-semibold text-sm">{periodNo}</div>
//       <div className="text-xs text-muted-foreground">
//         {data.startTime} - {data.endTime}
//       </div>
//     </div>
//   );
// };

// const DayClassFunction = ({
//   data,
// }: {
//   data: TimeTableTypes.Day;
// }): JSX.Element => {
//   const mergedPeriods = data.periods.reduce((acc, period, index) => {
//     if (index === 0 || period?.subject !== data.periods[index - 1]?.subject) {
//       acc.push({ ...period, colspan: 1 });
//     } else {
//       acc[acc.length - 1].colspan += 1;
//     }
//     return acc;
//   }, [] as (TimeTableTypes.Period & { colspan: number })[]);

//   return (
//     <>
//       <TableCell className="font-medium">{data.dayName}</TableCell>
//       {mergedPeriods.map((period, index) => (
//         <TableCell key={index} className="p-1" colSpan={period.colspan}>
//           {period ? (
//             <div className="p-2 rounded bg-blue-100 text-center">
//               <span className="text-sm font-medium text-blue-800">
//                 {period.subject}
//               </span>
//             </div>
//           ) : (
//             <div className="p-2 rounded bg-gray-100 text-center">
//               <span className="text-sm text-gray-500">-</span>
//             </div>
//           )}
//         </TableCell>
//       ))}
//     </>
//   );
// };

// const InstructorFunction = ({
//   data,
// }: {
//   data: TimeTableTypes.Instructor;
// }): JSX.Element => {
//   return (
//     <TableRow>
//       <TableCell className="font-medium">{data.name}</TableCell>
//       <TableCell className="text-center">
//         <span className="px-2 py-1 bg-green-100 rounded text-green-800 text-sm">
//           {data.subject || "N/A"}
//         </span>
//       </TableCell>
//     </TableRow>
//   );
// };

// export function TimeTable({
//   data,
// }: TimeTableTypes.TimeTableProps): JSX.Element {
//   const breakIndex = data.timeslots.findIndex(
//     (slot) => slot.startTime === "10:00"
//   );

//   return (
//     <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
//       <div className="flex justify-center items-center mb-6 space-x-4">
//         <h1 className="text-3xl font-bold text-gray-800">
//           {data.section.secName}
//         </h1>
//         <h2 className="text-xl text-gray-600">Room: {data.section.roomNo}</h2>
//       </div>
//       <div className="mb-8 overflow-x-auto">
//         <Table className="w-full border-collapse">
//           <TableHeader>
//             <TableRow className="bg-gray-50">
//               <TableHead className="w-[100px] text-center">DAY/HOUR</TableHead>
//               {data.timeslots.map((item, index) =>
//                 index !== breakIndex ? (
//                   <TableHead className="text-center" key={index}>
//                     <SlotFunction data={item} periodNo={index + 1} />
//                   </TableHead>
//                 ) : (
//                   <TableHead key={index} className="w-12 bg-gray-200">
//                     <div className="h-full flex items-center justify-center">
//                       <span className="text-gray-600 font-medium transform -rotate-90 whitespace-nowrap">
//                         BREAK
//                       </span>
//                     </div>
//                   </TableHead>
//                 )
//               )}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.days.map((day, index) => (
//               <TableRow
//                 key={index}
//                 className={index % 2 === 0 ? "bg-gray-50" : ""}
//               >
//                 <DayClassFunction data={day} />
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <div>
//         <h3 className="text-2xl font-semibold mb-4 text-gray-800">
//           Instructors
//         </h3>
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-gray-50">
//               <TableHead className="text-left">Name</TableHead>
//               <TableHead className="text-center">Subject</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.instructors.map((instructor, index) => (
//               <InstructorFunction key={index} data={instructor} />
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// import * as React from "react";
// import * as TimeTableTypes from "@/types/timeTable";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const SlotFunction = ({
//   data,
//   periodNo,
// }: {
//   data: TimeTableTypes.Slots;
//   periodNo: number;
// }): JSX.Element => {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="font-semibold text-sm">{periodNo}</div>
//       <div className="text-xs text-gray-500">
//         {data.startTime} - {data.endTime}
//       </div>
//     </div>
//   );
// };

// const DayClassFunction = ({
//   data,
// }: {
//   data: TimeTableTypes.Day;
// }): JSX.Element => {
//   const mergedPeriods = data.periods.reduce((acc, period, index) => {
//     if (index === 0 || period?.subject !== data.periods[index - 1]?.subject) {
//       acc.push({ ...period, colspan: 1 });
//     } else {
//       acc[acc.length - 1].colspan += 1;
//     }
//     return acc;
//   }, [] as (TimeTableTypes.Period & { colspan: number })[]);

//   return (
//     <>
//       <TableCell className="font-medium text-gray-700">
//         {data.dayName}
//       </TableCell>
//       {mergedPeriods.map((period, index) => (
//         <TableCell key={index} className="p-1" colSpan={period.colspan}>
//           {period ? (
//             <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-center transition-all hover:bg-blue-100">
//               <span className="text-sm font-medium text-blue-700">
//                 {period.subject}
//               </span>
//             </div>
//           ) : (
//             <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-center">
//               <span className="text-sm text-gray-400">-</span>
//             </div>
//           )}
//         </TableCell>
//       ))}
//     </>
//   );
// };

// const InstructorFunction = ({
//   data,
// }: {
//   data: TimeTableTypes.Instructor;
// }): JSX.Element => {
//   return (
//     <TableRow>
//       <TableCell className="font-medium text-gray-700">{data.name}</TableCell>
//       <TableCell className="text-center">
//         <span className="px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm">
//           {data.subject || "N/A"}
//         </span>
//       </TableCell>
//     </TableRow>
//   );
// };

// export function TimeTable({
//   data,
// }: TimeTableTypes.TimeTableProps): JSX.Element {
//   const breakIndex = data.timeslots.findIndex(
//     (slot) => slot.startTime === "10:00"
//   );

//   return (
//     <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl">
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-2">
//           {data.section.secName}
//         </h1>
//         <p className="text-xl text-gray-600">Room: {data.section.roomNo}</p>
//       </div>
//       <div className="mb-12 overflow-x-auto">
//         <Table className="w-full border-collapse">
//           <TableHeader>
//             <TableRow className="bg-gray-50">
//               <TableHead className="w-[100px] text-center py-4">
//                 DAY/HOUR
//               </TableHead>
//               {data.timeslots.map((item, index) =>
//                 index !== breakIndex ? (
//                   <TableHead className="text-center py-4" key={index}>
//                     <SlotFunction data={item} periodNo={index + 1} />
//                   </TableHead>
//                 ) : (
//                   <TableHead key={index} className="w-12 bg-gray-100">
//                     <div className="h-full flex items-center justify-center">
//                       <span className="text-gray-700 font-medium transform -rotate-90 whitespace-nowrap">
//                         BREAK
//                       </span>
//                     </div>
//                   </TableHead>
//                 )
//               )}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.days.map((day, index) => (
//               <TableRow
//                 key={index}
//                 className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//               >
//                 <DayClassFunction data={day} />
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <div>
//         <h3 className="text-2xl font-semibold mb-4 text-gray-800">
//           Instructors
//         </h3>
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-gray-50">
//               <TableHead className="text-left py-3">Name</TableHead>
//               <TableHead className="text-center py-3">Subject</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.instructors.map((instructor, index) => (
//               <InstructorFunction key={index} data={instructor} />
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
// import * as React from "react";
// import * as TimeTableTypes from "@/types/timeTable";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const SlotFunction = ({
//   data,
//   periodNo,
// }: {
//   data: TimeTableTypes.Slots;
//   periodNo: number | string | null;
// }): JSX.Element => {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="font-medium text-sm text-gray-900">
//         {periodNo !== null ? periodNo : ""}
//       </div>
//       <div className="text-xs text-gray-500">
//         {data.startTime} - {data.endTime}
//       </div>
//     </div>
//   );
// };

// const DayClassFunction = ({
//   data,
// }: {
//   data: TimeTableTypes.Day;
// }): JSX.Element => {
//   return (
//     <>
//       <TableCell className="font-medium text-gray-900">
//         {data.dayName}
//       </TableCell>
//       {data.periods.map((period, index) => (
//         <TableCell key={index} className="p-1">
//           {period?.subject === "Break" ? (
//             <div className="p-2 rounded-md bg-gray-100 text-center">
//               <span className="text-sm font-medium text-gray-700">Break</span>
//             </div>
//           ) : period ? (
//             <div className="p-2 rounded-md bg-gray-50 border border-gray-200 text-center transition-all hover:bg-gray-100">
//               <span className="text-sm font-medium text-gray-900">
//                 {period.subject}
//               </span>
//             </div>
//           ) : (
//             <div className="p-2 rounded-md bg-gray-50 border border-gray-200 text-center">
//               <span className="text-sm text-gray-400">-</span>
//             </div>
//           )}
//         </TableCell>
//       ))}
//     </>
//   );
// };

// const InstructorFunction = ({
//   data,
// }: {
//   data: TimeTableTypes.Instructor;
// }): JSX.Element => {
//   return (
//     <TableRow>
//       <TableCell className="font-medium text-gray-900">{data.name}</TableCell>
//       <TableCell className="text-center">
//         <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-800 text-sm">
//           {data.subject || "N/A"}
//         </span>
//       </TableCell>
//     </TableRow>
//   );
// };

// export function TimeTable({
//   data,
// }: TimeTableTypes.TimeTableProps): JSX.Element {
//   const timeSlots = [
//     { startTime: "08:15", endTime: "09:10", periodNo: 1 },
//     { startTime: "09:10", endTime: "10:05", periodNo: 2 },
//     { startTime: "10:05", endTime: "10:20", periodNo: null },
//     { startTime: "10:20", endTime: "11:15", periodNo: 3 },
//     { startTime: "11:15", endTime: "12:10", periodNo: 4 },
//     { startTime: "12:10", endTime: "01:05", periodNo: 5 },
//     { startTime: "01:05", endTime: "02:00", periodNo: null },
//     { startTime: "02:00", endTime: "02:55", periodNo: 6 },
//     { startTime: "02:55", endTime: "03:50", periodNo: 7 },
//   ];

//   return (
//     <div className="container mx-auto p-6 bg-white shadow-sm rounded-lg border border-gray-200">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           {data.section.secName}
//         </h1>
//         <p className="text-lg text-gray-600">Room: {data.section.roomNo}</p>
//       </div>
//       <div className="mb-12 overflow-x-auto">
//         <Table className="w-full border-collapse">
//           <TableHeader>
//             <TableRow className="bg-gray-50 border-y border-gray-200">
//               <TableHead className="w-[100px] text-center py-4 text-gray-700">
//                 DAY/HOUR
//               </TableHead>
//               {timeSlots.map((slot, index) => (
//                 <TableHead className="text-center py-4" key={index}>
//                   <SlotFunction
//                     data={{ startTime: slot.startTime, endTime: slot.endTime }}
//                     periodNo={slot.periodNo}
//                   />
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.days.map((day, index) => (
//               <TableRow
//                 key={index}
//                 className="border-b border-gray-200 last:border-b-0"
//               >
//                 <DayClassFunction data={day} />
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <div>
//         <h3 className="text-2xl font-semibold mb-4 text-gray-900">
//           Instructors
//         </h3>
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-gray-50 border-y border-gray-200">
//               <TableHead className="text-left py-3 text-gray-700">
//                 Name
//               </TableHead>
//               <TableHead className="text-center py-3 text-gray-700">
//                 Subject
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.instructors.map((instructor, index) => (
//               <InstructorFunction key={index} data={instructor} />
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
