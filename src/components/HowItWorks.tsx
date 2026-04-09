"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Drop Your GitHub",
    description: "Connect your profile and let our AI parse your repositories.",
  },
  {
    number: "02",
    title: "Get Skill-Valued",
    description: "Grok assigns your score in 7 domains based on actual code quality.",
  },
  {
    number: "03",
    title: "Match & Learn",
    description: "1:1 sessions with peers in Nagpur who have what you need.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            [ PROCESS ]
          </span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase mt-4 tracking-tighter">
            An Engine Built for <br /> Engineering Excellence.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-10 glass group hover:border-primary/30 transition-colors"
            >
              <span className="absolute -top-10 -left-6 text-[120px] font-black text-white/[0.03] select-none group-hover:text-primary/[0.05] transition-colors leading-none">
                {step.number}
              </span>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
