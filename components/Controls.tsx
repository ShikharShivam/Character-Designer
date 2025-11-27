

import React from 'react';
import { GenerationOptions } from '../types';
import Button from './Button';
import { Sparkles, UserCircle, MessageSquare } from 'lucide-react';

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
        
        {/* Species */}
        <div>
          <label className={labelClasses}>Species</label>
          <select 
            className={inputClasses}
            value={options.species || 'Random'}
            onChange={(e) => handleChange('species', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="Human">Human</option>
            <option value="Cyborg/Android">Cyborg / Android</option>
            <option value="Anthropomorphic Animal">Beast-kin / Anthro (e.g. Panda)</option>
            <option value="Elf">Elf / Fae</option>
            <option value="Orc">Orc / Ogre</option>
            <option value="Demon">Demon / Spirit</option>
            <option value="Alien">Alien</option>
            <option value="Undead">Undead / Vampire</option>
          </select>
        </div>

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

        {/* Age Group */}
        <div>
          <label className={labelClasses}>Age Group</label>
          <select 
             className={inputClasses}
            value={options.ageGroup || 'Random'}
            onChange={(e) => handleChange('ageGroup', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="Child">Child Prodigy</option>
            <option value="Teen">Teenager</option>
            <option value="Young Adult">Young Adult</option>
            <option value="Adult">Adult (Prime)</option>
            <option value="Veteran">Veteran (Middle-aged)</option>
            <option value="Elderly">Elder / Old Master</option>
            <option value="Ancient">Ancient / Timeless</option>
          </select>
        </div>

        {/* Nationality */}
        <div>
          <label className={labelClasses}>Nationality / Origin</label>
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
            <option value="Other">Other / Fantasy Realm</option>
          </select>
        </div>

        {/* Ethnicity */}
        <div>
          <label className={labelClasses}>Ethnicity / Heritage</label>
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

        {/* Alignment */}
        <div>
          <label className={labelClasses}>Alignment / Role</label>
          <select 
             className={inputClasses}
            value={options.alignment || 'Random'}
            onChange={(e) => handleChange('alignment', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="Hero">Hero / Protagonist</option>
            <option value="Villain">Villain / Antagonist</option>
            <option value="Anti-Hero">Anti-Hero</option>
            <option value="Neutral">Neutral / Wanderer</option>
            <option value="Rival">Rival</option>
            <option value="Mentor">Mentor</option>
            <option value="Minion">Minion / Grunt</option>
          </select>
        </div>

        {/* Martial Art Style */}
        <div>
          <label className={labelClasses}>Martial Art Style</label>
          <select 
             className={inputClasses}
            value={options.martialArtStyle || 'Random'}
            onChange={(e) => handleChange('martialArtStyle', e.target.value)}
          >
            <option value="Random">Random</option>
            <optgroup label="Chinese Arts">
              <option value="Kung Fu">Kung Fu / Wushu</option>
              <option value="Shaolin">Shaolin Kung Fu</option>
              <option value="Wing Chun">Wing Chun</option>
              <option value="Tai Chi">Tai Chi (Combat)</option>
              <option value="Baguazhang">Baguazhang</option>
              <option value="Xingyiquan">Xingyiquan</option>
              <option value="Bajiquan">Bajiquan</option>
              <option value="Drunken Boxing">Zui Quan (Drunken Boxing)</option>
              <option value="Mantis Style">Praying Mantis</option>
              <option value="Monkey Style">Monkey Style</option>
              <option value="Jeet Kune Do">Jeet Kune Do</option>
            </optgroup>
            
            <optgroup label="Japanese & Korean Arts">
              <option value="Karate">Karate</option>
              <option value="Taekwondo">Taekwondo</option>
              <option value="Judo">Judo</option>
              <option value="Aikido">Aikido</option>
              <option value="Hapkido">Hapkido</option>
              <option value="Kendo">Kendo / Kenjutsu</option>
              <option value="Iaido">Iaido</option>
              <option value="Ninjutsu">Ninjutsu</option>
              <option value="Sumo">Sumo</option>
              <option value="Kyokushin">Kyokushin Karate</option>
            </optgroup>

            <optgroup label="Southeast Asian & Pacific">
              <option value="Muay Thai">Muay Thai</option>
              <option value="Muay Boran">Muay Boran</option>
              <option value="Lethwei">Lethwei (Burmese Boxing)</option>
              <option value="Silat">Silat</option>
              <option value="Eskrima">Eskrima / Arnis / Kali</option>
              <option value="Bokator">Bokator</option>
            </optgroup>

            <optgroup label="Western, Grappling & Modern">
              <option value="Boxing">Boxing</option>
              <option value="Kickboxing">Kickboxing</option>
              <option value="Savate">Savate (French Boxing)</option>
              <option value="Wrestling">Wrestling (Greco-Roman/Catch)</option>
              <option value="Brazillian Jiu-Jitsu">Brazilian Jiu-Jitsu</option>
              <option value="Sambo">Sambo</option>
              <option value="Systema">Systema</option>
              <option value="Krav Maga">Krav Maga</option>
              <option value="Capoeira">Capoeira</option>
              <option value="Pankration">Pankration</option>
              <option value="MMA">MMA / Hybrid</option>
            </optgroup>
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

        {/* Elemental Affinity */}
        <div>
          <label className={labelClasses}>Elemental Affinity</label>
          <select 
             className={inputClasses}
            value={options.element || 'Random'}
            onChange={(e) => handleChange('element', e.target.value)}
          >
            <option value="Random">Random</option>
            <option value="None/Physical">None (Physical Only)</option>
            <option value="Fire">Fire / Heat</option>
            <option value="Water">Water</option>
            <option value="Ice">Ice / Cold</option>
            <option value="Wind">Wind / Air</option>
            <option value="Lightning">Lightning / Electric</option>
            <option value="Earth">Earth / Stone</option>
            <option value="Metal">Metal</option>
            <option value="Nature">Nature / Wood</option>
            <option value="Light">Light / Holy</option>
            <option value="Shadow">Shadow / Void</option>
            <option value="Tech">Tech / Cybernetic</option>
            <option value="Psychic">Psychic / Mental</option>
            <option value="Poison">Poison / Venom</option>
            <option value="Spirit">Spirit / Chi</option>
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
            
            <optgroup label="Historical & Traditional">
              <option value="Traditional">Traditional</option>
              <option value="Samurai">Samurai / Ronin</option>
              <option value="Ninja">Ninja / Shinobi</option>
              <option value="Norse/Viking">Norse / Viking</option>
              <option value="Medieval">Medieval Knight</option>
              <option value="Gladiator">Gladiator / Spartan</option>
              <option value="Ancient Mythology">Ancient Mythology</option>
              <option value="Ancient Tribal">Ancient Tribal / Jungle Warrior</option>
              <option value="Noble Fighters">Noble / Royal Guard</option>
            </optgroup>

            <optgroup label="Modern & Street">
              <option value="Modern">Modern</option>
              <option value="Street Fighters">Street Fighter</option>
              <option value="UFC style">UFC / Pro MMA</option>
              <option value="Military">Military / Soldier</option>
              <option value="Gangsters">Gangster / Yakuza / Mafia</option>
              <option value="Underworld">Underworld / Assassin</option>
            </optgroup>

            <optgroup label="Fantasy & Supernatural">
              <option value="Fantasy">Fantasy</option>
              <option value="Magic Knights">Magic Knight / Rune Warrior</option>
              <option value="God-Tier">God-Tier / Legendary</option>
              <option value="Hell-Powered Warriors">Hell-Powered / Demonic</option>
              <option value="Beast-Style Fighters">Beast-Style Fighter</option>
              <option value="Primal Fighters">Primal / Savage</option>
              <option value="Mortal-Kombat style">Mortal-Kombat Style</option>
            </optgroup>

            <optgroup label="Sci-Fi & Future">
              <option value="Sci-fi">Sci-Fi</option>
              <option value="Cyberpunk">Cyberpunk</option>
              <option value="Space Warriors">Space Warrior</option>
              <option value="Post-Apocalyptic">Post-Apocalyptic</option>
              <option value="Arena Warriors">Arena / Mecha Pilot</option>
            </optgroup>
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
            <option value="Sword">Sword / Katana / Blade</option>
            <option value="Staff">Staff / Spear / Polearm</option>
            <option value="Daggers">Daggers / Knives</option>
            <option value="Nunchaku">Nunchaku / Flail</option>
            <option value="Tonfa">Tonfa / Batons</option>
            <option value="Bow">Bow / Archery</option>
            <option value="Axe">Axe / Hammer</option>
            <option value="Chain">Chain / Whip</option>
            <option value="Scythe">Scythe / Sickle</option>
            <option value="Fans">War Fans</option>
            <option value="Firearms">Firearms / Gun-Fu</option>
            <option value="Unique">Unique / Exotic</option>
          </select>
        </div>

        {/* Alternate Outfits Count */}
        <div>
          <label className={labelClasses}>Alternate Outfits</label>
          <select 
             className={inputClasses}
            value={options.alternateOutfitsCount || 0}
            onChange={(e) => handleChange('alternateOutfitsCount', parseInt(e.target.value))}
          >
            <option value={0}>None</option>
            <option value={1}>1 Extra Outfit</option>
            <option value={2}>2 Extra Outfits</option>
            <option value={3}>3 Extra Outfits</option>
          </select>
        </div>
      </div>

       {/* Custom Prompt Input - NEW */}
       <div className="mb-6">
        <label className={labelClasses}>Custom Instructions / Prompt</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-slate-500" size={20} />
          <textarea
            className={`${inputClasses} pl-10 h-24 resize-none`}
            placeholder="Describe specific details... e.g. 'A futuristic samurai with a neon katana' or 'A panda wearing Shaolin monk robes'"
            value={options.customPrompt || ''}
            onChange={(e) => handleChange('customPrompt', e.target.value)}
          />
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