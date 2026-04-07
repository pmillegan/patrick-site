import type { Metadata } from "next";

type Course = {
  id: string;
  code: string;
  title: string;
  instructor: string;
  school: string;
};

type ActiveAssignment = {
  id: string;
  courseId: string;
  title: string;
  dueAt: string;
  status: "Not started" | "In progress" | "Submitted";
  uploadLabel: string;
  gradeExpectedBy?: string;
};

type PastAssignment = {
  id: string;
  courseId: string;
  title: string;
  submittedOn: string;
  gradePostedOn: string;
  grade: string;
};

const courses: Course[] = [
  {
    id: "pm501",
    code: "PM 501",
    title: "Product Management Foundations",
    instructor: "Prof. Gordon Ho",
    school: "USC",
  },
  {
    id: "mkt540",
    code: "MKT 540",
    title: "Customer Discovery and Insights",
    instructor: "Prof. Melissa Tran",
    school: "USC",
  },
  {
    id: "dsgn520",
    code: "DSGN 520",
    title: "Design for Product Teams",
    instructor: "Prof. Victor Ramos",
    school: "USC",
  },
  {
    id: "ana510",
    code: "ANA 510",
    title: "Product Analytics for PMs",
    instructor: "Prof. Rina Patel",
    school: "USC",
  },
];

const activeAssignments: ActiveAssignment[] = [
  {
    id: "a1",
    courseId: "pm501",
    title: "Opportunity Assessment Memo",
    dueAt: "Apr 12, 2026 at 11:59 PM",
    status: "In progress",
    uploadLabel: "Upload submission",
  },
  {
    id: "a2",
    courseId: "mkt540",
    title: "User Interview Synthesis",
    dueAt: "Apr 14, 2026 at 5:00 PM",
    status: "Not started",
    uploadLabel: "Upload submission",
  },
  {
    id: "a3",
    courseId: "dsgn520",
    title: "PRD Draft v1",
    dueAt: "Apr 9, 2026 at 9:00 PM",
    status: "Submitted",
    uploadLabel: "Replace upload",
    gradeExpectedBy: "Apr 16, 2026",
  },
  {
    id: "a4",
    courseId: "ana510",
    title: "Roadmap Prioritization Exercise",
    dueAt: "Apr 18, 2026 at 11:59 PM",
    status: "Submitted",
    uploadLabel: "Upload revision",
    gradeExpectedBy: "Apr 25, 2026",
  },
];

const pastAssignments: PastAssignment[] = [
  {
    id: "p1",
    courseId: "pm501",
    title: "Competitive Landscape Brief",
    submittedOn: "Mar 18, 2026",
    gradePostedOn: "Mar 24, 2026",
    grade: "93%",
  },
  {
    id: "p2",
    courseId: "mkt540",
    title: "Customer Persona Deck",
    submittedOn: "Mar 10, 2026",
    gradePostedOn: "Mar 16, 2026",
    grade: "A-",
  },
  {
    id: "p3",
    courseId: "dsgn520",
    title: "Prototype Feedback Reflection",
    submittedOn: "Feb 27, 2026",
    gradePostedOn: "Mar 4, 2026",
    grade: "91%",
  },
];

export const metadata: Metadata = {
  title: "Darkvoid",
  description: "Student assignment dashboard MVP inspired by Brightspace workflows.",
};

function getCourseById(courseId: string) {
  return courses.find((course) => course.id === courseId);
}

export default function DarkvoidPage() {
  const submittedCount = activeAssignments.filter((assignment) => assignment.status === "Submitted").length;
  const gradedCount = pastAssignments.length;
  const dueSoonCount = activeAssignments.filter((assignment) => assignment.status !== "Submitted").length;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12 sm:px-8">
      <header className="space-y-3">
        <p className="inline-flex rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
          Darkvoid Student MVP
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Spring 2026 Coursework</h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          Student: Patrick Millegan | Program: Product Management | Campus: USC
        </p>
      </header>

      <section className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Due soon</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{dueSoonCount}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Submitted</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{submittedCount}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Graded</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{gradedCount}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">My classes</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{course.code}</p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{course.title}</h3>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                {course.instructor} | {course.school}
              </p>
              <a
                href="#active-assignments"
                className="mt-4 inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                View assignments
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        id="active-assignments"
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Current assignments</h2>
        <ul className="mt-5 space-y-4">
          {activeAssignments.map((assignment) => {
            const course = getCourseById(assignment.courseId);
            return (
              <li
                key={assignment.id}
                className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700 sm:flex sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {course?.code} | {course?.instructor}
                  </p>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{assignment.title}</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">Due: {assignment.dueAt}</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">Status: {assignment.status}</p>
                  {assignment.gradeExpectedBy ? (
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      Grade expected by: {assignment.gradeExpectedBy}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="mt-4 inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 sm:mt-0"
                >
                  {assignment.uploadLabel}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Past assignments</h2>
        <ul className="mt-5 space-y-4">
          {pastAssignments.map((assignment) => {
            const course = getCourseById(assignment.courseId);
            return (
              <li key={assignment.id} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {course?.code} | {course?.title}
                </p>
                <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{assignment.title}</p>
                <div className="mt-2 grid gap-1 text-sm text-zinc-700 dark:text-zinc-300">
                  <p>Submitted on: {assignment.submittedOn}</p>
                  <p>Grade posted on: {assignment.gradePostedOn}</p>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">Grade: {assignment.grade}</p>
                </div>
                <a
                  href="#"
                  className="mt-3 inline-flex text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                >
                  View feedback
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
