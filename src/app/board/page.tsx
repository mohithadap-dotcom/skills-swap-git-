"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, MessageCircle, MapPin, University, ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import { nanoid } from "nanoid";

const demoRequests = [
  {
    id: "r1",
    user: { name: "Sameer K.", avatar: "https://i.pravatar.cc/150?u=sameer", college: "VNIT" },
    need: "Machine Learning",
    offer: "Web Development",
    time: "2h ago"
  },
  {
    id: "r2",
    user: { name: "Anjali D.", avatar: "https://i.pravatar.cc/150?u=anjali", college: "YCCE" },
    need: "UI Design",
    offer: "Flutter",
    time: "5h ago"
  },
  {
    id: "r3",
    user: { name: "Tushar B.", avatar: "https://i.pravatar.cc/150?u=tushar", college: "RCOEM" },
    need: "DSA",
    offer: "Vibe Coding",
    time: "1d ago"
  }
];

const skillDomains = ["Flutter", "Web Development", "UI Design", "Machine Learning", "DSA", "Vibe Coding", "Mobile Dev"];

export default function BoardPage() {
  const [need, setNeed] = useState("");
  const [offer, setOffer] = useState("");
  const [requests, setRequests] = useState(demoRequests);
  const [showPost, setShowPost] = useState(false);

  const handlePost = () => {
    if (!need || !offer) return;
    const newReq = {
      id: nanoid(),
      user: { name: "Me", avatar: "https://i.pravatar.cc/150?u=me", college: "VNIT" },
      need,
      offer,
      time: "Just now"
    };
    setRequests([newReq, ...requests]);
    setNeed("");
    setOffer("");
    setShowPost(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
        <div className="flex-1">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">[ REQUEST BOARD ]</span>
          <h2 className="text-5xl font-black uppercase mt-4 tracking-tighter italic">Post what you need. <br /> Offer what you know.</h2>
        </div>
        <button 
          onClick={() => setShowPost(!showPost)}
          className="px-8 py-4 bg-primary text-white font-bold uppercase text-xs tracking-[0.2em] hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
        >
          {showPost ? "CANCEL POST" : "POST NEW REQUEST"}
        </button>
      </div>

      <AnimatePresence>
        {showPost && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-16"
          >
            <div className="glass p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
               <div className="space-y-4">
                  <label className="font-mono text-[10px] tracking-widest text-muted uppercase">I need help with...</label>
                  <select 
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 p-4 font-mono text-sm focus:border-primary outline-none"
                  >
                    <option value="">Select Skill</option>
                    {skillDomains.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
               </div>
               
               <div className="space-y-4">
                  <label className="font-mono text-[10px] tracking-widest text-muted uppercase">In return, I can teach...</label>
                  <select 
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 p-4 font-mono text-sm focus:border-primary outline-none"
                  >
                    <option value="">Select Skill</option>
                    {skillDomains.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
               </div>
               
               <button 
                 onClick={handlePost}
                 className="w-full py-4 bg-accent text-black font-bold uppercase text-sm tracking-widest hover:brightness-110"
               >
                 POST TO BOARD
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6">
        {requests.map((req, i) => (
          <motion.div 
            key={req.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass group p-8 flex flex-col md:flex-row items-center gap-10 hover:border-white/20 transition-all transition-colors"
          >
             <div className="flex items-center gap-6 min-w-[240px]">
                <img src={req.user.avatar} className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-tight">{req.user.name}</h4>
                  <div className="flex items-center gap-2 text-muted mt-1">
                    <span className="font-mono text-[9px] uppercase">{req.user.college}</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    <span className="font-mono text-[9px] uppercase italic text-primary">{req.time}</span>
                  </div>
                </div>
             </div>

             <div className="flex-1 flex flex-col md:flex-row items-center gap-8 px-10 border-white/5 md:border-x">
                <div className="text-center md:text-left space-y-1">
                   <span className="font-mono text-[9px] text-muted uppercase tracking-widest">NEEDS</span>
                   <p className="text-xl font-bold uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors">{req.need}</p>
                </div>
                
                <div className="text-muted/20">
                   <ArrowRightLeft className="w-6 h-6" />
                </div>
                
                <div className="text-center md:text-left space-y-1">
                   <span className="font-mono text-[9px] text-muted uppercase tracking-widest">OFFERS</span>
                   <p className="text-xl font-bold uppercase tracking-tighter text-white/40">{req.offer}</p>
                </div>
             </div>

             <div className="w-full md:w-fit">
                <Link 
                  href={`/session/${nanoid(8)}`}
                  className="w-full md:w-[180px] flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  ACCEPT →
                </Link>
             </div>
          </motion.div>
        ))}
        
        {requests.length === 0 && (
          <div className="text-center py-40 glass border-dashed">
             <p className="text-muted font-mono uppercase tracking-[0.4em]">No requests yet. Be the first to post.</p>
          </div>
        )}
      </div>
    </div>
  );
}
