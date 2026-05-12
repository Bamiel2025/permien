/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SPECIES_DATA } from '../constants';
import { Species } from '../types';
import { Search } from 'lucide-react';

interface DietTableProps {
  onSpeciesClick: (species: Species) => void;
}

const DietTable: React.FC<DietTableProps> = ({ onSpeciesClick }) => {
  return (
    <div className="bg-warm-panel rounded-3xl shadow-lg border border-warm-line overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-warm-bg/50 border-b-2 border-warm-accent-light">
              <th className="px-8 py-6 text-[10px] font-bold text-warm-muted uppercase tracking-[0.2em]">Espèce</th>
              <th className="px-8 py-6 text-[10px] font-bold text-warm-muted uppercase tracking-[0.2em]">Classification</th>
              <th className="px-8 py-6 text-[10px] font-bold text-warm-muted uppercase tracking-[0.2em]">Régime Alimentaire</th>
              <th className="px-8 py-6 text-[10px] font-bold text-warm-muted uppercase tracking-[0.2em] text-right">Fiche</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-line">
            {SPECIES_DATA.map((species) => (
              <tr 
                key={species.id} 
                className="hover:bg-warm-bg transition-colors group cursor-pointer"
                onClick={() => onSpeciesClick(species)}
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-warm-line shadow-sm bg-warm-bg p-1">
                      <img 
                        src={species.imageUrl} 
                        alt={species.name}
                        className="w-full h-full object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="font-serif text-lg text-warm-text font-bold">{species.name}</div>
                      <div className="text-[10px] text-warm-muted uppercase tracking-widest leading-none mt-0.5">
                        {species.id === 'thuringothyris' ? 'Insectivore' :
                         species.type === 'producer' ? 'Producteur' : 
                         species.type === 'carnivore' ? 'Carnivore' : 
                         species.type === 'invertivore' ? 'Insectivore' : 'Herbivore'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="italic text-warm-accent font-serif text-base opacity-80">{species.scientificName}</span>
                </td>
                <td className="px-8 py-5 max-w-sm">
                  <div className="flex flex-col gap-2">
                    <span className={`w-fit px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${
                      species.type === 'producer' ? 'bg-emerald-100 text-emerald-800' :
                      species.type === 'carnivore' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {species.id === 'thuringothyris' ? 'Insectivore' :
                       species.type === 'producer' ? 'Producteur' : 
                       species.type === 'carnivore' ? 'Carnivore' : 
                       species.type === 'invertivore' ? 'Insectivore' : 'Herbivore'}
                    </span>
                    <p className="text-sm text-warm-muted leading-relaxed italic font-serif">"{species.diet}"</p>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button 
                    className="p-3 rounded-xl bg-warm-accent-light text-warm-accent transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 ml-auto hover:bg-warm-accent hover:text-white"
                  >
                    <Search size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Détails</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DietTable;
