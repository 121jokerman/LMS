// Mock Data for Nexus LMS
// This file contains all the sample data used throughout the application

import { Role } from '../types';

// ========== USERS ==========
export const mockTeachers = [
    { id: 't1', name: 'Mr. John Smith', email: 'john.smith@school.edu', role: Role.TEACHER, phone: '555-0101', subjects: ['Mathematics', 'Physics'], classrooms: ['10-A', '10-B', '9-A'], employeeId: 'EMP001' },
    { id: 't2', name: 'Ms. Sarah Johnson', email: 'sarah.j@school.edu', role: Role.TEACHER, phone: '555-0102', subjects: ['English', 'History'], classrooms: ['10-A', '11-A'], employeeId: 'EMP002' },
    { id: 't3', name: 'Mr. Michael Brown', email: 'michael.b@school.edu', role: Role.TEACHER, phone: '555-0103', subjects: ['Chemistry', 'Biology'], classrooms: ['9-A', '9-B'], employeeId: 'EMP003' },
    { id: 't4', name: 'Ms. Emily Davis', email: 'emily.d@school.edu', role: Role.TEACHER, phone: '555-0104', subjects: ['Computer Science'], classrooms: ['10-A', '10-B', '11-A'], employeeId: 'EMP004' },
];

export const mockStudents = [
    { id: 's1', name: 'Alex Johnson', email: 'alex.j@student.edu', role: Role.STUDENT, rollNumber: '001', grade: '10', section: 'A', parentName: 'Robert Johnson', parentPhone: '555-1001' },
    { id: 's2', name: 'Emma Wilson', email: 'emma.w@student.edu', role: Role.STUDENT, rollNumber: '002', grade: '10', section: 'A', parentName: 'Maria Wilson', parentPhone: '555-1002' },
    { id: 's3', name: 'James Martinez', email: 'james.m@student.edu', role: Role.STUDENT, rollNumber: '003', grade: '10', section: 'A', parentName: 'Carlos Martinez', parentPhone: '555-1003' },
    { id: 's4', name: 'Sophia Lee', email: 'sophia.l@student.edu', role: Role.STUDENT, rollNumber: '004', grade: '10', section: 'B', parentName: 'David Lee', parentPhone: '555-1004' },
    { id: 's5', name: 'Oliver Brown', email: 'oliver.b@student.edu', role: Role.STUDENT, rollNumber: '005', grade: '10', section: 'B', parentName: 'Jennifer Brown', parentPhone: '555-1005' },
    { id: 's6', name: 'Ava Taylor', email: 'ava.t@student.edu', role: Role.STUDENT, rollNumber: '006', grade: '9', section: 'A', parentName: 'Michael Taylor', parentPhone: '555-1006' },
    { id: 's7', name: 'William Anderson', email: 'william.a@student.edu', role: Role.STUDENT, rollNumber: '007', grade: '9', section: 'A', parentName: 'Lisa Anderson', parentPhone: '555-1007' },
    { id: 's8', name: 'Isabella Thomas', email: 'isabella.t@student.edu', role: Role.STUDENT, rollNumber: '008', grade: '11', section: 'A', parentName: 'Kevin Thomas', parentPhone: '555-1008' },
];

export const mockAdmins = [
    { id: 'a1', name: 'Principal Adams', email: 'principal@school.edu', role: Role.ADMIN, department: 'Administration' },
    { id: 'a2', name: 'Vice Principal Roberts', email: 'vp@school.edu', role: Role.ADMIN, department: 'Academic Affairs' },
];

