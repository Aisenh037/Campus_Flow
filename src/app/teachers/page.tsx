'use client';

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { teachers, courses } from "@/lib/mock-data";
import type { Teacher } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TeacherForm, TeacherFormValues } from "@/components/teacher-form";
import { useToast } from "@/hooks/use-toast";

export default function TeachersPage() {
  const [isAddTeacherDialogOpen, setIsAddTeacherDialogOpen] = useState(false);
  const [isEditTeacherDialogOpen, setIsEditTeacherDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deletingTeacher, setDeletingTeacher] = useState<Teacher | null>(null);
  const { toast } = useToast();

  const handleAddTeacher = (data: TeacherFormValues) => {
    console.log("New teacher data:", data);
    // Here you would typically add the new teacher to your state or database
    toast({
      title: "Teacher Added",
      description: `${data.firstName} ${data.lastName} has been successfully added.`,
    });
    setIsAddTeacherDialogOpen(false);
  };
  
  const handleEditClick = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsEditTeacherDialogOpen(true);
  };

  const handleEditTeacher = (data: TeacherFormValues) => {
    console.log("Updated teacher data:", data);
    // Here you would typically update the teacher in your state or database
    toast({
      title: "Teacher Updated",
      description: `${data.firstName} ${data.lastName}'s details have been successfully updated.`,
    });
    setIsEditTeacherDialogOpen(false);
    setEditingTeacher(null);
  };

  const handleDeleteClick = (teacher: Teacher) => {
    setDeletingTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingTeacher) {
      console.log("Deleting teacher:", deletingTeacher);
      // Here you would typically delete the teacher from your state or database
      toast({
        title: "Teacher Deleted",
        description: `${deletingTeacher.firstName} ${deletingTeacher.lastName} has been deleted.`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      setDeletingTeacher(null);
    }
  };


  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Teachers</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" onClick={() => setIsAddTeacherDialogOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Teacher
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Teacher Directory</CardTitle>
          <CardDescription>
            A list of all teachers in the institute.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Assigned Courses</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{`${teacher.firstName} ${teacher.lastName}`}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>
                    {courses.filter((c) => c.instructorId === teacher.id).length}
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
                        <DropdownMenuItem onClick={() => handleEditClick(teacher)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(teacher)}
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

      <Dialog open={isAddTeacherDialogOpen} onOpenChange={setIsAddTeacherDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>
              Enter the details of the new teacher. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <TeacherForm
            onSubmit={handleAddTeacher}
            onCancel={() => setIsAddTeacherDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {editingTeacher && (
        <Dialog open={isEditTeacherDialogOpen} onOpenChange={setIsEditTeacherDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Teacher</DialogTitle>
              <DialogDescription>
                Update the details of the teacher. Click save when you're done.
              </DialogDescription>
            </Header>
            <TeacherForm
              onSubmit={handleEditTeacher}
              onCancel={() => {
                setIsEditTeacherDialogOpen(false);
                setEditingTeacher(null);
              }}
              initialValues={editingTeacher}
            />
          </DialogContent>
        </Dialog>
      )}

      {deletingTeacher && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                teacher and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeletingTeacher(null)}>Cancel</AlertDialogCancel>
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
