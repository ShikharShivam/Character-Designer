
import React from 'react';
import { GeneratedCharacter } from '../types';
import { User, Flag, Shield, Palette, Sword, History, Box, Activity, Layers, Flame, Dna, Zap, Star, Bookmark, Check, Trash2, Copy, Ruler, Weight, ScanFace, Eye, Scissors } from 'lucide-react';

interface CharacterCardProps {
  character: GeneratedCharacter;
  isSaved?: boolean;
  onSave?: (character: GeneratedCharacter) => void;
  onRemove?: (id: string) => void;
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

const StatBar: React.FC<{ label: string; value: number; colorClass?: string }> = ({ label, value, colorClass = "bg-forge-accent" }) => (
  <div className="mb-2">
    <div className="flex justify-between text-xs uppercase font-bold text-slate-400 mb-1">
      <span>{label}</span>
      <span>{value}/10</span>
    </div>
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
      <div 
        className={`h-full ${colorClass} transition-all duration-1000 ease-out`} 
        style={{ width: `${value * 10}%` }}
      />
    </div>
  </div>
);

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isSaved = false, onSave, onRemove }) => {
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
                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-2 rounded-lg transition-colors flex items-center gap-1 font-medium"
                title="Copy JSON Data"
             >
                <Copy size={16}/> <span className="hidden sm:inline">JSON</span>
             </button>
             
             {isSaved ? (
                <button 
                  onClick={() => onRemove?.(character.id)}
                  className="text-xs bg-green-900/50 border border-green-700 text-green-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 font-bold hover:bg-red-900/50 hover:border-red-700 hover:text-red-400 group"
                >
                  <span className="group-hover:hidden flex items-center gap-1.5"><Check size={16} /> Saved</span>
                  <span className="hidden group-hover:flex items-center gap-1.5"><Trash2 size={16} /> Remove</span>
                </button>
             ) : (
                <button 
                  onClick={() => onSave?.(character)}
                  className="text-xs bg-forge-accent hover:bg-forge-accent-hover text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 font-bold shadow-lg shadow-cyan-500/20"
                >
                  <Bookmark size={16} /> Save Fighter
                </button>
             )}
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
          
          {/* Build, Stats & Appearance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Physique */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold">
                <User size={18} className="text-forge-accent" />
                <h3>Physique & Build</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                <span className="text-white font-medium">{character.build.type}</span> - {character.build.description}
              </p>
              <div className="flex gap-4 text-xs text-slate-500 bg-slate-800/50 p-2 rounded border border-slate-700/50">
                 <div className="flex items-center gap-1">
                   <Ruler size={14} /> 
                   <span>{character.appearance?.height || 'N/A'}</span>
                 </div>
                 <div className="h-4 w-px bg-slate-600"></div>
                 <div className="flex items-center gap-1">
                   <Weight size={14} /> 
                   <span>{character.appearance?.weight || 'N/A'}</span>
                 </div>
                 {character.appearance?.skinTone && (
                   <>
                     <div className="h-4 w-px bg-slate-600"></div>
                     <span>{character.appearance.skinTone} Skin</span>
                   </>
                 )}
              </div>
            </div>

            {/* Facial Features (New) */}
            <div>
               <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold">
                 <ScanFace size={18} className="text-forge-accent" />
                 <h3>Facial Features</h3>
               </div>
               <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-sm">
                  {character.appearance?.faceType && (
                     <div className="flex items-start gap-1.5 col-span-2">
                       <User size={14} className="text-slate-500 mt-0.5" />
                       <span className="text-slate-400"><span className="text-slate-500 text-xs uppercase mr-1">Face:</span>{character.appearance.faceType}</span>
                     </div>
                  )}
                  {character.appearance?.eyeColor && (
                     <div className="flex items-start gap-1.5">
                       <Eye size={14} className="text-slate-500 mt-0.5" />
                       <span className="text-slate-400"><span className="text-slate-500 text-xs uppercase mr-1">Eyes:</span>{character.appearance.eyeColor} {character.appearance.eyeShape ? `(${character.appearance.eyeShape})` : ''}</span>
                     </div>
                  )}
                  {character.appearance?.hairColor && (
                     <div className="flex items-start gap-1.5">
                       <Scissors size={14} className="text-slate-500 mt-0.5" />
                       <span className="text-slate-400"><span className="text-slate-500 text-xs uppercase mr-1">Hair:</span>{character.appearance.hairColor} {character.appearance.hairStyle ? `(${character.appearance.hairStyle})` : ''}</span>
                     </div>
                  )}
                  {character.appearance?.facialHair && character.appearance.facialHair !== 'None' && (
                     <div className="flex items-start gap-1.5 col-span-2">
                        <span className="text-slate-500 text-xs uppercase font-bold w-4 text-center">FH</span>
                       <span className="text-slate-400">{character.appearance.facialHair}</span>
                     </div>
                  )}
               </div>
            </div>
            
            {/* Weapon Details */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold">
                <Sword size={18} className="text-forge-accent" />
                <h3>Weapon of Choice</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-2">
                <span className="text-white font-medium">{character.weapon.name}</span>
                <span className="block text-xs mt-1 text-slate-500">{character.weapon.description}</span>
              </p>
              {(character.weapon.color || character.weapon.material) && (
                 <div className="flex gap-2 mt-2">
                    {character.weapon.material && (
                      <span className="text-[10px] uppercase font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                         {character.weapon.material}
                      </span>
                    )}
                    {character.weapon.color && (
                      <span className="text-[10px] uppercase font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1">
                         <span className="w-2 h-2 rounded-full inline-block" style={{backgroundColor: character.weapon.color}}></span>
                         {character.weapon.color}
                      </span>
                    )}
                 </div>
              )}
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

          {/* Fighting Stance & Stats (Improved Visualization) */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-300 font-semibold">
              <Activity size={18} className="text-forge-accent" />
              <h3>Fighting Style & Stance</h3>
            </div>
            <div className="bg-slate-800/40 p-5 rounded-lg border border-slate-700">
               <div className="flex items-center justify-between mb-3">
                 <h4 className="text-white font-medium text-lg">{character.fightingStance.name}</h4>
                 <div className="flex gap-2">
                    {character.fightingStance.type && (
                         <span className="text-xs text-white bg-slate-700 border border-slate-600 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                            {character.fightingStance.type}
                         </span>
                    )}
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-3 italic">{character.fightingStance.description}</p>
                    <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                      {character.fightingStance.keyFeatures.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Visual Stats */}
                  {character.fightingStance.stats && (
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                       <StatBar label="Offense" value={character.fightingStance.stats.offense} colorClass="bg-red-500" />
                       <StatBar label="Defense" value={character.fightingStance.stats.defense} colorClass="bg-blue-500" />
                       <StatBar label="Speed" value={character.fightingStance.stats.speed} colorClass="bg-yellow-400" />
                       <StatBar label="Reach" value={character.fightingStance.stats.reach} colorClass="bg-green-500" />
                    </div>
                  )}
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

          {/* Alternate Outfits */}
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
