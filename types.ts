

export interface Outfit {
  name: string;
  description: string;
  materials: string[];
}

export interface CharacterData {
  name: string;
  species: string;
  gender: string;
  nationality: string;
  age: number;
  ageGroup: string;
  alignment: string;
  element: string;
  martialArtStyle: string;
  appearance: {
    faceType: string;
    skinTone: string;
    eyeShape: string;
    eyeColor: string;
    hairStyle: string;
    hairColor: string;
    facialHair: string;
    height: string;
    weight: string;
  };
  build: {
    type: string;
    description: string;
  };
  weapon: {
    name: string;
    type: string;
    description: string;
    color: string;
    material: string;
  };
  outfit: Outfit;
  alternateOutfits?: Outfit[];
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  bodyMarkings: string[];
  fightingStance: {
    name: string;
    type: string; // e.g. Aggressive, Defensive, Fluid
    description: string;
    keyFeatures: string[];
    stats: {
      offense: number; // 1-10
      defense: number; // 1-10
      speed: number;   // 1-10
      reach: number;   // 1-10
    };
  };
  combatStyleDescription: string;
  backstory: string;
}

export interface GeneratedCharacter extends CharacterData {
  id: string;
  timestamp: number;
  imageUrl?: string;
}

export type GenerationStatus = 'idle' | 'generating_text' | 'generating_image' | 'complete' | 'error';

export interface GenerationOptions {
  gender?: 'Male' | 'Female' | 'Non-binary' | 'Random';
  species?: string;
  theme?: string;
  gameInspiration?: string;
  weapon?: string;
  weaponMaterial?: string;
  weaponColor?: string;
  martialArtStyle?: string;
  outfitStyle?: string;
  customName?: string;
  nationality?: string;
  ethnicity?: string;
  personality?: string;
  ageGroup?: string;
  alignment?: string;
  element?: string;
  
  // Appearance
  faceType?: string;
  skinTone?: string;
  eyeShape?: string;
  eyeColor?: string;
  hairStyle?: string;
  hairColor?: string;
  facialHair?: string;
  height?: string;
  weight?: string;

  alternateOutfitsCount?: number;
  customPrompt?: string;
  referenceImage?: string; // Base64 data URL
}