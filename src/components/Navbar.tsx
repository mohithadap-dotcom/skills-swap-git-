"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, LogOut, User as UserIcon, AlertTriangle } from "lucide-react";
import { supabase, signInWithGithub, signOut, signInMock } from "@/lib/supabase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Check for local demo user
    const savedDemo = localStorage.getItem("skillswap_demo_user");
    if (savedDemo && !user) {
      setUser(JSON.parse(savedDemo));
    }

    return () => subscription.unsubscribe();
  }, [user]);

  const navLinks = [
    { name: "Analyze", href: "/analyze" },
    { name: "Discover", href: "/match" },
    { name: "Board", href: "/board" },
    { name: "Map", href: "/map" },
  ];

  const handleLogin = async () => {
    try {
      setAuthError(false);
      await signInWithGithub();
    } catch (error: any) {
      console.error("Login failed:", error);
      // If the provider is disabled, show the demo mode option
      if (error.message?.includes("provider") || error.message?.includes("enabled")) {
        setAuthError(true);
      }
    }
  };

  const handleDemoLogin = () => {
    const mockUser = signInMock();
    setUser(mockUser);
    localStorage.setItem("skillswap_demo_user", JSON.stringify(mockUser));
    setAuthError(false);
  };

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("skillswap_demo_user");
    setUser(null);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass hairline-b backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-[0.15em] text-foreground transition-colors group-hover:text-primary">
            SKILLSWAP
          </span>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_#A3E635]"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors tracking-wider uppercase"
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
               <Link href="/profile" className="flex items-center gap-3 group">
                  <div className="text-right">
                     <div className="text-[10px] text-muted font-mono uppercase tracking-widest leading-none">
                        {user.id === 'mock-user-123' ? '[ DEMO MODE ]' : 'Logged in as'}
                     </div>
                     <div className="text-xs font-bold text-foreground font-mono">{user.user_metadata.full_name || user.email}</div>
                  </div>
                  <img src={user.user_metadata.avatar_url} className="w-8 h-8 rounded-none border border-white/10 ring-1 ring-primary/20" alt="User" />
               </Link>
               <button onClick={handleLogout} className="p-2 text-muted hover:text-red-500 transition-colors">
                  <LogOut className="w-4 h-4" />
               </button>
            </div>
          ) : (
            <div className="relative group">
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold text-sm tracking-wide transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                <Code2 className="w-4 h-4" />
                CONNECT GITHUB
              </button>
              
              <AnimatePresence>
                {authError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full right-0 mt-4 w-72 glass p-4 border border-red-500/20 z-50"
                  >
                    <div className="flex gap-2 text-red-500 mb-2">
                       <AlertTriangle className="w-4 h-4 shrink-0" />
                       <span className="text-[10px] uppercase font-bold tracking-widest leading-tight">GitHub Provider Disabled</span>
                    </div>
                    <p className="text-[10px] text-muted mb-4 leading-relaxed uppercase">
                      Enable GitHub in Supabase dashboard or use Demo Mode to preview features.
                    </p>
                    <button 
                      onClick={handleDemoLogin}
                      className="w-full py-2 bg-accent text-black font-bold text-[10px] tracking-widest uppercase hover:brightness-110"
                    >
                      Enter Demo Mode →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full glass border-b border-white/5 py-10 px-6 flex flex-col gap-6 items-center md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-muted hover:text-foreground transition-colors tracking-widest uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex flex-col items-center gap-6 w-full pt-4 border-t border-white/5">
                 <div className="flex items-center gap-4">
                    <img src={user.user_metadata.avatar_url} className="w-12 h-12 rounded-none border border-white/10" alt="User" />
                    <div>
                       <div className="text-[9px] text-muted font-mono uppercase tracking-widest leading-none mb-1">
                          {user.id === 'mock-user-123' ? '[ DEMO MODE ]' : 'Signed in as'}
                       </div>
                       <div className="text-lg font-bold text-foreground">{user.user_metadata.full_name}</div>
                    </div>
                 </div>
                 <button onClick={handleLogout} className="w-full py-4 bg-white/5 text-red-500 font-bold tracking-widest flex items-center justify-center gap-2 uppercase">
                    <LogOut className="w-4 h-4" />
                    Disconnect
                 </button>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4 items-center">
                <button 
                  onClick={handleLogin}
                  className="w-full max-w-xs flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold tracking-widest transition-all"
                >
                  <Code2 className="w-5 h-5" />
                  CONNECT GITHUB
                </button>
                <button 
                   onClick={handleDemoLogin}
                   className="text-[10px] text-accent uppercase font-bold tracking-[0.2em] underline underline-offset-4"
                >
                   Quick Preview (Demo Mode)
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
