'use server';

/**
 * @fileOverview A simple chatbot flow.
 *
 * - chat - A function that takes a message and returns a response from an AI model.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const ChatInputSchema = z.string();
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.string();
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(message: ChatInput): Promise<ChatOutput> {
  const llmResponse = await ai.generate({
    prompt: `You are a helpful assistant for the CampusFlow application. Please respond to the user's query.

    User Query: ${message}`,
  });
  return llmResponse.text;
}
