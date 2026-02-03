'use server';

/**
 * @fileOverview This file contains the Genkit flow for the ScamIntelligencePanel feature.
 *
 * The flow is responsible for extracting entities such as UPI IDs, bank accounts, and suspicious links
 * from the conversation transcript during an AI-handled call.
 *
 * - extractScamIntelligence - A function that initiates the scam intelligence extraction process.
 * - ExtractScamIntelligenceInput - The input type for the extractScamIntelligence function.
 * - ExtractScamIntelligenceOutput - The return type for the extractScamIntelligence function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractScamIntelligenceInputSchema = z.object({
  transcript: z
    .string()
    .describe('The conversation transcript from the AI-handled call.'),
});
export type ExtractScamIntelligenceInput = z.infer<
  typeof ExtractScamIntelligenceInputSchema
>;

const ExtractScamIntelligenceOutputSchema = z.object({
  upiIds: z.array(z.string()).describe('List of UPI IDs found in the transcript.'),
  bankAccounts: z
    .array(z.string())
    .describe('List of bank account numbers found in the transcript.'),
  suspiciousLinks: z
    .array(z.string())
    .describe('List of suspicious links found in the transcript.'),
  riskFactors: z
    .array(z.string())
    .describe('List of risk factors identified in the transcript'),
});
export type ExtractScamIntelligenceOutput = z.infer<
  typeof ExtractScamIntelligenceOutputSchema
>;

export async function extractScamIntelligence(
  input: ExtractScamIntelligenceInput
): Promise<ExtractScamIntelligenceOutput> {
  return extractScamIntelligenceFlow(input);
}

const extractScamIntelligencePrompt = ai.definePrompt({
  name: 'extractScamIntelligencePrompt',
  input: {schema: ExtractScamIntelligenceInputSchema},
  output: {schema: ExtractScamIntelligenceOutputSchema},
  prompt: `You are an AI assistant specializing in identifying scam tactics.
  Analyze the following conversation transcript and extract potential scam indicators.
  Identify and extract all UPI IDs, bank account numbers, suspicious links, and risk factors present in the text.

  Transcript: {{{transcript}}}

  Output the information in JSON format.
  Include riskFactors by identifying tactics such as urgency, threats, or requests for sensitive information.
  If no entities are found return empty arrays for each field.
  `,
});

const extractScamIntelligenceFlow = ai.defineFlow(
  {
    name: 'extractScamIntelligenceFlow',
    inputSchema: ExtractScamIntelligenceInputSchema,
    outputSchema: ExtractScamIntelligenceOutputSchema,
  },
  async input => {
    const {output} = await extractScamIntelligencePrompt(input);
    return output!;
  }
);
