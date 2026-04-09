"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { University, Users, Zap } from "lucide-react";

// Dynamic import for Leaflet
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

const colleges = [
  { name: "YCCE", coords: [21.1347, 79.0568] as [number, number], students: 34, topSkills: ["Web Development", "Vibe Coding", "DSA"] },
  { name: "VNIT", coords: [21.1332, 79.0524] as [number, number], students: 67, topSkills: ["Machine Learning", "DSA", "Flutter"] },
  { name: "RCOEM", coords: [21.1960, 79.0476] as [number, number], students: 45, topSkills: ["UI Design", "Mobile Dev", "Web Development"] },
  { name: "PCE Nagpur", coords: [21.1104, 79.0607] as [number, number], students: 28, topSkills: ["Flutter", "Vibe Coding", "Machine Learning"] }
];

const skillDomains = ["All Skills", "Flutter", "Web Development", "UI Design", "Machine Learning", "DSA", "Vibe Coding", "Mobile Dev"];

export default function MapPage() {
  const [selectedSkill, setSelectedSkill] = useState("All Skills");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-[calc(100vh-80px)] relative overflow-hidden flex flex-col">
      {/* Header / Filter overlay */}
      <div className="absolute top-8 left-8 z-[1000] max-w-sm">
         <div className="glass p-8 space-y-4">
            <div>
               <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase">[ NAGPUR SKILL MAP ]</span>
               <h2 className="text-3xl font-bold uppercase tracking-tighter mt-2">The Pulse of <br /> Engineering Talent.</h2>
            </div>
            
            <p className="text-xs text-muted leading-relaxed uppercase tracking-tighter">
               Visualize the concentration of technical skills across Nagpur's premier institutions.
            </p>

            <select 
               value={selectedSkill}
               onChange={(e) => setSelectedSkill(e.target.value)}
               className="w-full bg-black/80 border border-white/20 p-4 font-mono text-xs uppercase tracking-widest focus:border-primary outline-none"
            >
               {skillDomains.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
         </div>

         <div className="mt-4 glass p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-primary" />
               <span className="font-mono text-[9px] uppercase text-muted">Density High</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-primary opacity-30" />
               <span className="font-mono text-[9px] uppercase text-muted">Density Low</span>
            </div>
         </div>
      </div>

      {/* Map */}
      <div className="flex-1 w-full relative z-0">
         <MapContainer 
            center={[21.1458, 79.0882]} 
            zoom={13} 
            className="w-full h-full grayscale invert-[0.95] contrast-[1.2] brightness-75"
            zoomControl={false}
         >
            <TileLayer
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {colleges.map((college) => {
               // Filter logic (simple)
               const isHighlighted = selectedSkill === "All Skills" || college.topSkills.includes(selectedSkill);
               
               return (
                  <CircleMarker
                     key={college.name}
                     center={college.coords}
                     radius={isHighlighted ? college.students / 2 : 5}
                     pathOptions={{
                        fillColor: "#6366F1",
                        fillOpacity: isHighlighted ? 0.6 : 0.1,
                        color: "#6366F1",
                        weight: isHighlighted ? 2 : 0,
                        className: isHighlighted ? "animate-pulse" : ""
                     }}
                  >
                     <Popup className="skill-popup">
                        <div className="p-4 bg-[#080808] text-[#F5F5F5] space-y-4 min-w-[200px] border border-white/10">
                           <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold uppercase tracking-tight">{college.name}</h3>
                              <University className="w-4 h-4 text-primary" />
                           </div>
                           
                           <div className="flex items-center gap-3 bg-white/5 p-2 px-3">
                              <Users className="w-4 h-4 text-accent" />
                              <span className="font-mono text-sm">{college.students} Students</span>
                           </div>

                           <div className="space-y-2">
                              <span className="font-mono text-[9px] text-muted uppercase tracking-widest block">Top Skills</span>
                              <div className="flex flex-wrap gap-2">
                                 {college.topSkills.map(skill => (
                                    <span key={skill} className="px-2 py-0.5 bg-primary/20 text-primary text-[9px] font-bold uppercase tracking-wider border border-primary/30">
                                       {skill}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </Popup>
                  </CircleMarker>
               );
            })}
         </MapContainer>
      </div>

      <style jsx global>{`
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background: #080808 !important;
          color: white !important;
          border-radius: 0 !important;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
        .leaflet-container {
           background: #080808 !important;
        }
      `}</style>
    </div>
  );
}
