"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamic import for Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then(mod => mod.CircleMarker), { ssr: false });

const stats = [
  { label: "Students", value: 247 },
  { label: "Colleges", value: 4 },
  { label: "Skill Domains", value: 7 },
  { label: "Sessions", value: 1203 },
];

const colleges = [
  { name: "YCCE", coords: [21.1347, 79.0568] as [number, number] },
  { name: "VNIT", coords: [21.1332, 79.0524] as [number, number] },
  { name: "RCOEM", coords: [21.1960, 79.0476] as [number, number] },
  { name: "PCE Nagpur", coords: [21.1104, 79.0607] as [number, number] }
];

const StatCard = ({ label, value, index }: { label: string; value: number; index: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-8 glass hairline-t">
      <div className="font-mono text-4xl font-bold text-accent mb-2">
        {count.toLocaleString()}
      </div>
      <div className="font-mono text-[10px] tracking-widest text-muted uppercase">
        {label}
      </div>
    </div>
  );
};

const CityPreview = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex justify-between items-end gap-6 flex-wrap">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
              [ LIVE IN NAGPUR ]
            </span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase mt-4 tracking-tighter">
              A Growing Network of <br /> Engineering Talent.
            </h2>
          </div>
          <p className="text-muted max-w-sm mb-2 font-mono text-xs uppercase tracking-tight">
            The pulse of Nagpur's future tech leaders. Powered by OpenStreetMap.
          </p>
        </div>

        {/* Real Leaflet Map for City Preview */}
        <div className="w-full h-[450px] glass rounded-none mb-12 overflow-hidden relative grayscale invert brightness-[0.8] contrast-[1.2]">
           {mounted && (
             <MapContainer 
               center={[21.1458, 79.0882]} 
               zoom={12} 
               scrollWheelZoom={false}
               zoomControl={false}
               attributionControl={false}
               className="w-full h-full z-0"
             >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {colleges.map((college, i) => (
                  <CircleMarker 
                    key={i} 
                    center={college.coords} 
                    radius={10} 
                    pathOptions={{ color: '#6366F1', fillColor: '#6366F1', fillOpacity: 0.8 }} 
                  />
                ))}
             </MapContainer>
           )}
           <div className="absolute inset-0 flex items-center justify-center bg-[#080808]/10 z-10 pointer-events-none border border-white/5">
              <span className="px-6 py-2 glass font-mono text-[10px] tracking-[0.4em] uppercase text-white/50">LIVE HEATMAP PROXY</span>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityPreview;
