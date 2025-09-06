'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating course schedules using AI.
 * It takes into account instructor availability, room capacity, and course preferences to create a conflict-free schedule.
 *
 * @fileOverview scheduleGenerationFlow - A function that generates conflict-free course schedules.
 * @fileOverview ScheduleGenerationInput - The input type for the scheduleGeneration function.
 * @fileOverview ScheduleGenerationOutput - The return type for the scheduleGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScheduleGenerationInputSchema = z.object({
  instructorAvailability: z
    .string()
    .describe('A string detailing the availability of each instructor.'),
  roomCapacity: z
    .string()
    .describe('A string describing the capacity of each room.'),
  coursePreferences: z
    .string()
    .describe(
      'A string describing the preferences for each course, including duration and timing.'
    ),
  constraints: z
    .string()
    .optional()
    .describe('Optional: Additional constraints for the schedule generation.'),
});

export type ScheduleGenerationInput = z.infer<typeof ScheduleGenerationInputSchema>;

const ScheduleGenerationOutputSchema = z.object({
  schedule: z.string().describe('The generated course schedule in a readable format.'),
});

export type ScheduleGenerationOutput = z.infer<typeof ScheduleGenerationOutputSchema>;

export async function scheduleGeneration(input: ScheduleGenerationInput): Promise<ScheduleGenerationOutput> {
  return scheduleGenerationFlow(input);
}

const scheduleGenerationPrompt = ai.definePrompt({
  name: 'scheduleGenerationPrompt',
  input: {schema: ScheduleGenerationInputSchema},
  output: {schema: ScheduleGenerationOutputSchema},
  prompt: `You are an AI scheduling assistant tasked with generating conflict-free course schedules.

  Consider the following information when generating the schedule:

  Instructor Availability: {{{instructorAvailability}}}
  Room Capacity: {{{roomCapacity}}}
  Course Preferences: {{{coursePreferences}}}

  {{#if constraints}}
  Additional Constraints: {{{constraints}}}
  {{/if}}

  Generate a course schedule that respects all constraints and preferences. The schedule should be easy to read and understand.
  The schedule should include the course name, instructor, room, and time.
  If it's impossible to generate a schedule, please explain why.

  Output the schedule as a single string.
`,
});

const scheduleGenerationFlow = ai.defineFlow(
  {
    name: 'scheduleGenerationFlow',
    inputSchema: ScheduleGenerationInputSchema,
    outputSchema: ScheduleGenerationOutputSchema,
  },
  async input => {
    const {output} = await scheduleGenerationPrompt(input);
    return output!;
  }
);
