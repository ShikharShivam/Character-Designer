import React, { useState } from 'react';
import { GeneratedCharacter } from '../types';
import { User, Flag, Shield, Palette, Sword, History, Box, Activity, Layers, Flame, Dna, Zap, Star, Bookmark, Check, Trash2, Copy, Ruler, Weight, ScanFace, Eye, Scissors, Play, Pause, Swords } from 'lucide-react';

interface CharacterCardProps {
  character: GeneratedCharacter;
  isSaved?: boolean;
  onSave?: (character: GeneratedCharacter) => void;
  onRemove?: (id: string) => void;
}

const ColorSwatch: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex flex-col items-center gap-1.5 group">
    <div 
      className="w-10 h-10 rounded-full border border-master-surface-light shadow-lg transition-transform group-hover:scale-110 relative" 
      style={{ backgroundColor: color || '#CCCCCC' }}
      title={color}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
    </div>
    <span className="text-[10px] text-master-ivory-dim font-serif tracking-widest">{label}</span>
  </div>
);

const StatBar: React.FC<{ label: string; value: number; colorClass?: string }> = ({ label, value, colorClass = "bg-master-gold" }) => (
  <div className="mb-3">
    <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-master-ivory-dim mb-1.5">
      <span>{label}</span>
      <span className="text-master-gold">{value || 0} / 10</span>
    </div>
    <div className="h-1.5 bg-master-surface rounded-full overflow-hidden border border-master-surface-light">
      <div 
        className={`h-full ${colorClass} shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-1000 ease-out`} 
        style={{ width: `${(value || 0) * 10}%` }}
      />
    </div>
  </div>
);

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isSaved = false, onSave, onRemove }) => {
  const [showStancePreview, setShowStancePreview] = useState(false);

  if (!character) return null;

  return (
    <div className="w-full glass-panel border-master-gold/30 rounded-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-700 relative">
      
      {/* Cinematic Header */}
      <div className="relative p-8 md:p-10 border-b border-master-gold/20 overflow-hidden">
        {/* Background glow for header */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-master-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 text-master-gold mb-2">
              <span className="text-xs font-serif font-bold tracking-[0.2em] uppercase border-b border-master-gold/50 pb-0.5">{character.nationality || 'Unknown'}</span>
              {character.alignment && (
                 <>
                  <span className="text-master-gold/50 text-[10px]">•</span>
                  <span className="text-xs text-master-ivory-dim font-serif uppercase tracking-wider flex items-center gap-1.5">
                    {character.alignment}
                  </span>
                 </>
              )}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-master-ivory tracking-tight leading-tight uppercase drop-shadow-lg">
              {character.name || 'Unnamed Fighter'}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-master-ivory-dim text-xs font-medium mt-3 tracking-wide">
               <span className="flex items-center gap-1.5">
                 <Dna size={12} className="text-master-gold" />
                 {character.species || 'Unknown'}
               </span>
               <span className="w-1 h-1 bg-master-gold/50 rounded-full"></span>
               <span className="flex items-center gap-1.5">
                 <Flame size={12} className="text-master-gold" />
                 {character.martialArtStyle || 'Brawler'}
               </span>
               <span className="w-1 h-1 bg-master-gold/50 rounded-full"></span>
               <span>{character.ageGroup || 'Adult'} ({character.age || '?'})</span>
            </div>
          </div>
          
          <div className="flex gap-3">
             <button 
                onClick={() => navigator.clipboard.writeText(JSON.stringify(character, null, 2))}
                className="text-xs bg-master-surface/50 hover:bg-master-surface text-master-gold border border-master-gold/30 hover:border-master-gold px-4 py-2 transition-all font-serif tracking-wider uppercase flex items-center gap-2"
             >
                <Copy size={14}/> JSON
             </button>
             
             {isSaved ? (
                <button 
                  onClick={() => onRemove?.(character.id)}
                  className="text-xs bg-red-900/20 border border-red-500/50 text-red-400 px-5 py-2 transition-all font-serif tracking-wider uppercase flex items-center gap-2 hover:bg-red-900/40 group"
                >
                  <span className="group-hover:hidden flex items-center gap-2"><Check size={14} /> Saved</span>
                  <span className="hidden group-hover:flex items-center gap-2"><Trash2 size={14} /> Remove</span>
                </button>
             ) : (
                <button 
                  onClick={() => onSave?.(character)}
                  className="text-xs bg-master-gold text-master-bg px-5 py-2 transition-all font-serif font-bold tracking-wider uppercase flex items-center gap-2 hover:bg-master-gold-light shadow-glow-gold"
                >
                  <Bookmark size={14} /> Save
                </button>
             )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Column: Visuals */}
        <div className="lg:w-[40%] bg-master-bg/30 border-r border-master-gold/10 p-8 flex flex-col gap-8">
          {/* Character Image Frame */}
          <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-master-surface-light group shadow-2xl">
            {character.imageUrl ? (
              <img 
                src={character.imageUrl} 
                alt={character.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-master-surface-light bg-master-surface gap-4">
                <User size={64} className="opacity-20" />
                <span className="text-xs font-serif tracking-widest uppercase opacity-50">Visual data unavailable</span>
              </div>
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-master-bg via-transparent to-transparent opacity-60"></div>
            
            {/* Element Badge */}
            {character.element && character.element !== "None" && character.element !== "Physical" && (
              <div className="absolute bottom-6 left-6 backdrop-blur-md bg-master-bg/60 border border-master-gold/30 text-master-ivory px-4 py-1.5 rounded-full text-xs font-bold font-serif tracking-wider uppercase flex items-center gap-2 shadow-lg">
                <Zap size={14} className="text-master-gold" />
                {character.element}
              </div>
            )}
          </div>

          {/* Color Palette */}
          {character.colorPalette && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-master-gold/50"></span>
                <h3 className="text-xs font-serif font-bold tracking-[0.2em] uppercase text-master-gold">Color Palette</h3>
              </div>
              <div className="flex gap-6 justify-center p-4 bg-master-surface/40 border border-master-surface-light rounded-sm">
                <ColorSwatch color={character.colorPalette.primary || '#000'} label="PRI" />
                <ColorSwatch color={character.colorPalette.secondary || '#555'} label="SEC" />
                <ColorSwatch color={character.colorPalette.accent || '#FFF'} label="ACC" />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Data */}
        <div className="lg:w-[60%] p-8 lg:p-10 space-y-10">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Physique */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-master-gold/10 pb-2">
                <User size={16} className="text-master-gold" />
                <h3 className="text-sm font-serif font-bold tracking-widest uppercase text-master-ivory">Physique</h3>
              </div>
              <p className="text-master-ivory-dim text-sm leading-relaxed font-light">
                <strong className="text-master-ivory font-medium block mb-1">{character.build?.type || 'Standard'}</strong>
                {character.build?.description || 'N/A'}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-master-gold bg-master-surface/50 p-3 rounded-sm border border-master-surface-light">
                 <div className="flex items-center gap-2">
                   <Ruler size={12} className="opacity-70" /> 
                   <span>{character.appearance?.height || 'N/A'}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Weight size={12} className="opacity-70" /> 
                   <span>{character.appearance?.weight || 'N/A'}</span>
                 </div>
              </div>
            </div>

            {/* Facial Features */}
            <div className="space-y-4">
               <div className="flex items-center gap-3 border-b border-master-gold/10 pb-2">
                 <ScanFace size={16} className="text-master-gold" />
                 <h3 className="text-sm font-serif font-bold tracking-widest uppercase text-master-ivory">Visage</h3>
               </div>
               <div className="space-y-2 text-sm">
                  {character.appearance?.faceType && (
                     <div className="flex justify-between items-center border-b border-dashed border-master-surface-light pb-1">
                       <span className="text-master-ivory-dim text-xs uppercase tracking-wider">Structure</span>
                       <span className="text-master-ivory">{character.appearance.faceType}</span>
                     </div>
                  )}
                  {character.appearance?.eyeColor && (
                     <div className="flex justify-between items-center border-b border-dashed border-master-surface-light pb-1">
                       <span className="text-master-ivory-dim text-xs uppercase tracking-wider">Eyes</span>
                       <span className="text-master-ivory">{character.appearance.eyeColor}</span>
                     </div>
                  )}
                  {character.appearance?.hairColor && (
                     <div className="flex justify-between items-center border-b border-dashed border-master-surface-light pb-1">
                       <span className="text-master-ivory-dim text-xs uppercase tracking-wider">Hair</span>
                       <span className="text-master-ivory">{character.appearance.hairColor} / {character.appearance.hairStyle}</span>
                     </div>
                  )}
                  {character.appearance?.skinTone && (
                     <div className="flex justify-between items-center pb-1">
                       <span className="text-master-ivory-dim text-xs uppercase tracking-wider">Complexion</span>
                       <span className="text-master-ivory">{character.appearance.skinTone}</span>
                     </div>
                  )}
               </div>
            </div>
          </div>

          {/* Stance Section - Heroic Display */}
          {character.fightingStance && (
            <div className="relative overflow-hidden rounded-sm border border-master-gold/20">
              <div className="absolute inset-0 bg-master-surface/80"></div>
              <div className="relative p-6 z-10">
                  <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                          <Activity size={18} className="text-master-gold" />
                          <h3 className="text-lg font-serif font-bold tracking-widest uppercase text-master-ivory">{character.fightingStance.name || 'Combat Stance'}</h3>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setShowStancePreview(!showStancePreview)}
                          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm flex items-center gap-2 border transition-all ${showStancePreview ? 'bg-master-gold text-master-bg border-master-gold' : 'bg-transparent text-master-gold border-master-gold/30 hover:border-master-gold'}`}
                        >
                          {showStancePreview ? <Pause size={10} /> : <Play size={10} />}
                          {showStancePreview ? 'Stop Preview' : 'Visualize'}
                        </button>
                        
                        <span className="text-[10px] font-bold text-master-bg bg-master-gold px-2 py-1 uppercase tracking-wider rounded-sm">
                            {character.fightingStance.type || 'Standard'}
                        </span>
                      </div>
                  </div>
                  
                  {/* Animation Preview Area */}
                  {showStancePreview && (
                    <div className="mb-6 p-4 bg-master-bg/80 border border-master-gold/20 rounded-sm relative overflow-hidden h-32 flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(212,175,55,0.3)_25%,rgba(212,175,55,0.3)_26%,transparent_27%,transparent_74%,rgba(212,175,55,0.3)_75%,rgba(212,175,55,0.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(212,175,55,0.3)_25%,rgba(212,175,55,0.3)_26%,transparent_27%,transparent_74%,rgba(212,175,55,0.3)_75%,rgba(212,175,55,0.3)_76%,transparent_77%,transparent)] bg-[length:30px_30px] animate-drift"></div>
                        
                        <div className="relative z-10 text-center">
                            {/* Simulated Stance Visualization */}
                            <div className="flex gap-2 items-end h-16 justify-center">
                              <div className="w-1.5 bg-master-gold animate-[bounce_1s_infinite] h-[40%] rounded-t-sm"></div>
                              <div className="w-1.5 bg-master-gold animate-[bounce_1.2s_infinite] h-[70%] rounded-t-sm animation-delay-200"></div>
                              <div className="w-1.5 bg-master-gold animate-[bounce_0.8s_infinite] h-[100%] rounded-t-sm animation-delay-100"></div>
                              <div className="w-1.5 bg-master-gold animate-[bounce_1.5s_infinite] h-[60%] rounded-t-sm animation-delay-300"></div>
                              <div className="w-1.5 bg-master-gold animate-[bounce_1.1s_infinite] h-[80%] rounded-t-sm animation-delay-50"></div>
                            </div>
                            <span className="text-[9px] text-master-gold uppercase tracking-[0.2em] animate-pulse mt-2 block">Simulating Motion Data...</span>
                        </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                          <p className="text-master-ivory-dim text-sm italic mb-4 font-light leading-relaxed border-l-2 border-master-gold/30 pl-4">
                              "{character.fightingStance.description}"
                          </p>
                          <div className="flex flex-wrap gap-2">
                              {character.fightingStance.keyFeatures?.map((feat, i) => (
                                  <span key={i} className="text-[10px] bg-master-bg text-master-gold border border-master-gold/20 px-2 py-1 uppercase tracking-wide">
                                      {feat}
                                  </span>
                              ))}
                          </div>
                      </div>
                      <div className="bg-master-bg/50 p-4 rounded-sm border border-master-surface-light">
                        {character.fightingStance.stats && (
                            <>
                              <StatBar label="Offense" value={character.fightingStance.stats.offense} />
                              <StatBar label="Defense" value={character.fightingStance.stats.defense} />
                              <StatBar label="Speed" value={character.fightingStance.stats.speed} />
                              <StatBar label="Reach" value={character.fightingStance.stats.reach} />
                            </>
                        )}
                      </div>
                  </div>
              </div>
            </div>
          )}
            
          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Weapon */}
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 border-b border-master-gold/10 pb-2 mb-4">
                <Sword size={16} className="text-master-gold" />
                <h3 className="text-sm font-serif font-bold tracking-widest uppercase text-master-ivory">Weaponry</h3>
              </div>
              <div className="bg-master-surface/30 p-4 border border-master-surface-light/50 rounded-sm flex-1">
                 <h4 className="text-master-ivory font-serif font-bold text-lg mb-1">{character.weapon?.name || 'Unarmed'}</h4>
                 <p className="text-master-ivory-dim text-xs mb-3">{character.weapon?.description || 'N/A'}</p>
                 <div className="flex gap-2">
                    {character.weapon?.material && (
                      <span className="text-[10px] uppercase font-bold text-master-gold bg-master-surface px-2 py-1 border border-master-gold/20">
                         {character.weapon.material}
                      </span>
                    )}
                 </div>
              </div>
            </div>

            {/* Outfit */}
            <div className="flex flex-col h-full">
               <div className="flex items-center gap-3 border-b border-master-gold/10 pb-2 mb-4">
                  <Box size={16} className="text-master-gold" />
                  <h3 className="text-sm font-serif font-bold tracking-widest uppercase text-master-ivory">Attire</h3>
               </div>
               <div className="bg-master-surface/30 p-4 border border-master-surface-light/50 rounded-sm flex-1">
                  <h4 className="text-master-ivory font-serif font-bold text-lg mb-1">{character.outfit?.name || 'Basic Outfit'}</h4>
                  <p className="text-master-ivory-dim text-xs mb-3">{character.outfit?.description || 'N/A'}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {character.outfit?.materials?.map((mat, i) => (
                      <span key={i} className="text-[10px] text-master-ivory-dim bg-master-surface px-2 py-0.5 border border-master-surface-light">
                        {mat}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Alternate Loadouts */}
          {character.alternateOutfits && character.alternateOutfits.length > 0 && (
            <div className="border-t border-master-gold/10 pt-6">
              <div className="flex items-center gap-3 mb-6">
                <Layers size={16} className="text-master-gold" />
                <h3 className="text-sm font-serif font-bold tracking-widest uppercase text-master-ivory">Alternate Loadouts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {character.alternateOutfits.map((outfit, idx) => (
                  <div key={idx} className="bg-master-surface/20 border border-master-surface-light/50 p-4 hover:border-master-gold/30 hover:bg-master-surface/40 transition-all group flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-serif text-master-gold opacity-50 group-hover:opacity-100 transition-opacity">NO. 0{idx + 1}</span>
                    </div>
                    <h4 className="text-master-ivory font-medium text-sm mb-2 group-hover:text-master-gold transition-colors">{outfit.name}</h4>
                    <p className="text-master-ivory-dim text-xs leading-relaxed mb-3 line-clamp-3 flex-grow">
                      {outfit.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-auto">
                        {outfit.materials?.map((mat, i) => (
                          <span key={i} className="text-[9px] text-master-ivory-dim/70 bg-master-surface/50 px-1.5 border border-master-surface-light/30">
                            {mat}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

           {/* Backstory */}
           {character.backstory && (
             <div className="bg-master-gold/5 border-l-2 border-master-gold p-6 relative">
               <History size={48} className="absolute right-4 top-4 text-master-gold opacity-10" />
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-sm font-serif font-bold tracking-widest uppercase text-master-gold">Origin & Lore</h3>
              </div>
              <p className="text-master-ivory text-sm leading-7 font-light relative z-10">
                {character.backstory}
              </p>
            </div>
           )}

          {/* Combat Scenario */}
          {character.combatStyleDescription && (
             <div className="bg-master-surface/30 p-6 relative border border-master-gold/10 rounded-sm">
                <div className="absolute top-0 left-0 w-2 h-2 bg-master-gold"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-master-gold"></div>
                <div className="flex items-center gap-3 mb-3">
                   <Swords size={18} className="text-master-gold" />
                   <h3 className="text-sm font-serif font-bold tracking-widest uppercase text-master-ivory">Combat Simulation</h3>
                </div>
                <p className="text-master-ivory-dim text-sm italic leading-relaxed border-l border-master-gold/30 pl-4 py-1">
                   "{character.combatStyleDescription}"
                </p>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CharacterCard;