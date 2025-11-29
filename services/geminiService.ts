
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
    appearance: {
      type: Type.OBJECT,
      properties: {
        faceType: { type: Type.STRING },
        skinTone: { type: Type.STRING },
        eyeShape: { type: Type.STRING },
        eyeColor: { type: Type.STRING },
        hairStyle: { type: Type.STRING },
        hairColor: { type: Type.STRING },
        facialHair: { type: Type.STRING },
        height: { type: Type.STRING },
        weight: { type: Type.STRING },
      }
    },
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
        color: { type: Type.STRING },
        material: { type: Type.STRING },
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
        type: { type: Type.STRING, description: "e.g. Aggressive, Defensive, Counter-based, Fluid, Rigid" },
        description: { type: Type.STRING },
        keyFeatures: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        stats: {
          type: Type.OBJECT,
          description: "Rank capabilities from 1 to 10",
          properties: {
            offense: { type: Type.INTEGER },
            defense: { type: Type.INTEGER },
            speed: { type: Type.INTEGER },
            reach: { type: Type.INTEGER },
          }
        }
      },
    },
    combatStyleDescription: { type: Type.STRING, description: "A short, vivid snippet describing the character in action, visualizing a specific combat sequence using their weapon and stance." },
    backstory: { type: Type.STRING },
  },
  required: ["name", "species", "gender", "nationality", "age", "ageGroup", "alignment", "element", "martialArtStyle", "appearance", "build", "weapon", "outfit", "colorPalette", "fightingStance", "combatStyleDescription"],
};

