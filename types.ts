// Role Types - Only Admin, Teacher, Student (Parent removed from scope)
export enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

// Base User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  createdAt?: string;
}

// Extended User Types
export interface Teacher extends User {
  role: Role.TEACHER;
  subjects: string[];
  classrooms: string[];
  employeeId: string;
}

export interface Student extends User {
  role: Role.STUDENT;
  rollNumber: string;
  grade: string;
  section: string;
  parentName?: string;
  parentPhone?: string;
}

export interface Admin extends User {
  role: Role.ADMIN;
  department: string;
}

// Navigation
export interface NavItem {
  id: string;
  label: string;
  icon: any;
  subItems?: NavItem[];
}

// Academic Structures
export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  grades: string[];
  teacherIds: string[];
}

export interface Classroom {
  id: string;
  name: string;
  grade: string;
  sections: Section[];
}

export interface Section {
  id: string;
  name: string;
  classroomId: string;
  studentCount: number;
  teacherIds: string[];
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  subjectId: string;
  teacherId: string;
  classroomId: string;
  sectionId: string;
  room?: string;
}

// Course & Content
export interface Course {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  teacherId: string;
  grade: string;
  studentIds: string[];
  materialIds: string[];
  createdAt: string;
}

export interface Material {
  id: string;
  title: string;
  type: 'video' | 'document' | 'link' | 'lesson-plan';
  url: string;
  courseId: string;
  description?: string;
  createdAt: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  courseId: string;
  objectives: string[];
  activities: { title: string; duration: string; completed: boolean }[];
  createdAt: string;
}

// Assignments & Quizzes
export interface Assignment {
  id: string;
  title: string;
  instructions: string;
  courseId: string;
  dueDate: string;
  studentIds: string[];
  attachments?: string[];
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  content?: string;
  attachments?: string[];
  submittedAt: string;
  grade?: number;
  feedback?: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  questions: QuizQuestion[];
  duration: number; // in minutes
  dueDate: string;
  studentIds: string[];
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  answers: { questionId: string; answer: string | string[] }[];
  score: number;
  submittedAt: string;
}

// Attendance
export interface AttendanceRecord {
  id: string;
  date: string;
  classroomId: string;
  sectionId: string;
  subjectId?: string;
  teacherId: string;
  records: {
    studentId: string;
    status: 'present' | 'absent' | 'late';
    notes?: string;
  }[];
}

// Assessments
export interface DailyAssessment {
  id: string;
  date: string;
  topic: string;
  classroomId: string;
  sectionId: string;
  subjectId: string;
  teacherId: string;
  maxMarks: number;
  records: {
    studentId: string;
    marks: number;
    notes?: string;
  }[];
}

export interface InternalAssessment {
  id: string;
  title: string;
  type: 'mid-term' | 'unit-test' | 'final';
  date: string;
  classroomId: string;
  sectionId: string;
  subjectId: string;
  teacherId: string;
  maxMarks: number;
  records: {
    studentId: string;
    marks: number;
    grade?: string;
  }[];
}

// Dashboard Stats
export interface DashboardStat {
  label: string;
  value: string | number;
  icon?: any;
  trend?: string;
  positive?: boolean;
  color?: string;
}

// Student Daily Tracking
export interface DailyTracking {
  id: string;
  studentId: string;
  date: string;
  behavior: 'excellent' | 'good' | 'needs-attention';
  participation: 'active' | 'passive' | 'absent';
  notes?: string;
  teacherId: string;
}
