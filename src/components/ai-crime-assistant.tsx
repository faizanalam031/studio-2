"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Bot, Phone, Send, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const DANGER_KEYWORDS = ["attack", "threat", "kidnap", "assault", "violence", "bleeding", "injury", "emergency", "danger", "help now"];

export default function AICrimeAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "👋 Hello! I'm Suraksha Saathi's AI Crime and Safety Assistant. I can help you with guidance on fraud, scams, cybercrime, personal safety, and emergency response.\n\nFeel free to ask me anything related to crime or safety situations. What can I help you with today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [showPoliceConfirm, setShowPoliceConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getDangerLevel = (text: string): boolean => {
    return DANGER_KEYWORDS.some(keyword => text.toLowerCase().includes(keyword));
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const isDangerous = getDangerLevel(input);
      
      // Get API key from localStorage
      const apiKey = typeof window !== 'undefined' ? localStorage.getItem('openai_api_key') : null;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages.map(msg => ({
            type: msg.type,
            content: msg.content,
          })).concat([{ type: "user", content: input }]),
          apiKey: apiKey, // Send API key from localStorage to backend
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response from AI");
      }

      const data = await response.json();
      let assistantContent = data.content;

      if (isDangerous) {
        assistantContent += "\n\n⚠️ **URGENT**: I detected potentially dangerous keywords in your message. If you or anyone is in immediate danger, please call Police Emergency (100) right away.";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(errorMessage);
      
      const errorAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `❌ Sorry, I encountered an error: ${errorMessage}\n\nPlease make sure you have set your OpenAI API key in Settings > OpenAI API Key Setup.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorAssistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePoliceCall = () => {
    const emergencyNumber = "100";
    window.location.href = `tel:${emergencyNumber}`;
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex gap-2">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="text-sm text-destructive">{error}</div>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-in fade-in-0 slide-in-from-bottom-2",
                  message.type === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.type === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-xs md:max-w-md rounded-lg p-3 text-sm whitespace-pre-wrap",
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </div>

      <div className="border-t p-4 space-y-3 bg-background/95 backdrop-blur">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => setShowPoliceConfirm(true)}
          size="lg"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          Police Emergency Call (100)
        </Button>

        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything about crime, safety, or scams..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showPoliceConfirm} onOpenChange={setShowPoliceConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Call Police Emergency?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will open your phone's dialer and call the police emergency number (100). Continue only if you're in immediate danger or need emergency assistance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
            Your safety is the priority. If you're in immediate danger, call now.
          </div>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePoliceCall}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Call Police (100)
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
