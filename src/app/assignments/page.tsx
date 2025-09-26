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
import { assignments, courses } from '@/lib/mock-data';
import type { Assignment } from '@/types';
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
import { AssignmentForm, AssignmentFormValues } from '@/components/assignment-form';
import { useToast } from '@/hooks/use-toast';

export default function AssignmentsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [deletingAssignment, setDeletingAssignment] = useState<Assignment | null>(null);
  const { toast } = useToast();

  const getCourseName = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : 'N/A';
  };

  const handleAddAssignment = (data: AssignmentFormValues) => {
    console.log('New assignment data:', data);
    toast({
      title: 'Assignment Added',
      description: `The assignment "${data.title}" has been successfully added.`,
    });
    setIsAddDialogOpen(false);
  };

  const handleEditClick = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsEditDialogOpen(true);
  };

  const handleEditAssignment = (data: AssignmentFormValues) => {
    console.log('Updated assignment data:', data);
    toast({
      title: 'Assignment Updated',
      description: `The assignment "${data.title}" has been successfully updated.`,
    });
    setIsEditDialogOpen(false);
    setEditingAssignment(null);
  };

  const handleDeleteClick = (assignment: Assignment) => {
    setDeletingAssignment(assignment);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingAssignment) {
      console.log('Deleting assignment:', deletingAssignment);
      toast({
        title: 'Assignment Deleted',
        description: `The assignment "${deletingAssignment.title}" has been deleted.`,
        variant: 'destructive',
      });
      setIsDeleteDialogOpen(false);
      setDeletingAssignment(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Assignments
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Assignment
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Assignment List</CardTitle>
          <CardDescription>
            A list of all assignments for all courses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map(assignment => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">
                    {assignment.title}
                  </TableCell>
                  <TableCell>{getCourseName(assignment.courseId)}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
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
                        <DropdownMenuItem
                          onClick={() => handleEditClick(assignment)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(assignment)}
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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Add New Assignment</DialogTitle>
            <DialogDescription>
              Enter the details of the new assignment. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <AssignmentForm
            onSubmit={handleAddAssignment}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {editingAssignment && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Edit Assignment</DialogTitle>
              <DialogDescription>
                Update the assignment details. Click save when done.
              </DialogDescription>
            </DialogHeader>
            <AssignmentForm
              onSubmit={handleEditAssignment}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingAssignment(null);
              }}
              initialValues={editingAssignment}
            />
          </DialogContent>
        </Dialog>
      )}
      
      {deletingAssignment && (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                assignment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeletingAssignment(null)}>
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
