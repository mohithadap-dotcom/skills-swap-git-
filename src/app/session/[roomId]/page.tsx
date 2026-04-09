"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MessageSquare, PhoneOff, Sparkles, User, Info } from "lucide-react";

export default function SessionRoom() {
  const { roomId } = useParams();
  const router = useRouter();
  const [timer, setTimer] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAIHint = async () => {
    setLoadingHint(true);
    // Simulate Grok call
    setTimeout(() => {
      setHint("Explain the Virtual DOM by comparing it to a draft of a document before publishing.");
      setLoadingHint(false);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div className="h-full flex flex-col lg:flex-row">
        {/* Main Meet Area */}
        <div className="flex-1 bg-black p-4 relative">
           <iframe
              src={`https://meet.jit.si/skillswap-${roomId}`}
              className="w-full h-full rounded-none border-0"
              allow="camera; microphone; display-capture; fullscreen"
           />
           <div className="absolute top-8 left-8">
              <div className="px-4 py-2 glass flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#A3E635]" />
                 <span className="font-mono text-xs tracking-widest uppercase">Live Session</span>
              </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 glass-no-blur bg-[#0a0a0a] border-l border-white/5 flex flex-col">
           {/* Header */}
           <div className="p-8 border-b border-white/5">
              <div className="flex justify-between items-center mb-6">
                 <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">[ SESSION ACTIVE ]</span>
                 <div className="font-mono text-2xl font-bold tracking-tighter">{formatTime(timer)}</div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/3 p-4 border border-white/5">
                 <img src="https://i.pravatar.cc/150?u=arjun" className="w-10 h-10 rounded-full" />
                 <div>
                    <h4 className="text-sm font-bold uppercase tracking-tight">Arjun Sharma</h4>
                    <p className="text-[10px] text-muted font-mono uppercase">Teaching: Flutter</p>
                 </div>
              </div>
           </div>

           {/* AI Helper Section */}
           <div className="flex-1 p-8 space-y-8 overflow-y-auto">
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h5 className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">AI Peer-Assistant</h5>
                    <Sparkles className="w-4 h-4 text-primary" />
                 </div>
                 
                 <AnimatePresence mode="wait">
                    {hint ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 bg-primary/5 border border-primary/20 text-sm leading-relaxed"
                      >
                         <div className="flex items-center gap-2 mb-3 text-primary">
                            <Info className="w-4 h-4" />
                            <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Grok Tip</span>
                         </div>
                         {hint}
                      </motion.div>
                    ) : (
                      <button 
                        onClick={getAIHint}
                        disabled={loadingHint}
                        className="w-full py-4 border border-dashed border-white/20 text-muted hover:text-foreground hover:border-primary transition-all text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-3"
                      >
                         {loadingHint ? "Asking Grok..." : "Get Session Tip"}
                      </button>
                    )}
                 </AnimatePresence>
              </div>

              <div className="space-y-4">
                 <h5 className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">Session Goals</h5>
                 <div className="space-y-2">
                    {["Understand State Management", "Build a simple counter", "Navigate between screens"].map((goal, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-muted">
                         <div className="w-1 h-1 bg-white/20" />
                         {goal}
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Footer Action */}
           <div className="p-8 border-t border-white/5">
              <button 
                onClick={() => router.push(`/debrief?roomId=${roomId}`)}
                className="w-full py-5 bg-red-600/10 border border-red-600/30 text-red-500 font-bold uppercase text-xs tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 group"
              >
                 <PhoneOff className="w-4 h-4 group-hover:animate-bounce" />
                 END SESSION
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
