'use server';

/**
 * @fileOverview An AI agent that takes over interactions during suspected scam calls, engaging with scammers and extracting intelligence.
 *
 * - aiAgentTakeover - A function that allows the AI agent to take over interactions during suspected scam calls.
 * - AiAgentTakeoverInput - The input type for the aiAgentTakeover function.
 * - AiAgentTakeoverOutput - The return type for the aiAgentTakeover function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiAgentTakeoverInputSchema = z.object({
  callTranscript: z.string().describe('The transcript of the call up to the point where the AI agent is taking over.'),
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The risk level associated with the call.'),
});
export type AiAgentTakeoverInput = z.infer<typeof AiAgentTakeoverInputSchema>;

const AiAgentTakeoverOutputSchema = z.object({
  aiResponse: z.string().describe('The AI agent\'s response to the scammer.'),
  extractedIntelligence: z.string().describe('Any intelligence extracted from the scammer during the interaction.'),
});
export type AiAgentTakeoverOutput = z.infer<typeof AiAgentTakeoverOutputSchema>;

export async function aiAgentTakeover(input: AiAgentTakeoverInput): Promise<AiAgentTakeoverOutput> {
  return aiAgentTakeoverFlow(input);
}

const offerInformationTool = ai.defineTool({
  name: 'offerInformation',
  description: 'Decides when to offer information to the other participant in the conversation.',
  inputSchema: z.object({
    informationType: z.string().describe('The type of information to offer, e.g., UPI ID, bank account details, etc.'),
    reason: z.string().describe('The reason for offering the information.'),
  }),
  outputSchema: z.boolean().describe('Whether or not to offer the information.'),
}, async (input) => {
  // Here you could implement the logic to determine whether to offer the information.
  // For now, we'll just return true.
  return true;
});

const aiAgentTakeoverPrompt = ai.definePrompt({
  name: 'aiAgentTakeoverPrompt',
  input: {schema: AiAgentTakeoverInputSchema},
  output: {schema: AiAgentTakeoverOutputSchema},
  tools: [offerInformationTool],
  prompt: `You are an AI agent designed to take over interactions during suspected scam calls.

  Your goal is to engage the scammer, extract intelligence, and protect the user.

  The current call transcript is:
  {{callTranscript}}

  The risk level associated with this call is: {{riskLevel}}

  Based on the call transcript and risk level, generate a response to the scammer.

  Also, extract any intelligence from the scammer during the interaction.

  If the opportunity arises, you can use the offerInformation tool to offer information to the scammer.
  Consider the context of the conversation and the scammer's behavior when deciding whether to offer information.
  Do not offer the information unless it makes sense in the context of the conversation.
  Do not make assumptions about what the scammer wants or needs.
`,
});

const aiAgentTakeoverFlow = ai.defineFlow(
  {
    name: 'aiAgentTakeoverFlow',
    inputSchema: AiAgentTakeoverInputSchema,
    outputSchema: AiAgentTakeoverOutputSchema,
  },
  async input => {
    const {output} = await aiAgentTakeoverPrompt(input);
    return output!;
  }
);
