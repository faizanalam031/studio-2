'use server';

/**
 * @fileOverview Analyzes incoming calls to determine the risk level and identify potential scam attempts.
 *
 * - analyzeIncomingCall - A function that handles the analysis of incoming calls.
 * - AnalyzeIncomingCallInput - The input type for the analyzeIncomingCall function.
 * - AnalyzeIncomingCallOutput - The return type for the analyzeIncomingCall function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeIncomingCallInputSchema = z.object({
  callerNumber: z.string().describe('The phone number of the incoming call.'),
});
export type AnalyzeIncomingCallInput = z.infer<typeof AnalyzeIncomingCallInputSchema>;

const AnalyzeIncomingCallOutputSchema = z.object({
  riskLevel: z.enum(['low', 'medium', 'high']).describe('The risk level of the incoming call.'),
  isPotentialScam: z.boolean().describe('Whether the incoming call is a potential scam attempt.'),
  reason: z.string().describe('The reason for the risk level assessment.'),
});
export type AnalyzeIncomingCallOutput = z.infer<typeof AnalyzeIncomingCallOutputSchema>;

export async function analyzeIncomingCall(input: AnalyzeIncomingCallInput): Promise<AnalyzeIncomingCallOutput> {
  return analyzeIncomingCallFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeIncomingCallPrompt',
  input: {schema: AnalyzeIncomingCallInputSchema},
  output: {schema: AnalyzeIncomingCallOutputSchema},
  prompt: `You are an AI assistant that analyzes incoming calls to determine the risk level and identify potential scam attempts.

  Analyze the following incoming call information:
  Caller Number: {{{callerNumber}}}

  Based on the caller number, determine the risk level (low, medium, or high) and whether it is a potential scam attempt.
  Provide a reason for your assessment.

  Respond in a JSON format with the following schema:
  {
    "riskLevel": "<risk_level>",
    "isPotentialScam": <true|false>,
    "reason": "<reason>"
  }`,
});

const analyzeIncomingCallFlow = ai.defineFlow(
  {
    name: 'analyzeIncomingCallFlow',
    inputSchema: AnalyzeIncomingCallInputSchema,
    outputSchema: AnalyzeIncomingCallOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
