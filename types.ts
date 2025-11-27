

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
  build: {
    type: string;
    description: string;
  };
  weapon: {
    name: string;
    type: string;
    description: string;
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
    description: string;
    keyFeatures: string[];
  };
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
  weapon?: 'Unarmed' | 'Sword' | 'Staff' | 'Unique' | 'Random' | 'Daggers' | 'Nunchaku' | 'Bow' | 'Axe' | 'Chain' | 'Scythe' | 'Fans' | 'Firearms' | 'Tonfa';
  martialArtStyle?: string;
  customName?: string;
  nationality?: string;
  ethnicity?: string;
  personality?: string;
  ageGroup?: string;
  alignment?: string;
  element?: string;
  alternateOutfitsCount?: number;
  customPrompt?: string;
}