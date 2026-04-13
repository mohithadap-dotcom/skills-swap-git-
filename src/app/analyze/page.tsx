"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Search, Loader2, CheckCircle2 } from "lucide-react";
import { Radar } from "react-chartjs-2";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const TerminalLine = ({ text, delay }: { text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="font-mono text-sm mb-1 flex gap-2"
  >
    <span className="text-muted opacity-50">$</span>
    <span className={text.includes("Done") ? "text-accent" : "text-foreground"}>
      {text}
    </span>
  </motion.div>
);

const ScoreCard = ({ domain, score, reason, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.1 }}
      className="glass p-6 flex flex-col gap-3 group hover:border-primary/40 transition-colors"
    >
      <div className="flex justify-between items-center">
        <span className="font-bold uppercase text-[10px] tracking-[0.2em] text-foreground/80">{domain}</span>
        <span className="font-mono text-primary font-bold text-lg">{score}</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 1 + index * 0.1 }}
          className="h-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]"
        />
      </div>
      <p className="text-xs text-muted leading-relaxed font-medium uppercase tracking-tight">{reason}</p>
    </motion.div>
  );
};

export default function AnalyzePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlUser = params.get('u');

    if (urlUser) {
      setUsername(urlUser);
      // Wait a tick for the state to update, then click analyze
      setTimeout(() => {
        const btn = document.getElementById('analyze-btn');
        btn?.click();
      }, 100);
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const ghUser = session.user.user_metadata.user_name || session.user.user_metadata.preferred_username;
          if (ghUser) setUsername(ghUser);
        }
      });
    }
  }, []);

  const handleAnalyze = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setTerminalLines([]);

    const logLines = [
      "Fetching repositories...",
      "Reading commit history...",
      "Running Groq skill inference...",
      "Computing Skill-Value score...",
      "Done ✓",
    ];

    // Simulate logs
    logLines.forEach((line, i) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, line]);
      }, i * 700);
    });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Wait for terminal animations to "almost" finish
      setTimeout(() => {
        setResult(data);
        setLoading(false);
        // Store in localStorage for profile page
        localStorage.setItem("skillswap_analysis", JSON.stringify(data));
      }, 4000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const radarData = result ? {
    labels: Object.keys(result.analysis.scores),
    datasets: [
      {
        label: "Skill Scores",
        data: Object.values(result.analysis.scores).map((s: any) => s.score),
        backgroundColor: "rgba(99, 102, 241, 0.4)",
        borderColor: "#818cf8", // Brighter indigo
        borderWidth: 3,
        pointBackgroundColor: "#818cf8",
        pointBorderColor: "#fff",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  } : null;

  const radarOptions = {
    scales: {
      r: {
        angleLines: { 
          color: "rgba(255, 255, 255, 0.15)",
          lineWidth: 1
        },
        grid: { 
          color: "rgba(255, 255, 255, 0.15)",
          circular: false
        },
        pointLabels: {
          color: "#FFFFFF",
          font: { 
            family: "JetBrains Mono", 
            size: 14, // Slightly adjusted for better fit
            weight: "bold" as const
          },
          padding: 30 // Increased padding to prevent side-clipping
        },
        ticks: { 
          display: false, 
          stepSize: 20 
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: { family: "JetBrains Mono" },
        bodyFont: { family: "JetBrains Mono" },
        cornerRadius: 0,
        padding: 12
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Panel */}
        <div className={`lg:col-span-5 ${result ? 'hidden lg:block' : ''}`}>
          <div className="mb-10">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">[ GITHUB ANALYZER ]</span>
            <h2 className="text-4xl font-bold uppercase mt-2 tracking-tighter">What&apos;s your <br /> Skill-Value?</h2>
          </div>

          <div className="relative group mb-6">
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              className="w-full bg-black/40 border border-white/10 px-6 py-5 font-mono text-lg focus:outline-none focus:border-primary transition-all ring-0 focus:ring-2 focus:ring-primary/20"
            />
            <button
              id="analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-primary px-6 flex items-center justify-center hover:brightness-110 active:scale-95 transition-all text-white font-bold"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-muted mb-8 italic">We read your public repos. No auth required.</p>

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-black/60 border border-white/5 p-6 rounded-none min-h-[160px]"
              >
                {terminalLines.map((line, i) => (
                  <TerminalLine key={i} text={line} delay={0} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="mt-4 p-4 border border-red-500/20 bg-red-500/5 text-red-500 text-sm font-mono">
              Error: {error}
            </div>
          )}
        </div>

        {/* Right Panel / Results */}
        <div className="lg:col-span-12 xl:col-span-7">
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-white/3 p-8 hairline-t ring-1 ring-white/5">
                  <div className="relative">
                    <img
                      src={result.profile.avatar}
                      alt="Avatar"
                      className="w-32 h-32 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-[#080808]"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-accent p-1.5 rounded-full text-black shadow-lg">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold uppercase tracking-tighter">{result.profile.name}</h3>
                    <p className="text-muted text-sm my-2 max-w-md">{result.profile.bio}</p>
                    <div className="flex gap-6 justify-center md:justify-start mt-4">
                      <div className="text-center">
                        <div className="font-mono text-xl font-bold text-foreground">{result.analysis.skill_value}</div>
                        <div className="font-mono text-[9px] text-muted tracking-widest uppercase">SKILL-VALUE</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-xl font-bold text-foreground">{result.profile.followers}</div>
                        <div className="font-mono text-[9px] text-muted tracking-widest uppercase">FOLLOWERS</div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-xl font-bold text-accent uppercase">{result.analysis.top_skill}</div>
                        <div className="font-mono text-[9px] text-muted tracking-widest uppercase">TOP SKILL</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Analysis Results */}
                <div className="space-y-12">
                  {/* FULL WIDTH RADAR */}
                  <div className="glass p-12 flex flex-col items-center justify-center min-h-[600px] w-full">
                    <h4 className="font-mono text-sm tracking-[0.8em] text-primary font-black uppercase mb-16 border-b-2 border-primary/30 pb-3">SKILL DISTRIBUTION</h4>
                    <div className="w-full h-[500px] relative">
                      {radarData && <Radar data={radarData} options={radarOptions} />}
                    </div>
                  </div>

                  {/* SUMMARY & SCORES */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 bg-primary/5 border-l-2 border-primary p-8 h-full">
                      <h4 className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-4">AI ASSESSMENT</h4>
                      <p className="text-lg leading-relaxed text-foreground/90 font-medium italic">&quot;{result.analysis.summary}&quot;</p>
                    </div>
                    
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {Object.entries(result.analysis.scores).map(([domain, data]: any, i) => (
                         <ScoreCard key={domain} domain={domain} {...data} index={i} />
                       ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-10 pb-20">
                  <Link
                    href="/profile"
                    className="px-16 py-6 bg-white text-black font-black uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-2xl shadow-accent/40 text-lg active:scale-95"
                  >
                    Generate Portfolio →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
