
import React, { useRef, useState } from 'react';
import { GenerationOptions } from '../types';
import Button from './Button';
import { Sparkles, User, UserCircle, Swords, Shield, Palette, Upload, X, Ruler, Dna, Shirt, Gavel, ScanFace } from 'lucide-react';

interface ControlsProps {
  options: GenerationOptions;
  setOptions: (options: GenerationOptions) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

type Tab = 'identity' | 'body' | 'combat' | 'gear' | 'visuals';

const Controls: React.FC<ControlsProps> = ({ options, setOptions, onGenerate, isGenerating }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('identity');

  const handleChange = (key: keyof GenerationOptions, value: any) => {
    setOptions({ ...options, [key]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('referenceImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    handleChange('referenceImage', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const inputClasses = "w-full bg-master-bg/80 border border-master-gold/20 rounded-none p-2.5 text-master-ivory focus:border-master-gold focus:ring-1 focus:ring-master-gold focus:outline-none transition-all placeholder-master-ivory-dim text-xs hover:border-master-gold/40";
  const labelClasses = "text-[9px] uppercase tracking-[0.2em] font-serif font-bold text-master-gold mb-1.5 block";
  
  const TabButton = ({ id, label, icon: Icon }: { id: Tab; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 flex flex-col items-center justify-center py-3 border-b-2 transition-all duration-300 group ${
        activeTab === id 
          ? 'border-master-gold text-master-gold bg-master-gold/5' 
          : 'border-transparent text-master-ivory-dim hover:text-master-ivory hover:bg-master-ivory/5'
      }`}
    >
      <Icon size={18} className={`mb-1 ${activeTab === id ? 'text-master-gold' : 'group-hover:text-master-ivory'}`} />
      <span className="text-[9px] uppercase tracking-widest font-serif">{label}</span>
    </button>
  );

  return (
    <div className="glass-panel rounded-sm shadow-2xl relative overflow-hidden flex flex-col h-full max-h-[calc(100vh-2rem)] sticky top-4">
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-master-gold opacity-50"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-master-gold opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-master-gold opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-master-gold opacity-50"></div>
      
      {/* Name Input - Always Visible */}
      <div className="p-6 pb-4 border-b border-master-gold/10 bg-master-surface/50">
        <label className="text-[10px] uppercase tracking-[0.3em] font-serif text-master-gold mb-2 block text-center">Subject Designation</label>
        <div className="relative group">
          <input
            type="text"
            className="w-full bg-transparent border-b border-master-surface-light text-center text-xl font-serif text-white p-1 focus:border-master-gold outline-none transition-all placeholder-master-surface-light group-hover:border-master-gold/30"
            placeholder="ENTER NAME..."
            value={options.customName || ''}
            onChange={(e) => handleChange('customName', e.target.value)}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-master-gold/10 bg-master-surface/30">
        <TabButton id="identity" label="Core" icon={UserCircle} />
        <TabButton id="body" label="Body" icon={Dna} />
        <TabButton id="combat" label="Combat" icon={Swords} />
        <TabButton id="gear" label="Gear" icon={Shield} />
        <TabButton id="visuals" label="Extra" icon={Sparkles} />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        
        {/* === TAB: IDENTITY === */}
        {activeTab === 'identity' && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Species */}
            <div>
              <label className={labelClasses}>Species / Race</label>
              <select className={inputClasses} value={options.species || 'Random'} onChange={(e) => handleChange('species', e.target.value)}>
                <option value="Random">Random</option>
                <optgroup label="Standard">
                  <option value="Human">Human</option>
                  <option value="Cyborg">Cyborg / Enhanced Human</option>
                  <option value="Android">Android / Synthetic</option>
                </optgroup>
                <optgroup label="Fantasy">
                  <option value="Elf">Elf (High/Wood/Dark)</option>
                  <option value="Dwarf">Dwarf</option>
                  <option value="Orc">Orc</option>
                  <option value="Goblin">Goblin</option>
                  <option value="Tiefling">Tiefling / Demon-kin</option>
                  <option value="Dragonborn">Dragonborn / Draconian</option>
                  <option value="Undead">Undead / Revenant</option>
                  <option value="Vampire">Vampire</option>
                  <option value="Lycanthrope">Werewolf / Lycanthrope</option>
                  <option value="Fae">Fae / Fairy</option>
                  <option value="Giant">Giant / Goliath</option>
                  <option value="Celestial">Celestial / Aasimar</option>
                </optgroup>
                <optgroup label="Beast-Kin">
                  <option value="Feline">Feline (Cat/Lion/Tiger)</option>
                  <option value="Canine">Canine (Wolf/Dog/Fox)</option>
                  <option value="Ursine">Ursine (Bear)</option>
                  <option value="Avian">Avian (Bird/Hawk/Owl)</option>
                  <option value="Reptilian">Reptilian (Lizard/Snake)</option>
                  <option value="Amphibian">Amphibian (Frog/Toad)</option>
                  <option value="Insectoid">Insectoid (Mantis/Beetle)</option>
                </optgroup>
                <optgroup label="Sci-Fi / Alien">
                  <option value="Grey Alien">Grey Alien</option>
                  <option value="Insectoid Alien">Insectoid Alien</option>
                  <option value="Energy Being">Pure Energy Being</option>
                  <option value="Silicon Based">Silicon/Rock Based</option>
                  <option value="Plant Based">Plant Based / Dryad</option>
                  <option value="Hologram">Hard Light Hologram</option>
                  <option value="Nanobot Swarm">Nanobot Swarm</option>
                </optgroup>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Gender */}
              <div>
                <label className={labelClasses}>Gender</label>
                <select className={inputClasses} value={options.gender || 'Random'} onChange={(e) => handleChange('gender', e.target.value)}>
                  <option value="Random">Random</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="None">None / Androgynous</option>
                </select>
              </div>

               {/* Age Group */}
              <div>
                <label className={labelClasses}>Age</label>
                <select className={inputClasses} value={options.ageGroup || 'Random'} onChange={(e) => handleChange('ageGroup', e.target.value)}>
                  <option value="Random">Random</option>
                  <option value="Child">Child (&lt;13)</option>
                  <option value="Teen">Teen (13-19)</option>
                  <option value="Young Adult">Young Adult (20-29)</option>
                  <option value="Prime">Prime (30-45)</option>
                  <option value="Middle Aged">Middle Aged (46-60)</option>
                  <option value="Elderly">Elder (60+)</option>
                  <option value="Ancient">Ancient (100+)</option>
                  <option value="Timeless">Timeless / Immortal</option>
                </select>
              </div>
            </div>

            {/* Nationality */}
            <div>
              <label className={labelClasses}>Origin / Nationality</label>
              <select className={inputClasses} value={options.nationality || 'Random'} onChange={(e) => handleChange('nationality', e.target.value)}>
                <option value="Random">Random</option>
                <optgroup label="Real World - Asia">
                  <option value="Japanese">Japanese</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Korean">Korean</option>
                  <option value="Thai">Thai</option>
                  <option value="Vietnamese">Vietnamese</option>
                  <option value="Filipino">Filipino</option>
                  <option value="Indian">Indian</option>
                  <option value="Mongolian">Mongolian</option>
                  <option value="Tibetan">Tibetan</option>
                  <option value="Indonesian">Indonesian</option>
                </optgroup>
                <optgroup label="Real World - West">
                  <option value="American">American</option>
                  <option value="British">British</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Russian">Russian</option>
                  <option value="Italian">Italian</option>
                  <option value="Scandinavian">Scandinavian</option>
                  <option value="Greek">Greek</option>
                  <option value="Brazilian">Brazilian</option>
                  <option value="Mexican">Mexican</option>
                </optgroup>
                <optgroup label="Real World - Other">
                  <option value="Egyptian">Egyptian</option>
                  <option value="Nigerian">Nigerian</option>
                  <option value="South African">South African</option>
                  <option value="Middle Eastern">Middle Eastern</option>
                  <option value="Turkish">Turkish</option>
                  <option value="Persian">Persian</option>
                  <option value="Australian">Australian</option>
                  <option value="Polynesian">Polynesian</option>
                  <option value="Inuit">Inuit</option>
                  <option value="Native American">Native American</option>
                </optgroup>
                <optgroup label="Fictional / Generic">
                  <option value="Space Colony">Space Colony</option>
                  <option value="Cyber City">Cybernetic Megacity</option>
                  <option value="Wasteland">Post-Apocalyptic Wasteland</option>
                  <option value="Hidden Village">Hidden Ninja Village</option>
                  <option value="Magic Kingdom">High Magic Kingdom</option>
                  <option value="Underworld">The Underworld</option>
                  <option value="Celestial Plane">Celestial Plane</option>
                  <option value="Void">The Void</option>
                  <option value="Atlantis">Atlantis / Underwater</option>
                </optgroup>
              </select>
            </div>

            {/* Alignment & Personality */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className={labelClasses}>Alignment</label>
                <select className={inputClasses} value={options.alignment || 'Random'} onChange={(e) => handleChange('alignment', e.target.value)}>
                  <option value="Random">Random</option>
                  <option value="Lawful Good">Lawful Good</option>
                  <option value="Neutral Good">Neutral Good</option>
                  <option value="Chaotic Good">Chaotic Good</option>
                  <option value="Lawful Neutral">Lawful Neutral</option>
                  <option value="True Neutral">True Neutral</option>
                  <option value="Chaotic Neutral">Chaotic Neutral</option>
                  <option value="Lawful Evil">Lawful Evil</option>
                  <option value="Neutral Evil">Neutral Evil</option>
                  <option value="Chaotic Evil">Chaotic Evil</option>
                </select>
              </div>
              
              <div>
                <label className={labelClasses}>Personality</label>
                <select className={inputClasses} value={options.personality || 'Random'} onChange={(e) => handleChange('personality', e.target.value)}>
                  <option value="Random">Random</option>
                  <option value="Honorable">Honorable</option>
                  <option value="Ruthless">Ruthless</option>
                  <option value="Stoic">Stoic</option>
                  <option value="Arrogant">Arrogant</option>
                  <option value="Jovial">Jovial</option>
                  <option value="Insane">Insane / Manic</option>
                  <option value="Cold">Cold / Calculating</option>
                  <option value="Naive">Naive / Innocent</option>
                  <option value="Seductive">Seductive</option>
                  <option value="Wise">Wise / Mentor</option>
                  <option value="Aggressive">Aggressive</option>
                  <option value="Cowardly">Cowardly / Sneaky</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* === TAB: BODY === */}
        {activeTab === 'body' && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
             
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className={labelClasses}>Height</label>
                 <select className={inputClasses} value={options.height || 'Random'} onChange={(e) => handleChange('height', e.target.value)}>
                   <option value="Random">Random</option>
                   <option value="Tiny">Tiny (Fairy/Insect)</option>
                   <option value="Short">Short</option>
                   <option value="Average">Average</option>
                   <option value="Tall">Tall</option>
                   <option value="Towering">Towering</option>
                   <option value="Giant">Giant</option>
                   <option value="Colossal">Colossal</option>
                 </select>
               </div>
               <div>
                 <label className={labelClasses}>Build / Weight</label>
                 <select className={inputClasses} value={options.weight || 'Random'} onChange={(e) => handleChange('weight', e.target.value)}>
                   <option value="Random">Random</option>
                   <option value="Emaciated">Emaciated</option>
                   <option value="Slender">Slender / Slim</option>
                   <option value="Athletic">Athletic / Toned</option>
                   <option value="Muscular">Muscular</option>
                   <option value="Bodybuilder">Bodybuilder / Massive</option>
                   <option value="Stocky">Stocky / Broad</option>
                   <option value="Fat">Fat / Sumo Build</option>
                   <option value="Curvy">Curvy</option>
                 </select>
               </div>
             </div>

             <div>
                <label className={labelClasses}>Skin Tone / Complexion</label>
                <select className={inputClasses} value={options.skinTone || 'Random'} onChange={(e) => handleChange('skinTone', e.target.value)}>
                  <option value="Random">Random</option>
                  <optgroup label="Natural">
                    <option value="Pale">Pale / Porcelain</option>
                    <option value="Fair">Fair</option>
                    <option value="Tan">Tan / Olive</option>
                    <option value="Brown">Brown</option>
                    <option value="Dark Brown">Dark Brown</option>
                    <option value="Ebony">Ebony / Black</option>
                    <option value="Ruddy">Ruddy</option>
                  </optgroup>
                  <optgroup label="Unnatural">
                    <option value="Grey">Grey / Ash</option>
                    <option value="Green">Green</option>
                    <option value="Red">Red / Crimson</option>
                    <option value="Blue">Blue</option>
                    <option value="Purple">Purple</option>
                    <option value="Gold">Metallic Gold</option>
                    <option value="Silver">Metallic Silver</option>
                    <option value="Copper">Metallic Copper</option>
                    <option value="Transparent">Transparent / Ghostly</option>
                    <option value="Chitin">Chitin / Exoskeleton</option>
                    <option value="Fur">Fur Covered</option>
                    <option value="Scales">Scales</option>
                  </optgroup>
                </select>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Hair Style</label>
                  <select className={inputClasses} value={options.hairStyle || 'Random'} onChange={(e) => handleChange('hairStyle', e.target.value)}>
                    <option value="Random">Random</option>
                    <option value="Bald">Bald</option>
                    <option value="Buzz Cut">Buzz Cut</option>
                    <option value="Short">Short</option>
                    <option value="Bob">Bob Cut</option>
                    <option value="Shoulder Length">Shoulder Length</option>
                    <option value="Long Straight">Long Straight</option>
                    <option value="Long Wavy">Long Wavy</option>
                    <option value="Ponytail">Ponytail</option>
                    <option value="Twin Tails">Twin Tails</option>
                    <option value="Bun">Bun / Topknot</option>
                    <option value="Mohawk">Mohawk</option>
                    <option value="Dreadlocks">Dreadlocks</option>
                    <option value="Braids">Braids</option>
                    <option value="Spiky">Spiky (Anime)</option>
                    <option value="Afro">Afro</option>
                  </select>
                </div>
                <div>
                   <label className={labelClasses}>Hair Color</label>
                   <select className={inputClasses} value={options.hairColor || 'Random'} onChange={(e) => handleChange('hairColor', e.target.value)}>
                      <option value="Random">Random</option>
                      <option value="Black">Black</option>
                      <option value="Brown">Brown</option>
                      <option value="Blonde">Blonde</option>
                      <option value="Red">Red / Ginger</option>
                      <option value="Auburn">Auburn</option>
                      <option value="Grey">Grey</option>
                      <option value="White">White</option>
                      <option value="Blue">Blue</option>
                      <option value="Green">Green</option>
                      <option value="Pink">Pink</option>
                      <option value="Purple">Purple</option>
                      <option value="Rainbow">Rainbow / Multi</option>
                   </select>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className={labelClasses}>Eye Color</label>
                   <select className={inputClasses} value={options.eyeColor || 'Random'} onChange={(e) => handleChange('eyeColor', e.target.value)}>
                      <option value="Random">Random</option>
                      <option value="Brown">Brown</option>
                      <option value="Blue">Blue</option>
                      <option value="Green">Green</option>
                      <option value="Hazel">Hazel</option>
                      <option value="Grey">Grey</option>
                      <option value="Amber">Amber</option>
                      <option value="Violet">Violet</option>
                      <option value="Red">Red</option>
                      <option value="Black">Black</option>
                      <option value="White">White / Blind</option>
                      <option value="Glowing Blue">Glowing Blue</option>
                      <option value="Glowing Red">Glowing Red</option>
                      <option value="Heterochromia">Heterochromia</option>
                   </select>
                </div>
                <div>
                   <label className={labelClasses}>Facial Hair</label>
                   <select className={inputClasses} value={options.facialHair || 'Random'} onChange={(e) => handleChange('facialHair', e.target.value)}>
                      <option value="Random">Random</option>
                      <option value="Clean Shaven">Clean Shaven</option>
                      <option value="Stubble">Stubble</option>
                      <option value="Goatee">Goatee</option>
                      <option value="Mustache">Mustache</option>
                      <option value="Full Beard">Full Beard</option>
                      <option value="Long Beard">Long Wizard Beard</option>
                      <option value="Mutton Chops">Mutton Chops</option>
                   </select>
                </div>
             </div>
          </div>
        )}

        {/* === TAB: COMBAT === */}
        {activeTab === 'combat' && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
             
             {/* Game Inspiration */}
             <div>
                <label className={labelClasses}>Inspiration Source</label>
                <select className={inputClasses} value={options.gameInspiration || 'None'} onChange={(e) => handleChange('gameInspiration', e.target.value)}>
                   <option value="None">None</option>
                   <optgroup label="Fighting Games">
                      <option value="Street Fighter">Street Fighter</option>
                      <option value="Tekken">Tekken</option>
                      <option value="Mortal Kombat">Mortal Kombat</option>
                      <option value="Guilty Gear">Guilty Gear</option>
                      <option value="SoulCalibur">SoulCalibur</option>
                      <option value="King of Fighters">King of Fighters</option>
                      <option value="Dead or Alive">Dead or Alive</option>
                      <option value="Virtua Fighter">Virtua Fighter</option>
                      <option value="Super Smash Bros">Super Smash Bros</option>
                   </optgroup>
                   <optgroup label="Action / RPG">
                      <option value="Elden Ring">Elden Ring / Dark Souls</option>
                      <option value="Sekiro">Sekiro</option>
                      <option value="Assassin's Creed">Assassin's Creed</option>
                      <option value="God of War">God of War</option>
                      <option value="Devil May Cry">Devil May Cry</option>
                      <option value="Final Fantasy">Final Fantasy</option>
                      <option value="Cyberpunk 2077">Cyberpunk 2077</option>
                      <option value="Overwatch">Overwatch</option>
                      <option value="League of Legends">League of Legends</option>
                      <option value="DOTA 2">DOTA 2</option>
                      <option value="Warhammer 40k">Warhammer 40k</option>
                      <option value="Star Wars">Star Wars</option>
                      <option value="Matrix">The Matrix</option>
                   </optgroup>
                </select>
             </div>

             {/* Martial Arts */}
             <div>
               <label className={labelClasses}>Fighting Style</label>
               <select className={inputClasses} value={options.martialArtStyle || 'Random'} onChange={(e) => handleChange('martialArtStyle', e.target.value)}>
                 <option value="Random">Random</option>
                 <optgroup label="Chinese Arts">
                   <option value="Kung Fu">Kung Fu (General)</option>
                   <option value="Shaolin Kung Fu">Shaolin Kung Fu</option>
                   <option value="Wing Chun">Wing Chun</option>
                   <option value="Tai Chi">Tai Chi Chuan</option>
                   <option value="Baguazhang">Baguazhang (Circle Walking)</option>
                   <option value="Xingyiquan">Xingyiquan</option>
                   <option value="Bajiquan">Bajiquan (Eight Extremities)</option>
                   <option value="Choy Li Fut">Choy Li Fut</option>
                   <option value="Hung Ga">Hung Ga</option>
                   <option value="White Crane">White Crane Style</option>
                   <option value="Praying Mantis">Praying Mantis Style</option>
                   <option value="Monkey Style">Monkey Style</option>
                   <option value="Drunken Boxing">Zui Quan (Drunken Boxing)</option>
                   <option value="Eagle Claw">Eagle Claw</option>
                   <option value="Sanda">Sanda / Sanshou</option>
                   <option value="Shuai Jiao">Shuai Jiao (Wrestling)</option>
                   <option value="Dim Mak">Dim Mak (Pressure Points)</option>
                 </optgroup>
                 <optgroup label="Japanese Arts">
                   <option value="Karate">Karate (Shotokan/Goju-ryu)</option>
                   <option value="Kyokushin">Kyokushin Karate</option>
                   <option value="Judo">Judo</option>
                   <option value="Jujutsu">Jujutsu (Traditional)</option>
                   <option value="Aikido">Aikido</option>
                   <option value="Kendo">Kendo</option>
                   <option value="Iaido">Iaido</option>
                   <option value="Kenjutsu">Kenjutsu</option>
                   <option value="Ninjutsu">Ninjutsu</option>
                   <option value="Sumo">Sumo</option>
                   <option value="Shorinji Kempo">Shorinji Kempo</option>
                 </optgroup>
                 <optgroup label="Korean Arts">
                   <option value="Taekwondo">Taekwondo</option>
                   <option value="Hapkido">Hapkido</option>
                   <option value="Tang Soo Do">Tang Soo Do</option>
                   <option value="Kuk Sool Won">Kuk Sool Won</option>
                   <option value="Taekkyeon">Taekkyeon</option>
                 </optgroup>
                 <optgroup label="Southeast Asian">
                   <option value="Muay Thai">Muay Thai</option>
                   <option value="Muay Boran">Muay Boran</option>
                   <option value="Lethwei">Lethwei (Burmese)</option>
                   <option value="Silat">Pencak Silat</option>
                   <option value="Kali/Arnis/Eskrima">Kali / Arnis / Eskrima</option>
                   <option value="Bokator">Bokator</option>
                   <option value="Panantukan">Panantukan (Dirty Boxing)</option>
                   <option value="Krabi Krabong">Krabi Krabong</option>
                 </optgroup>
                 <optgroup label="South Asian / Indian">
                   <option value="Kalaripayattu">Kalaripayattu</option>
                   <option value="Gatka">Gatka</option>
                   <option value="Kushti">Kushti / Pehlwani</option>
                   <option value="Silambam">Silambam</option>
                   <option value="Mardani Khel">Mardani Khel</option>
                 </optgroup>
                 <optgroup label="European / Western">
                   <option value="Boxing">Boxing (Classic/Modern)</option>
                   <option value="Bare Knuckle">Bare Knuckle Boxing</option>
                   <option value="Kickboxing">Kickboxing</option>
                   <option value="Savate">Savate (French Boxing)</option>
                   <option value="Wrestling">Greco-Roman / Freestyle Wrestling</option>
                   <option value="Catch Wrestling">Catch Wrestling</option>
                   <option value="Pankration">Pankration</option>
                   <option value="BJJ">Brazilian Jiu-Jitsu</option>
                   <option value="Sambo">Sambo</option>
                   <option value="Systema">Systema</option>
                   <option value="Krav Maga">Krav Maga</option>
                   <option value="MCMAP">MCMAP (Marine Corps)</option>
                   <option value="Bartitsu">Bartitsu</option>
                   <option value="Fencing">Fencing</option>
                   <option value="HEMA">HEMA (Historical European)</option>
                   <option value="Glima">Glima (Viking Wrestling)</option>
                 </optgroup>
                 <optgroup label="Americas">
                   <option value="Capoeira">Capoeira</option>
                   <option value="Luta Livre">Luta Livre</option>
                   <option value="Vale Tudo">Vale Tudo</option>
                   <option value="Jailhouse Rock">Jailhouse Rock / 52 Blocks</option>
                   <option value="Okichitaw">Okichitaw</option>
                 </optgroup>
                 <optgroup label="Fictional / Fantasy">
                   <option value="Pro Wrestling">Pro Wrestling (Theatrical)</option>
                   <option value="Gun Kata">Gun Kata</option>
                   <option value="Force Fighting">Lightsaber Form</option>
                   <option value="Bending">Elemental Bending</option>
                   <option value="Ansatsuken">Ansatsuken</option>
                   <option value="Hokuto Shinken">Hokuto Shinken</option>
                 </optgroup>
               </select>
             </div>

             {/* Elemental Affinity */}
             <div>
               <label className={labelClasses}>Elemental Affinity</label>
               <select className={inputClasses} value={options.element || 'Random'} onChange={(e) => handleChange('element', e.target.value)}>
                 <option value="Random">Random</option>
                 <option value="None">None (Pure Physical)</option>
                 <optgroup label="Basic">
                   <option value="Fire">Fire / Pyromancy</option>
                   <option value="Water">Water / Hydrokinesis</option>
                   <option value="Ice">Ice / Cryomancy</option>
                   <option value="Wind">Wind / Aerokinesis</option>
                   <option value="Earth">Earth / Geokinesis</option>
                   <option value="Lightning">Lightning / Electrokinesis</option>
                   <option value="Nature">Nature / Plant</option>
                   <option value="Metal">Metal</option>
                 </optgroup>
                 <optgroup label="Special">
                   <option value="Light">Light / Holy</option>
                   <option value="Darkness">Darkness / Shadow</option>
                   <option value="Void">Void / Null</option>
                   <option value="Gravity">Gravity</option>
                   <option value="Time">Time / Chrono</option>
                   <option value="Space">Space / Spatial</option>
                   <option value="Psychic">Psychic / Psionic</option>
                   <option value="Spirit">Spirit / Chi</option>
                   <option value="Blood">Blood Magic</option>
                   <option value="Necromancy">Necromancy</option>
                   <option value="Sound">Sound / Sonic</option>
                   <option value="Poison">Poison / Toxin</option>
                   <option value="Magma">Magma / Lava</option>
                   <option value="Steam">Steam</option>
                   <option value="Crystal">Crystal</option>
                 </optgroup>
                 <optgroup label="Technological">
                   <option value="Nanotech">Nanotech</option>
                   <option value="Hard Light">Hard Light</option>
                   <option value="Plasma">Plasma</option>
                   <option value="Nuclear">Nuclear</option>
                   <option value="Cybernetic">Cybernetic Enhancement</option>
                 </optgroup>
               </select>
             </div>
          </div>
        )}

        {/* === TAB: GEAR === */}
        {activeTab === 'gear' && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
             
             {/* Weapon */}
             <div>
               <label className={labelClasses}>Primary Weapon</label>
               <select className={inputClasses} value={options.weapon || 'Random'} onChange={(e) => handleChange('weapon', e.target.value)}>
                 <option value="Random">Random</option>
                 <option value="Unarmed">Unarmed / Fists</option>
                 
                 <optgroup label="Swords">
                   <option value="Longsword">Longsword</option>
                   <option value="Katana">Katana</option>
                   <option value="Greatsword">Greatsword / Zweihander</option>
                   <option value="Rapier">Rapier</option>
                   <option value="Scimitar">Scimitar / Shamshir / Tulwar</option>
                   <option value="Saber">Saber</option>
                   <option value="Broadsword">Broadsword</option>
                   <option value="Shortsword">Shortsword / Gladius</option>
                   <option value="Claymore">Claymore</option>
                   <option value="Falchion">Falchion / Messer</option>
                   <option value="Khopesh">Khopesh</option>
                   <option value="Shotel">Shotel (Curved)</option>
                   <option value="Flamberge">Flamberge (Wavy)</option>
                   <option value="Hook Swords">Hook Swords</option>
                   <option value="Butterfly Swords">Butterfly Swords</option>
                   <option value="Dual Swords">Dual Swords</option>
                 </optgroup>
                 
                 <optgroup label="Daggers & Knives">
                   <option value="Dagger">Dagger</option>
                   <option value="Knife">Combat Knife</option>
                   <option value="Kukri">Kukri</option>
                   <option value="Karambit">Karambit</option>
                   <option value="Kris">Kris (Wavy Dagger)</option>
                   <option value="Kunai">Kunai</option>
                   <option value="Stiletto">Stiletto</option>
                   <option value="Dirk">Dirk</option>
                   <option value="Main Gauche">Main Gauche</option>
                   <option value="Push Dagger">Push Dagger / Katar</option>
                 </optgroup>

                 <optgroup label="Polearms">
                   <option value="Spear">Spear</option>
                   <option value="Halberd">Halberd</option>
                   <option value="Staff">Bo Staff / Quarterstaff</option>
                   <option value="Glaive">Glaive / Guandao</option>
                   <option value="Naginata">Naginata</option>
                   <option value="Lance">Lance</option>
                   <option value="Trident">Trident</option>
                   <option value="Scythe">Scythe</option>
                   <option value="Bardiche">Bardiche</option>
                   <option value="Pike">Pike</option>
                   <option value="Lucerne Hammer">Lucerne Hammer</option>
                 </optgroup>

                 <optgroup label="Blunt & Axes">
                   <option value="Warhammer">Warhammer</option>
                   <option value="Mace">Mace</option>
                   <option value="Morning Star">Morning Star</option>
                   <option value="Flail">Flail</option>
                   <option value="Battleaxe">Battleaxe</option>
                   <option value="Tomahawk">Tomahawk</option>
                   <option value="Club">Club / Kanabo</option>
                   <option value="Maul">Maul / Sledgehammer</option>
                   <option value="Tonfa">Tonfa</option>
                   <option value="Nunchaku">Nunchaku</option>
                 </optgroup>

                 <optgroup label="Ranged">
                   <option value="Longbow">Longbow</option>
                   <option value="Recurve Bow">Recurve Bow</option>
                   <option value="Shortbow">Shortbow</option>
                   <option value="Crossbow">Crossbow</option>
                   <option value="Hand Crossbow">Hand Crossbow</option>
                   <option value="Throwing Knives">Throwing Knives</option>
                   <option value="Shuriken">Shuriken</option>
                   <option value="Chakram">Chakram</option>
                   <option value="Boomerang">Boomerang</option>
                   <option value="Blowgun">Blowgun</option>
                   <option value="Slingshot">Slingshot</option>
                 </optgroup>

                 <optgroup label="Firearms">
                   <option value="Pistol">Pistol</option>
                   <option value="Revolver">Revolver</option>
                   <option value="Shotgun">Shotgun</option>
                   <option value="Sawed-Off">Sawed-Off Shotgun</option>
                   <option value="Assault Rifle">Assault Rifle</option>
                   <option value="Sniper Rifle">Sniper Rifle</option>
                   <option value="SMG">Submachine Gun</option>
                   <option value="Minigun">Minigun</option>
                   <option value="Rocket Launcher">Rocket Launcher</option>
                   <option value="Grenade Launcher">Grenade Launcher</option>
                   <option value="Flamethrower">Flamethrower</option>
                   <option value="Musket">Musket</option>
                   <option value="Flintlock">Flintlock Pistol</option>
                   <option value="Blunderbuss">Blunderbuss</option>
                 </optgroup>

                 <optgroup label="Exotic / Special">
                   <option value="Whip">Whip</option>
                   <option value="Chain Whip">Chain Whip</option>
                   <option value="Urumi">Urumi (Flexible Sword)</option>
                   <option value="Rope Dart">Rope Dart / Meteor Hammer</option>
                   <option value="Three Section Staff">Three Section Staff</option>
                   <option value="War Fan">War Fan (Tessen)</option>
                   <option value="Shield">Shield (Tower/Kite/Buckler)</option>
                   <option value="Claws">Claws (Tekko-Kagi)</option>
                   <option value="Gauntlets">Heavy Gauntlets</option>
                   <option value="Cestus">Cestus</option>
                   <option value="Scythe">Giant Scythe</option>
                   <option value="Cards">Throwing Cards</option>
                   <option value="Puppet">Combat Puppet</option>
                   <option value="Anchor">Ship Anchor</option>
                   <option value="Chainsaw">Chainsaw</option>
                 </optgroup>
                 
                 <optgroup label="Sci-Fi / Future">
                   <option value="Laser Sword">Laser Sword / Beam Saber</option>
                   <option value="Plasma Rifle">Plasma Rifle</option>
                   <option value="Railgun">Railgun</option>
                   <option value="Energy Cannon">Energy Cannon</option>
                   <option value="Monofilament Whip">Monofilament Whip</option>
                   <option value="Power Fist">Power Fist</option>
                   <option value="Chainsword">Chainsword</option>
                   <option value="Gravity Hammer">Gravity Hammer</option>
                   <option value="Needle Gun">Needle Gun</option>
                 </optgroup>
               </select>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className={labelClasses}>Weapon Material</label>
                  <select className={inputClasses} value={options.weaponMaterial || 'Random'} onChange={(e) => handleChange('weaponMaterial', e.target.value)}>
                    <option value="Random">Random</option>
                    <option value="Steel">Steel</option>
                    <option value="Iron">Iron</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Wood">Wood</option>
                    <option value="Bone">Bone</option>
                    <option value="Obsidian">Obsidian</option>
                    <option value="Crystal">Crystal</option>
                    <option value="Gold">Gold Plated</option>
                    <option value="Silver">Silver</option>
                    <option value="Energy">Pure Energy</option>
                    <option value="Light">Hard Light</option>
                    <option value="Ice">Unmelting Ice</option>
                    <option value="Damascus">Damascus Steel</option>
                    <option value="Carbon Fiber">Carbon Fiber</option>
                    <option value="Titanium">Titanium</option>
                    <option value="Adamant">Adamantine</option>
                    <option value="Mithril">Mithril</option>
                  </select>
               </div>
               <div>
                 <label className={labelClasses}>Weapon Color</label>
                 <div className="flex gap-2">
                    <div className="relative w-8 flex-shrink-0 bg-master-bg/80 border border-master-gold/20 hover:border-master-gold transition-colors cursor-pointer group h-[34px]">
                      <input 
                          type="color" 
                          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                          value={options.weaponColor && /^#[0-9A-F]{6}$/i.test(options.weaponColor) ? options.weaponColor : '#D4AF37'}
                          onChange={(e) => handleChange('weaponColor', e.target.value)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div 
                            className="w-4 h-4 rounded-full shadow-lg transition-transform group-hover:scale-110" 
                            style={{
                              backgroundColor: options.weaponColor || '#94a3b8', 
                              boxShadow: `0 0 5px ${options.weaponColor || '#94a3b8'}`
                            }}
                          ></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      className={`${inputClasses} flex-1`}
                      placeholder="HEX / Name"
                      value={options.weaponColor || ''}
                      onChange={(e) => handleChange('weaponColor', e.target.value)}
                    />
                 </div>
               </div>
             </div>

             {/* Armor / Outfit Style */}
             <div>
               <label className={labelClasses}>Armor / Outfit Style</label>
               <select className={inputClasses} value={options.outfitStyle || 'Random'} onChange={(e) => handleChange('outfitStyle', e.target.value)}>
                 <option value="Random">Random</option>
                 <optgroup label="Heavy Armor">
                   <option value="Full Plate">Full Plate Armor (Medieval)</option>
                   <option value="Gothic Plate">Gothic Plate Armor</option>
                   <option value="Samurai Armor">O-Yoroi (Samurai)</option>
                   <option value="Scale Mail">Scale Mail</option>
                   <option value="Brigandine">Brigandine</option>
                   <option value="Lamellar">Lamellar Armor</option>
                   <option value="Power Armor">Power Armor (Sci-Fi)</option>
                   <option value="Space Marine">Heavy Space Marine Armor</option>
                   <option value="Juggernaut">Juggernaut Suit (EOD)</option>
                   <option value="Mech Suit">Mech Pilot Suit</option>
                 </optgroup>
                 <optgroup label="Light Armor">
                   <option value="Leather Armor">Leather Armor</option>
                   <option value="Studded Leather">Studded Leather</option>
                   <option value="Chainmail">Chainmail</option>
                   <option value="Gambeson">Gambeson / Padded</option>
                   <option value="Tactical Gear">Modern Tactical / Kevlar</option>
                   <option value="Riot Gear">Riot Gear</option>
                   <option value="Ninja Gear">Shinobi Shozoku (Ninja)</option>
                   <option value="Gladiator">Gladiator Harness</option>
                   <option value="Cyber Mesh">Cyber-Mesh Bodysuit</option>
                   <option value="Nano Suit">Nano-Suit</option>
                 </optgroup>
                 <optgroup label="Clothing / Robes">
                   <option value="Monk Robes">Monk Robes</option>
                   <option value="Wizard Robes">Wizard / Mage Robes</option>
                   <option value="Martial Arts Gi">Martial Arts Gi / Dogi</option>
                   <option value="Kimono">Kimono / Hakama</option>
                   <option value="Suit">Formal Suit / Tuxedo</option>
                   <option value="Trench Coat">Trench Coat / Duster</option>
                   <option value="Streetwear">Modern Streetwear</option>
                   <option value="Punk">Punk / Goth</option>
                   <option value="Tribal">Tribal / Primitive</option>
                   <option value="Rags">Rags / Survivor</option>
                   <option value="Noble">Noble / Royal Attire</option>
                   <option value="Uniform">Military Uniform</option>
                 </optgroup>
                 <optgroup label="Exotic">
                    <option value="Bio-Organic">Bio-Organic / Carapace</option>
                    <option value="Energy Field">Energy Field / Aura</option>
                    <option value="Ethereal">Ethereal / Ghostly</option>
                    <option value="Crystalline">Crystalline Growth</option>
                 </optgroup>
               </select>
             </div>

             {/* Alternate Outfits */}
             <div>
                <label className={labelClasses}>Extra Loadout Slots</label>
                <select className={inputClasses} value={options.alternateOutfitsCount || 0} onChange={(e) => handleChange('alternateOutfitsCount', parseInt(e.target.value))}>
                  <option value={0}>None</option>
                  <option value={1}>+1 Alternate Outfit</option>
                  <option value={2}>+2 Alternate Outfits</option>
                  <option value={3}>+3 Alternate Outfits</option>
                </select>
             </div>
          </div>
        )}

        {/* === TAB: VISUALS === */}
        {activeTab === 'visuals' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             
             {/* Render Style Input */}
             <div>
                <label className={labelClasses}>Render Style</label>
                <select className={inputClasses} value={options.imageStyle || 'Cinematic'} onChange={(e) => handleChange('imageStyle', e.target.value)}>
                  <option value="Cinematic">Cinematic 3D Render (Dynamic Stance)</option>
                  <option value="GameSprite">2D Game Sprite (A-Pose / Flat)</option>
                </select>
             </div>

             {/* Theme */}
             <div>
               <label className={labelClasses}>Overall Theme</label>
               <select className={inputClasses} value={options.theme || 'Random'} onChange={(e) => handleChange('theme', e.target.value)}>
                 <option value="Random">Random</option>
                 <optgroup label="Historical">
                   <option value="Medieval">Medieval Europe</option>
                   <option value="Feudal Japan">Feudal Japan</option>
                   <option value="Ancient Rome">Ancient Rome</option>
                   <option value="Ancient Egypt">Ancient Egypt</option>
                   <option value="Viking Age">Viking Age</option>
                   <option value="Wild West">Wild West</option>
                   <option value="Victorian">Victorian Era</option>
                   <option value="Pirate">Golden Age of Piracy</option>
                   <option value="Aztec">Aztec / Mayan</option>
                 </optgroup>
                 <optgroup label="Modern">
                   <option value="Modern Day">Modern Day</option>
                   <option value="Urban">Urban Street</option>
                   <option value="Military">Modern Military</option>
                   <option value="Noir">Film Noir</option>
                 </optgroup>
                 <optgroup label="Fantasy">
                   <option value="High Fantasy">High Fantasy</option>
                   <option value="Dark Fantasy">Dark Fantasy</option>
                   <option value="Wuxia">Wuxia (Chinese Fantasy)</option>
                   <option value="Xianxia">Xianxia (Cultivation)</option>
                   <option value="Steampunk">Steampunk</option>
                   <option value="Dieselpunk">Dieselpunk</option>
                   <option value="Gothic Horror">Gothic Horror</option>
                   <option value="Eldritch">Eldritch / Lovecraftian</option>
                 </optgroup>
                 <optgroup label="Sci-Fi">
                   <option value="Cyberpunk">Cyberpunk</option>
                   <option value="Space Opera">Space Opera</option>
                   <option value="Post-Apocalyptic">Post-Apocalyptic</option>
                   <option value="Solarpunk">Solarpunk</option>
                   <option value="Biopunk">Biopunk</option>
                   <option value="Retro-Futurism">Retro-Futurism</option>
                   <option value="Dystopian">Dystopian</option>
                 </optgroup>
               </select>
             </div>

             {/* Custom Prompt */}
             <div className="h-32">
                <label className={labelClasses}>Custom Instructions</label>
                <textarea
                  className={`${inputClasses} h-full resize-none`}
                  placeholder="Override generator with specific details... e.g. 'A cybernetic samurai with a neon katana fighting in the rain'"
                  value={options.customPrompt || ''}
                  onChange={(e) => handleChange('customPrompt', e.target.value)}
                />
             </div>

             {/* Image Upload */}
             <div>
                <label className={labelClasses}>Visual Reference</label>
                <div className={`relative h-24 border border-dashed rounded-sm flex flex-col items-center justify-center transition-all bg-master-bg/40 overflow-hidden ${options.referenceImage ? 'border-master-gold' : 'border-master-gold/20 hover:border-master-gold/50'}`}>
                   {options.referenceImage ? (
                      <div className="w-full h-full relative group">
                         <img src={options.referenceImage} alt="Ref" className="w-full h-full object-cover opacity-60" />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={clearImage} className="bg-red-900/80 hover:bg-red-800 text-white p-1 rounded-full border border-red-500"><X size={16} /></button>
                         </div>
                      </div>
                   ) : (
                      <>
                         <input type="file" ref={fileInputRef} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageUpload} />
                         <div className="flex flex-col items-center text-master-ivory-dim pointer-events-none">
                            <Upload size={16} className="mb-1 text-master-gold opacity-70" />
                            <span className="text-[9px] font-serif tracking-widest uppercase">Upload Image</span>
                         </div>
                      </>
                   )}
                </div>
             </div>
          </div>
        )}

      </div>

      {/* Action Bar */}
      <div className="p-6 pt-4 border-t border-master-gold/10 bg-master-surface/50">
        <Button 
          onClick={onGenerate} 
          isLoading={isGenerating} 
          className="w-full py-3 text-sm"
        >
          {isGenerating ? 'Forging...' : (
            <>
              <Sparkles size={16} />
              Forge Character
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Controls;
