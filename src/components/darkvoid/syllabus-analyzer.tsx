"use client";

import { useMemo, useState } from "react";

type ParsedAssignment = {
  id: string;
  title: string;
  dueAt: Date;
  reminderAt: Date;
  sourceLine: string;
};

const MONTHS =
  "january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec";
const MONTH_DATE_REGEX = new RegExp(`\\b(${MONTHS})\\s+\\d{1,2}(?:,\\s*\\d{4})?`, "i");
const NUMERIC_DATE_REGEX = /\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/;
const ASSIGNMENT_HINT_REGEX =
  /\b(assign|assignment|homework|memo|project|paper|quiz|exam|presentation|draft|roadmap|prd|case study|brief|synthesis)\b/i;

function parseDate(input: string) {
  const now = new Date();
  const monthDate = input.match(MONTH_DATE_REGEX)?.[0];
  if (monthDate) {
    const withYear = /\d{4}/.test(monthDate) ? monthDate : `${monthDate}, ${now.getFullYear()}`;
    const value = new Date(withYear);
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const numericMatch = input.match(NUMERIC_DATE_REGEX);
  if (!numericMatch) return null;

  const month = Number.parseInt(numericMatch[1], 10);
  const day = Number.parseInt(numericMatch[2], 10);
  const rawYear = numericMatch[3];
  let year = now.getFullYear();
  if (rawYear) {
    year = rawYear.length === 2 ? 2000 + Number.parseInt(rawYear, 10) : Number.parseInt(rawYear, 10);
  }

  const value = new Date(year, month - 1, day);
  return Number.isNaN(value.getTime()) ? null : value;
}

function sanitizeTitle(line: string) {
  return line
    .replace(MONTH_DATE_REGEX, "")
    .replace(NUMERIC_DATE_REGEX, "")
    .replace(/\b(due|deadline|submit|on)\b/gi, "")
    .replace(/[-|:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fallbackAssignmentsFromText(input: string) {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 12)
    .slice(0, 4);
  const startDate = new Date();

  return lines.map((line, index) => {
    const dueAt = new Date(startDate);
    dueAt.setDate(startDate.getDate() + (index + 1) * 7);
    dueAt.setHours(23, 59, 0, 0);
    const reminderAt = new Date(dueAt);
    reminderAt.setDate(dueAt.getDate() - 1);
    reminderAt.setHours(9, 0, 0, 0);
    return {
      id: `fallback-${index}-${line.slice(0, 8)}`,
      title: `Syllabus milestone ${index + 1}: ${line.slice(0, 48)}`,
      dueAt,
      reminderAt,
      sourceLine: line,
    };
  });
}

function parseSyllabusToAssignments(input: string): ParsedAssignment[] {
  const lines = input.split("\n").map((line) => line.trim());
  const extracted: ParsedAssignment[] = [];

  lines.forEach((line, index) => {
    if (!line) return;
    const nextLine = lines[index + 1] ?? "";
    const candidateSource = `${line} ${nextLine}`.trim();
    const dueAt = parseDate(candidateSource);

    if (!dueAt) return;
    if (!ASSIGNMENT_HINT_REGEX.test(line) && !ASSIGNMENT_HINT_REGEX.test(nextLine)) return;

    const title = sanitizeTitle(line) || sanitizeTitle(nextLine) || `Assignment ${extracted.length + 1}`;
    dueAt.setHours(23, 59, 0, 0);
    const reminderAt = new Date(dueAt);
    reminderAt.setDate(dueAt.getDate() - 1);
    reminderAt.setHours(9, 0, 0, 0);

    extracted.push({
      id: `${index}-${title}`,
      title,
      dueAt,
      reminderAt,
      sourceLine: line,
    });
  });

  const unique = extracted.filter(
    (item, idx, arr) =>
      idx ===
      arr.findIndex(
        (other) => other.title.toLowerCase() === item.title.toLowerCase() && other.dueAt.getTime() === item.dueAt.getTime(),
      ),
  );
  unique.sort((a, b) => a.dueAt.getTime() - b.dueAt.getTime());

  return unique.length ? unique : fallbackAssignmentsFromText(input);
}

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

type SyllabusAnalyzerProps = {
  courseCode: string;
  courseTitle: string;
};

const sampleSyllabusText = `Week 2: Opportunity Assessment Memo due September 18, 2026
Week 4: PRD Draft v1 due 09/30/2026
Week 6: User Interview Synthesis Assignment due October 14, 2026
Week 9: Roadmap Prioritization Project due 11/04/2026`;

export default function SyllabusAnalyzer({ courseCode, courseTitle }: SyllabusAnalyzerProps) {
  const [syllabusText, setSyllabusText] = useState(sampleSyllabusText);
  const [assignments, setAssignments] = useState<ParsedAssignment[]>([]);

  const hasAssignments = assignments.length > 0;
  const groupedByMonth = useMemo(() => {
    return assignments.reduce<Record<string, ParsedAssignment[]>>((acc, assignment) => {
      const month = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(assignment.dueAt);
      if (!acc[month]) acc[month] = [];
      acc[month].push(assignment);
      return acc;
    }, {});
  }, [assignments]);

  function handleAnalyze() {
    const parsed = parseSyllabusToAssignments(syllabusText);
    setAssignments(parsed);
  }

  return (
    <section className="space-y-4 rounded-3xl bg-white/[0.05] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Syllabus analyzer: {courseCode}
        </h2>
        <p className="text-sm text-zinc-200">
          Paste the {courseTitle} syllabus below. Darkvoid extracts assignments, builds a due-date calendar, and auto-schedules
          reminders 24 hours before each deadline.
        </p>
      </header>

      <label className="block text-sm font-medium text-red-200" htmlFor="syllabus-input">
        Syllabus text input
      </label>
      <textarea
        id="syllabus-input"
        value={syllabusText}
        onChange={(event) => setSyllabusText(event.target.value)}
        className="min-h-44 w-full rounded-2xl bg-[#101a4b] p-3 text-sm text-zinc-100 placeholder:text-zinc-400"
        placeholder="Paste syllabus text from the professor..."
      />
      <button
        type="button"
        onClick={handleAnalyze}
        className="inline-flex rounded-full bg-[#98002e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b10a3d]"
      >
        Analyze syllabus and build calendar
      </button>

      {hasAssignments ? (
        <div className="space-y-5">
          <div className="rounded-2xl bg-[#d6a319]/25 p-4">
            <p className="text-sm font-medium text-amber-100">
              Generated {assignments.length} assignments with reminders set 1 day before due date.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Calendar view</h3>
            {Object.entries(groupedByMonth).map(([month, monthAssignments]) => (
              <div key={month} className="rounded-2xl bg-[#101a4b] p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-red-200">{month}</p>
                <ul className="mt-3 space-y-3">
                  {monthAssignments.map((assignment) => (
                    <li key={assignment.id} className="rounded-xl bg-[#16215d] p-3">
                      <p className="font-medium text-white">{assignment.title}</p>
                      <p className="text-sm text-zinc-300">Due: {formatDateTime(assignment.dueAt)}</p>
                      <p className="text-sm font-medium text-amber-200">
                        Reminder: {formatDateTime(assignment.reminderAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Upcoming reminders</h3>
            <ul className="space-y-2">
              {assignments.map((assignment) => (
                <li key={`reminder-${assignment.id}`} className="rounded-xl bg-[#101a4b] p-3">
                  <p className="text-sm text-zinc-300">
                    Reminder for <span className="font-semibold text-red-200">{assignment.title}</span> goes
                    out on {formatDateTime(assignment.reminderAt)}.
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
