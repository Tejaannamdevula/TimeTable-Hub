import * as TimeTableTypes from "@/types/timeTable";
import {
  Table,
  TableBody,
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
  periodNo: number;
}): JSX.Element => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-semibold text-sm">{periodNo}</div>
      <div className="text-xs text-muted-foreground">
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
      <TableCell className="font-medium">{data.dayName}</TableCell>
      {data.periods.map((period, index) => (
        <TableCell key={index} className="p-1">
          {period ? (
            <div className="p-2 rounded bg-blue-100 text-center">
              <span className="text-sm font-medium text-blue-800">
                {period.subject}
              </span>
            </div>
          ) : (
            <div className="p-2 rounded bg-gray-100 text-center">
              <span className="text-sm text-gray-500">-</span>
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
  data: TimeTableTypes.Instructor;
}): JSX.Element => {
  return (
    <TableRow>
      <TableCell className="font-medium">{data.name}</TableCell>
      <TableCell className="text-center">
        <span className="px-2 py-1 bg-green-100 rounded text-green-800 text-sm">
          {data.subject || "N/A"}
        </span>
      </TableCell>
    </TableRow>
  );
};

export function TimeTable2({
  data,
}: TimeTableTypes.TimeTableProps): JSX.Element {
  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center items-center mb-6 space-x-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {data.section.secName}
        </h1>
        <h2 className="text-xl text-gray-600">Room: {data.section.roomNo}</h2>
      </div>
      <div className="mb-8 overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[100px] text-center">DAY/HOUR</TableHead>
              {data.timeslots.map((item, index) => (
                <TableHead className="text-center" key={index}>
                  <SlotFunction data={item} periodNo={index + 1} />
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
                <DayClassFunction data={day} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Instructors
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-center">Subject</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.instructors.map((instructor, index) => (
              <InstructorFunction key={index} data={instructor} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
