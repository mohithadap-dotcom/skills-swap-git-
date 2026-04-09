"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Link as LinkIcon, HelpCircle, Trophy, Check, X, MousePointer2 } from "lucide-react";
import Link from "next/link";

export default function DebriefPage() {
  const [sessionContent, setSessionContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [debrief, setDebrief] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<any>({});

  const handleGenerate = async () => {
    if (!sessionContent) return;
    setLoading(true);

    // Simulate Grok response for debrief
    setTimeout(() => {
      setDebrief({
        summary: [
          "Mastered the difference between Stateless and Stateful widgets.",
          "Implemented a custom provider for global state management.",
          "Optimized widget rebuilds using 'const' constructors."
        ],
        resources: [
          { title: "Flutter State Management Docs", url: "#", type: "docs" },
          { title: "Advanced Provider Patterns", url: "#", type: "article" },
          { title: "Widget Lifecycle Deep Dive", url: "#", type: "video" }
        ],
        quiz: [
          {
            question: "Which widget is used for immutable UI?",
            options: ["StatefulWidget", "StatelessWidget", "InherentWidget", "ProxyWidget"],
            answer: "StatelessWidget"
          },
          {
            question: "What is the primary purpose of a Provider?",
            options: ["Networking", "State Management", "Routing", "Storage"],
            answer: "State Management"
          }
        ]
      });
      setLoading(false);
    }, 2000);
  };

  const checkAnswer = (qIndex: number, option: string) => {
    setQuizAnswers({ ...quizAnswers, [qIndex]: option });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-screen">
      <div className="space-y-12">
        <header className="text-center">
           <span className="font-mono text-xs tracking-[0.4em] text-primary uppercase">[ SESSION DEBRIEFER ]</span>
           <h2 className="text-4xl md:text-5xl font-black uppercase mt-4 tracking-tighter">Sync Your Progress.</h2>
        </header>

        {!debrief ? (
          <div className="glass p-10 space-y-8 border-white/10 ring-1 ring-white/5 shadow-2xl">
             <div className="space-y-4">
                <label className="font-mono text-[10px] tracking-widest text-muted uppercase">What did you learn/teach today?</label>
                <textarea
                   value={sessionContent}
                   onChange={(e) => setSessionContent(e.target.value)}
                   placeholder="Describe topics, sticky points, and breakthroughs..."
                   className="w-full h-40 bg-black/40 border border-white/5 p-6 font-mono text-sm focus:border-primary outline-none transition-all resize-none"
                />
             </div>
             
             <button
                onClick={handleGenerate}
                disabled={loading || !sessionContent}
                className="w-full py-5 bg-primary text-white font-bold uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
             >
                {loading ? "PROCESSING WITH GROK..." : "GENERATE AI DEBRIEF →"}
             </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
             {/* Credits Banner */}
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="bg-accent/10 border border-accent/30 p-6 flex items-center justify-between"
             >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-black">
                      <Trophy className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-mono text-lg font-bold text-accent">◈ 10 CREDITS EARNED</h4>
                      <p className="text-[10px] text-accent/60 uppercase tracking-widest">Session successfully logged</p>
                   </div>
                </div>
                <Check className="w-8 h-8 text-accent opacity-50" />
             </motion.div>

             {/* Summary */}
             <div className="space-y-6">
                <h4 className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase flex items-center gap-3">
                   <FileText className="w-4 h-4 text-primary" /> Key Takeaways
                </h4>
                <div className="grid grid-cols-1 gap-4">
                   {debrief.summary.map((line: string, i: number) => (
                     <div key={i} className="glass p-5 border-l-2 border-primary">
                        <p className="text-sm leading-relaxed">{line}</p>
                     </div>
                   ))}
                </div>
             </div>

             {/* Resources */}
             <div className="space-y-6">
                <h4 className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase flex items-center gap-3">
                   <LinkIcon className="w-4 h-4 text-primary" /> Curated Resources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {debrief.resources.map((res: any, i: number) => (
                      <a key={i} href={res.url} className="glass p-6 text-center hover:border-primary transition-all group">
                         <div className="text-2xl mb-3 opacity-50 group-hover:opacity-100 transition-opacity">
                            {res.type === 'video' ? '🎥' : res.type === 'docs' ? '📄' : '📚'}
                         </div>
                         <p className="text-[11px] font-bold uppercase tracking-tight">{res.title}</p>
                      </a>
                   ))}
                </div>
             </div>

             {/* Quiz */}
             <div className="space-y-6">
                <h4 className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase flex items-center gap-3">
                   <HelpCircle className="w-4 h-4 text-primary" /> Knowledge Check
                </h4>
                <div className="space-y-8">
                   {debrief.quiz.map((q: any, qi: number) => (
                      <div key={qi} className="glass p-8 space-y-6">
                         <p className="text-lg font-medium tracking-tight">Q: {q.question}</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((opt: string) => {
                               const isSelected = quizAnswers[qi] === opt;
                               const isCorrect = opt === q.answer;
                               return (
                                 <button
                                   key={opt}
                                   onClick={() => checkAnswer(qi, opt)}
                                   className={`p-4 text-left font-mono text-xs uppercase tracking-widest border transition-all ${
                                     isSelected 
                                       ? isCorrect ? 'bg-accent/20 border-accent text-accent' : 'bg-red-500/10 border-red-500/50 text-red-500' 
                                       : 'bg-white/3 border-white/5 hover:border-primary/50'
                                   }`}
                                 >
                                   {opt}
                                 </button>
                               );
                            })}
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="pt-10 flex justify-center">
                <Link href="/match" className="px-12 py-5 border border-white/20 text-muted font-bold tracking-[0.3em] uppercase hover:text-foreground hover:border-white transition-all">
                   RETURN TO MATCH ENGINE
                </Link>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
