/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, 
  Table, 
  Info, 
  CheckCircle2, 
  ZoomIn, 
  X,
  ArrowRight,
  RotateCcw,
  FileText
} from 'lucide-react';
import { SPECIES_DATA } from './constants';
import { Species } from './types';
import FoodWebCanvas from './components/FoodWebCanvas';
import DietTable from './components/DietTable';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'network' | 'table'>('network');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);
  const [userConnections, setUserConnections] = useState<{from: string, to: string}[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  // Total possible connections in the dataset
  const totalPossibleConnections = SPECIES_DATA.reduce((acc, s) => acc + s.eats.length, 0);
  
  // Connections that are correct
  const correctConnections = userConnections.filter(conn => {
    const species = SPECIES_DATA.find(s => s.id === conn.to);
    return species?.eats.includes(conn.from);
  });

  const progress = Math.round((correctConnections.length / totalPossibleConnections) * 100);

  const handleToggleConnection = (fromId: string, toId: string) => {
    const existingIndex = userConnections.findIndex(c => c.from === fromId && c.to === toId);
    if (existingIndex > -1) {
      setUserConnections(userConnections.filter((_, i) => i !== existingIndex));
    } else {
      setUserConnections([...userConnections, { from: fromId, to: toId }]);
    }
  };

  const checkExercise = () => {
    const errors = userConnections.length - correctConnections.length;
    if (progress >= 80 && errors <= 3) {
      setIsUnlocked(true);
      alert("Bravo ! Ton raisonnement est solide. La correction est désormais accessible.");
    } else {
      alert(`Continue tes recherches ! Tu as trouvé ${correctConnections.length} relations correctes sur ${totalPossibleConnections}.`);
    }
  };

  const handleTeacherCode = () => {
    const code = prompt("Entrez le code professeur :");
    if (code === "permien") {
      setIsUnlocked(true);
      setShowCorrection(true);
      alert("Mode professeur activé. Correction débloquée.");
    } else if (code !== null) {
      alert("Code incorrect.");
    }
  };

  return (
    <div className="min-h-screen bg-warm-bg font-sans text-warm-text flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="h-20 bg-warm-panel border-b border-warm-line px-10 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-warm-accent-light p-2 rounded-lg text-warm-accent">
            <Network size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-serif text-warm-accent leading-none">L'énigme du régurgitalithe</h1>
            <p className="text-[10px] text-warm-muted font-bold uppercase tracking-[0.2em] mt-1">SVT Collège - Enquête scientifique</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowIntro(true)}
            className="flex items-center gap-2 px-4 py-2 bg-warm-bg border border-warm-line rounded-lg text-xs font-bold text-warm-accent hover:bg-warm-accent-light transition-colors"
          >
            <Info size={16} />
            Objectifs & Contexte
          </button>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
               <span className="text-[9px] font-bold text-warm-muted uppercase tracking-widest">Progression</span>
               <span className="text-xs font-black text-warm-accent">{progress}%</span>
            </div>
            <div className="w-32 h-1.5 bg-warm-line rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-warm-accent" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <nav className="flex bg-warm-bg p-1 rounded-xl border border-warm-line">
            <button
              onClick={() => setActiveTab('network')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all text-sm font-semibold ${
                activeTab === 'network' 
                  ? 'bg-warm-panel text-warm-accent shadow-sm border border-warm-line' 
                  : 'text-warm-muted hover:text-warm-text'
              }`}
            >
              <Network size={18} />
              Réseau
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all text-sm font-semibold ${
                activeTab === 'table' 
                  ? 'bg-warm-panel text-warm-accent shadow-sm border border-warm-line' 
                  : 'text-warm-muted hover:text-warm-text'
              }`}
            >
              <Table size={18} />
              Indices
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden flex bg-warm-line gap-[1px]">
        {activeTab === 'network' ? (
          <>
            {/* Sidebar */}
            <aside className="w-80 bg-warm-panel p-6 flex flex-col gap-6 overflow-y-auto">
              <div>
                <h2 className="text-[10px] font-bold text-warm-muted uppercase tracking-[0.2em] mb-4">Ton Objectif</h2>
                <div className="bg-warm-bg border border-warm-line rounded-2xl p-4">
                  <p className="text-xs text-warm-text leading-relaxed font-medium">
                    Identifie l'auteur du <b>régurgitalithe</b> et les interactions au Permien.<br/><br/>
                    1. Reconstitue le <b>réseau alimentaire</b> en reliant chaque organisme (→).<br/>
                    2. Déduis-en quel être vivant est à l'origine du vomi fossile.
                  </p>
                  
                  <div className="mt-4 space-y-2">
                    <button 
                      onClick={checkExercise}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all bg-warm-accent text-white shadow-md hover:brightness-110"
                    >
                      <CheckCircle2 size={16} />
                      Valider mon travail
                    </button>

                    <button 
                      disabled={!isUnlocked}
                      onClick={() => setShowCorrection(!showCorrection)}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                        !isUnlocked ? 'opacity-50 cursor-not-allowed bg-warm-line text-warm-muted' :
                        showCorrection 
                          ? 'bg-warm-accent text-white border-warm-accent' 
                          : 'bg-warm-panel text-warm-accent border-warm-accent hover:bg-warm-accent-light'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                      {showCorrection ? 'Masquer la Correction' : 'Voir la Correction'}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[10px] font-bold text-warm-muted uppercase tracking-[0.2em] mb-4">Stats du Réseau</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-warm-bg p-3 rounded-xl border border-warm-line text-center">
                    <div className="text-xl font-black text-warm-accent">{userConnections.length}</div>
                    <div className="text-[8px] font-bold text-warm-muted uppercase">Liens tracés</div>
                  </div>
                  <div className="bg-warm-bg p-3 rounded-xl border border-warm-line text-center">
                    <div className="text-xl font-black text-emerald-600">{correctConnections.length}</div>
                    <div className="text-[8px] font-bold text-warm-muted uppercase">Relations justes</div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-warm-line flex flex-col gap-4">
                 <button 
                  onClick={() => {
                    if(confirm("Voulez-vous vraiment recommencer ?")) {
                      setUserConnections([]);
                      setIsUnlocked(false);
                      setShowCorrection(false);
                    }
                  }}
                  className="flex items-center gap-3 text-warm-muted hover:text-rose-500 transition-colors"
                >
                    <RotateCcw size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Tout effacer</span>
                 </button>

                 <button 
                  onClick={handleTeacherCode}
                  className="flex items-center gap-3 text-warm-muted/30 hover:text-warm-accent transition-colors"
                >
                    <CheckCircle2 size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Accès Professeur</span>
                 </button>

                 {isUnlocked && (
                    <a 
                      href="/images/vomidupermienpresentationmanus.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-emerald-600 hover:text-emerald-700 transition-colors animate-in fade-in slide-in-from-left-4 duration-500"
                    >
                        <FileText size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Résultat de l'enquête (PDF)</span>
                    </a>
                 )}
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 bg-warm-bg relative">
              <FoodWebCanvas 
                showCorrection={showCorrection} 
                userConnections={userConnections}
                onConnect={handleToggleConnection}
                onSpeciesClick={setSelectedSpecies} 
              />
            </div>
          </>
        ) : (
          <div className="flex-1 p-10 overflow-y-auto bg-warm-bg">
            <div className="max-w-6xl mx-auto w-full">
              <div className="mb-10 flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-serif text-warm-accent">Indices Scientifiques</h2>
                  <p className="text-warm-muted mt-2 italic">Analyse les régimes alimentaires pour reconstituer l'écosystème.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('network')}
                  className="flex items-center gap-2 px-6 py-3 bg-warm-accent text-white rounded-xl font-bold hover:brightness-110 shadow-lg"
                >
                  Retour à l'Enquête
                </button>
              </div>
              <DietTable onSpeciesClick={setSelectedSpecies} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-warm-panel border-t border-warm-line px-10 py-3 text-[10px] text-warm-muted font-mono uppercase tracking-[0.3em] flex justify-between shrink-0">
        <span>L'énigme du régurgitalithe • Bromacker</span>
        <span className="opacity-50">SVT Collège</span>
      </footer>

      {/* Intro Modal */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-warm-text/60 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-warm-panel rounded-[2.5rem] shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col border-2 border-warm-accent/20"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-warm-bg p-8 flex items-center justify-center border-r border-warm-line">
                  <div className="relative group cursor-zoom-in" onClick={() => setIsImageFullScreen(true)}>
                    <div className="absolute -inset-4 bg-warm-accent/10 rounded-full blur-xl group-hover:bg-warm-accent/20 transition-all" />
                    <img 
                      src="/images/regurgitalithe.jpg" 
                      alt="Régurgitalithe" 
                      className="relative w-full aspect-square object-cover rounded-3xl shadow-lg border-2 border-warm-line"
                    />
                    <div className="absolute bottom-2 right-2 bg-warm-panel/80 p-2 rounded-lg text-warm-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={16} />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-12">
                  <div className="mb-6">
                    <span className="bg-warm-accent-light text-warm-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Contextualisation</span>
                    <h2 className="text-4xl font-serif mt-4 text-warm-text">L'énigme du régurgitalithe</h2>
                  </div>
                  
                  <div className="space-y-4 text-warm-muted leading-relaxed font-serif text-lg italic">
                    <p>
                      Sur le site fossilifère de Bromacker, en Allemagne, des paléontologues ont découvert un petit amas d'os à moitié digérés, vieux de 292 millions d'années. Ce n'est ni un squelette, ni un crottin… c'est un <b className="text-warm-accent">régurgitalithe</b> : un vomi fossilisé !
                    </p>
                    <p className="text-base font-sans not-italic">
                      Le paysage ressemblait à une plaine alluviale subtropicale. Le « vomi fossile » découvert contient une quarantaine d'os appartenant à <b>au moins 3 espèces</b> : deux petits reptiles et un amphibien.
                    </p>
                    <div className="text-base font-sans not-italic border-l-4 border-warm-accent pl-4 bg-warm-bg py-3 rounded-r-lg">
                      <b className="block text-warm-accent text-xs uppercase tracking-widest mb-1">Objectif :</b>
                      <p className="text-warm-text">
                        Comprendre qui est l’auteur de ce régurgitalithe et les interactions qui existaient entre les êtres vivants au Permien.
                      </p>
                      <p className="mt-2 text-sm text-warm-muted italic">
                        Construis le réseau alimentaire en reliant chaque organisme par une flèche « est mangé par » (→) et déduis-en quel être vivant est à l'origine du régurgitalithe.
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowIntro(false)}
                    className="mt-10 w-full py-4 bg-warm-accent text-white rounded-2xl font-bold text-xl hover:brightness-110 transition-all shadow-xl shadow-warm-accent/20 flex items-center justify-center gap-3"
                  >
                    Commencer l'enquête
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Image Overlay */}
      <AnimatePresence>
        {isImageFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageFullScreen(false)}
            className="fixed inset-0 z-[300] bg-warm-text/90 backdrop-blur-xl flex items-center justify-center p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-full"
            >
               <button 
                onClick={(e) => { e.stopPropagation(); setIsImageFullScreen(false); }}
                className="absolute -top-12 right-0 text-white flex items-center gap-2 hover:text-warm-accent transition-colors"
              >
                <X size={32} />
              </button>
              <img 
                src="/images/regurgitalithe.jpg" 
                alt="Régurgitalithe Plein Écran" 
                className="w-full h-full object-contain rounded-2xl shadow-2xl border-4 border-warm-panel"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Species Detail Modal */}
      <AnimatePresence>
        {selectedSpecies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-warm-text/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-warm-panel rounded-[2rem] shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row relative border border-warm-line"
            >
              <button 
                onClick={() => setSelectedSpecies(null)}
                className="absolute top-6 right-6 z-10 bg-warm-bg/80 hover:bg-warm-accent-light p-2 rounded-full transition-colors text-warm-accent border border-warm-line"
              >
                <X size={24} />
              </button>

              <div className="md:w-1/2 aspect-square md:aspect-auto h-full overflow-hidden bg-warm-bg p-8">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-warm-line">
                  <img 
                    src={selectedSpecies.imageUrl} 
                    alt={selectedSpecies.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="md:w-1/2 p-10 md:p-14 flex flex-col">
                <div className="mb-8">
                  <span className={`px-4 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                    selectedSpecies.type === 'producer' ? 'bg-emerald-100 text-emerald-800' :
                    selectedSpecies.type === 'carnivore' ? 'bg-rose-100 text-rose-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedSpecies.id === 'thuringothyris' ? 'Insectivore' :
                     selectedSpecies.type === 'producer' ? 'Producteur' : 
                     selectedSpecies.type === 'carnivore' ? 'Carnivore (Prédateur)' : 
                     selectedSpecies.type === 'invertivore' ? 'Insectivore' : 'Herbivore'}
                  </span>
                  <h2 className="text-5xl font-serif mt-3 text-warm-text tracking-tight">{selectedSpecies.name}</h2>
                  <p className="italic text-xl text-warm-accent mt-1 font-serif opacity-80">{selectedSpecies.scientificName}</p>
                </div>

                <div className="space-y-8 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                  <section>
                    <h3 className="text-[10px] font-bold text-warm-muted uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                       <ArrowRight size={14} className="text-warm-accent" /> Alimentation
                    </h3>
                    <p className="text-xl leading-relaxed text-warm-text font-serif italic text-balance">{selectedSpecies.diet}</p>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-bold text-warm-muted uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                       <Info size={14} className="text-warm-accent" /> Ecologie
                    </h3>
                    <p className="text-base leading-relaxed text-warm-muted">
                      {selectedSpecies.description}
                    </p>
                  </section>
                </div>

                <div className="mt-10 pt-8 border-t border-warm-line">
                   <button 
                    onClick={() => setSelectedSpecies(null)}
                    className="w-full py-4 bg-warm-accent text-white rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-warm-accent/20"
                   >
                     Fermer la fiche
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
