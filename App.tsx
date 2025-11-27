import React, { useState, useEffect } from 'react';
import Controls from './components/Controls';
import CharacterCard from './components/CharacterCard';
import Roster from './components/Roster';
import { GeneratedCharacter, GenerationOptions, GenerationStatus } from './types';
import { generateCharacterProfile, generateCharacterImage } from './services/geminiService';
import { Sword, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [character, setCharacter] = useState<GeneratedCharacter | null>(null);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [savedCharacters, setSavedCharacters] = useState<GeneratedCharacter[]>([]);
  
  const [options, setOptions] = useState<GenerationOptions>({
    gender: 'Random',
    species: 'Random',
    theme: 'Random',
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
    
    // Appearance defaults
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

  // Load saved characters from localStorage on mount
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

  // Save character to roster
  const handleSaveCharacter = (charToSave: GeneratedCharacter) => {
    try {
      // Check if already saved
      if (savedCharacters.some(c => c.id === charToSave.id)) return;

      const updatedList = [charToSave, ...savedCharacters];
      setSavedCharacters(updatedList);
      localStorage.setItem('forge_roster', JSON.stringify(updatedList));
    } catch (e) {
      console.error("Failed to save character", e);
      setError("Storage quota exceeded. Please remove some characters to save new ones.");
    }
  };

  // Remove character from roster
  const handleRemoveCharacter = (id: string) => {
    const updatedList = savedCharacters.filter(c => c.id !== id);
    setSavedCharacters(updatedList);
    localStorage.setItem('forge_roster', JSON.stringify(updatedList));
  };

  // Check if current character is saved
  const isCurrentCharacterSaved = character 
    ? savedCharacters.some(c => c.id === character.id)
    : false;

  const handleGenerate = async () => {
    setStatus('generating_text');
    setError(null);

    try {
      // 1. Generate Text Profile
      const profileData = await generateCharacterProfile(options);
      
      const newCharacter: GeneratedCharacter = {
        ...profileData,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      
      // Show text immediately
      setCharacter(newCharacter);
      
      // 2. Generate Visual Reference
      setStatus('generating_image');
      const imageUrl = await generateCharacterImage(profileData);
      
      // Update with image
      if (imageUrl) {
        setCharacter(prev => prev ? { ...prev, imageUrl } : null);
      }
      
      setStatus('complete');
      
    } catch (err: any) {
      console.error("Generation failed", err);
      setError(err.message || "Failed to generate character. Please check API Key or try again.");
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-master-bg text-master-ivory font-sans selection:bg-master-gold selection:text-master-bg overflow-x-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-master-gold/5 rounded-full blur-[120px] mix-blend-screen"></div>
         <div className="absolute inset-0 bg-gradient-radial from-transparent to-master-bg opacity-80"></div>
         {/* Subtle Grid Pattern */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
      
        {/* Cinematic Header */}
        <header className="pt-10 pb-6 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-master-gold/10 pb-6">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => {setCharacter(null); setStatus('idle');}}>
              <div className="w-12 h-12 bg-gradient-to-br from-master-gold to-master-gold-dim flex items-center justify-center shadow-glow-gold rotate-45 group-hover:rotate-90 transition-transform duration-500">
                <Sword className="text-master-bg h-6 w-6 -rotate-45 group-hover:-rotate-90 transition-transform duration-500" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-black tracking-widest uppercase text-white">
                  Martial <span className="text-master-gold">Forge</span>
                </h1>
                <p className="text-[10px] text-master-ivory-dim tracking-[0.3em] uppercase">Character Design System</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
               <span className="text-xs font-serif text-master-ivory-dim tracking-widest uppercase opacity-50">V 2.5.0</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-master-gold/5 blur-3xl rounded-full pointer-events-none"></div>
             <h2 className="text-5xl md:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-master-ivory to-master-ivory-dim mb-6 tracking-tight drop-shadow-2xl relative z-10">
                FORGE YOUR <br/> <span className="text-master-gold bg-clip-text text-transparent bg-gradient-to-r from-master-gold via-master-gold-light to-master-gold">LEGEND</span>
             </h2>
             <p className="text-lg text-master-ivory-dim max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
                The ultimate character synthesis engine. Create cinema-quality martial arts concepts 
                with deep lore, combat analytics, and high-fidelity visual references.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             
             {/* Controls Column */}
             <div className="lg:col-span-12 xl:col-span-10 xl:col-start-2">
                <Controls 
                  options={options} 
                  setOptions={setOptions} 
                  onGenerate={handleGenerate}
                  isGenerating={status === 'generating_text' || status === 'generating_image'}
                />
             </div>
          </div>

          {/* Loading Indicator */}
          {status !== 'idle' && status !== 'complete' && status !== 'error' && (
            <div className="flex flex-col items-center justify-center py-12 animate-pulse">
              <div className="w-16 h-16 border-4 border-master-surface border-t-master-gold rounded-full animate-spin mb-4 shadow-glow-gold"></div>
              <p className="text-master-gold font-serif tracking-widest text-sm uppercase">
                {status === 'generating_text' ? 'Synthesizing Profile Data...' : 'Rendering Visual Asset...'}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto bg-red-900/20 border border-red-500/30 text-red-200 p-6 rounded-sm text-center mb-12 backdrop-blur-sm">
              <h4 className="font-serif font-bold uppercase tracking-wider mb-2 text-red-400">System Error</h4>
              <p>{error}</p>
            </div>
          )}

          {/* Result Area */}
          {character && (
            <div className="space-y-6 lg:col-span-12 xl:col-span-10 xl:col-start-2 max-w-5xl mx-auto">
               <CharacterCard 
                  character={character} 
                  isSaved={isCurrentCharacterSaved}
                  onSave={handleSaveCharacter}
                  onRemove={handleRemoveCharacter}
               />
            </div>
          )}

          {/* Saved Roster */}
          <div className="max-w-6xl mx-auto">
             <Roster 
               characters={savedCharacters} 
               onSelect={(char) => {
                  setCharacter(char);
                  setStatus('complete');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
               }} 
               onRemove={handleRemoveCharacter} 
             />
          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-master-gold/10 mt-auto py-12 text-center relative z-10 bg-master-bg">
          <p className="text-master-ivory-dim text-xs font-serif tracking-[0.2em] uppercase opacity-60">
             &copy; {new Date().getFullYear()} Martial Forge / Gemini Core System
          </p>
        </footer>
      
      </div>
    </div>
  );
};

export default App;