// ========== SUBJECTS ==========
export const mockSubjects = [
    { id: 'sub1', name: 'Mathematics', code: 'MATH', description: 'Algebra, Geometry, Calculus', grades: ['9', '10', '11'], teacherIds: ['t1'] },
    { id: 'sub2', name: 'Physics', code: 'PHY', description: 'Mechanics, Thermodynamics, Optics', grades: ['9', '10', '11'], teacherIds: ['t1'] },
    { id: 'sub3', name: 'English', code: 'ENG', description: 'Literature, Grammar, Writing', grades: ['9', '10', '11'], teacherIds: ['t2'] },
    { id: 'sub4', name: 'History', code: 'HIST', description: 'World History, Civics', grades: ['9', '10'], teacherIds: ['t2'] },
    { id: 'sub5', name: 'Chemistry', code: 'CHEM', description: 'Organic, Inorganic, Physical Chemistry', grades: ['9', '10', '11'], teacherIds: ['t3'] },
    { id: 'sub6', name: 'Biology', code: 'BIO', description: 'Botany, Zoology, Human Biology', grades: ['9', '10'], teacherIds: ['t3'] },
    { id: 'sub7', name: 'Computer Science', code: 'CS', description: 'Programming, Data Structures', grades: ['10', '11'], teacherIds: ['t4'] },
];

// ========== CLASSROOMS & SECTIONS ==========
export const mockClassrooms = [
    {
        id: 'c1', name: 'Grade 9', grade: '9', sections: [
            { id: 'sec1', name: 'A', classroomId: 'c1', studentCount: 28, teacherIds: ['t1', 't3'] },
            { id: 'sec2', name: 'B', classroomId: 'c1', studentCount: 26, teacherIds: ['t1', 't3'] },
        ]
    },
    {
        id: 'c2', name: 'Grade 10', grade: '10', sections: [
            { id: 'sec3', name: 'A', classroomId: 'c2', studentCount: 32, teacherIds: ['t1', 't2', 't4'] },
            { id: 'sec4', name: 'B', classroomId: 'c2', studentCount: 30, teacherIds: ['t1', 't4'] },
        ]
    },
    {
        id: 'c3', name: 'Grade 11', grade: '11', sections: [
            { id: 'sec5', name: 'A', classroomId: 'c3', studentCount: 25, teacherIds: ['t2', 't4'] },
        ]
    },
];

// ========== TIMETABLE ==========
export const mockTimetable = [
    { id: 'tt1', day: 'Monday', startTime: '08:00', endTime: '08:45', subjectId: 'sub1', teacherId: 't1', classroomId: 'c2', sectionId: 'sec3', room: 'Room 201' },
    { id: 'tt2', day: 'Monday', startTime: '09:00', endTime: '09:45', subjectId: 'sub2', teacherId: 't1', classroomId: 'c2', sectionId: 'sec3', room: 'Lab 1' },
    { id: 'tt3', day: 'Monday', startTime: '10:00', endTime: '10:45', subjectId: 'sub3', teacherId: 't2', classroomId: 'c2', sectionId: 'sec3', room: 'Room 201' },
    { id: 'tt4', day: 'Monday', startTime: '11:00', endTime: '11:45', subjectId: 'sub7', teacherId: 't4', classroomId: 'c2', sectionId: 'sec3', room: 'Computer Lab' },
    { id: 'tt5', day: 'Tuesday', startTime: '08:00', endTime: '08:45', subjectId: 'sub5', teacherId: 't3', classroomId: 'c1', sectionId: 'sec1', room: 'Lab 2' },
    { id: 'tt6', day: 'Tuesday', startTime: '09:00', endTime: '09:45', subjectId: 'sub1', teacherId: 't1', classroomId: 'c2', sectionId: 'sec4', room: 'Room 202' },
];

