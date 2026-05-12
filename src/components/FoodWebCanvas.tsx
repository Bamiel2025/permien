/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SPECIES_DATA } from '../constants';
import { Species } from '../types';

interface FoodWebCanvasProps {
  showCorrection: boolean;
  userConnections: { from: string, to: string }[];
  onConnect: (from: string, to: string) => void;
  onSpeciesClick: (species: Species) => void;
}

const INITIAL_POSITIONS: Record<string, { x: number, y: number }> = {
  dimetrodon: { x: 50, y: 12 },
  tambacarnifex: { x: 20, y: 28 },
  seymouria: { x: 80, y: 28 },
  meganeura: { x: 50, y: 38 },
  orobates: { x: 12, y: 60 },
  eudibamus: { x: 88, y: 60 },
  thuringothyris: { x: 35, y: 60 },
  paleodictyoptera: { x: 65, y: 60 },
  lepidodendron: { x: 25, y: 88 },
  glossopteris: { x: 75, y: 88 }
};

const FoodWebCanvas: React.FC<FoodWebCanvasProps> = ({ 
  showCorrection, 
  userConnections, 
  onConnect, 
  onSpeciesClick 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getPos = (id: string) => {
    const p = INITIAL_POSITIONS[id];
    return {
      x: (p.x * dimensions.width) / 100,
      y: (p.y * dimensions.height) / 100
    };
  };

  const handleNodeClick = (species: Species) => {
    if (selectedSourceId) {
      if (selectedSourceId === species.id) {
        // Deselect if clicking the same node
        setSelectedSourceId(null);
        setFocusedId(null);
      } else {
        // Create connection from selectedSource to this species
        onConnect(selectedSourceId, species.id);
        setSelectedSourceId(null);
        setFocusedId(null);
      }
    } else {
      // First click: select as source
      setSelectedSourceId(species.id);
      setFocusedId(species.id);
      onSpeciesClick(species);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="flex-1 relative bg-warm-bg overflow-hidden cursor-crosshair h-full"
      onClick={(e) => {
        if (e.target === e.currentTarget) setFocusedId(null);
      }}
    >
      {/* Background Grids - Warm Line Pattern */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(#dcd7c9 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 pointer-events-none w-full h-full">
        <defs>
          <marker
            id="arrowhead-correct"
            markerWidth="10"
            markerHeight="7"
            refX="48"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
          </marker>
          <marker
            id="arrowhead-user"
            markerWidth="10"
            markerHeight="7"
            refX="48"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
          </marker>
        </defs>

        {/* User Connections */}
        {userConnections.map((conn, idx) => {
          const start = getPos(conn.from);
          const end = getPos(conn.to);
          return (
            <motion.line
              key={`user-${idx}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead-user)"
            />
          );
        })}

        {/* Correct Connections (when shown) */}
        {showCorrection && SPECIES_DATA.map(species => 
          species.eats.map(eatenId => {
            const start = getPos(eatenId);
            const end = getPos(species.id);
            return (
              <motion.line
                key={`correct-${species.id}-${eatenId}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#10b981"
                strokeWidth="4"
                markerEnd="url(#arrowhead-correct)"
              />
            );
          })
        )}
      </svg>

      {/* Nodes */}
      {SPECIES_DATA.map((species) => {
        const pos = getPos(species.id);
        const isFocused = focusedId === species.id;
        const isSelected = selectedSourceId === species.id;

        return (
          <motion.div
            key={species.id}
            initial={false}
            animate={{ x: pos.x - 45, y: pos.y - 45 }}
            whileHover={{ scale: 1.05 }}
            className={`absolute cursor-pointer z-20`}
            onClick={() => handleNodeClick(species)}
          >
            <div className="flex flex-col items-center gap-2 group">
              <div className={`relative w-24 h-24 rounded-2xl border-2 overflow-hidden shadow-md transition-all ${
                isSelected ? 'border-warm-accent ring-4 ring-warm-accent/20 scale-110 shadow-xl' : 
                isFocused ? 'border-warm-accent shadow-lg' : 'border-warm-line'
              } bg-warm-panel p-1`}>
                <img 
                  src={species.imageUrl} 
                  alt={species.name}
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
                {isSelected && (
                   <div className="absolute inset-0 bg-warm-accent/10 flex items-center justify-center">
                      <div className="bg-warm-accent text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase">Source</div>
                   </div>
                )}
              </div>
              <div className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] shadow-sm border ${
                species.type === 'producer' ? 'bg-emerald-100 border-emerald-500 text-emerald-800' :
                species.type === 'carnivore' ? 'bg-rose-100 border-rose-500 text-rose-800' :
                'bg-amber-100 border-amber-500 text-amber-800'
              }`}>
                {species.name}
              </div>
            </div>
          </motion.div>
        );
      })}


    </div>
  );
};

export default FoodWebCanvas;
