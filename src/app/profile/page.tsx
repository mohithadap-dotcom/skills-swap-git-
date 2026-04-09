"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radar } from "react-chartjs-2";
import { Shield, Award, Clock, MapPin, University, Sparkles } from "lucide-react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [college, setCollege] = useState("VNIT");
  const [learningPath, setLearningPath] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("skillswap_analysis");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted font-mono mb-4 uppercase tracking-widest">[ NO PROFILE DATA FOUND ]</p>
          <a href="/analyze" className="px-8 py-4 bg-primary text-white font-bold uppercase">Go to Analyzer →</a>
        </div>
      </div>
    );
  }

  const colleges = ["VNIT", "YCCE", "RCOEM", "PCE Nagpur"];
  const skillDomains = ["Flutter", "Web Development", "UI Design", "Machine Learning", "DSA", "Vibe Coding", "Mobile Dev"];

  const radarData = {
    labels: Object.keys(userData.analysis.scores),
    datasets: [
      {
        label: "My Skills",
        data: Object.values(userData.analysis.scores).map((s: any) => s.score),
        backgroundColor: "rgba(99, 102, 241, 0.3)",
        borderColor: "#6366F1",
        borderWidth: 2,
        pointBackgroundColor: "#6366F1",
      },
    ],
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile Saved! Welcome to the SkillSwap Nagpur community.");
      window.location.href = "/match";
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Identity */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass p-8 flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
                <div className="font-mono text-[10px] text-accent flex items-center gap-1">
                   <Sparkles className="w-3 h-3" /> VERIFIED
                </div>
             </div>
             
             <div className="w-32 h-32 rounded-full ring-4 ring-primary p-1 mb-6">
                <img src={userData.profile.avatar} className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all cursor-pointer" />
             </div>
             
             <h2 className="text-2xl font-bold uppercase tracking-tight">{userData.profile.name}</h2>
             <p className="text-sm text-muted font-mono mt-1">@{userData.profile.name.toLowerCase().replace(" ", "")}</p>
             
             <div className="w-full h-px bg-white/5 my-8" />
             
             <div className="w-full space-y-6 text-left">
                <div className="space-y-2">
                   <label className="font-mono text-[10px] text-muted tracking-widest uppercase">College</label>
                   <select 
                      value={college} 
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 p-3 font-mono text-sm focus:border-primary outline-none"
                   >
                      {colleges.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="font-mono text-[10px] text-muted tracking-widest uppercase">Can Teach</label>
                   <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary text-[10px] font-bold uppercase tracking-wider">{userData.analysis.top_skill}</span>
                      <span className="px-3 py-1 bg-primary/20 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30">
                        {Object.keys(userData.analysis.scores).sort((a: any, b: any) => userData.analysis.scores[b].score - userData.analysis.scores[a].score)[1]}
                      </span>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="font-mono text-[10px] text-muted tracking-widest uppercase">Want to Learn</label>
                   <div className="grid grid-cols-1 gap-2">
                      {skillDomains.filter(d => d !== userData.analysis.top_skill).slice(0, 3).map(skill => (
                        <div key={skill} className="flex items-center gap-2 group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 bg-black border-white/10 rounded-none checked:bg-primary" />
                           <span className="text-sm font-medium text-muted grow group-hover:text-foreground transition-colors">{skill}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="pt-4 flex justify-between items-center bg-white/3 p-4 border border-accent/20">
                   <div className="flex flex-col">
                      <span className="font-mono text-[18px] font-bold text-accent tracking-tighter">◈ 50</span>
                      <span className="font-mono text-[9px] text-muted uppercase">Credits</span>
                   </div>
                   <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-6 py-2 bg-accent text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all"
                   >
                      {isSaving ? "SAVING..." : "SAVE PROFILE"}
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column - Skill Data */}
        <div className="lg:col-span-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 aspect-square relative flex items-center justify-center">
                 <h4 className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.4em] text-muted uppercase">SKILL GEOMETRY</h4>
                 <div className="w-full h-full p-6">
                    <Radar data={radarData} options={{ scales: { r: { ticks: { display: false }, grid: { color: "rgba(255,255,255,0.05)" } } }, plugins: { legend: { display: false } } }} />
                 </div>
              </div>

              <div className="space-y-4 flex flex-col justify-center">
                 <h4 className="font-mono text-[10px] tracking-[0.4em] text-muted uppercase mb-4 text-center md:text-left">DOMAIN PROFICIENCY</h4>
                 {Object.entries(userData.analysis.scores).map(([skill, data]: any, i) => (
                    <div key={skill} className="space-y-1">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                          <span className="text-muted">{skill}</span>
                          <span className="text-primary">{data.score}%</span>
                       </div>
                       <div className="w-full h-1 bg-white/5 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${data.score}%` }} 
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="h-full bg-indigo-500" 
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Badges Section */}
           <div className="space-y-6">
              <h4 className="font-mono text-[10px] tracking-[0.4em] text-muted uppercase mb-4">[ VERIFIED BADGES ]</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="glass p-6 border-dashed opacity-40 flex flex-col items-center gap-4 text-center">
                       <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-muted" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-muted uppercase tracking-widest">Locked</p>
                          <p className="text-[10px] text-muted/60 mt-1">Complete sessions to earn badges</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
