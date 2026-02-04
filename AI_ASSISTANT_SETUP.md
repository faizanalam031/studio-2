# AI Assistant Setup - OpenAI ChatGPT Integration

## Prerequisites

You need an OpenAI API key to use the AI assistant. Follow these steps:

### 1. Get OpenAI API Key

1. Go to https://platform.openai.com/account/api-keys
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the API key (you won't be able to see it again)

### 2. Set Environment Variable

Create a `.env.local` file in the root of your project:

```bash
OPENAI_API_KEY=sk-your-api-key-here
```

Replace `sk-your-api-key-here` with your actual API key.

### 3. Install Dependencies

The project should already have the necessary dependencies, but if you need to reinstall:

```bash
npm install
```

### 4. Restart the Development Server

After adding the environment variable, restart your Next.js server:

```bash
npm run dev
```

## How It Works

1. **User sends a message** → Sent to `/api/chat` endpoint
2. **API processes message** → Calls OpenAI ChatGPT API
3. **AI generates response** → Based on your question
4. **Response displayed** → Shown in the chat interface

## Features

✅ **Real ChatGPT Integration** - Uses OpenAI's GPT-3.5-turbo model
✅ **Crime & Safety Focus** - System prompt guides AI to provide relevant guidance
✅ **Danger Detection** - Monitors for emergency keywords and suggests police contact
✅ **Error Handling** - Clear error messages if API key is missing or invalid
✅ **Conversation History** - Maintains context across multiple messages

## Pricing

OpenAI API usage is pay-as-you-go:
- **gpt-3.5-turbo**: ~$0.0005 per 1K tokens
- Typical conversation: 2-5 cents per exchange

Monitor your usage at https://platform.openai.com/account/billing/overview

## Troubleshooting

**Error: "OpenAI API key not configured"**
- Check that `.env.local` exists in the project root
- Verify `OPENAI_API_KEY=sk-...` is set correctly
- Restart the dev server after adding the key

**Error: "Failed to get response from OpenAI"**
- Check your API key is valid at https://platform.openai.com/account/api-keys
- Verify you have credits/billing set up
- Check your API usage limits

**Slow responses**
- Network latency - OpenAI API can take 1-3 seconds
- Try again with a simpler question
- Check your internet connection

## API Endpoint

The AI assistant uses: **POST /api/chat**

Request format:
```json
{
  "messages": [
    {
      "type": "user",
      "content": "Your question here"
    },
    {
      "type": "assistant",
      "content": "Previous response"
    }
  ]
}
```

Response format:
```json
{
  "content": "AI's response to your question"
}
```

## Security Notes

- Keep your API key secret - never commit it to version control
- The `.env.local` file is already in `.gitignore`
- Each API call is authenticated with your private key
- OpenAI logs conversations for safety/improvement purposes

---

For more information: https://platform.openai.com/docs/guides/gpt
