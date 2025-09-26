import { z } from 'zod';

export const GradeSubmissionInputSchema = z.object({
    assignmentTitle: z.string().describe("The title of the assignment."),
    assignmentDescription: z.string().describe("The description of the assignment requirements."),
    submissionText: z.string().describe("The text of the student's submission."),
});

export const GradeSubmissionOutputSchema = z.object({
    grade: z.number().describe('The suggested grade for the submission, from 0 to 100.'),
    feedback: z.string().describe('Constructive feedback for the student.'),
    isPlagiarized: z.boolean().describe('Whether the submission is likely to be plagiarized.'),
});
