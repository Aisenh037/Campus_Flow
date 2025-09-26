'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/ai-schedule-generation.ts';
import '@/ai/flows/chatbot.ts';
import '@/ai/flows/ai-grading.ts';
