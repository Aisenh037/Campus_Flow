'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import DashboardLayout from '@/components/dashboard-layout';
import { students, enrollments } from '@/lib/mock-data';
import type { Student } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { StudentForm, StudentFormValues } from '@/components/student-form';
import { useToast } from '@/hooks/use-toast';

export default function StudentsPage() {
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  const [isEditStudentDialogOpen, setIsEditStudentDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const handleAddStudent = (data: StudentFormValues) => {
    console.log('New student data:', data);
    toast({
      title: 'Student Added',
      description: `${data.firstName} ${data.lastName} has been successfully added.`,
    });
    setIsAddStudentDialogOpen(false);
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    setIsEditStudentDialogOpen(true);
  };

  const handleEditStudent = (data: StudentFormValues) => {
    console.log('Updated student data:', data);
    toast({
      title: 'Student Updated',
      description: `${data.firstName} ${data.lastName}'s details have been successfully updated.`,
    });
    setIsEditStudentDialogOpen(false);
    setEditingStudent(null);
  };

  const handleDeleteClick = (student: Student) => {
    setDeletingStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingStudent) {
      console.log('Deleting student:', deletingStudent);
      toast({
        title: 'Student Deleted',
        description: `${deletingStudent.firstName} ${deletingStudent.lastName} has been deleted.`,
        variant: 'destructive',
      });
      setIsDeleteDialogOpen(false);
      setDeletingStudent(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Students
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={() => setIsAddStudentDialogOpen(true)}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Student
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Student Roster</CardTitle>
          <CardDescription>
            A list of all students in the institute.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Enrolled Courses</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{`${student.firstName} ${student.lastName}`}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    {
                      enrollments.filter(e => e.studentId === student.id)
                        .length
                    }
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditClick(student)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(student)}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={isAddStudentDialogOpen}
        onOpenChange={setIsAddStudentDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the details of the new student. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <StudentForm
            onSubmit={handleAddStudent}
            onCancel={() => setIsAddStudentDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {editingStudent && (
        <Dialog
          open={isEditStudentDialogOpen}
          onOpenChange={setIsEditStudentDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update the details of the student. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <StudentForm
              onSubmit={handleEditStudent}
              onCancel={() => {
                setIsEditStudentDialogOpen(false);
                setEditingStudent(null);
              }}
              initialValues={editingStudent}
            />
          </DialogContent>
        </Dialog>
      )}

      {deletingStudent && (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                student and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeletingStudent(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </DashboardLayout>
  );
}