// ========== COURSES ==========
export const mockCourses = [
    { id: 'course1', title: 'Algebra Fundamentals', description: 'Introduction to algebraic concepts and equations', subjectId: 'sub1', teacherId: 't1', grade: '10', studentIds: ['s1', 's2', 's3', 's4', 's5'], materialIds: ['mat1', 'mat2'], createdAt: '2026-01-01' },
    { id: 'course2', title: 'Mechanics & Motion', description: 'Laws of motion, forces, and energy', subjectId: 'sub2', teacherId: 't1', grade: '10', studentIds: ['s1', 's2', 's3'], materialIds: ['mat3'], createdAt: '2026-01-05' },
    { id: 'course3', title: 'English Literature', description: 'Classic and modern literature analysis', subjectId: 'sub3', teacherId: 't2', grade: '10', studentIds: ['s1', 's2', 's3', 's4', 's5'], materialIds: [], createdAt: '2026-01-03' },
    { id: 'course4', title: 'Introduction to Programming', description: 'Basics of coding and algorithms', subjectId: 'sub7', teacherId: 't4', grade: '10', studentIds: ['s1', 's2', 's4', 's5'], materialIds: ['mat4'], createdAt: '2026-01-10' },
];

// ========== MATERIALS ==========
export const mockMaterials = [
    { id: 'mat1', title: 'Introduction to Algebra - Video Lecture', type: 'video', url: 'https://example.com/video1', courseId: 'course1', description: 'Foundational concepts of algebra', createdAt: '2026-01-02' },
    { id: 'mat2', title: 'Algebra Practice Problems', type: 'document', url: 'https://example.com/doc1.pdf', courseId: 'course1', description: 'PDF with 50 practice problems', createdAt: '2026-01-03' },
    { id: 'mat3', title: 'Newton\'s Laws Explained', type: 'video', url: 'https://example.com/video2', courseId: 'course2', description: 'Detailed explanation of motion laws', createdAt: '2026-01-06' },
    { id: 'mat4', title: 'Python Basics Tutorial', type: 'link', url: 'https://python.org/tutorial', courseId: 'course4', description: 'Official Python tutorial for beginners', createdAt: '2026-01-11' },
];

// ========== ASSIGNMENTS ==========
export const mockAssignments = [
    { id: 'asgn1', title: 'Chapter 4 Problem Set', instructions: 'Solve problems 1-20 from Chapter 4. Show all work and steps.', courseId: 'course1', dueDate: '2026-02-05', studentIds: ['s1', 's2', 's3', 's4', 's5'], attachments: [], createdAt: '2026-01-25' },
    { id: 'asgn2', title: 'Motion Lab Report', instructions: 'Write a lab report on the motion experiment conducted in class.', courseId: 'course2', dueDate: '2026-02-03', studentIds: ['s1', 's2', 's3'], attachments: [], createdAt: '2026-01-26' },
    { id: 'asgn3', title: 'Essay: Shakespeare Analysis', instructions: 'Write a 1000-word essay analyzing themes in Hamlet.', courseId: 'course3', dueDate: '2026-02-10', studentIds: ['s1', 's2', 's3', 's4', 's5'], attachments: [], createdAt: '2026-01-27' },
];

export const mockSubmissions = [
    { id: 'sub1', assignmentId: 'asgn1', studentId: 's1', content: 'Completed all problems', submittedAt: '2026-01-30', grade: 92, feedback: 'Excellent work!' },
    { id: 'sub2', assignmentId: 'asgn1', studentId: 's2', content: 'Attached my solutions', submittedAt: '2026-01-31', grade: 85, feedback: 'Good, but check problem 15' },
];

