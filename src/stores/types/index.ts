import {
  MainCharacterSchemaType,
  MercenaryCharacterSchemaType,
  PartyLoadoutSchemaType,
  PartyMemberCategoryType,
  PartyMemberSchemaType,
  StoryCharacterSchemaType,
} from "@/schemas/types";
import {
  AdditionAbilityType,
  ArchetypeClassType,
  AttributeType,
  BackgroundType,
  CharacterType,
  ClassType,
} from "@/resources/types";

export type PartyMemberState = PartyMemberSchemaType & {
  class: ClassType;
  archetypeClass: ArchetypeClassType;
  background: BackgroundType;
} & (
    | {
        category: "story";
        character: CharacterType;
        base: StoryCharacterSchemaType;
      }
    | {
        character: null;
        category: "main" | "mercenary";
        base: MercenaryCharacterSchemaType | MainCharacterSchemaType;
      }
  );

export type InitialPartyLoadoutState = {
  // default party state
  _partyLoadout: PartyLoadoutSchemaType;

  // determines which party member is being configured
  selectedPartyMemberIndex: number;
};

export type PartyLoadoutState = InitialPartyLoadoutState & {
  // party management
  setSelectedPartyMemberIndex: (selectedPartyMemberIndex: number) => void;
  addPartyMember: (
    partyMemberIndex: number,
    params:
      | {
          category: "mercenary";
        }
      | { category: "story"; characterId: string },
  ) => void;
  removePartyMember: (partyMemberIndex: number) => void;
  setPartyMemberPortrait: (partyMemberIndex: number, portrait: string) => void;
  removeAllPartyMembers: () => void;
  getPartyMembers: () => (PartyMemberState | null)[];

  // import/export config
  exportLoadout: () => PartyLoadoutSchemaType;
  importLoadout: (partyLoadout: PartyLoadoutSchemaType) => void;

  // internal state getter
  _getSelectedPartyMemberState: () => PartyMemberState;

  // selected party member getters/setters
  selectedPartyMember: {
    // character details
    getCharacter: () => CharacterType;
    getCategory: () => PartyMemberCategoryType;
    isStoryCharacter: () => boolean;

    // level
    getLevel: () => number;
    incrementLevel: (topOut?: boolean) => void;
    decrementLevel: (bottomOut?: boolean) => void;

    // classes
    getClass: () => ClassType;
    getArchetypeClass: () => ArchetypeClassType;
    setClassId: (classId: string) => void;
    getMainAttribute: () => string;

    // background
    getBackground: () => BackgroundType;
    getBackgroundAbilities: () => (Omit<
      AdditionAbilityType,
      "bonusAttributes"
    > & {
      bonusAttributes: AttributeType[];
    })[];
    getBackgroundBonus: (attributeId: string) => number;
    setBackgroundId: (classId: string) => void;

    // primary attributes
    primaryAttributes: {
      getUnallocatedRanks: () => number;
      getAllocatedRanks: (attributeId: string) => number;
      getCalculatedRanks: (attributeId: string) => number;
      incrementRanks: (attributeId: string, topOut?: boolean) => void;
      decrementRanks: (attributeId: string, bottomOut?: boolean) => void;
    };

    // skills
    skills: {
      getUnallocatedRanks: () => number;
      getAllocatedRanks: (skillId: string) => number;
      getCalculatedRanks: (skillId: string) => number;
      incrementRanks: (attributeId: string, topOut?: boolean) => void;
      decrementRanks: (attributeId: string, topOut?: boolean) => void;
    };

    // feats
    feats: {
      getAllocatedRanks: (featId: string) => number;
      getTotalAllocatedRanks: () => number;
      getUnallocatedRanks: () => number;
      incrementRanks: (featId: string, topOut?: boolean) => void;
      decrementRanks: (featId: string, bottomOut?: boolean) => void;
      areMinimumFeatRequirementsMet: (featId: string) => boolean;
      getAttributeBonus: (attributeId: string) => number;
      resetRanks: () => void;
    };

    // reset selected party member
    reset: () => void;
  };
};
