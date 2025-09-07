export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
}

export interface Course {
  id: string;
  name: string;
  instructorId: string;
  description: string;
}

export interface Enrollment {
  studentId: string;
  courseId: string;
}
