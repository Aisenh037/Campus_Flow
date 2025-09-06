export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Course {
  id: string;
  name: string;
  instructor: string;
  description: string;
}

export interface Enrollment {
  studentId: string;
  courseId: string;
}