// ========== QUIZZES ==========
export const mockQuizzes = [
    {
        id: 'quiz1',
        title: 'Algebra Mid-Term Practice',
        courseId: 'course1',
        duration: 45,
        dueDate: '2026-02-15',
        studentIds: ['s1', 's2', 's3', 's4', 's5'],
        createdAt: '2026-01-28',
        questions: [
            { id: 'q1', question: 'What is the quadratic formula?', type: 'multiple-choice', options: ['x = -b ± √(b²-4ac) / 2a', 'x = b ± √(b²+4ac) / 2a', 'x = -b ± √(b²-4ac) / a'], correctAnswer: 'x = -b ± √(b²-4ac) / 2a', points: 5 },
            { id: 'q2', question: 'Is x² always positive?', type: 'true-false', options: ['True', 'False'], correctAnswer: 'False', points: 2 },
            { id: 'q3', question: 'The solution of x² - 5x + 6 = 0 is x = 2 and x = ___', type: 'fill-blank', correctAnswer: '3', points: 3 },
        ]
    },
    {
        id: 'quiz2',
        title: 'Physics Unit Test',
        courseId: 'course2',
        duration: 30,
        dueDate: '2026-02-08',
        studentIds: ['s1', 's2', 's3'],
        createdAt: '2026-01-29',
        questions: [
            { id: 'q4', question: 'Newton\'s first law is also known as?', type: 'multiple-choice', options: ['Law of Inertia', 'Law of Acceleration', 'Law of Action-Reaction'], correctAnswer: 'Law of Inertia', points: 5 },
        ]
    },
];

// ========== ATTENDANCE ==========
export const mockAttendance = [
    {
        id: 'att1',
        date: '2026-01-30',
        classroomId: 'c2',
        sectionId: 'sec3',
        subjectId: 'sub1',
        teacherId: 't1',
        records: [
            { studentId: 's1', status: 'present', notes: '' },
            { studentId: 's2', status: 'present', notes: '' },
            { studentId: 's3', status: 'absent', notes: 'Sick leave' },
        ]
    },
    {
        id: 'att2',
        date: '2026-01-29',
        classroomId: 'c2',
        sectionId: 'sec3',
        subjectId: 'sub1',
        teacherId: 't1',
        records: [
            { studentId: 's1', status: 'present', notes: '' },
            { studentId: 's2', status: 'late', notes: 'Bus delay' },
            { studentId: 's3', status: 'present', notes: '' },
        ]
    },
];

// ========== ASSESSMENTS ==========
export const mockDailyAssessments = [
    {
        id: 'da1',
        date: '2026-01-30',
        topic: 'Quadratic Equations',
        classroomId: 'c2',
        sectionId: 'sec3',
        subjectId: 'sub1',
        teacherId: 't1',
        maxMarks: 5,
        records: [
            { studentId: 's1', marks: 5, notes: 'Perfect' },
            { studentId: 's2', marks: 4, notes: '' },
            { studentId: 's3', marks: 3, notes: 'Needs practice' },
        ]
    },
];

export const mockInternalAssessments = [
    {
        id: 'ia1',
        title: 'Mid-Term Examination',
        type: 'mid-term',
        date: '2026-02-15',
        classroomId: 'c2',
        sectionId: 'sec3',
        subjectId: 'sub1',
        teacherId: 't1',
        maxMarks: 100,
        records: [
            { studentId: 's1', marks: 92, grade: 'A' },
            { studentId: 's2', marks: 85, grade: 'B+' },
            { studentId: 's3', marks: 78, grade: 'B' },
        ]
    },
    {
        id: 'ia2',
        title: 'Unit Test 1',
        type: 'unit-test',
        date: '2026-01-20',
        classroomId: 'c2',
        sectionId: 'sec3',
        subjectId: 'sub1',
        teacherId: 't1',
        maxMarks: 25,
        records: [
            { studentId: 's1', marks: 23, grade: 'A' },
            { studentId: 's2', marks: 21, grade: 'A-' },
            { studentId: 's3', marks: 18, grade: 'B' },
        ]
    },
];

// ========== DAILY TRACKING ==========
export const mockDailyTracking = [
    { id: 'dt1', studentId: 's1', date: '2026-01-30', behavior: 'excellent', participation: 'active', notes: 'Led class discussion', teacherId: 't1' },
    { id: 'dt2', studentId: 's2', date: '2026-01-30', behavior: 'good', participation: 'active', notes: '', teacherId: 't1' },
    { id: 'dt3', studentId: 's3', date: '2026-01-30', behavior: 'needs-attention', participation: 'passive', notes: 'Distracted in class', teacherId: 't1' },
];
