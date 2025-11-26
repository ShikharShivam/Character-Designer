import React from 'react';
import { GeneratedCharacter } from '../types';
import { User, Flag, Shield, Palette, Sword, History, Box, Activity, Layers, Flame, Dna, Zap, Star } from 'lucide-react';

interface CharacterCardProps {
  character: GeneratedCharacter;
}

const ColorSwatch: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex flex-col items-center gap-1">
    <div 
      className="w-12 h-12 rounded-full border-2 border-slate-600 shadow-md" 
      style={{ backgroundColor: color }}
      title={color}
    />
    <span className="text-xs text-slate-400 font-mono">{label}</span>
    <span className="text-[10px] text-slate-500 uppercase">{color}</span>
  </div>
);

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="w-full bg-forge-card rounded-xl border border-slate-700 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all ease-in-out hover:scale-[1.01] hover:shadow-cyan-900/30">
      
      {/* Header with Nationality Flag styled text */}
      <div className="bg-slate-800/50 p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-forge-accent mb-1">
            <Flag size={16} />
            <span className="text-sm font-semibold tracking-wider uppercase">{character.nationality}</span>
            {character.alignment && (
               <>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Star size={12} className="text-yellow-500" />
                  {character.alignment}
                </span>
               </>
            )}
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{character.name}</h2>
          <div className="flex flex-wrap items-center gap-3 text-slate-400 text-sm mt-1">
            <span className="bg-slate-700 px-2 py-0.5 rounded text-xs text-white">{character.gender}</span>
            <span className="hidden sm:inline">•</span>
             <span className="bg-slate-700 px-2 py-0.5 rounded text-xs text-white flex items-center gap-1">
               <Dna size={10} className="text-purple-400" />
               {character.species}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="bg-slate-700 px-2 py-0.5 rounded text-xs text-white flex items-center gap-1">
               <Flame size={10} className="text-orange-400" />
               {character.martialArtStyle}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Age: {character.age} <span className="text-slate-500 text-xs">({character.ageGroup})</span></span>
          </div>
        </div>
        <div className="flex gap-2">
             <button 
                onClick={() => navigator.clipboard.writeText(JSON.stringify(character, null, 2))}
                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
             >
                <Box size={14}/> Copy JSON
             </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Column: Visuals & Core Stats */}
        <div className="lg:w-1/3 p-6 bg-slate-900/30 border-r border-slate-700 flex flex-col gap-6">
          {/* Character Image */}
          <div className="aspect-[3/4] w-full bg-slate-800 rounded-lg overflow-hidden border border-slate-600 relative group">
            {character.imageUrl ? (
              <img 
                src={character.imageUrl} 
                alt={character.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2">
                <User size={48} className="opacity-20" />
                <span className="text-sm">No visual reference generated</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
            
            {/* Element Badge Overlay */}
            {character.element && character.element !== "None" && character.element !== "Physical" && (
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-slate-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <Zap size={12} className="text-yellow-400" />
                {character.element} Affinity
              </div>
            )}
          </div>

          {/* Color Palette */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-300 font-semibold">
              <Palette size={18} className="text-forge-accent" />
              <h3>Color Palette</h3>
            </div>
            <div className="flex gap-4 justify-start">
              <ColorSwatch color={character.colorPalette.primary} label="Pri" />
              <ColorSwatch color={character.colorPalette.secondary} label="Sec" />
              <ColorSwatch color={character.colorPalette.accent} label="Acc" />
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:w-2/3 p-6 space-y-8">
          
          {/* Build, Weapon & Markings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold">
                <User size={18} className="text-forge-accent" />
                <h3>Physique & Build</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-2">
                <span className="text-white font-medium">{character.build.type}</span> - {character.build.description}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold">
                <Sword size={18} className="text-forge-accent" />
                <h3>Weapon of Choice</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-2">
                <span className="text-white font-medium">{character.weapon.name}</span>
                <span className="block text-xs mt-1 text-slate-500">{character.weapon.description}</span>
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold">
                <Shield size={18} className="text-forge-accent" />
                <h3>Distinguishing Marks</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {character.bodyMarkings.map((mark, idx) => (
                  <span key={idx} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded border border-slate-600">
                    {mark}
                  </span>
                ))}
                {character.bodyMarkings.length === 0 && <span className="text-slate-500 text-sm">None</span>}
              </div>
            </div>
          </div>

          {/* Outfit */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-300 font-semibold">
              <Box size={18} className="text-forge-accent" />
              <h3>Primary Outfit</h3>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700 mb-3">
               <h4 className="text-white font-medium mb-1">{character.outfit.name}</h4>
               <p className="text-slate-400 text-sm">{character.outfit.description}</p>
            </div>
            
            {/* Primary Materials */}
            <div className="flex items-center gap-2 mb-2 text-xs text-slate-400 uppercase tracking-wide">
              <Layers size={14} className="text-forge-accent" />
              <span>Materials</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {character.outfit.materials.map((mat, i) => (
                <span key={i} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded border border-slate-600">
                  {mat}
                </span>
              ))}
              {character.outfit.materials.length === 0 && <span className="text-slate-500 text-sm">None listed</span>}
            </div>
          </div>

          {/* Alternate Outfits - Improved Layout */}
          {character.alternateOutfits && character.alternateOutfits.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3 text-slate-300 font-semibold">
                <Layers size={18} className="text-forge-accent" />
                <h3>Alternate Loadouts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {character.alternateOutfits.map((outfit, idx) => (
                  <div key={idx} className="bg-slate-800/30 rounded-lg border border-slate-700/60 p-4 flex flex-col h-full hover:border-slate-600 hover:bg-slate-800/50 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium text-sm truncate pr-2" title={outfit.name}>{outfit.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">0{idx + 1}</span>
                    </div>
                    
                    <p className="text-slate-400 text-xs mb-4 line-clamp-3 flex-grow leading-relaxed">
                      {outfit.description}
                    </p>
                    
                    <div className="border-t border-slate-700/50 pt-3 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {outfit.materials.slice(0, 3).map((m, i) => (
                          <span key={i} className="bg-slate-900 text-slate-400 text-[10px] px-1.5 py-0.5 rounded border border-slate-700/50">
                            {m}
                          </span>
                        ))}
                        {outfit.materials.length > 3 && (
                          <span className="text-[10px] text-slate-500 py-0.5 px-1 bg-slate-900/50 rounded border border-transparent">
                            +{outfit.materials.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fighting Stance */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-300 font-semibold">
              <Activity size={18} className="text-forge-accent" />
              <h3>Fighting Stance</h3>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700">
               <div className="flex items-center justify-between mb-1">
                 <h4 className="text-white font-medium">{character.fightingStance.name}</h4>
                 <div className="flex gap-2">
                    {character.element && character.element !== "Physical" && character.element !== "None" && (
                        <span className="text-xs text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full">{character.element}</span>
                    )}
                    <span className="text-xs text-forge-accent border border-forge-accent/30 px-2 py-0.5 rounded-full">{character.martialArtStyle}</span>
                 </div>
               </div>
               <p className="text-slate-400 text-sm mb-3">{character.fightingStance.description}</p>
               <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                 {character.fightingStance.keyFeatures.map((feat, i) => (
                   <li key={i}>{feat}</li>
                 ))}
               </ul>
            </div>
          </div>

           {/* Backstory */}
           <div>
            <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold">
              <History size={18} className="text-forge-accent" />
              <h3>Brief Backstory</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-forge-accent pl-4">
              "{character.backstory}"
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CharacterCard;