'use server';

/**
 * @fileOverview This file defines a Genkit flow for grading student submissions using AI.
 * It takes the assignment details and the student's submission text to generate a grade and feedback.
 *
 * @fileOverview gradeSubmission - A function that grades a student's submission.
 * @fileOverview GradeSubmissionInput - The input type for the gradeSubmission function.
 * @fileOverview GradeSubmissionOutput - The return type for the gradeSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { GradeSubmissionInputSchema, GradeSubmissionOutputSchema } from '@/types/grading';

export type GradeSubmissionInput = z.infer<typeof GradeSubmissionInputSchema>;
export type GradeSubmissionOutput = z.infer<typeof GradeSubmissionOutputSchema>;

export async function gradeSubmission(input: GradeSubmissionInput): Promise<GradeSubmissionOutput> {
  return gradeSubmissionFlow(input);
}

const gradeSubmissionPrompt = ai.definePrompt({
  name: 'gradeSubmissionPrompt',
  input: {schema: GradeSubmissionInputSchema},
  output: {schema: GradeSubmissionOutputSchema},
  prompt: `You are an AI teaching assistant. Your task is to grade a student's submission based on the assignment requirements.

  Assignment Title: {{{assignmentTitle}}}
  Assignment Description: {{{assignmentDescription}}}

  Student Submission:
  ---
  {{{submissionText}}}
  ---

  Please provide a fair grade between 0 and 100, and offer constructive feedback to help the student improve.
  The feedback should be encouraging and highlight both strengths and areas for improvement. Do not just list mistakes.
  Analyze the submission for potential plagiarism. If the text seems generic, unoriginal, or copied from a common source, set the isPlagiarized flag to true.
`,
});

const gradeSubmissionFlow = ai.defineFlow(
  {
    name: 'gradeSubmissionFlow',
    inputSchema: GradeSubmissionInputSchema,
    outputSchema: GradeSubmissionOutputSchema,
  },
  async input => {
    const {output} = await gradeSubmissionPrompt(input);
    return output!;
  }
);
