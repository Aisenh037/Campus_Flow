import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookCopy } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { courses, students } from "@/lib/mock-data";

export default function Dashboard() {
  const totalStudents = students.length;
  const totalCourses = courses.length;

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Currently enrolled in the institute
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Courses
              </CardTitle>
              <BookCopy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                Offered in the current semester
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="font-headline">Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <p>Welcome to CampusFlow, your integrated solution for managing students, courses, and schedules efficiently. Use the navigation on the left to explore different sections of the application.</p>
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle className="font-headline">Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground">
                A brief log of recent activities will be shown here.
              </p>
            </CardHeader>
            <CardContent>
              {/* Placeholder for recent activity feed */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">No recent activity.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