// Helper to sanitize incoming JSON data
const sanitizeCharacterData = (data: any): CharacterData => {
  const safeList = (arr: any) => Array.isArray(arr) ? arr : [];
  const safeString = (str: any, def: string) => typeof str === 'string' ? str : def;
  const safeObj = (obj: any) => typeof obj === 'object' && obj !== null ? obj : {};

  return {
    ...data,
    name: safeString(data.name, "Unknown Fighter"),
    species: safeString(data.species, "Unknown"),
    gender: safeString(data.gender, "Unknown"),
    nationality: safeString(data.nationality, "Unknown"),
    age: typeof data.age === 'number' ? data.age : 25,
    ageGroup: safeString(data.ageGroup, "Adult"),
    alignment: safeString(data.alignment, "Neutral"),
    element: safeString(data.element, "None"),
    martialArtStyle: safeString(data.martialArtStyle, "Brawl"),
    appearance: {
      faceType: safeString(data.appearance?.faceType, "Standard"),
      skinTone: safeString(data.appearance?.skinTone, "Standard"),
      eyeShape: safeString(data.appearance?.eyeShape, "Standard"),
      eyeColor: safeString(data.appearance?.eyeColor, "Dark"),
      hairStyle: safeString(data.appearance?.hairStyle, "Bald"),
      hairColor: safeString(data.appearance?.hairColor, "None"),
      facialHair: safeString(data.appearance?.facialHair, "None"),
      height: safeString(data.appearance?.height, "Average"),
      weight: safeString(data.appearance?.weight, "Average"),
      ...safeObj(data.appearance)
    },
    build: {
      type: safeString(data.build?.type, "Average"),
      description: safeString(data.build?.description, "An average build."),
      ...safeObj(data.build)
    },
    weapon: {
      name: safeString(data.weapon?.name, "Fists"),
      type: safeString(data.weapon?.type, "Unarmed"),
      description: safeString(data.weapon?.description, "Combat ready hands."),
      color: safeString(data.weapon?.color, "#CCCCCC"),
      material: safeString(data.weapon?.material, "Bone"),
      ...safeObj(data.weapon)
    },
    outfit: {
      name: safeString(data.outfit?.name, "Basic Gear"),
      description: safeString(data.outfit?.description, "Simple fighting clothes."),
      materials: safeList(data.outfit?.materials),
      ...safeObj(data.outfit)
    },
    alternateOutfits: safeList(data.alternateOutfits).map((o: any) => ({
      name: safeString(o.name, "Alt Outfit"),
      description: safeString(o.description, "Alternative gear."),
      materials: safeList(o.materials)
    })),
    colorPalette: {
      primary: safeString(data.colorPalette?.primary, "#000000"),
      secondary: safeString(data.colorPalette?.secondary, "#555555"),
      accent: safeString(data.colorPalette?.accent, "#FFFFFF"),
      ...safeObj(data.colorPalette)
    },
    bodyMarkings: safeList(data.bodyMarkings),
    fightingStance: {
      name: safeString(data.fightingStance?.name, "Ready Stance"),
      type: safeString(data.fightingStance?.type, "Balanced"),
      description: safeString(data.fightingStance?.description, "Standing ready."),
      keyFeatures: safeList(data.fightingStance?.keyFeatures),
      stats: {
        offense: typeof data.fightingStance?.stats?.offense === 'number' ? data.fightingStance.stats.offense : 5,
        defense: typeof data.fightingStance?.stats?.defense === 'number' ? data.fightingStance.stats.defense : 5,
        speed: typeof data.fightingStance?.stats?.speed === 'number' ? data.fightingStance.stats.speed : 5,
        reach: typeof data.fightingStance?.stats?.reach === 'number' ? data.fightingStance.stats.reach : 5,
      },
      ...safeObj(data.fightingStance)
    },
    combatStyleDescription: safeString(data.combatStyleDescription, "Ready for combat."),
    backstory: safeString(data.backstory, "No known history."),
  };
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

  const gameInspirationPrompt = options.gameInspiration && options.gameInspiration !== 'None'
    ? `Game Universe Inspiration: ${options.gameInspiration}. IMPORTANT: Adopt the visual style, technology level, lore aesthetic, and faction vibes of this specific game franchise.`
    : "";
    
  const weaponPrompt = options.weapon && options.weapon !== 'Random' 
    ? `Weapon Preference: ${options.weapon}` 
    : "Weapon: Any or Unarmed";
    
  const weaponMaterialPrompt = options.weaponMaterial && options.weaponMaterial !== 'Random'
    ? `Weapon Material: ${options.weaponMaterial}`
    : "";

  const outfitStylePrompt = options.outfitStyle && options.outfitStyle !== 'Random'
    ? `Outfit Style Preference: ${options.outfitStyle}`
    : "";

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

  // Physical Appearance Prompts
  const skinTonePrompt = options.skinTone && options.skinTone !== 'Random' ? `Skin Tone: ${options.skinTone}` : "";
  const eyeShapePrompt = options.eyeShape && options.eyeShape !== 'Random' ? `Eye Shape: ${options.eyeShape}` : "";
  const faceTypePrompt = options.faceType && options.faceType !== 'Random' ? `Face Structure: ${options.faceType}` : "";
  const hairStylePrompt = options.hairStyle && options.hairStyle !== 'Random' ? `Hair Style: ${options.hairStyle}` : "";
  const hairColorPrompt = options.hairColor && options.hairColor !== 'Random' ? `Hair Color: ${options.hairColor}` : "";
  const eyeColorPrompt = options.eyeColor && options.eyeColor !== 'Random' ? `Eye Color: ${options.eyeColor}` : "";
  const heightPrompt = options.height && options.height !== 'Random' ? `Height: ${options.height}` : "";
  const weightPrompt = options.weight && options.weight !== 'Random' ? `Weight: ${options.weight}` : "";
  const facialHairPrompt = options.facialHair && options.facialHair !== 'Random' ? `Facial Hair: ${options.facialHair}` : "";


  const count = options.alternateOutfitsCount || 0;
  const alternateOutfitsPrompt = count > 0
    ? `Generate ${count} distinct additional alternate outfits (e.g., Training Gear, Formal Wear, Stealth, Casual, or Battle-Damaged) in the 'alternateOutfits' array. Each must have a name, description, and list of materials.`
    : "";

  const customInstructions = options.customPrompt && options.customPrompt.trim() !== ''
    ? `USER CUSTOM INSTRUCTIONS (PRIORITY): ${options.customPrompt}`
    : "";
  
  const imageInstruction = options.referenceImage 
    ? "IMPORTANT: Analyze the provided image. Use it as the PRIMARY inspiration for the character's visual design, outfit, build, and overall vibe. The generated stats and profile should match the character depicted in the image." 
    : "";

  const promptText = `
    Generate a detailed, 3D-ready martial artist character profile.
    The character can be human, animal, robot, or supernatural entity.
    Specific attention to physical build, detailed outfit textures/materials (for 3D modeling reference), a distinct fighting stance with stats, and a signature weapon or fighting tool.
    
    ${imageInstruction}

    Constraints & Preferences:
    - ${namePrompt}
    - ${speciesPrompt}
    - ${genderPrompt}
    - ${nationalityPrompt}
    - ${ethnicityPrompt}
    - ${martialArtPrompt}
    - ${personalityPrompt}
    - ${themePrompt}
    - ${gameInspirationPrompt}
    - ${outfitStylePrompt}
    - ${weaponPrompt}
    - ${weaponMaterialPrompt}
    - ${ageGroupPrompt}
    - ${alignmentPrompt}
    - ${elementPrompt}
    
    Appearance Details:
    - ${skinTonePrompt}
    - ${eyeShapePrompt}
    - ${faceTypePrompt}
    - ${hairStylePrompt}
    - ${hairColorPrompt}
    - ${eyeColorPrompt}
    - ${heightPrompt}
    - ${weightPrompt}
    - ${facialHairPrompt}
    
    ${customInstructions}
    
    ${alternateOutfitsPrompt}
    
    Ensure the color palette provides valid Hex codes.
    The fighting stance should be described technically for animation reference and must reflect the chosen Martial Arts Style.
    Provide numeric stats (1-10) for the fighting stance's offense, defense, speed, and reach in the 'fightingStance.stats' object.
    
    Create a 'combatStyleDescription'. This should be a cinematic snippet (2-3 sentences) describing the character in the middle of a fight, showcasing their unique style, weapon usage, and elemental powers if any.
    
    If a specific nationality or ethnicity is requested, ensure the outfit and name reflect it culturally where appropriate, unless the Theme dictates otherwise (e.g. Cyberpunk).
    If the species is non-human (e.g. Panda, Tiger, Robot), ensure the Martial Arts style is adapted to their physiology.
    Include the 'element' field to describe their magical or technological power source (e.g. "Fire", "Ki", "Hydraulics").
  `;

  let contents: any = promptText;

  // Handle Multimodal Input (Image + Text)
  if (options.referenceImage) {
    const matches = options.referenceImage.match(/^data:(.+);base64,(.+)$/);
    if (matches) {
      const mimeType = matches[1];
      const data = matches[2];
      contents = {
        parts: [
           { text: promptText },
           { inlineData: { mimeType, data } }
        ]
      };
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: CHARACTER_SCHEMA,
        temperature: 0.9,
      },
    });

    if (response.text) {
      const cleanedText = response.text.replace(/```json\n?|\n?```/g, "").trim();
      const parsedData = JSON.parse(cleanedText);
      const sanitized = sanitizeCharacterData(parsedData);
      
      // Inject the image style choice into the character data so the image generator knows what to do
      sanitized.imageStyle = options.imageStyle || 'Cinematic';
      
      return sanitized;
    }
    throw new Error("No text returned from Gemini");
  } catch (error) {
    console.error("Error generating character text:", error);
    throw error;
  }
};

