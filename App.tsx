
import React, { useState, useEffect } from 'react';
import Controls from './components/Controls';
import CharacterCard from './components/CharacterCard';
import Roster from './components/Roster';
import { GeneratedCharacter, GenerationOptions, GenerationStatus } from './types';
import { generateCharacterProfile, generateCharacterImage } from './services/geminiService';
import { Sword } from 'lucide-react';

const App: React.FC = () => {
  const [character, setCharacter] = useState<GeneratedCharacter | null>(null);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [savedCharacters, setSavedCharacters] = useState<GeneratedCharacter[]>([]);
  
  const [options, setOptions] = useState<GenerationOptions>({
    gender: 'Random',
    species: 'Random',
    theme: 'Random',
    gameInspiration: 'None',
    weapon: 'Random',
    weaponMaterial: 'Random',
    weaponColor: '',
    outfitStyle: 'Random',
    nationality: 'Random',
    ethnicity: 'Random',
    personality: 'Random',
    martialArtStyle: 'Random',
    ageGroup: 'Random',
    alignment: 'Random',
    element: 'Random',
    customName: '',
    customPrompt: '',
    alternateOutfitsCount: 0,
    faceType: 'Random',
    skinTone: 'Random',
    eyeShape: 'Random',
    eyeColor: 'Random',
    hairStyle: 'Random',
    hairColor: 'Random',
    facialHair: 'Random',
    height: 'Random',
    weight: 'Random'
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('forge_roster');
      if (saved) {
        setSavedCharacters(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load roster", e);
    }
  }, []);

  const handleSaveCharacter = (charToSave: GeneratedCharacter) => {
    try {
      if (savedCharacters.some(c => c.id === charToSave.id)) return;
      const updatedList = [charToSave, ...savedCharacters];
      setSavedCharacters(updatedList);
      localStorage.setItem('forge_roster', JSON.stringify(updatedList));
    } catch (e) {
      console.error("Failed to save character", e);
      setError("Storage quota exceeded. Please remove some characters.");
    }
  };

  const handleRemoveCharacter = (id: string) => {
    const updatedList = savedCharacters.filter(c => c.id !== id);
    setSavedCharacters(updatedList);
    localStorage.setItem('forge_roster', JSON.stringify(updatedList));
  };

  const isCurrentCharacterSaved = character 
    ? savedCharacters.some(c => c.id === character.id)
    : false;

  const handleGenerate = async () => {
    setStatus('generating_text');
    setError(null);
    try {
      const profileData = await generateCharacterProfile(options);
      const newCharacter: GeneratedCharacter = {
        ...profileData,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      setCharacter(newCharacter);
      
      setStatus('generating_image');
      const imageUrl = await generateCharacterImage(profileData);
      
      if (imageUrl) {
        setCharacter(prev => prev ? { ...prev, imageUrl } : null);
      }
      setStatus('complete');
    } catch (err: any) {
      console.error("Generation failed", err);
      setError(err.message || "Failed to generate character.");
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-master-bg text-master-ivory font-sans selection:bg-master-gold selection:text-master-bg overflow-x-hidden relative flex flex-col">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute inset-0 bg-master-bg"></div>
         <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
         <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-master-gold/5 rounded-full blur-[120px] mix-blend-screen animate-blob animate-delay-2000"></div>
         <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen animate-blob animate-delay-4000"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] animate-drift"></div>
         <div className="absolute inset-0 bg-gradient-radial from-transparent to-master-bg/90"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-grow w-full max-w-[1920px] mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start h-full">
        
        {/* === LEFT COLUMN: CONTROLS SIDEBAR === */}
        <aside className="w-full lg:w-[400px] flex-shrink-0 z-20">
          <div className="mb-6 flex items-center gap-3 cursor-pointer group" onClick={() => {setCharacter(null); setStatus('idle');}}>
              <div className="w-10 h-10 bg-gradient-to-br from-master-gold to-master-gold-dim flex items-center justify-center shadow-glow-gold rotate-45 group-hover:rotate-90 transition-transform duration-500">
                <Sword className="text-master-bg h-5 w-5 -rotate-45 group-hover:-rotate-90 transition-transform duration-500" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-black tracking-widest uppercase text-white leading-none">
                  Martial <span className="text-master-gold">Forge</span>
                </h1>
                <p className="text-[8px] text-master-ivory-dim tracking-[0.4em] uppercase">System V 3.0</p>
              </div>
          </div>
          
          <Controls 
            options={options} 
            setOptions={setOptions} 
            onGenerate={handleGenerate}
            isGenerating={status === 'generating_text' || status === 'generating_image'}
          />
          
          <div className="mt-8 hidden lg:block">
             <Roster 
               characters={savedCharacters} 
               onSelect={(char) => {
                  setCharacter(char);
                  setStatus('complete');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
               }} 
               onRemove={handleRemoveCharacter} 
             />
          </div>
        </aside>

        {/* === RIGHT COLUMN: PREVIEW & RESULTS === */}
        <main className="flex-1 w-full flex flex-col gap-8 min-h-[85vh]">
           
           {/* Welcome Hero (Show when no character) */}
           {!character && status === 'idle' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border border-master-gold/10 rounded-sm bg-master-bg/20 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-master-gold/5 blur-3xl rounded-full pointer-events-none animate-pulse-slow"></div>
                  <h2 className="text-4xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-master-ivory to-master-ivory-dim mb-6 tracking-tight drop-shadow-2xl relative z-10">
                    AWAITING <br/> <span className="text-master-gold">INPUT</span>
                  </h2>
                  <p className="text-sm text-master-ivory-dim max-w-lg mx-auto font-light leading-relaxed tracking-wide mb-8">
                    Configure parameters in the control module to synthesize a new martial artist profile.
                    The forge is ready to generate detailed lore, combat analytics, and visual assets.
                  </p>
                  
                  {/* Decorative Elements */}
                  <div className="grid grid-cols-3 gap-8 text-master-gold/30 uppercase text-[10px] tracking-widest font-serif">
                     <div className="flex flex-col items-center gap-2">
                        <div className="w-1 h-8 bg-current"></div>
                        <span>Identity</span>
                     </div>
                     <div className="flex flex-col items-center gap-2">
                        <div className="w-1 h-8 bg-current"></div>
                        <span>Combat</span>
                     </div>
                     <div className="flex flex-col items-center gap-2">
                        <div className="w-1 h-8 bg-current"></div>
                        <span>Visuals</span>
                     </div>
                  </div>
              </div>
           )}

           {/* Loading State */}
           {status !== 'idle' && status !== 'complete' && status !== 'error' && (
             <div className="flex-1 flex flex-col items-center justify-center p-12 border border-master-gold/10 rounded-sm bg-master-bg/20 backdrop-blur-sm">
                <div className="w-20 h-20 border-4 border-master-surface border-t-master-gold rounded-full animate-spin mb-6 shadow-glow-gold"></div>
                <h3 className="text-2xl font-serif text-master-ivory mb-2">Processing Data</h3>
                <p className="text-master-gold font-serif tracking-widest text-xs uppercase animate-pulse">
                  {status === 'generating_text' ? 'Synthesizing Profile DNA...' : 'Rendering 3D Visual Asset...'}
                </p>
             </div>
           )}

           {/* Error Message */}
           {error && (
             <div className="bg-red-900/20 border border-red-500/30 text-red-200 p-6 rounded-sm text-center backdrop-blur-sm">
               <h4 className="font-serif font-bold uppercase tracking-wider mb-2 text-red-400">System Error</h4>
               <p>{error}</p>
             </div>
           )}

           {/* Character Card Result */}
           {character && (
             <CharacterCard 
                character={character} 
                isSaved={isCurrentCharacterSaved}
                onSave={handleSaveCharacter}
                onRemove={handleRemoveCharacter}
             />
           )}
           
           {/* Mobile Roster (Visible only on small screens) */}
           <div className="lg:hidden">
              <Roster 
                characters={savedCharacters} 
                onSelect={(char) => {
                  setCharacter(char);
                  setStatus('complete');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                onRemove={handleRemoveCharacter} 
              />
           </div>
        </main>
      </div>
    </div>
  );
};

export default App;
