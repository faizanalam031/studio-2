import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages, apiKey } = await request.json();

    // Get API key from request body (client) or environment variable (server fallback)
    const OPENAI_API_KEY = apiKey || process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add your API key in Settings > OpenAI API Key Setup' },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const SYSTEM_PROMPT = `You are Suraksha Saathi's AI Crime and Safety Assistant. You provide helpful guidance on:
- Fraud and scam situations
- Cybercrime and hacking incidents
- Personal safety advice
- Emergency response guidance
- How to report crimes and file FIR
- What to do during or after a crime

Important guidelines:
1. Always be clear that you are an AI assistant and NOT a replacement for actual police or legal professionals
2. For immediate dangers (attacks, threats, violence), always recommend calling police emergency (100) immediately
3. Provide step-by-step, actionable advice
4. Be empathetic and supportive
5. Include relevant government resources and contact information where appropriate
6. Never provide illegal advice

When users mention danger keywords like "attack", "threat", "kidnap", "bleeding", or "immediate danger", prioritize recommending they call police emergency (100) immediately.`;

    // Format messages for OpenAI API
    const formattedMessages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      ...messages.map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content,
      })),
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      return NextResponse.json(
        { error: 'Failed to get response from OpenAI. Please check your API key.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return NextResponse.json({
      content: assistantMessage,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
