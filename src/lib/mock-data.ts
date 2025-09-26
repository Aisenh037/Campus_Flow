import type { Student, Course, Enrollment, Teacher, Assignment, Grade } from '@/types';

export const students: Student[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
  { id: '3', firstName: 'Peter', lastName: 'Jones', email: 'peter.jones@example.com' },
  { id: '4', firstName: 'Mary', lastName: 'Johnson', email: 'mary.johnson@example.com' },
  { id: '5', firstName: 'David', lastName: 'Williams', email: 'david.williams@example.com' },
];

export const teachers: Teacher[] = [
  { id: 'T1', firstName: 'Alan', lastName: 'Turing', email: 'alan.turing@example.com' },
  { id: 'T2', firstName: 'Ada', lastName: 'Lovelace', email: 'ada.lovelace@example.com' },
  { id: 'T3', firstName: 'Vincent', lastName: 'van Gogh', email: 'vincent.vangogh@example.com' },
  { id: 'T4', firstName: 'Marie', lastName: 'Curie', email: 'marie.curie@example.com' },
];

export const courses: Course[] = [
  { id: 'C1', name: 'Introduction to Computer Science', instructorId: 'T1', description: 'A foundational course on programming and computer science principles.' },
  { id: 'C2', name: 'Advanced Mathematics', instructorId: 'T2', description: 'Covering topics in advanced calculus and linear algebra.' },
  { id: 'C3', name: 'History of Art', instructorId: 'T3', description: 'A survey of major art movements throughout history.' },
  { id: 'C4', name: 'Quantum Physics', instructorId: 'T4', description: 'An introduction to the weird and wonderful world of quantum mechanics.' },
];

export const enrollments: Enrollment[] = [
  { studentId: '1', courseId: 'C1' },
  { studentId: '1', courseId: 'C2' },
  { studentId: '2', courseId: 'C1' },
  { studentId: '2', courseId: 'C3' },
  { studentId: '3', courseId: 'C2' },
  { studentId: '4', courseId: 'C4' },
  { studentId: '5', courseId: 'C1' },
  { studentId: '5', courseId: 'C4' },
];

export const assignments: Assignment[] = [
  { id: 'A1', courseId: 'C1', title: 'Binary Search Tree Implementation', description: 'Implement a binary search tree in Python.', dueDate: '2024-10-15' },
  { id: 'A2', courseId: 'C2', title: 'Proof of Fermat\'s Last Theorem', description: 'Just kidding. Solve the provided problem set on number theory.', dueDate: '2024-10-20' },
  { id: 'A3', courseId: 'C3', title: 'Renaissance Art Essay', description: 'Write a 5-page essay on the impact of the Renaissance on modern art.', dueDate: '2024-11-01' },
  { id: 'A4', courseId: 'C4', title: 'Schrödinger\'s Cat Thought Experiment', description: 'Explain the paradox and its implications in a 2-page paper.', dueDate: '2024-10-25' },
  { id: 'A5', courseId: 'C1', title: 'API Design Project', description: 'Design a RESTful API for a simple blog.', dueDate: '2024-11-05' },
];

export const grades: Grade[] = [
    { id: 'G1', studentId: '1', assignmentId: 'A1', mark: 85 },
    { id: 'G2', studentId: '2', assignmentId: 'A1', mark: 92 },
    { id: 'G3', studentId: '1', assignmentId: 'A2', mark: 78, comments: 'Good effort, but review theorems.' },
    { id: 'G4', studentId: '2', assignmentId: 'A3', mark: 95, comments: 'Excellent analysis.' },
    { id: 'G5', studentId: '4', assignmentId: 'A4', mark: 88 },
];
