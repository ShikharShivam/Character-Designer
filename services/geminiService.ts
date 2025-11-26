
import { GoogleGenAI, Type } from "@google/genai";
import { CharacterData, GenerationOptions } from "../types";

// Initialize Gemini Client
// CRITICAL: Ensure process.env.API_KEY is available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CHARACTER_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    species: { type: Type.STRING },
    gender: { type: Type.STRING },
    nationality: { type: Type.STRING },
    age: { type: Type.INTEGER },
    ageGroup: { type: Type.STRING, description: "e.g. Young Adult, Veteran, Ancient" },
    alignment: { type: Type.STRING, description: "e.g. Hero, Villain, Anti-Hero, Neutral" },
    element: { type: Type.STRING, description: "Primary elemental affinity or power source (e.g. Fire, Tech, Physical)" },
    martialArtStyle: { type: Type.STRING, description: "The primary martial art style used by the character (e.g. Kung Fu, Muay Thai, etc.)" },
    build: {
      type: Type.OBJECT,
      properties: {
        type: { type: Type.STRING },
        description: { type: Type.STRING },
      },
    },
    weapon: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        type: { type: Type.STRING },
        description: { type: Type.STRING },
      },
    },
    outfit: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        description: { type: Type.STRING },
        materials: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    },
    alternateOutfits: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          materials: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
      }
    },
    colorPalette: {
      type: Type.OBJECT,
      properties: {
        primary: { type: Type.STRING, description: "Hex color code" },
        secondary: { type: Type.STRING, description: "Hex color code" },
        accent: { type: Type.STRING, description: "Hex color code" },
      },
    },
    bodyMarkings: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    fightingStance: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        description: { type: Type.STRING },
        keyFeatures: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    },
    backstory: { type: Type.STRING },
  },
  required: ["name", "species", "gender", "nationality", "age", "ageGroup", "alignment", "element", "martialArtStyle", "build", "weapon", "outfit", "colorPalette", "fightingStance"],
};

