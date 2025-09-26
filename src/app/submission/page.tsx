
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/dashboard-layout';
import { assignments, students } from '@/lib/mock-data';
import { Loader2, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
// We can't use 'pdf-parse/lib/pdf-parse.js' directly in the browser.
// A browser-compatible library or a different approach is needed.
// For this example, we will simulate the text extraction.

const formSchema = z.object({
  studentId: z.string({ required_error: 'Please select a student.' }),
  assignmentId: z.string({ required_error: 'Please select an assignment.' }),
  file:
    typeof window === 'undefined'
      ? z.any()
      : z.instanceof(FileList).refine(files => files.length > 0, 'File is required.'),
  submissionText: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmissionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { register, setValue, watch } = form;
  const fileList = watch('file');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue('file', files);
      extractTextFromFile(files[0]);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
       setValue('file', files);
       extractTextFromFile(files[0]);
    }
  };

  const extractTextFromFile = (file: File) => {
    if (file.type === 'application/pdf') {
      // PDF text extraction is complex on the client-side and would require a library
      // like pdf.js. For this demo, we'll just show a placeholder.
      toast({
        title: 'PDF Detected',
        description: 'Text extraction from PDFs is for demonstration. Full implementation would require a client-side PDF parsing library.',
      });
      setValue('submissionText', `Extracted text from ${file.name} would appear here.`);

    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setValue('submissionText', text);
         toast({
          title: 'Text File Loaded',
          description: 'The content of the text file has been loaded.',
        });
      };
      reader.readAsText(file);
    } else {
        toast({
            variant: 'destructive',
            title: 'Unsupported File Type',
            description: 'Please upload a PDF or a plain text file.',
        });
    }
  };


  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    console.log('Submission Data:', {
        ...data,
        file: data.file?.[0]?.name,
    });
    // Here you would typically send the data.submissionText to an AI flow
    try {
        // Example: await gradeSubmission({ text: data.submissionText });
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI call
        toast({
            title: 'Submission Received',
            description: "The assignment has been submitted and is ready for AI processing.",
        });
        form.reset();
        setValue('file', new DataTransfer().files); // Clear file input
        setValue('submissionText', '');
    } catch (error) {
       console.error('Error submitting for grading:', error);
       toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'There was an error processing your submission.',
      });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Submit Assignment</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Assignment Submission</CardTitle>
          <CardDescription>
            Select the student, assignment, and upload the submission file.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Student</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a student" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {students.map(student => (
                            <SelectItem key={student.id} value={student.id}>
                                {student.firstName} {student.lastName}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="assignmentId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Assignment</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select an assignment" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {assignments.map(assignment => (
                            <SelectItem key={assignment.id} value={assignment.id}>
                                {assignment.title}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Submission File</FormLabel>
                    <FormControl>
                       <div
                        className={cn(
                            "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/75 transition-colors",
                            { 'border-primary bg-primary/10': dragActive }
                        )}
                        onDragEnter={() => setDragActive(true)}
                        onDragLeave={() => setDragActive(false)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        >
                        <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
                        <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PDF or TXT files</p>
                        <Input
                            {...register('file')}
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".pdf,.txt"
                            onChange={handleFileChange}
                        />
                        </div>
                    </FormControl>
                     {fileList && fileList.length > 0 && (
                        <div className="text-sm text-muted-foreground pt-2">
                            Selected file: {fileList[0].name}
                        </div>
                     )}
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="submissionText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extracted Text (for AI Processing)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Text from your file will appear here..."
                          className="min-h-[150px] font-mono text-xs"
                          readOnly
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This text will be sent to the AI for grading or analysis.
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
                Submit for AI Analysis
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </DashboardLayout>
  );
}
