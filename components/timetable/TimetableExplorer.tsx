"use client";

import { useEffect, useMemo, useState } from "react";
import { periodTimes, timetableDays, type TimetablePeriod } from "@/lib/timetable";

type View = "class" | "teacher";

export default function TimetableExplorer() {
  const [rows, setRows] = useState<TimetablePeriod[]>([]);
  const [session, setSession] = useState("2026-27");
  const [view, setView] = useState<View>("class");
  const [selection, setSelection] = useState("");
  const [message, setMessage] = useState("نظام الاوقات لوڈ ہو رہا ہے…");

  useEffect(() => {
    let active = true;
    fetch(`/api/timetable?session=${encodeURIComponent(session)}`)
      .then((response) => response.json())
      .then((result) => {
        if (!active) return;
        setRows(result.success ? result.timetable : []);
        setMessage(result.success ? "" : result.message);
      })
      .catch(() => active && setMessage("نظام الاوقات لوڈ نہیں ہوسکا۔"));
    return () => {
      active = false;
    };
  }, [session]);

  const classOptions = useMemo(
    () => Array.from(new Set(rows.map((row) => `${row.department}|${row.class_name}`))),
    [rows],
  );
  const teacherOptions = useMemo(
    () => Array.from(new Set(rows.map((row) => row.faculty_members?.teacher_name).filter(Boolean))) as string[],
    [rows],
  );
  const options = view === "class" ? classOptions : teacherOptions;
  const selected = options.includes(selection) ? selection : options[0] ?? "";
  const visibleRows = rows.filter((row) =>
    view === "class"
      ? `${row.department}|${row.class_name}` === selected
      : row.faculty_members?.teacher_name === selected,
  );

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => { setView("class"); setSelection(""); }}
              className={`rounded-lg px-5 py-2 font-bold ${view === "class" ? "bg-blue-950 text-white" : "text-slate-600"}`}
            >
              کلاس وار
            </button>
            <button
              type="button"
              onClick={() => { setView("teacher"); setSelection(""); }}
              className={`rounded-lg px-5 py-2 font-bold ${view === "teacher" ? "bg-blue-950 text-white" : "text-slate-600"}`}
            >
              استاد وار
            </button>
          </div>

          <label className="min-w-52 flex-1 font-bold text-slate-700">
            {view === "class" ? "جماعت منتخب کریں" : "استاد منتخب کریں"}
            <select
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5"
              value={selected}
              onChange={(event) => setSelection(event.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {view === "class" ? option.replace("|", " — ") : option}
                </option>
              ))}
            </select>
          </label>

          <label className="font-bold text-slate-700">
            تعلیمی سیشن
            <input
              value={session}
              onChange={(event) => setSession(event.target.value)}
              className="mt-1 block w-32 rounded-xl border border-slate-300 px-4 py-2.5"
            />
          </label>

          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white print:hidden"
          >
            پرنٹ / PDF
          </button>
        </div>
      </div>

      {message ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center text-amber-900">
          {message}
        </div>
      ) : selected ? (
        <TimetableGrid title={view === "class" ? selected.replace("|", " — ") : selected} rows={visibleRows} view={view} />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          اس سیشن کا ٹائم ٹیبل ابھی درج نہیں کیا گیا۔
        </div>
      )}
    </section>
  );
}

function TimetableGrid({ title, rows, view }: { title: string; rows: TimetablePeriod[]; view: View }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 text-center">
        <h2 className="text-2xl font-black text-blue-950">{title}</h2>
        <p className="text-emerald-700">جامعہ بلال الاسلامیہ لاہور</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full border-collapse text-center text-sm">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th className="border border-blue-800 p-3">دن</th>
              {periodTimes.map((period) => (
                <th key={period.number} className="border border-blue-800 p-3">
                  <span className="block">پیریڈ {period.number}</span>
                  <span className="font-normal text-blue-100">{period.time}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetableDays.slice(1).map((day, dayIndex) => (
              <tr key={day}>
                <th className="border border-slate-200 bg-emerald-50 p-3 text-emerald-950">{day}</th>
                {periodTimes.map((period) => {
                  const row = rows.find((item) => item.day_number === dayIndex + 1 && item.period_number === period.number);
                  return (
                    <td key={period.number} className="border border-slate-200 p-3 align-top">
                      {row ? (
                        <>
                          <strong className="block text-blue-950">{row.subject_name}</strong>
                          <span className="mt-1 block text-slate-600">
                            {view === "class" ? row.faculty_members?.teacher_name : `${row.department} — ${row.class_name}`}
                          </span>
                        </>
                      ) : "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
