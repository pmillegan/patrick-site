import type { Metadata } from "next";
import Link from "next/link";
import { activeAssignments, courses, getCourseById, pastAssignments } from "@/data/darkvoid";

export const metadata: Metadata = {
  title: "Darkvoid",
  description: "Student assignment dashboard MVP inspired by Brightspace workflows.",
};

export default function DarkvoidPage() {
  const submittedCount = activeAssignments.filter((assignment) => assignment.status === "Submitted").length;
  const gradedCount = pastAssignments.length;
  const dueSoonCount = activeAssignments.filter((assignment) => assignment.status !== "Submitted").length;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 bg-gradient-to-b from-[#060b26] via-[#0a1340] to-[#060b26] px-6 py-12 text-zinc-100 sm:px-8">
      <header className="space-y-4 rounded-3xl bg-gradient-to-r from-[#101c55] via-[#121f63] to-[#0d1848] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-amber-200">
          Darkvoid at USC
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Spring 2026 Coursework</h1>
        <p className="text-zinc-200">
          Student: Patrick Millegan | Program: Product Management | Campus: USC
        </p>
      </header>

      <section className="grid gap-3 rounded-3xl bg-white/[0.04] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur sm:grid-cols-3">
        <div className="rounded-2xl bg-[#8c1730]/25 p-4">
          <p className="text-xs uppercase tracking-wide text-red-200">Due soon</p>
          <p className="mt-1 text-2xl font-semibold text-white">{dueSoonCount}</p>
        </div>
        <div className="rounded-2xl bg-[#d6a319]/25 p-4">
          <p className="text-xs uppercase tracking-wide text-amber-200">Submitted</p>
          <p className="mt-1 text-2xl font-semibold text-white">{submittedCount}</p>
        </div>
        <div className="rounded-2xl bg-[#3a4da2]/30 p-4">
          <p className="text-xs uppercase tracking-wide text-blue-100">Graded</p>
          <p className="mt-1 text-2xl font-semibold text-white">{gradedCount}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-white">My classes</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.id}
              className="rounded-3xl bg-white/[0.06] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:bg-white/[0.08]"
            >
              <p className="text-sm font-medium text-red-200">{course.code}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{course.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">
                {course.instructor} | {course.school}
              </p>
              <div className="mt-4 rounded-2xl bg-[#d6a319]/25 p-3">
                <p className="text-xs uppercase tracking-wide text-amber-100">Overall grade</p>
                <p className="mt-1 text-xl font-semibold text-white">{course.overallGrade}</p>
                <p className="text-xs text-amber-100/90">
                  Based on {course.gradedAssignments} graded assignment
                  {course.gradedAssignments === 1 ? "" : "s"}
                </p>
              </div>
              <Link
                href={`/darkvoid/${course.id}`}
                className="mt-4 inline-flex rounded-full bg-[#98002e] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#b10a3d]"
              >
                Open course page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id="active-assignments"
        className="rounded-3xl bg-white/[0.05] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.25)]"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-white">Current assignments</h2>
        <ul className="mt-5 space-y-4">
          {activeAssignments.map((assignment) => {
            const course = getCourseById(assignment.courseId);
            return (
              <li
                key={assignment.id}
                className="rounded-2xl bg-[#101a4b] p-4 sm:flex sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-200">
                    {course?.code} | {course?.instructor}
                  </p>
                  <p className="text-lg font-semibold text-white">{assignment.title}</p>
                  <p className="text-sm text-zinc-300">Due: {assignment.dueAt}</p>
                  <p className="text-sm text-zinc-300">Status: {assignment.status}</p>
                  {assignment.gradeExpectedBy ? (
                    <p className="text-sm font-medium text-amber-200">
                      Grade expected by: {assignment.gradeExpectedBy}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="mt-4 inline-flex rounded-full bg-[#d6a319] px-4 py-2 text-sm font-semibold text-[#1f1633] transition hover:bg-[#e7b934] sm:mt-0"
                >
                  {assignment.uploadLabel}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-3xl bg-white/[0.05] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Past assignments</h2>
        <ul className="mt-5 space-y-4">
          {pastAssignments.map((assignment) => {
            const course = getCourseById(assignment.courseId);
            return (
              <li key={assignment.id} className="rounded-2xl bg-[#111a46] p-4">
                <p className="text-sm font-medium text-amber-200">
                  {course?.code} | {course?.title}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">{assignment.title}</p>
                <div className="mt-2 grid gap-1 text-sm text-zinc-300">
                  <p>Submitted on: {assignment.submittedOn}</p>
                  <p>Grade posted on: {assignment.gradePostedOn}</p>
                  <p className="font-semibold text-amber-200">Grade: {assignment.grade}</p>
                </div>
                <a
                  href="#"
                  className="mt-3 inline-flex text-sm font-medium text-red-200 underline underline-offset-4 hover:text-red-100"
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
