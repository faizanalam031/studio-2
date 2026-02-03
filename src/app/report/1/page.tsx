"use client";

import AppLayout from "@/components/app-layout";
import { callHistory, Call } from "@/lib/data";
import { notFound, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, Share2, ShieldCheck, AlertTriangle, BadgeCheck, Bot, User, Wallet, Landmark, Link2, Play, Pause, Music } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function ReportPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '1';
  const call: Call | undefined = callHistory.find(c => c.id === id);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { toast } = useToast();
  const [formattedTimestamp, setFormattedTimestamp] = useState('');

  useEffect(() => {
    if (call) {
      setFormattedTimestamp(new Date(call.timestamp).toLocaleString());
    }
  }, [call]);

  if (!call) {
    notFound();
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'AI-Handled':
        return <ShieldCheck className="h-6 w-6 text-accent" />;
      case 'Scam':
        return <AlertTriangle className="h-6 w-6 text-destructive" />;
      case 'Safe':
        return <BadgeCheck className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          toast({
            variant: "destructive",
            title: "Audio Error",
            description: "Could not play the audio file.",
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleShare = async () => {
    const shareData = {
      title: 'AI Guardian: Scam Call Evidence',
      text: `Evidence from a scam call with ${call.caller}. Listen to the recording.`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Report link copied to clipboard.",
      });
    }
  };

  const handleShareAudio = async () => {
    if (!call.audioUrl) {
      toast({
        variant: "destructive",
        title: "Audio Not Found",
        description: "There is no audio recording to share.",
      });
      return;
    }

    const audioUrl = new URL(call.audioUrl, window.location.origin).href;

    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const file = new File([blob], "call_recording.mp3", { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `Call recording from ${call.caller}`,
          text: `Listen to the call recording from a suspected scam call.`,
          files: [file],
        });
      } else {
        navigator.clipboard.writeText(audioUrl);
        toast({
          title: "Audio Link Copied",
          description: "A shareable link to the audio has been copied to your clipboard.",
        });
      }
    } catch (err) {
      console.error("Could not share audio:", err);
      navigator.clipboard.writeText(audioUrl);
      toast({
        title: "Audio Link Copied",
        description: "File sharing is not supported, so a link was copied to your clipboard instead.",
      });
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6 flex justify-between items-center">
          <div>
            <h1 className="font-headline text-2xl md:text-3xl font-bold">Evidence Report</h1>
            <p className="text-muted-foreground">Call from: {call.caller}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleShare}><Share2 className="h-4 w-4" /></Button>
            <Button><Download className="h-4 w-4 mr-2" /> Download Report</Button>
          </div>
        </header>
        
        <ScrollArea className="flex-1">
          <div className="p-4 md:p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Call Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  {getIconForType(call.type)}
                  <div>
                    <p className="text-sm text-muted-foreground">Outcome</p>
                    <p className="font-semibold">{call.type}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-semibold">{formattedTimestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{call.duration}</p>
                </div>
              </CardContent>
            </Card>

            {call.audioUrl && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-3">
                    <Music className="w-5 h-5 text-primary"/>
                    <CardTitle className="text-xl">Call Recording</CardTitle>
                  </div>
                  <Button variant="outline" size="icon" onClick={handleShareAudio}>
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share Recording</span>
                  </Button>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <Button size="icon" variant="outline" onClick={togglePlay}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <div className="flex-1 space-y-1">
                        <Progress value={progress} className="h-2" />
                         <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                    </div>
                    <audio
                      ref={audioRef}
                      src={call.audioUrl}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={() => setIsPlaying(false)}
                      preload="metadata"
                      className="hidden"
                    />
                </CardContent>
              </Card>
            )}

            {call.scamData && (
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2"><AlertTriangle/>Extracted Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Wallet className="h-4 w-4"/>UPI IDs</h4>
                    {call.scamData.upiIds.length > 0 ? call.scamData.upiIds.map(id => <Badge key={id} variant="outline">{id}</Badge>) : <p className="text-sm text-muted-foreground">None</p>}
                  </div>
                  <Separator/>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Landmark className="h-4 w-4"/>Bank Accounts</h4>
                    {call.scamData.bankAccounts.length > 0 ? call.scamData.bankAccounts.map(acc => <Badge key={acc} variant="outline">{acc}</Badge>) : <p className="text-sm text-muted-foreground">None</p>}
                  </div>
                   <Separator/>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Link2 className="h-4 w-4"/>Suspicious Links</h4>
                    {call.scamData.suspiciousLinks.length > 0 ? call.scamData.suspiciousLinks.map(link => <Badge key={link} variant="outline">{link}</Badge>) : <p className="text-sm text-muted-foreground">None</p>}
                  </div>
                   <Separator/>
                   <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><AlertTriangle className="h-4 w-4"/>Identified Risk Factors</h4>
                    <div className="flex flex-wrap gap-2">
                      {call.scamData.riskFactors.map(factor => <Badge key={factor} variant="destructive">{factor}</Badge>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {call.transcript && (
              <Card>
                <CardHeader>
                  <CardTitle>Full Conversation Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] w-full p-4 border rounded-md">
                     <div className="space-y-4">
                      {call.transcript.map((item, index) => (
                        <div key={index} className={cn(
                          "flex items-start gap-3",
                          item.speaker === 'AI' ? "justify-start" : "justify-start"
                        )}>
                           <div className="flex-shrink-0">
                            {item.speaker === 'AI' ? <Bot className="h-6 w-6 text-primary" /> : <User className="h-6 w-6 text-muted-foreground" />}
                          </div>
                          <div className="w-full">
                            <p className={cn("font-semibold", item.speaker === 'AI' ? 'text-primary' : '')}>{item.speaker}</p>
                             <p className="text-foreground/90">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  );
}
