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
    <div className="min-h-screen bg-forge-dark text-stone-200 font-sans pb-20">
      
      {/* Navbar */}
      <nav className="border-b border-stone-800 bg-stone-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {setCharacter(null); setStatus('idle');}}>
            <div className="bg-gradient-to-br from-red-600 to-amber-500 p-2 rounded-lg shadow-lg shadow-red-900/20">
              <Sword className="text-white h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Martial Arts <span className="text-forge-accent">Forge</span>
            </h1>
          </div>
          <div className="text-sm text-stone-500 hidden sm:block">
            Powered by Gemini 2.5
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-forge-accent to-red-500">Ultimate Fighter</span>
          </h2>
          <p className="text-lg text-stone-400 max-w-2xl mx-auto">
            Generate production-ready character concepts with detailed 3D modeling specifications, 
            unique fighting styles, and visual references.
          </p>
        </div>

        {/* Controls */}
        <Controls 
          options={options} 
          setOptions={setOptions} 
          onGenerate={handleGenerate}
          isGenerating={status === 'generating_text' || status === 'generating_image'}
        />

        {/* Loading / Status Message */}
        {status !== 'idle' && status !== 'complete' && status !== 'error' && (
          <div className="text-center py-8 animate-pulse">
            <p className="text-forge-accent font-medium text-lg">
              {status === 'generating_text' ? 'Analyzing fighting styles & weaving backstory...' : 'Rendering concept art reference...'}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-800/50 text-red-300 p-4 rounded-lg text-center mb-8">
            {error}
          </div>
        )}

        {/* Result Area */}
        {character && (
          <div className="space-y-6">
             <CharacterCard 
                character={character} 
                isSaved={isCurrentCharacterSaved}
                onSave={handleSaveCharacter}
                onRemove={handleRemoveCharacter}
             />
          </div>
        )}

        {/* Empty State */}
        {!character && status === 'idle' && savedCharacters.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-stone-800 rounded-xl bg-stone-900/20">
            <div className="opacity-30 flex flex-col items-center text-stone-500">
              <Sword size={64} className="mb-4" />
              <p className="text-xl font-semibold">Ready to Forge</p>
              <p className="text-sm mt-2">Select options above and click Generate</p>
            </div>
          </div>
        )}

        {/* Saved Roster */}
        <Roster 
          characters={savedCharacters} 
          onSelect={(char) => {
             setCharacter(char);
             setStatus('complete'); // Show the card
             window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll to card
          }} 
          onRemove={handleRemoveCharacter} 
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 mt-20 py-8 text-center text-stone-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Martial Arts Character Forge. Built with React & Gemini.</p>
      </footer>
    </div>
  );
};

export default App;