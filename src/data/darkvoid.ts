export type Course = {
  id: string;
  code: string;
  title: string;
  instructor: string;
  school: string;
  overallGrade: string;
  gradedAssignments: number;
};

export type ActiveAssignment = {
  id: string;
  courseId: string;
  title: string;
  dueAt: string;
  status: "Not started" | "In progress" | "Submitted";
  uploadLabel: string;
  gradeExpectedBy?: string;
};

export type PastAssignment = {
  id: string;
  courseId: string;
  title: string;
  submittedOn: string;
  gradePostedOn: string;
  grade: string;
};

export const courses: Course[] = [
  {
    id: "pm501",
    code: "PM 501",
    title: "Product Management Foundations",
    instructor: "Prof. Gordon Ho",
    school: "USC",
    overallGrade: "A- (91.8%)",
    gradedAssignments: 3,
  },
  {
    id: "mkt540",
    code: "MKT 540",
    title: "Customer Discovery and Insights",
    instructor: "Prof. Melissa Tran",
    school: "USC",
    overallGrade: "B+ (88.4%)",
    gradedAssignments: 2,
  },
  {
    id: "dsgn520",
    code: "DSGN 520",
    title: "Design for Product Teams",
    instructor: "Prof. Victor Ramos",
    school: "USC",
    overallGrade: "A (93.1%)",
    gradedAssignments: 4,
  },
  {
    id: "ana510",
    code: "ANA 510",
    title: "Product Analytics for PMs",
    instructor: "Prof. Rina Patel",
    school: "USC",
    overallGrade: "A- (90.5%)",
    gradedAssignments: 2,
  },
];

export const activeAssignments: ActiveAssignment[] = [
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

export const pastAssignments: PastAssignment[] = [
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

export function getCourseById(courseId: string) {
  return courses.find((course) => course.id === courseId);
}
