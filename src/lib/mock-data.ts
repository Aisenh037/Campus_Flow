import type { Student, Course, Enrollment } from '@/types';

export const students: Student[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
  { id: '3', firstName: 'Peter', lastName: 'Jones', email: 'peter.jones@example.com' },
  { id: '4', firstName: 'Mary', lastName: 'Johnson', email: 'mary.johnson@example.com' },
  { id: '5', firstName: 'David', lastName: 'Williams', email: 'david.williams@example.com' },
];

export const courses: Course[] = [
  { id: 'C1', name: 'Introduction to Computer Science', instructor: 'Dr. Alan Turing', description: 'A foundational course on programming and computer science principles.' },
  { id: 'C2', name: 'Advanced Mathematics', instructor: 'Dr. Ada Lovelace', description: 'Covering topics in advanced calculus and linear algebra.' },
  { id: 'C3', name: 'History of Art', instructor: 'Dr. Vincent van Gogh', description: 'A survey of major art movements throughout history.' },
  { id: 'C4', name: 'Quantum Physics', instructor: 'Dr. Marie Curie', description: 'An introduction to the weird and wonderful world of quantum mechanics.' },
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