export const generateCharacterProfile = async (options: GenerationOptions): Promise<CharacterData> => {
  const namePrompt = options.customName && options.customName.trim() !== '' 
    ? `Character Name: Use exactly the name "${options.customName}"` 
    : "Character Name: Create a unique, memorable name";
    
  const genderPrompt = options.gender && options.gender !== 'Random' 
    ? `Gender: ${options.gender}` 
    : "Gender: Any";

  const speciesPrompt = options.species && options.species !== 'Random'
    ? `Species: ${options.species}`
    : "Species: Any (Human, Anthropomorphic Animal, Robot, etc. based on creativity)";
    
  const nationalityPrompt = options.nationality && options.nationality !== 'Random' 
    ? `Nationality/Origin: ${options.nationality}` 
    : "Nationality/Origin: Appropriate to theme";

  const ethnicityPrompt = options.ethnicity && options.ethnicity !== 'Random' 
    ? `Ethnicity/Heritage: ${options.ethnicity}` 
    : "Ethnicity: Consistent with nationality";

  const personalityPrompt = options.personality && options.personality !== 'Random'
    ? `Personality Archetype: ${options.personality}`
    : "Personality: Unique and compelling";

  const themePrompt = options.theme && options.theme !== 'Random' 
    ? `Theme/Style: ${options.theme}` 
    : "Theme: Unique/Creative";
    
  const weaponPrompt = options.weapon && options.weapon !== 'Random' 
    ? `Weapon Preference: ${options.weapon}` 
    : "Weapon: Any or Unarmed";
    
  const martialArtPrompt = options.martialArtStyle && options.martialArtStyle !== 'Random'
    ? `Martial Arts Style: ${options.martialArtStyle}`
    : "Martial Arts Style: Select a distinct real-world or believable fictional martial art";

  const ageGroupPrompt = options.ageGroup && options.ageGroup !== 'Random'
    ? `Age Group: ${options.ageGroup}`
    : "Age: Appropriate for a fighter";

  const alignmentPrompt = options.alignment && options.alignment !== 'Random'
    ? `Alignment: ${options.alignment}`
    : "Alignment: Any";

  const elementPrompt = options.element && options.element !== 'Random'
    ? `Elemental Affinity / Power Source: ${options.element}`
    : "Elemental Affinity: Any or None (Physical)";

  const count = options.alternateOutfitsCount || 0;
  const alternateOutfitsPrompt = count > 0
    ? `Generate ${count} distinct additional alternate outfits (e.g., Training Gear, Formal Wear, Stealth, Casual, or Battle-Damaged) in the 'alternateOutfits' array. Each must have a name, description, and list of materials.`
    : "";

  const customInstructions = options.customPrompt && options.customPrompt.trim() !== ''
    ? `USER CUSTOM INSTRUCTIONS (PRIORITY): ${options.customPrompt}`
    : "";

  const prompt = `
    Generate a detailed, 3D-ready martial artist character profile.
    The character can be human, animal, robot, or supernatural entity.
    Specific attention to physical build, detailed outfit textures/materials (for 3D modeling reference), a distinct fighting stance, and a signature weapon or fighting tool.
    
    Constraints & Preferences:
    - ${namePrompt}
    - ${speciesPrompt}
    - ${genderPrompt}
    - ${nationalityPrompt}
    - ${ethnicityPrompt}
    - ${martialArtPrompt}
    - ${personalityPrompt}
    - ${themePrompt}
    - ${weaponPrompt}
    - ${ageGroupPrompt}
    - ${alignmentPrompt}
    - ${elementPrompt}
    
    ${customInstructions}
    
    ${alternateOutfitsPrompt}
    
    Ensure the color palette provides valid Hex codes.
    The fighting stance should be described technically for animation reference and must reflect the chosen Martial Arts Style.
    If a specific nationality or ethnicity is requested, ensure the outfit and name reflect it culturally where appropriate, unless the Theme dictates otherwise (e.g. Cyberpunk).
    If the species is non-human (e.g. Panda, Tiger, Robot), ensure the Martial Arts style is adapted to their physiology.
    Include the 'element' field to describe their magical or technological power source (e.g. "Fire", "Ki", "Hydraulics").
    Include the 'alignment' field (e.g. "Hero", "Villain").
    Include the 'ageGroup' field (e.g. "Young Adult", "Veteran").
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: CHARACTER_SCHEMA,
        temperature: 0.9, // Higher creativity for varied results
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as CharacterData;
    }
    throw new Error("No text returned from Gemini");
  } catch (error) {
    console.error("Error generating character text:", error);
    throw error;
  }
};

export const generateCharacterImage = async (character: CharacterData): Promise<string | undefined> => {
  const prompt = `
    Full body concept art character design of a martial artist.
    Name: ${character.name}.
    Species: ${character.species}.
    Gender: ${character.gender}.
    Age: ${character.age} (${character.ageGroup}).
    Alignment: ${character.alignment}.
    Element/Power: ${character.element}.
    Origin/Nationality: ${character.nationality}.
    Martial Arts Style: ${character.martialArtStyle}.
    Build: ${character.build.description}.
    Weapon: ${character.weapon.name} (${character.weapon.type}).
    Outfit: ${character.outfit.description}. 
    Wearing materials: ${character.outfit.materials.join(', ')}.
    Colors: Primary ${character.colorPalette.primary}, Secondary ${character.colorPalette.secondary}, Accent ${character.colorPalette.accent}.
    Markings: ${character.bodyMarkings.join(', ')}.
    Stance: ${character.fightingStance.description}.
    Style: High quality, 3D render style, octane render, detailed textures, neutral studio background lighting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
      config: {
        // Nano banana models do not support responseMimeType or responseSchema
      }
    });

    // Extract image from response parts
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return undefined;
  } catch (error) {
    console.error("Error generating character image:", error);
    // We don't throw here to allow the text to still be displayed even if image fails
    return undefined;
  }
};
