
import React from 'react';
import { GenerationOptions } from '../types';
import Button from './Button';
import { Sparkles, UserCircle, Layers } from 'lucide-react';

interface ControlsProps {
  options: GenerationOptions;
  setOptions: (options: GenerationOptions) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const Controls: React.FC<ControlsProps> = ({ options, setOptions, onGenerate, isGenerating }) => {
  
  const handleChange = (key: keyof GenerationOptions, value: any) => {
    setOptions({ ...options, [key]: value });
  };

  const inputClasses = "w-full bg-slate-800 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-forge-accent focus:border-transparent outline-none transition-all placeholder-slate-500";
  const labelClasses = "text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1 block";

  return (
    <div className="bg-forge-card p-6 rounded-xl border border-slate-700 shadow-xl mb-8">
      
      {/* Name Input */}
      <div className="mb-6">
        <label className={labelClasses}>Character Name (Optional)</label>
        <div className="relative">
          <UserCircle className="absolute left-3 top-2.5 text-slate-500" size={20} />
          <input
            type="text"
            className={`${inputClasses} pl-10`}
            placeholder="e.g. Hanzo, Sarah Connor, The Iron Monk..."
            value={options.customName || ''}
            onChange={(e) => handleChange('customName', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Gender */}
        <div>
          <label className={labelClasses}>Gender</label>
          <select 
            className={inputClasses}
            value={options.gender || 'Random'}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
          </select>
        </div>

        {/* Nationality */}
        <div>
          <label className={labelClasses}>Nationality</label>
          <select 
             className={inputClasses}
            value={options.nationality || 'Random'}
            onChange={(e) => handleChange('nationality', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="Japanese">Japanese</option>
            <option value="Chinese">Chinese</option>
            <option value="American">American</option>
            <option value="Brazilian">Brazilian</option>
            <option value="Thai">Thai</option>
            <option value="Korean">Korean</option>
            <option value="Russian">Russian</option>
            <option value="Filipino">Filipino</option>
            <option value="Indian">Indian</option>
            <option value="French">French</option>
          </select>
        </div>

        {/* Ethnicity */}
        <div>
          <label className={labelClasses}>Ethnicity</label>
          <select 
             className={inputClasses}
            value={options.ethnicity || 'Random'}
            onChange={(e) => handleChange('ethnicity', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="East Asian">East Asian</option>
            <option value="South Asian">South Asian</option>
            <option value="Southeast Asian">Southeast Asian</option>
            <option value="Black/African">Black / African</option>
            <option value="White/Caucasian">White / Caucasian</option>
            <option value="Latino/Hispanic">Latino / Hispanic</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Pacific Islander">Pacific Islander</option>
            <option value="Indigenous">Indigenous</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        {/* Martial Art Style - NEW */}
        <div>
          <label className={labelClasses}>Martial Art Style</label>
          <select 
             className={inputClasses}
            value={options.martialArtStyle || 'Random'}
            onChange={(e) => handleChange('martialArtStyle', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="Kung Fu">Kung Fu / Wushu</option>
            <option value="Karate">Karate</option>
            <option value="Muay Thai">Muay Thai</option>
            <option value="Taekwondo">Taekwondo</option>
            <option value="Judo">Judo</option>
            <option value="Jiu-Jitsu">Brazillian Jiu-Jitsu</option>
            <option value="Boxing">Boxing / Kickboxing</option>
            <option value="Capoeira">Capoeira</option>
            <option value="Ninjutsu">Ninjutsu</option>
            <option value="Krav Maga">Krav Maga</option>
            <option value="Jeet Kune Do">Jeet Kune Do</option>
            <option value="Silat">Silat</option>
            <option value="MMA">MMA / Hybrid</option>
          </select>
        </div>

        {/* Personality/Archetype */}
        <div>
          <label className={labelClasses}>Archetype / Personality</label>
          <select 
             className={inputClasses}
            value={options.personality || 'Random'}
            onChange={(e) => handleChange('personality', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="Honorable Warrior">Honorable Warrior</option>
            <option value="Ruthless Mercenary">Ruthless Mercenary</option>
            <option value="Zen Monk">Zen Monk</option>
            <option value="Arrogant Prodigy">Arrogant Prodigy</option>
            <option value="Vengeful Survivor">Vengeful Survivor</option>
            <option value="Jovial Brawler">Jovial Brawler</option>
            <option value="Silent Assassin">Silent Assassin</option>
            <option value="Reluctant Hero">Reluctant Hero</option>
          </select>
        </div>

        {/* Theme Select */}
        <div>
          <label className={labelClasses}>Theme / Style</label>
          <select 
             className={inputClasses}
            value={options.theme || 'Random'}
            onChange={(e) => handleChange('theme', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="Traditional">Traditional</option>
            <option value="Modern">Modern</option>
            <option value="Cyberpunk">Cyberpunk</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Post-Apocalyptic">Post-Apocalyptic</option>
          </select>
        </div>

        {/* Weapon Select */}
        <div>
          <label className={labelClasses}>Weapon Style</label>
          <select 
             className={inputClasses}
            value={options.weapon || 'Random'}
            onChange={(e) => handleChange('weapon', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="Unarmed">Unarmed / Hand-to-Hand</option>
            <option value="Sword">Sword / Blade</option>
            <option value="Staff">Staff / Polearm</option>
            <option value="Unique">Unique / Exotic</option>
          </select>
        </div>
      </div>

      {/* Extra Options Toggle */}
      <div className="mb-8 p-4 bg-slate-900/30 rounded-lg border border-slate-700/50 flex items-center justify-between cursor-pointer hover:bg-slate-900/50 transition-colors"
           onClick={() => handleChange('includeAlternateOutfits', !options.includeAlternateOutfits)}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${options.includeAlternateOutfits ? 'bg-forge-accent text-white' : 'bg-slate-700 text-slate-400'}`}>
            <Layers size={18} />
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-200 block">Generate Alternate Outfits</span>
            <span className="text-xs text-slate-500">Create additional outfit variations (e.g. Training, Formal, Stealth)</span>
          </div>
        </div>
        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${options.includeAlternateOutfits ? 'bg-forge-accent' : 'bg-slate-700'}`}>
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${options.includeAlternateOutfits ? 'translate-x-6' : 'translate-x-0'}`} />
        </div>
      </div>

      <div className="flex justify-center border-t border-slate-700 pt-6">
        <Button 
          onClick={onGenerate} 
          isLoading={isGenerating} 
          className="w-full md:w-auto md:px-16 py-3 text-lg"
        >
          {isGenerating ? 'Forging Character...' : (
            <>
              <Sparkles size={20} />
              Generate Fighter
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Controls;