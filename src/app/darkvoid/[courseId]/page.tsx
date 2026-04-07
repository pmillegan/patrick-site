import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SyllabusAnalyzer from "@/components/darkvoid/syllabus-analyzer";
import { activeAssignments, courses, getCourseById, pastAssignments } from "@/data/darkvoid";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export async function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  return {
    title: course ? `${course.code} | Darkvoid` : "Course | Darkvoid",
    description: "Course assignments, grade visibility, and syllabus-generated calendar reminders.",
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = getCourseById(courseId);
  if (!course) {
    notFound();
  }

  const courseActiveAssignments = activeAssignments.filter((assignment) => assignment.courseId === courseId);
  const coursePastAssignments = pastAssignments.filter((assignment) => assignment.courseId === courseId);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 bg-gradient-to-b from-[#060b26] via-[#0a1340] to-[#060b26] px-6 py-12 text-zinc-100 sm:px-8">
      <header className="space-y-4 rounded-3xl bg-gradient-to-r from-[#101c55] via-[#121f63] to-[#0d1848] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <Link
          href="/darkvoid"
          className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-amber-200 transition hover:bg-white/20"
        >
          Back to all classes
        </Link>
        <div className="space-y-2">
          <p className="text-sm font-medium text-red-200">{course.code}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">{course.title}</h1>
          <p className="text-zinc-200">
            {course.instructor} | {course.school}
          </p>
        </div>
      </header>

      <section className="grid gap-3 rounded-3xl bg-white/[0.05] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.25)] sm:grid-cols-2">
        <div className="rounded-2xl bg-[#d6a319]/25 p-4">
          <p className="text-xs uppercase tracking-wide text-amber-100">Overall class grade</p>
          <p className="mt-1 text-2xl font-semibold text-white">{course.overallGrade}</p>
          <p className="text-xs text-amber-100/90">
            Based on {course.gradedAssignments} graded assignment{course.gradedAssignments === 1 ? "" : "s"}
          </p>
        </div>
        <div className="rounded-2xl bg-[#8c1730]/25 p-4">
          <p className="text-xs uppercase tracking-wide text-red-200">Assignments in view</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {courseActiveAssignments.length + coursePastAssignments.length}
          </p>
          <p className="text-xs text-red-100/90">
            {courseActiveAssignments.length} active, {coursePastAssignments.length} past
          </p>
        </div>
      </section>

      <section className="rounded-3xl bg-white/[0.05] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Current assignments</h2>
        <ul className="mt-5 space-y-3">
          {courseActiveAssignments.map((assignment) => (
            <li key={assignment.id} className="rounded-2xl bg-[#101a4b] p-4">
              <p className="text-lg font-semibold text-white">{assignment.title}</p>
              <p className="text-sm text-zinc-300">Due: {assignment.dueAt}</p>
              <p className="text-sm text-zinc-300">Status: {assignment.status}</p>
              {assignment.gradeExpectedBy ? (
                <p className="text-sm font-medium text-amber-200">
                  Grade expected by: {assignment.gradeExpectedBy}
                </p>
              ) : null}
            </li>
          ))}
          {courseActiveAssignments.length === 0 ? (
            <li className="rounded-2xl bg-[#101a4b] p-4 text-sm text-zinc-300">
              No active assignments yet.
            </li>
          ) : null}
        </ul>
      </section>

      <SyllabusAnalyzer courseCode={course.code} courseTitle={course.title} />
    </main>
  );
}
