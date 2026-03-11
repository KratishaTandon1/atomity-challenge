"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCloudHierarchy, CloudEntity } from "@/hooks/useCloudData";
import { ResourceTile } from "../ResourceTile";
import { ChartBar } from "../ChartBar";
import { DataRow } from "../DataRow";

// SVG Icons for tiles
const CpuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
);

const MemoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 10h16M4 14h16M8 2v2M16 2v2M8 20v2M16 20v2"/></svg>
);

const StorageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v7"/><path d="M12 15v7"/><path d="M22 12h-7"/><path d="M9 12H2"/></svg>
);

const GpuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h4"/><path d="M14 8h4"/><path d="M6 12h4"/><path d="M14 12h4"/><path d="M6 16h4"/><path d="M14 16h4"/></svg>
);

export function DrillDownDashboard() {
  const [history, setHistory] = useState<{ level: 'cluster' | 'namespace' | 'pod', parentId: null | number, name: string }[]>([
    { level: 'cluster', parentId: null, name: 'Cluster' }
  ]);
  
  const currentView = history[history.length - 1];
  const { data: entities, isLoading } = useCloudHierarchy(currentView.level, currentView.parentId);
  
  const handleDrillDown = (entity: CloudEntity) => {
    if (currentView.level === 'pod') return; // Max depth reached
    const nextLevel = currentView.level === 'cluster' ? 'namespace' : 'pod';
    setHistory([...history, { level: nextLevel, parentId: entity.id, name: entity.name }]);
  };
  
  const handleNavigateUp = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };
  
  const badgeText = history.map(h => h.name).join(' - ');
  
  return (
    <section className="w-full max-w-5xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-surface rounded-2xl sm:rounded-[var(--radius-card)] shadow border border-border-subtle p-6 sm:p-10 relative overflow-hidden">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-foreground text-lg sm:text-xl">
              Resource Overview
            </span>
            <span className="text-[11px] font-bold px-3 py-1 rounded-md bg-background border border-border-subtle text-muted tracking-wider">
              LAST 30 DAYS
            </span>
          </div>
          
          <div className="flex flex-col items-start md:items-end w-full md:w-auto">
             <div className="flex items-center gap-3">
               {history.length > 1 && (
                 <button 
                    onClick={handleNavigateUp}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-border-subtle bg-surface text-muted hover:text-foreground hover:bg-background transition-colors"
                    title="Go Back"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                 </button>
               )}
               <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm border ${history.length > 1 ? 'border-accent bg-accent/10 text-accent-hover cursor-default' : 'border-border-subtle bg-background text-foreground cursor-default'}`}>
                  <div className="w-2 h-2 rounded-full bg-current opacity-80" />
                  {badgeText}
               </div>
             </div>
             <span className="text-xs font-bold text-muted mt-3 tracking-widest uppercase">
                Aggregated by: <span className="text-foreground">{currentView.level}</span>
             </span>
          </div>
        </div>
        
        {/* --- Bar Chart Section --- */}
        <div className="relative h-[18rem] sm:h-64 border-b border-dashed border-border-subtle mb-12 pb-4 flex justify-between sm:justify-center items-end sm:gap-12 md:gap-24">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                 className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
               />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {entities?.map((entity) => (
                <motion.div 
                  key={`bar-container-${currentView.level}-${entity.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                  className="flex flex-col items-center justify-end flex-1 max-w-[5rem] sm:w-20 h-full relative z-10 group"
                >
                  <div className="flex-1 w-full flex items-end justify-center px-1 sm:px-0">
                    <ChartBar 
                      heightPercentage={entity.heightPercent}
                      layoutId={`bar-${currentView.level}-${entity.id}`}
                      onClick={() => handleDrillDown(entity)}
                      isActive={currentView.level !== 'pod' && history.some(h => h.parentId === entity.id)}
                    />
                  </div>
                  <span className="mt-4 text-[10px] sm:text-sm font-semibold text-foreground tracking-tight text-center break-words w-full px-1">
                    {entity.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
        
        {/* --- Resource Tiles (Staggered Entrance) --- */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 relative z-10">
           <ResourceTile icon={<CpuIcon />} label="CPU" delay={0.1} />
           <ResourceTile icon={<GpuIcon />} label="GPU" delay={0.15} />
           <ResourceTile icon={<MemoryIcon />} label="RAM" delay={0.2} />
           <ResourceTile icon={<StorageIcon />} label="Storage" delay={0.25} />
           <ResourceTile icon={<NetworkIcon />} label="Network" delay={0.3} />
        </div>
        
        {/* --- Data Table Section --- */}
        <div className="w-full relative z-10 overflow-x-auto pb-4">
          <div className="min-w-[700px] px-2">
            {/* Table Header */}
            <div className="grid grid-cols-[160px_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 py-4 mb-4 text-xs font-bold tracking-widest text-muted uppercase border-b border-border-subtle">
              <div className="pl-4">Name</div>
              <div className="text-right">CPU</div>
              <div className="text-right">RAM</div>
              <div className="text-right">Storage</div>
              <div className="text-right">Network</div>
              <div className="text-right">GPU</div>
              <div className="text-right pr-4">Efficiency</div>
            </div>
            
            {/* Table Body */}
            <div className="flex flex-col">
              <AnimatePresence mode="wait">
                {entities?.map((entity, idx) => (
                  <motion.div
                    key={`row-${currentView.level}-${entity.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: idx * 0.05 }}
                    onClick={() => handleDrillDown(entity)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleDrillDown(entity);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${entity.name}`}
                    className="mb-1 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[12px]"
                  >
                    {/* Convert entity.metrics mapping manually to match DataRow signature */}
                    <DataRow item={{
                      id: entity.id.toString(),
                      name: entity.name,
                      cpu: entity.metrics.cpu,
                      ram: entity.metrics.ram,
                      storage: entity.metrics.storage,
                      network: entity.metrics.network,
                      gpu: entity.metrics.gpu,
                      efficiency: entity.metrics.efficiency,
                      total: entity.metrics.total
                    }} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}