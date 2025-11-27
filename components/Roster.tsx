import React from 'react';
import { GeneratedCharacter } from '../types';
import { Trash2, User, Eye } from 'lucide-react';

interface RosterProps {
  characters: GeneratedCharacter[];
  onSelect: (character: GeneratedCharacter) => void;
  onRemove: (id: string) => void;
}

const Roster: React.FC<RosterProps> = ({ characters, onSelect, onRemove }) => {
  if (characters.length === 0) return null;

  return (
    <div className="mt-16 animate-in fade-in duration-700">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-b border-stone-800 pb-4">
        <span className="text-forge-accent">Saved Fighters</span> Roster
        <span className="text-sm bg-stone-800 text-stone-400 px-2 py-0.5 rounded-full ml-2 border border-stone-700">{characters.length}</span>
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {characters.map((char) => (
          <div 
            key={char.id} 
            className="group relative bg-stone-800/50 border border-stone-700 rounded-lg overflow-hidden transition-all hover:border-forge-accent hover:shadow-lg hover:shadow-amber-900/20"
          >
            {/* Image Thumbnail */}
            <div 
                className="aspect-square bg-stone-900 relative overflow-hidden cursor-pointer"
                onClick={() => onSelect(char)}
            >
              {char.imageUrl ? (
                <img 
                  src={char.imageUrl} 
                  alt={char.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-600">
                   <User size={32} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm truncate">{char.name}</p>
                <p className="text-xs text-stone-400 truncate">{char.martialArtStyle}</p>
              </div>

              {/* View Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]">
                  <span className="bg-forge-accent text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition-transform shadow-lg">
                      <Eye size={12} /> View
                  </span>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(char.id);
              }}
              className="absolute top-2 right-2 p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
              title="Remove from roster"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roster;