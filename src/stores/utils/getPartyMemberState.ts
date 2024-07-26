import {
  MainCharacterSchemaType,
  MercenaryCharacterSchemaType,
  PartyMemberSchemaType,
  StoryCharacterSchemaType,
} from "@/schemas";
import {
  ARCHETYPE_CLASS_MAP,
  BACKGROUND_MAP,
  CHARACTER_MAP,
  CLASS_MAP,
} from "@/resources";

// gets derived state of party member

export const getPartyMemberState = (partyMember: PartyMemberSchemaType) => {
  const getMappedValues = (classId: string, backgroundId: string) => {
    const characterClass = CLASS_MAP.get(classId);

    if (!characterClass) throw new Error(`Invalid Class ID: ${classId}`);

    const archetypeClass = ARCHETYPE_CLASS_MAP.get(characterClass.archetype);

    if (!archetypeClass)
      throw new Error(`Invalid Class ID: ${characterClass.archetype}`);

    const background = BACKGROUND_MAP.get(backgroundId);

    if (!background)
      throw new Error(`Invalid Background ID: ${characterClass.archetype}`);

    return { class: characterClass, archetypeClass, background };
  };

  if (partyMember.category === "story") {
    const character = CHARACTER_MAP.get(partyMember.characterId);

    if (!character)
      throw new Error(`Invalid Character ID: ${partyMember.characterId}`);

    return {
      ...partyMember,
      character: character,
      ...getMappedValues(character.classKit, character.background),
      base: partyMember as StoryCharacterSchemaType,
    };
  }

  return {
    ...partyMember,
    character: null,
    ...getMappedValues(partyMember.classId, partyMember.backgroundId),
    base: partyMember as MainCharacterSchemaType | MercenaryCharacterSchemaType,
  };
};
