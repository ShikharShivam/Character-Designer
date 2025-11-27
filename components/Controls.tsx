import React, { useRef } from 'react';
import { GenerationOptions } from '../types';
import Button from './Button';
import { Sparkles, UserCircle, MessageSquare, Upload, X } from 'lucide-react';

interface ControlsProps {
  options: GenerationOptions;
  setOptions: (options: GenerationOptions) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const Controls: React.FC<ControlsProps> = ({ options, setOptions, onGenerate, isGenerating }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const inputClasses = "w-full bg-master-bg/80 border border-master-gold/20 rounded-none p-3 text-master-ivory focus:border-master-gold focus:ring-1 focus:ring-master-gold focus:outline-none transition-all placeholder-master-ivory-dim text-sm hover:border-master-gold/40";
  const labelClasses = "text-[10px] uppercase tracking-[0.2em] font-serif font-bold text-master-gold mb-2 block";
  const sectionHeaderClasses = "text-master-ivory text-lg font-serif font-medium tracking-wide border-b border-master-gold/20 pb-2 mb-4 flex items-center gap-2";

  return (
    <div className="glass-panel p-8 md:p-10 rounded-sm shadow-2xl mb-12 relative overflow-hidden">
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-master-gold opacity-50"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-master-gold opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-master-gold opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-master-gold opacity-50"></div>
      
      {/* Name Input */}
      <div className="mb-10 max-w-2xl mx-auto text-center">
        <label className="text-xs uppercase tracking-[0.3em] font-serif text-master-gold mb-3 block">Designation / Name</label>
        <div className="relative group">
          <input
            type="text"
            className="w-full bg-transparent border-b-2 border-master-surface-light text-center text-2xl md:text-3xl font-serif text-white p-2 focus:border-master-gold outline-none transition-all placeholder-master-surface-light group-hover:border-master-gold/50"
            placeholder="ENTER NAME..."
            value={options.customName || ''}
            onChange={(e) => handleChange('customName', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 mb-10">
        
        {/* === CORE IDENTITY === */}
        <div className="col-span-full">
            <h4 className={sectionHeaderClasses}>
              <span className="w-1.5 h-1.5 bg-master-gold rotate-45 inline-block"></span>
              Core Identity
            </h4>
        </div>

        {/* Species */}
        <div>
          <label className={labelClasses}>Species</label>
          <select 
            className={inputClasses}
            value={options.species || 'Random'}
            onChange={(e) => handleChange('species', e.target.value)}
          >
            <option value="Random">Random</option>
            <optgroup label="Common">
              <option value="Human">Human</option>
              <option value="Cyborg/Android">Cyborg / Android</option>
              <option value="Robot/Mecha">Robot / Sentient Machine</option>
              <option value="Mutant">Mutant / Genetically Altered</option>
            </optgroup>
            <optgroup label="Beast-Kin & Anthropomorphic">
              <option value="Anthropomorphic Animal">Beast-kin (Mammal)</option>
              <option value="Reptilian/Lizardfolk">Reptilian / Lizardfolk</option>
              <option value="Avian/Birdfolk">Avian / Birdfolk</option>
              <option value="Aquatic/Merfolk">Aquatic / Merfolk</option>
              <option value="Insectoid">Insectoid</option>
            </optgroup>
            <optgroup label="Fantasy & Myth">
              <option value="Elf">Elf / Fae</option>
              <option value="Orc">Orc / Ogre</option>
              <option value="Dwarf">Dwarf</option>
              <option value="Giant">Giant / Goliath</option>
              <option value="Demon">Demon / Tiefling</option>
              <option value="Angel">Angel / Celestial</option>
              <option value="Undead">Undead / Vampire / Lich</option>
              <option value="Spirit">Spirit / Ghost</option>
              <option value="Elemental Entity">Elemental Entity</option>
              <option value="Golem">Golem / Construct</option>
            </optgroup>
            <optgroup label="Sci-Fi">
              <option value="Alien">Alien / Extraterrestrial</option>
              <option value="Clone">Clone</option>
              <option value="Hologram">Solid Light / Hologram</option>
            </optgroup>
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
            <option value="Child">Child Prodigy (&lt;13)</option>
            <option value="Teen">Teenager (13-19)</option>
            <option value="Young Adult">Young Adult (20-29)</option>
            <option value="Adult">Adult / Prime (30-45)</option>
            <option value="Veteran">Veteran / Middle-aged (46-60)</option>
            <option value="Elderly">Elder / Old Master (60+)</option>
            <option value="Ancient">Ancient (100+ years)</option>
            <option value="Ageless">Ageless / Immortal</option>
            <option value="Artificial">Artificial / Newly Created</option>
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
            <optgroup label="Asia">
              <option value="Japanese">Japanese</option>
              <option value="Chinese">Chinese</option>
              <option value="Korean">Korean</option>
              <option value="Thai">Thai</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Filipino">Filipino</option>
              <option value="Indian">Indian</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Mongolian">Mongolian</option>
            </optgroup>
            <optgroup label="Americas">
              <option value="American">American (USA)</option>
              <option value="Brazilian">Brazilian</option>
              <option value="Mexican">Mexican</option>
              <option value="Canadian">Canadian</option>
              <option value="Peruvian">Peruvian</option>
            </optgroup>
            <optgroup label="Europe">
              <option value="British">British (UK)</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Russian">Russian</option>
              <option value="Italian">Italian</option>
              <option value="Spanish">Spanish</option>
              <option value="Scandinavian">Scandinavian (Norse)</option>
              <option value="Greek">Greek</option>
            </optgroup>
            <optgroup label="Africa & Middle East">
              <option value="African">African (General)</option>
              <option value="Egyptian">Egyptian</option>
              <option value="Nigerian">Nigerian</option>
              <option value="Middle Eastern">Middle Eastern (General)</option>
              <option value="Turkish">Turkish</option>
            </optgroup>
            <optgroup label="Oceania">
              <option value="Australian">Australian</option>
              <option value="Polynesian">Polynesian / Pacific Islander</option>
            </optgroup>
            <optgroup label="Fantasy/Sci-Fi">
              <option value="Off-world/Space Colony">Space Colony / Off-world</option>
              <option value="Post-Apocalyptic">Wasteland / Post-Apocalyptic</option>
              <option value="Hidden Kingdom">Hidden Kingdom / Lost City</option>
              <option value="Cybernetic City">Cybernetic Megacity</option>
              <option value="Netherrealm">Netherrealm / Hell</option>
              <option value="Celestial Realm">Celestial Realm</option>
            </optgroup>
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
            <option value="Central Asian">Central Asian</option>
            <option value="Black/African">Black / African</option>
            <option value="Afro-Caribbean">Afro-Caribbean</option>
            <option value="White/Caucasian">White / Caucasian</option>
            <option value="Latino/Hispanic">Latino / Hispanic</option>
            <option value="Middle Eastern">Middle Eastern / Arab</option>
            <option value="Pacific Islander">Pacific Islander / Polynesian</option>
            <option value="Native American">Native American / Indigenous</option>
            <option value="Inuit">Inuit / First Nations</option>
            <option value="Aboriginal Australian">Aboriginal Australian</option>
            <option value="Mixed">Mixed Heritage</option>
            <option value="Synthetic">Synthetic / Artificial Skin</option>
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
            <optgroup label="Protagonists">
              <option value="Hero">Hero / Paragon</option>
              <option value="Anti-Hero">Anti-Hero</option>
              <option value="Vigilante">Vigilante</option>
              <option value="Reluctant Hero">Reluctant Hero</option>
              <option value="Chosen One">Chosen One</option>
              <option value="Guardian">Guardian / Protector</option>
              <option value="Peacemaker">Peacemaker</option>
            </optgroup>
            <optgroup label="Antagonists">
              <option value="Villain">Villain / Mastermind</option>
              <option value="Anti-Villain">Anti-Villain</option>
              <option value="Minion">Minion / Enforcer</option>
              <option value="Destroyer">Destroyer / Harbinger</option>
              <option value="Conqueror">Conqueror</option>
              <option value="Sadist">Sadist / Tormentor</option>
            </optgroup>
            <optgroup label="Neutral & Others">
              <option value="Neutral">Neutral / Wanderer</option>
              <option value="Mercenary">Mercenary / Gun-for-Hire</option>
              <option value="Rival">Rival / Competitor</option>
              <option value="Mentor">Mentor / Sensei</option>
              <option value="Trickster">Trickster / Chaos Agent</option>
              <option value="Survivor">Survivor / Loner</option>
              <option value="Fanatic">Fanatic / Cultist</option>
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
            <optgroup label="Warriors">
              <option value="Honorable Warrior">Honorable Warrior</option>
              <option value="Ruthless Mercenary">Ruthless Mercenary</option>
              <option value="Disciplined Soldier">Disciplined Soldier</option>
              <option value="Noble Savage">Noble Savage</option>
              <option value="Berserker">Berserker / Wild</option>
            </optgroup>
            <optgroup label="Masters & Mystics">
              <option value="Zen Monk">Zen Monk / Pacifist</option>
              <option value="Stoic Guardian">Stoic Guardian</option>
              <option value="Wise Fool">Wise Fool</option>
              <option value="Mystic">Mystic / Cryptic</option>
            </optgroup>
            <optgroup label="Rogues & Rebels">
              <option value="Arrogant Prodigy">Arrogant Prodigy</option>
              <option value="Vengeful Survivor">Vengeful Survivor</option>
              <option value="Jovial Brawler">Jovial Brawler</option>
              <option value="Charming Rogue">Charming Rogue</option>
              <option value="Silent Assassin">Silent Assassin</option>
              <option value="Manic">Manic / Unpredictable</option>
              <option value="Reluctant Hero">Reluctant Hero</option>
            </optgroup>
             <optgroup label="Intellectuals">
              <option value="Cold Strategist">Cold / Calculating Strategist</option>
              <option value="Tech-Savvy">Tech-Savvy Tactician</option>
              <option value="Mad Scientist">Mad Scientist / Doctor</option>
            </optgroup>
          </select>
        </div>

        {/* === PHYSICAL APPEARANCE === */}
        <div className="col-span-full mt-4">
             <h4 className={sectionHeaderClasses}>
                <span className="w-1.5 h-1.5 bg-master-gold rotate-45 inline-block"></span>
                Physical Appearance
             </h4>
        </div>

        <div>
          <label className={labelClasses}>Skin Tone</label>
          <select className={inputClasses} value={options.skinTone || 'Random'} onChange={(e) => handleChange('skinTone', e.target.value)}>
             <option value="Random">Random</option>
             <option value="Pale">Pale / Fair</option>
             <option value="Tan">Tan / Olive</option>
             <option value="Dark">Dark / Brown</option>
             <option value="Ebony">Ebony / Deep</option>
             <option value="Ruddy">Ruddy / Reddish</option>
             <option value="Metallic">Metallic (Gold/Silver/Bronze)</option>
             <option value="Grey">Grey / Ash</option>
             <option value="Green">Green (Orc/Alien)</option>
             <option value="Blue">Blue (Alien/Fae)</option>
             <option value="Red">Red (Demon/Tiefling)</option>
             <option value="Synthetic">Synthetic / Plating</option>
             <option value="Scaly">Scaly</option>
             <option value="Fur">Fur-covered</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Face Structure</label>
          <select className={inputClasses} value={options.faceType || 'Random'} onChange={(e) => handleChange('faceType', e.target.value)}>
             <option value="Random">Random</option>
             <option value="Sharp">Sharp / Angular</option>
             <option value="Square">Square / Chiseled</option>
             <option value="Round">Round / Soft</option>
             <option value="Oval">Oval / Balanced</option>
             <option value="Gaunt">Gaunt / Hollow</option>
             <option value="Scarred">Scarred / Battle-worn</option>
             <option value="Delicate">Delicate / Beautiful</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Eye Shape</label>
          <select className={inputClasses} value={options.eyeShape || 'Random'} onChange={(e) => handleChange('eyeShape', e.target.value)}>
             <option value="Random">Random</option>
             <option value="Almond">Almond</option>
             <option value="Narrow">Narrow / Piercing</option>
             <option value="Round">Round / Wide</option>
             <option value="Hooded">Hooded</option>
             <option value="Monolid">Monolid</option>
             <option value="Deep-set">Deep-set</option>
             <option value="Cybernetic">Cybernetic / Lens</option>
             <option value="Glowing">Glowing / Energy</option>
             <option value="Blind">Blind / Milky</option>
          </select>
        </div>

        <div>
           <label className={labelClasses}>Eye Color</label>
           <select className={inputClasses} value={options.eyeColor || 'Random'} onChange={(e) => handleChange('eyeColor', e.target.value)}>
              <option value="Random">Random</option>
              <option value="Brown">Brown</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Hazel">Hazel</option>
              <option value="Grey">Grey</option>
              <option value="Amber">Amber / Gold</option>
              <option value="Red">Red / Crimson</option>
              <option value="Violet">Violet / Purple</option>
              <option value="Black">Black / Void</option>
              <option value="White">White / Silver</option>
              <option value="Heterochromia">Heterochromia (Two colors)</option>
              <option value="Glowing Blue">Glowing Blue</option>
              <option value="Glowing Red">Glowing Red</option>
           </select>
        </div>

        <div>
          <label className={labelClasses}>Hair Style</label>
          <select className={inputClasses} value={options.hairStyle || 'Random'} onChange={(e) => handleChange('hairStyle', e.target.value)}>
             <option value="Random">Random</option>
             <option value="Short">Short / Buzz Cut</option>
             <option value="Medium">Medium / Messy</option>
             <option value="Long">Long / Flowing</option>
             <option value="Ponytail">Ponytail</option>
             <option value="Topknot">Topknot / Bun</option>
             <option value="Braided">Braided / Cornrows</option>
             <option value="Mohawk">Mohawk</option>
             <option value="Bald">Bald / Shaven</option>
             <option value="Dreadlocks">Dreadlocks</option>
             <option value="Spiky">Spiky / Anime-style</option>
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
             <option value="White">White / Grey</option>
             <option value="Silver">Silver</option>
             <option value="Blue">Blue</option>
             <option value="Green">Green</option>
             <option value="Purple">Purple</option>
             <option value="Pink">Pink</option>
             <option value="Neon">Neon / Multi-colored</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Facial Hair</label>
          <select className={inputClasses} value={options.facialHair || 'Random'} onChange={(e) => handleChange('facialHair', e.target.value)}>
             <option value="Random">Random</option>
             <option value="None">None / Clean Shaven</option>
             <option value="Stubble">Stubble</option>
             <option value="Full Beard">Full Beard</option>
             <option value="Goatee">Goatee</option>
             <option value="Mustache">Mustache</option>
             <option value="Sideburns">Sideburns</option>
             <option value="Long Beard">Long / Wizard Beard</option>
             <option value="Braided Beard">Braided Beard</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Height</label>
          <select className={inputClasses} value={options.height || 'Random'} onChange={(e) => handleChange('height', e.target.value)}>
             <option value="Random">Random</option>
             <option value="Short">Short</option>
             <option value="Average">Average</option>
             <option value="Tall">Tall</option>
             <option value="Very Tall">Very Tall / Giant</option>
          </select>
        </div>

         <div>
          <label className={labelClasses}>Weight/Build</label>
          <select className={inputClasses} value={options.weight || 'Random'} onChange={(e) => handleChange('weight', e.target.value)}>
             <option value="Random">Random</option>
             <option value="Slim">Slim / Slender</option>
             <option value="Athletic">Athletic / Toned</option>
             <option value="Muscular">Muscular / Buff</option>
             <option value="Heavy">Heavy / Stout</option>
             <option value="Massive">Massive / Hulk-like</option>
          </select>
        </div>

        {/* === COMBAT & STYLE === */}
        <div className="col-span-full mt-4">
             <h4 className={sectionHeaderClasses}>
                <span className="w-1.5 h-1.5 bg-master-gold rotate-45 inline-block"></span>
                Combat & Style
             </h4>
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
            
            <optgroup label="Indian & South Asian">
              <option value="Kalaripayattu">Kalaripayattu</option>
              <option value="Gatka">Gatka</option>
              <option value="Malla-yuddha">Malla-yuddha</option>
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
              <option value="CQC">Military CQC</option>
              <option value="Street Fighting">Dirty Street Fighting</option>
            </optgroup>

            <optgroup label="Historical European">
              <option value="HEMA">HEMA / Longsword</option>
              <option value="Fencing">Fencing</option>
              <option value="Bartitsu">Bartitsu</option>
              <option value="Glima">Glima</option>
            </optgroup>
            
            <optgroup label="Fictional & Anime Inspired">
              <option value="Turtle Style">Turtle Style (Kame)</option>
              <option value="Gentle Fist">Gentle Fist</option>
              <option value="Ansatsuken">Ansatsuken (Assassin's Fist)</option>
              <option value="Hokuto Shinken">Hokuto Shinken</option>
              <option value="Water Stream Rock Smashing Fist">Water Stream Rock Smashing Fist</option>
            </optgroup>
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
            <optgroup label="Classic Elements">
              <option value="Fire">Fire / Heat / Magma</option>
              <option value="Water">Water / Liquid</option>
              <option value="Ice">Ice / Cold / Frost</option>
              <option value="Wind">Wind / Air / Sound</option>
              <option value="Lightning">Lightning / Electric</option>
              <option value="Earth">Earth / Stone / Sand</option>
              <option value="Nature">Nature / Plant / Wood</option>
              <option value="Metal">Metal / Steel</option>
            </optgroup>
            <optgroup label="Esoteric & Sci-Fi">
              <option value="Light">Light / Holy / Solar</option>
              <option value="Shadow">Shadow / Darkness / Void</option>
              <option value="Spirit">Spirit / Chi / Aura</option>
              <option value="Psychic">Psychic / Telekinetic</option>
              <option value="Tech">Tech / Nanites / Cybernetic</option>
              <option value="Poison">Poison / Acid / Venom</option>
              <option value="Blood">Blood / Life Force</option>
              <option value="Time">Time / Chronomancy</option>
              <option value="Gravity">Gravity / Space</option>
              <option value="Chaos">Chaos / Entropy</option>
              <option value="Nuclear">Nuclear / Radiation</option>
              <option value="Steam">Steam / Vapor</option>
            </optgroup>
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
              <option value="Traditional">Traditional Martial Arts</option>
              <option value="Samurai">Samurai / Ronin</option>
              <option value="Ninja">Ninja / Shinobi</option>
              <option value="Norse/Viking">Norse / Viking</option>
              <option value="Medieval">Medieval Knight</option>
              <option value="Gladiator">Gladiator / Spartan</option>
              <option value="Ancient Mythology">Ancient Mythology (Greek/Egyptian/etc)</option>
              <option value="Ancient Tribal">Ancient Tribal / Jungle Warrior</option>
              <option value="Noble Fighters">Noble / Royal Guard</option>
              <option value="Pirate">Pirate / Swashbuckler</option>
              <option value="Western">Western / Cowboy</option>
            </optgroup>

            <optgroup label="Modern & Street">
              <option value="Modern">Modern / Urban</option>
              <option value="Street Fighters">Street Fighter / Brawler</option>
              <option value="UFC style">UFC / Pro MMA</option>
              <option value="Military">Military / Special Forces</option>
              <option value="Gangsters">Gangster / Yakuza / Mafia</option>
              <option value="Underworld">Underworld / Assassin</option>
              <option value="Sports">Sports / Athlete</option>
              <option value="Noir">Noir / Detective</option>
              <option value="School">School / Academy</option>
              <option value="Delinquent">High-School Delinquent</option>
            </optgroup>

            <optgroup label="Fantasy & Supernatural">
              <option value="Fantasy">High Fantasy</option>
              <option value="Magic Knights">Magic Knight / Spellsword</option>
              <option value="God-Tier">God-Tier / Demigod</option>
              <option value="Hell-Powered Warriors">Hell-Powered / Demonic</option>
              <option value="Beast-Style Fighters">Beast-Style Fighter</option>
              <option value="Primal Fighters">Primal / Savage</option>
              <option value="Mortal-Kombat style">Tournament Realm (MK Style)</option>
              <option value="Wuxia">Wuxia (Chinese Fantasy)</option>
              <option value="Xianxia">Xianxia (Cultivation)</option>
              <option value="Gothic">Gothic / Victorian Horror</option>
              <option value="Cosmic Horror">Cosmic Horror / Eldritch</option>
              <option value="Grimdark">Grimdark</option>
            </optgroup>

            <optgroup label="Sci-Fi & Future">
              <option value="Sci-fi">Generic Sci-Fi</option>
              <option value="Cyberpunk">Cyberpunk / High-Tech</option>
              <option value="Steampunk">Steampunk</option>
              <option value="Dieselpunk">Dieselpunk</option>
              <option value="Solarpunk">Solarpunk / Eco-Futurism</option>
              <option value="Biopunk">Biopunk</option>
              <option value="Space Warriors">Space Warrior / Galactic</option>
              <option value="Post-Apocalyptic">Post-Apocalyptic</option>
              <option value="Arena Warriors">Arena / Mecha Pilot</option>
              <option value="Retro-Futurism">Retro-Futurism / Synthwave</option>
              <option value="Corporate Assassin">Corporate Assassin</option>
            </optgroup>
          </select>
        </div>

        {/* Outfit Style Customization */}
        <div>
           <label className={labelClasses}>Outfit Preference</label>
           <select className={inputClasses} value={options.outfitStyle || 'Random'} onChange={(e) => handleChange('outfitStyle', e.target.value)}>
              <option value="Random">Random</option>
              <option value="Armored">Heavy Armor / Plated</option>
              <option value="Light Armor">Light Armor / Leather</option>
              <option value="Robes">Robes / Cloth</option>
              <option value="Tactical">Tactical / Military Gear</option>
              <option value="Streetwear">Streetwear / Casual</option>
              <option value="Traditional">Traditional / Ceremonial</option>
              <option value="Minimalist">Minimalist / Revealing</option>
              <option value="Ragged">Ragged / Worn</option>
              <option value="Suit">Formal Suit / Business</option>
              <option value="Power Suit">Powered Exosuit</option>
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
            
            <optgroup label="Unarmed">
              <option value="Unarmed">Unarmed / Hand-to-Hand</option>
              <option value="Grappling">Grappling / Submission</option>
              <option value="Energy Projection">Energy Projection / Magic</option>
              <option value="Claws">Claws / Knuckles / Gauntlets</option>
            </optgroup>

            <optgroup label="Blades">
              <option value="Sword">Sword (Generic)</option>
              <option value="Katana">Katana / Curved Blade</option>
              <option value="Greatsword">Greatsword / Giant Blade</option>
              <option value="Dual Swords">Dual Swords / Twin Blades</option>
              <option value="Daggers">Daggers / Knives</option>
              <option value="Scythe">Scythe / Sickle</option>
              <option value="Axe">Axe / Battleaxe</option>
              <option value="Machete">Machete</option>
              <option value="Katar">Katar / Punch Daggers</option>
              <option value="Hook Swords">Hook Swords</option>
              <option value="Gunblade">Gunblade</option>
              <option value="Urumi">Urumi (Whip Sword)</option>
            </optgroup>

            <optgroup label="Polearms & Blunt">
              <option value="Staff">Staff / Bo Staff</option>
              <option value="Spear">Spear / Lance / Glaive</option>
              <option value="Halberd">Halberd</option>
              <option value="Hammer">Hammer / Mace</option>
              <option value="Nunchaku">Nunchaku / Three-Section Staff</option>
              <option value="Tonfa">Tonfa / Batons</option>
              <option value="Club">Club / Kanabo</option>
              <option value="Meteor Hammer">Meteor Hammer</option>
            </optgroup>

            <optgroup label="Ranged & Flexible">
              <option value="Bow">Bow / Archery</option>
              <option value="Crossbow">Crossbow</option>
              <option value="Firearms">Firearms / Gun-Fu</option>
              <option value="Throwing Weapons">Throwing Stars / Kunai / Knives</option>
              <option value="Chain">Chain / Whip / Rope Dart</option>
              <option value="Kusarigama">Kusarigama</option>
              <option value="Energy Whip">Energy Whip</option>
            </optgroup>

            <optgroup label="Exotic & Special">
              <option value="Fans">War Fans</option>
              <option value="Shield">Shield (Offensive)</option>
              <option value="Cards">Cards / Dice / Gambling Tools</option>
              <option value="Musical Instrument">Musical Instrument</option>
              <option value="Puppet">Puppeteer / Drones</option>
              <option value="Improvised">Improvised / Everyday Objects</option>
              <option value="Living Weapon">Living Weapon / Symbiote</option>
              <option value="Keyblade-style">Keyblade-style</option>
              <option value="Orb">Floating Orb / Bit</option>
              <option value="Unique">Unique / Custom</option>
            </optgroup>
          </select>
        </div>

        {/* Weapon Color */}
        <div>
           <label className={labelClasses}>Weapon Color</label>
           <div className="flex gap-2">
             <div className="h-full aspect-square bg-master-bg rounded-none flex items-center justify-center border border-master-gold/30">
               <div className="w-4 h-4 rounded-full shadow-lg" style={{backgroundColor: options.weaponColor || '#94a3b8', boxShadow: `0 0 10px ${options.weaponColor || '#94a3b8'}`}}></div>
             </div>
             <input
              type="text"
              className={inputClasses}
              placeholder="e.g. Crimson, Neon Blue"
              value={options.weaponColor || ''}
              onChange={(e) => handleChange('weaponColor', e.target.value)}
            />
           </div>
        </div>

        {/* Weapon Material Customization */}
        <div>
           <label className={labelClasses}>Weapon Material</label>
           <select className={inputClasses} value={options.weaponMaterial || 'Random'} onChange={(e) => handleChange('weaponMaterial', e.target.value)}>
              <option value="Random">Random</option>
              <option value="Steel">Steel / Iron</option>
              <option value="Wood">Wood / Bamboo</option>
              <option value="Bone">Bone / Organic</option>
              <option value="Crystal">Crystal / Glass</option>
              <option value="Gold">Gold / Ornate</option>
              <option value="Energy">Pure Energy / Laser</option>
              <option value="Obsidian">Obsidian / Stone</option>
              <option value="Ice">Ice / Permafrost</option>
              <option value="Damascus">Damascus Steel</option>
              <option value="Rusty">Rusty / Scavenged</option>
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
            <option value={4}>4 Extra Outfits</option>
            <option value={5}>5 Extra Outfits</option>
          </select>
        </div>
      </div>

      {/* Image Upload & Custom Prompt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
         {/* Custom Prompt Input */}
         <div className="h-full">
            <label className={labelClasses}>Custom Instructions</label>
            <div className="relative h-full group">
               <MessageSquare className="absolute left-3 top-3 text-master-gold opacity-50" size={18} />
               <textarea
                  className={`${inputClasses} pl-10 h-36 md:h-full resize-none`}
                  placeholder="Describe specific details... e.g. 'A futuristic samurai with a neon katana' or 'A panda wearing Shaolin monk robes'"
                  value={options.customPrompt || ''}
                  onChange={(e) => handleChange('customPrompt', e.target.value)}
               />
            </div>
         </div>

         {/* Image Upload Input */}
         <div>
            <label className={labelClasses}>Visual Reference</label>
            <div className={`relative h-36 md:h-full border border-dashed rounded-sm flex flex-col items-center justify-center transition-all bg-master-bg/40 overflow-hidden ${options.referenceImage ? 'border-master-gold' : 'border-master-ivory-dim/30 hover:border-master-gold/50'}`}>
               
               {options.referenceImage ? (
                  <div className="w-full h-full relative group">
                     <img 
                        src={options.referenceImage} 
                        alt="Reference" 
                        className="w-full h-full object-cover opacity-80" 
                     />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={clearImage}
                           className="bg-red-900/80 hover:bg-red-800 text-white p-2 rounded-full border border-red-500"
                           title="Remove Image"
                         >
                            <X size={20} />
                         </button>
                     </div>
                  </div>
               ) : (
                  <>
                     <input 
                        type="file" 
                        ref={fileInputRef}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                     />
                     <div className="flex flex-col items-center text-master-ivory-dim pointer-events-none">
                        <Upload size={24} className="mb-2 text-master-gold opacity-70" />
                        <span className="text-xs font-serif tracking-widest uppercase">Upload Image</span>
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>

      <div className="flex justify-center border-t border-master-gold/10 pt-8">
        <Button 
          onClick={onGenerate} 
          isLoading={isGenerating} 
          className="w-full md:w-auto md:px-20 py-4 text-base"
        >
          {isGenerating ? 'Forging Masterpiece...' : (
            <>
              <Sparkles size={20} />
              Forge Character
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Controls;