export const generateCharacterImage = async (character: CharacterData): Promise<string | undefined> => {
  // Defensive checks
  const outfitMaterials = character.outfit?.materials?.length ? character.outfit.materials.join(', ') : 'Standard materials';
  const markings = character.bodyMarkings?.length ? character.bodyMarkings.join(', ') : 'None';
  
  // Determine Visual Style Prompt
  let styleInstruction = "";
  let stanceInstruction = character.fightingStance?.description || 'Ready';

  // Game Sprite Mode logic
  if (character.imageStyle === 'GameSprite') {
     styleInstruction = "2D character sprite for video game. Flat colors, cel shaded, no gradients. Bold black outlines (thick linework). Clean vector art style. Simple silhouette for readability. Solid white background. Game asset ready. Front facing.";
     // Override the fighting stance description for the visual generation to ensure a T-Pose/A-Pose
     stanceInstruction = "Neutral A-Pose with arms extended 45 degrees down, legs shoulder width apart, palms open forward. Symmetrical front-facing T-Pose variant.";
  } else {
     styleInstruction = "High quality, 3D render style, octane render, detailed textures, cinematic lighting, neutral studio background.";
  }

  const prompt = `
    Full body character design of a martial artist.
    Name: ${character.name}.
    Species: ${character.species}.
    Gender: ${character.gender}.
    Age: ${character.age} (${character.ageGroup}).
    Alignment: ${character.alignment}.
    Element/Power: ${character.element}.
    Origin/Nationality: ${character.nationality}.
    Martial Arts Style: ${character.martialArtStyle}.
    Build: ${character.build?.description || 'Standard'}.
    Skin Tone: ${character.appearance?.skinTone || 'Standard'}.
    Face: ${character.appearance?.faceType || 'Standard'}, ${character.appearance?.eyeShape || 'Standard'} eyes.
    Weapon: ${character.weapon?.name || 'Unarmed'} (${character.weapon?.type || 'Melee'}) made of ${character.weapon?.material || 'Steel'}.
    Outfit: ${character.outfit?.description || 'Standard Gear'}. 
    Wearing materials: ${outfitMaterials}.
    Colors: Primary ${character.colorPalette?.primary || '#000'}, Secondary ${character.colorPalette?.secondary || '#333'}, Accent ${character.colorPalette?.accent || '#FFF'}.
    Markings: ${markings}.
    
    POSE: ${stanceInstruction}.
    STYLE: ${styleInstruction}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
      config: {
        // Nano banana models do not support responseMimeType or responseSchema
      }
    });

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
    return undefined;
  }
};
