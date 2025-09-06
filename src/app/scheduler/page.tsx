'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/dashboard-layout';
import { scheduleGeneration } from '@/ai/flows/ai-schedule-generation';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  instructorAvailability: z
    .string()
    .min(10, 'Please provide detailed instructor availability.'),
  roomCapacity: z.string().min(10, 'Please provide detailed room capacities.'),
  coursePreferences: z
    .string()
    .min(10, 'Please provide detailed course preferences.'),
  constraints: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  instructorAvailability:
    'Prof. Smith: Mon 9am-11am, Wed 1pm-3pm\nProf. Jones: Tue 10am-12pm, Thu 2pm-4pm',
  roomCapacity: 'Room 101: 30 students\nRoom 202: 50 students',
  coursePreferences:
    'CS101: 2 hours, prefers morning\nMath201: 1.5 hours, prefers afternoon',
  constraints: 'No classes on Friday afternoons.',
};

export default function SchedulerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState('');
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setGeneratedSchedule('');
    try {
      const result = await scheduleGeneration(data);
      setGeneratedSchedule(result.schedule);
      toast({
        title: 'Schedule Generated',
        description: 'The AI has successfully generated a new schedule.',
      });
    } catch (error) {
      console.error('Error generating schedule:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description:
          'The AI could not generate a schedule. Please check your inputs.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">AI Scheduler</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Generate Course Schedule</CardTitle>
            <CardDescription>
              Input the constraints and let AI create a conflict-free schedule.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="instructorAvailability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor Availability</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Prof. Smith: Mon 9am-11am, Wed 1pm-3pm"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Capacity</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Room 101: 30 students"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coursePreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., CS101: 2 hours, prefers morning"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="constraints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Constraints</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., No classes on Fridays"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Any other rules to follow.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate Schedule
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Schedule</CardTitle>
            <CardDescription>
              The AI-generated schedule will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {generatedSchedule && !isLoading && (
              <pre className="p-4 bg-muted rounded-md whitespace-pre-wrap font-body text-sm">
                {generatedSchedule}
              </pre>
            )}
            {!generatedSchedule && !isLoading && (
              <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Waiting for input...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
