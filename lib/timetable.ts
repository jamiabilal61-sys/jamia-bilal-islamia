export const timetableDays = ["", "ہفتہ", "اتوار", "پیر", "منگل", "بدھ", "جمعرات"];

export const periodTimes = [
  { number: 1, time: "9:30 تا 9:55" },
  { number: 2, time: "9:55 تا 10:20" },
  { number: 3, time: "10:20 تا 10:45" },
  { number: 4, time: "10:45 تا 11:10" },
  { number: 5, time: "11:10 تا 11:30" },
  { number: 6, time: "11:30 تا 11:50" },
  { number: 7, time: "11:50 تا 12:10" },
  { number: 8, time: "12:10 تا 12:30" },
];

export type TimetablePeriod = {
  id: string;
  department: string;
  class_name: string;
  subject_name: string;
  teacher_id: string | null;
  day_number: number;
  period_number: number;
  faculty_members: { teacher_name: string } | null;
};

export function periodTime(periodNumber: number) {
  return periodTimes.find((period) => period.number === periodNumber)?.time ?? "";
}
