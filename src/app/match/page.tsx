"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, ArrowRightLeft, MapPin, Zap, Star } from "lucide-react";
import Link from "next/link";

const demoUsers = [
  {
    id: "1",
    roomId: "arjun-flutter-webdev",
    name: "Arjun Sharma",
    college: "VNIT",
    avatar: "https://i.pravatar.cc/150?u=arjun",
    top_skill: "Flutter",
    wants: "Web Dev",
    compatibility: 91,
    skill_value: 82,
  },
  {
    id: "2",
    roomId: "priya-design-ml",
    name: "Priya Mehta",
    college: "RCOEM",
    avatar: "https://i.pravatar.cc/150?u=priya",
    top_skill: "UI Design",
    wants: "Machine Learning",
    compatibility: 87,
    skill_value: 75,
  },
  {
    id: "3",
    roomId: "rohan-ml-vibe-coding",
    name: "Rohan Desai",
    college: "PCE Nagpur",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    top_skill: "Machine Learning",
    wants: "Vibe Coding",
    compatibility: 79,
    skill_value: 88,
  },
];

const MatchCard = ({ user, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6">
        <div className="text-right">
          <div className="font-mono text-4xl font-black text-white/10 group-hover:text-primary transition-colors">
            {user.compatibility}%
          </div>
          <div className="font-mono text-[9px] tracking-widest text-muted uppercase">COMPATIBILITY</div>
        </div>
      </div>

      <div className="p-8 flex flex-col lg:flex-row items-center gap-10">
        {/* Left: Identity */}
        <div className="flex items-center gap-6">
          <img src={user.avatar} className="w-20 h-20 rounded-none ring-1 ring-white/10" />
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-tight">{user.name}</h3>
            <div className="flex items-center gap-2 text-muted mt-1">
              <University className="w-3 h-3" />
              <span className="font-mono text-[10px] uppercase tracking-wider">{user.college}</span>
            </div>
            <div className="flex items-center gap-2 text-muted mt-0.5">
              <MapPin className="w-3 h-3" />
              <span className="font-mono text-[10px] uppercase tracking-wider">NAGPUR</span>
            </div>
          </div>
        </div>

        {/* Center: Skills Swap */}
        <div className="flex-1 flex items-center justify-center gap-6 py-4 lg:py-0 border-y lg:border-y-0 lg:border-x border-white/5 px-10">
          <div className="text-center space-y-2">
            <span className="font-mono text-[9px] text-muted uppercase tracking-widest block">TEACHES</span>
            <span className="px-4 py-1.5 bg-primary text-[11px] font-bold uppercase tracking-wider block">
              {user.top_skill}
            </span>
          </div>
          
          <ArrowRightLeft className="w-6 h-6 text-muted/30" />
          
          <div className="text-center space-y-2">
            <span className="font-mono text-[9px] text-muted uppercase tracking-widest block">WANTS</span>
            <span className="px-4 py-1.5 bg-white/5 text-[11px] font-bold uppercase tracking-wider block text-white/50">
              {user.wants}
            </span>
          </div>
        </div>

        {/* Right: Action */}
        <div className="w-full lg:w-fit">
          <Link
            href={`/session/${user.roomId}`}
            className="w-full lg:w-[200px] flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-accent transition-all group-hover:translate-x-1"
          >
            REQUEST SESSION
          </Link>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
    </motion.div>
  );
};

const University = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default function MatchPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("skillswap_analysis");
    if (data) setCurrentUser(JSON.parse(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16">
        <span className="font-mono text-xs tracking-widest text-primary uppercase">[ MATCH ENGINE ]</span>
        <h2 className="text-5xl font-black uppercase mt-4 tracking-tighter">Your perfect learning <br /> partners.</h2>
        <div className="flex items-center gap-3 text-muted mt-6 bg-white/3 w-fit px-4 py-2 border border-white/5">
          <Zap className="w-4 h-4 text-accent fill-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.1em]">
            Matched by AI based on skill complement and Nagpur proximity
          </span>
        </div>
      </div>

      <div className="space-y-8 pb-32">
        {demoUsers.map((user, i) => (
          <MatchCard key={user.id} user={user} index={i} />
        ))}
      </div>
    </div>
  );
}
