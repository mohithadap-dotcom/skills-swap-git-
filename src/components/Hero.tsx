"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Hero = () => {
  const data = {
    labels: [
      "Web Dev",
      "ML",
      "UI Design",
      "DSA",
      "Mobile",
      "Vibe Coding",
      "DevOps",
    ],
    datasets: [
      {
        label: "Avg Nagpur Student",
        data: [65, 40, 55, 80, 45, 95, 30],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "#6366F1",
        borderWidth: 2,
        pointBackgroundColor: "#6366F1",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#6366F1",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: "rgba(255, 255, 255, 0.1)" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        pointLabels: {
          color: "#6B7280",
          font: { family: "JetBrains Mono", size: 10 },
        },
        ticks: { display: false, max: 100, stepSize: 20 },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6 flex flex-col gap-1">
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              [ BETA — NAGPUR EDITION ]
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-8">
            <span className="block">Swap Skills,</span>
            <span className="block text-primary">Not Money.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-lg mb-12 leading-relaxed">
            An AI that reads your GitHub, assigns your Skill-Value, and finds
            your perfect learning partner — in your city.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-4">
               <Link
                href="/analyze"
                className="px-10 py-5 bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/40"
              >
                Analyze My Profile
              </Link>
              <button className="px-10 py-5 border border-primary/30 text-primary font-bold text-sm uppercase tracking-[0.2em] hover:bg-primary/5 transition-all">
                The Methodology
              </button>
            </div>

            <div className="max-w-md">
              <div className="text-[10px] font-mono text-muted uppercase tracking-[0.3em] mb-3">Or explore a peer's skills:</div>
              <div className="relative group">
                 <input 
                  type="text" 
                  placeholder="github-username"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/analyze?u=${(e.target as HTMLInputElement).value}`;
                    }
                  }}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 font-mono text-sm focus:outline-none focus:border-primary transition-all pr-12 rounded-none"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                   <span className="font-mono text-xs">↵</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Decorative Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative h-[500px] w-full flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-[120px]" />
          <div className="w-full h-full relative z-10 p-10 glass rounded-full overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
            >
              <Radar data={data} options={options} />
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 border border-white/5 rounded-full animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 border border-white/5 rounded-full animate-reverse-spin" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
