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
    <div className="mt-24 animate-in fade-in duration-1000 border-t border-master-gold/10 pt-12">
      <h3 className="text-3xl font-serif font-bold text-master-ivory mb-8 flex items-center gap-4">
        <span className="text-master-gold border-b-2 border-master-gold pb-1">Archives</span>
        <span className="text-sm font-sans bg-master-surface text-master-ivory-dim px-3 py-1 rounded-full border border-master-surface-light">{characters.length} Fighters</span>
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {characters.map((char) => (
          <div 
            key={char.id} 
            className="group relative bg-master-surface border border-master-surface-light overflow-hidden transition-all hover:border-master-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-1"
          >
            {/* Image Thumbnail */}
            <div 
                className="aspect-[4/5] bg-master-bg relative overflow-hidden cursor-pointer"
                onClick={() => onSelect(char)}
            >
              {char.imageUrl ? (
                <img 
                  src={char.imageUrl} 
                  alt={char.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-master-surface-light bg-master-bg/50">
                   <User size={32} />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-master-surface via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-master-ivory font-serif font-bold text-sm truncate tracking-wide">{char.name}</p>
                <p className="text-[10px] text-master-gold uppercase tracking-widest truncate mt-1">{char.martialArtStyle}</p>
              </div>

              {/* View Overlay */}
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-master-gold text-master-bg p-2 rounded-full shadow-lg block">
                      <Eye size={14} />
                  </span>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(char.id);
              }}
              className="absolute top-3 left-3 p-2 bg-red-900/80 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-red-500/30"
              title="Remove from roster"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roster;