import React from "react";
import Link from "next/link";
import { Code2, Globe, Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold tracking-[0.2em]">SKILLSWAP</div>
          <p className="font-mono text-[10px] text-muted tracking-widest uppercase">
            © 2025 SkillSwap — Nagpur, India. All rights reserved.
          </p>
        </div>

        <div className="flex gap-8">
          <Link href="#" className="text-muted hover:text-foreground transition-colors">
            <Code2 className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-muted hover:text-foreground transition-colors">
            <Globe className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-muted hover:text-foreground transition-colors">
            <Briefcase className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
