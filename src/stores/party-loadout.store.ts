import { create } from "zustand";
import {
  MainCharacterSchemaType,
  PartyLoadoutSchemaType,
} from "@/schemas/types";
import { InitialPartyLoadoutState, PartyLoadoutState } from "@/stores/types";
import {
  ADDITION_ABILITY_MAP,
  BACKGROUND_LIST,
  CLASS_LIST,
  FEAT_MAP,
  GAME_METADATA,
  PRIMARY_ATTRIBUTE_LIST,
} from "@/resources";
import { DecrementLevelError } from "@/errors";
import {
  getAttributeName,
  getBackgroundAbilities,
  getPartyMemberState,
} from "@/stores/utils";
import {
  ALLOTTED_PRIMARY_ATTRIBUTE_RANKS,
  ALLOTTED_SKILL_RANKS,
  MAX_PRIMARY_ATTRIBUTE_RANKS,
  MAX_SKILL_RANKS,
  MIN_CHARACTER_LEVEL,
  MIN_FEAT_RANKS,
  MIN_PRIMARY_ATTRIBUTE_RANKS,
  MIN_SKILL_RANKS,
} from "@/stores/constants";
import { PartyLoadoutSchema } from "@/schemas";
import { validate } from "@/schemas/utils";

// default state for custom and story characters
const INITIAL_CHARACTER_STATE: Pick<
  MainCharacterSchemaType,
  "feats" | "level"
> = {
  feats: {},
  level: 1,
};

// default state for custom characters only
export const INITIAL_CUSTOM_CHARACTER_STATE: Omit<
  MainCharacterSchemaType,
  "category" | "portrait"
> = {
  classId: CLASS_LIST[0].id,
  backgroundId: BACKGROUND_LIST[0].id,
  primaryAttributes: {},
  skills: {},
  ...INITIAL_CHARACTER_STATE,
};

// initial loadout state
const INITIAL_PARTY_LOADOUT_STATE: InitialPartyLoadoutState = {
  selectedPartyMemberIndex: 0,
  _partyLoadout: [
    {
      category: "main",
      portrait: "Male1",
      ...INITIAL_CUSTOM_CHARACTER_STATE,
    },
    null,
    null,
    null,
    null,
    null,
  ],
};

const usePartyEditorStore = create<PartyLoadoutState>()((set, get) => ({
  // initial state
  ...INITIAL_PARTY_LOADOUT_STATE,

  // import/export config
  exportLoadout: () => get()._partyLoadout,
  importLoadout: (partyLoadout) => {
    const data: unknown = partyLoadout;

    if (validate(PartyLoadoutSchema, data)) {
      set({ _partyLoadout: data });
    } else {
      throw new Error("Invalid Party Loadout");
    }
  },

  // party member management
  setSelectedPartyMemberIndex: (selectedPartyMemberIndex) => {
    const { _partyLoadout } = get();

    if (!_partyLoadout[selectedPartyMemberIndex])
      throw new Error(`Cannot Select Non-Existent Party Member.`);

    set({ selectedPartyMemberIndex });
  },
  removePartyMember: (partyMemberIndex) => {
    if (partyMemberIndex === 0)
      throw new Error("Cannot Remove Main Character From Party.");

    const partyMembers = [
      ...get()._partyLoadout,
    ] satisfies PartyLoadoutSchemaType;

    partyMembers[partyMemberIndex] = null;

    set({ _partyLoadout: partyMembers, selectedPartyMemberIndex: 0 });
  },
  addPartyMember: (partyMemberIndex, params) => {
    if (partyMemberIndex === 0)
      throw new Error("Cannot Replace Main Character.");

    const partyMembers = [
      ...get()._partyLoadout,
    ] satisfies PartyLoadoutSchemaType;

    partyMembers[partyMemberIndex] =
      params.category === "story"
        ? {
            ...params,
            ...INITIAL_CHARACTER_STATE,
          }
        : {
            ...params,
            ...INITIAL_CUSTOM_CHARACTER_STATE,
            portrait: "Female1",
          };

    set({ _partyLoadout: partyMembers });
  },
  setPartyMemberPortrait: (partyMemberIndex, portrait) => {
    const partyMembers = [
      ...get()._partyLoadout,
    ] satisfies PartyLoadoutSchemaType;

    const partyMember = partyMembers[partyMemberIndex];

    if (!partyMember)
      throw new Error(
        `Invalid Party Member Selection: Index ${partyMemberIndex}.`,
      );

    if (partyMember.category === "story")
      throw new Error("Cannot Change Story Character Portrait.");

    partyMembers[partyMemberIndex] = {
      ...partyMember,
      portrait,
    };

    set({ _partyLoadout: partyMembers });
  },
  getPartyMembers: () => {
    const { _partyLoadout } = get();

    return _partyLoadout.map((partyMember) =>
      partyMember ? getPartyMemberState(partyMember) : null,
    );
  },
  removeAllPartyMembers: () =>
    set({
      selectedPartyMemberIndex: 0,
      _partyLoadout: [get()._partyLoadout[0], null, null, null, null, null],
    }),
  _getSelectedPartyMemberState: () => {
    const { selectedPartyMemberIndex, _partyLoadout } = get();

    const partyMember = _partyLoadout[selectedPartyMemberIndex];

    if (!partyMember)
      throw new Error(`No Party Member at Index: ${selectedPartyMemberIndex}`);

    return getPartyMemberState(partyMember);
  },

  // selected party member configuration
  selectedPartyMember: {
    // character details
    getCategory: () => get()._getSelectedPartyMemberState().category,
    isStoryCharacter: () => get().selectedPartyMember.getCategory() === "story",
    getCharacter: () => {
      const character = get()._getSelectedPartyMemberState().character;

      if (!character)
        throw new Error("Selected Party Member is not Story Character");

      return character;
    },

    // level configuration
    getLevel: () => get()._getSelectedPartyMemberState().level,
    incrementLevel: (topOut?: boolean) => {
      const { selectedPartyMemberIndex, _getSelectedPartyMemberState } = get();

      const partyMemberState = _getSelectedPartyMemberState();

      const partyMembers = [
        ...get()._partyLoadout,
      ] satisfies PartyLoadoutSchemaType;

      let level = partyMemberState.level;

      if (topOut) {
        level = GAME_METADATA.maxLevel;
      } else {
        level = Math.min(GAME_METADATA.maxLevel, level + 1);
      }

      partyMembers[selectedPartyMemberIndex] = {
        ...partyMemberState.base,
        level,
      };

      set({ _partyLoadout: partyMembers });
    },
    decrementLevel: (bottomOut?: boolean) => {
      const {
        selectedPartyMemberIndex,
        _getSelectedPartyMemberState,
        selectedPartyMember,
      } = get();

      const partyMemberState = _getSelectedPartyMemberState();

      const partyMembers = [
        ...get()._partyLoadout,
      ] satisfies PartyLoadoutSchemaType;

      let level = partyMemberState.level;

      if (level === MIN_CHARACTER_LEVEL) return;

      let requiredLevel = 0;

      // verify level decrement is valid (no feat rank allocation requires level)
      [...Object.entries(_getSelectedPartyMemberState().feats)].forEach(
        ([featId, allocatedPoints]) => {
          if (!allocatedPoints) return false;

          const feat = FEAT_MAP.get(featId);

          if (!feat) throw new Error(`Missing Feat for ID: ${featId}`);

          const requiresLevel =
            feat.prereqLevel > (bottomOut ? MIN_CHARACTER_LEVEL : level - 1);

          if (requiresLevel) {
            // get highest level requirement
            requiredLevel = Math.max(feat.prereqLevel, requiredLevel);
          }
        },
      );

      // feat requires level?
      if (requiredLevel > 0) {
        throw new DecrementLevelError("", {
          cause: "feat_requires_level",
          level: requiredLevel,
        });
      }

      // allocated feat ranks exceed decremented level points?
      if (
        selectedPartyMember.feats.getTotalAllocatedRanks() >
        selectedPartyMember.getArchetypeClass().bonusDP +
          selectedPartyMember.getClass().bonusDP +
          GAME_METADATA.startingDP +
          GAME_METADATA.levelUpDP * (level - 2)
      ) {
        throw new DecrementLevelError("", {
          cause: "feat_ranks_exceed_level",
        });
      }

      if (bottomOut) {
        level = 1;
      } else {
        level = Math.max(1, level - 1);
      }

      partyMembers[selectedPartyMemberIndex] = {
        ...partyMemberState.base,
        level,
      };

      set({ _partyLoadout: partyMembers });
    },

    // class configuration
    getClass: () => get()._getSelectedPartyMemberState().class,
    getArchetypeClass: () =>
      get()._getSelectedPartyMemberState().archetypeClass,
    setClassId: (classId: string) => {
      const { selectedPartyMemberIndex, _getSelectedPartyMemberState } = get();

      const partyMemberState = _getSelectedPartyMemberState();

      if (partyMemberState.category === "story")
        throw new Error("Cannot Change Story Character Class.");

      const partyMembers = [
        ...get()._partyLoadout,
      ] satisfies PartyLoadoutSchemaType;

      partyMembers[selectedPartyMemberIndex] = {
        ...partyMemberState.base,
        classId,
      };

      set({ _partyLoadout: partyMembers });
    },
    getMainAttribute: () => {
      const { class: characterClass, archetypeClass } =
        get()._getSelectedPartyMemberState();

      // inherited from archetype if not overridden on character class
      return characterClass.mainAttribute || archetypeClass.mainAttribute;
    },

    // background configuration
    getBackground: () => get()._getSelectedPartyMemberState().background,
    getBackgroundAbilities: () =>
      getBackgroundAbilities(get()._getSelectedPartyMemberState().background),
    setBackgroundId: (backgroundId: string) => {
      const { selectedPartyMemberIndex, _getSelectedPartyMemberState } = get();

      const partyMemberState = _getSelectedPartyMemberState();

      if (partyMemberState.category === "story")
        throw new Error("Cannot Change Story Character Background.");

      const partyMembers = [
        ...get()._partyLoadout,
      ] satisfies PartyLoadoutSchemaType;

      partyMembers[selectedPartyMemberIndex] = {
        ...partyMemberState.base,
        backgroundId,
      };

      set({ _partyLoadout: partyMembers });
    },
    getBackgroundBonus: (attributeId) => {
      const { selectedPartyMember } = get();

      return selectedPartyMember
        .getBackgroundAbilities()
        .filter((ability) =>
          ability.bonusAttributes.some(
            (attribute) => attribute.id === attributeId,
          ),
        )
        .reduce((a, b) => a + b.bonusMagnitude, 0);
    },

    // primary attributes configuration
    primaryAttributes: {
      getUnallocatedRanks: () => {
        const { _getSelectedPartyMemberState } = get();

        const partyMemberState = _getSelectedPartyMemberState();

        if (partyMemberState.category === "story") return 0;

        return (
          ALLOTTED_PRIMARY_ATTRIBUTE_RANKS -
          Object.values(partyMemberState.primaryAttributes).reduce(
            (a, b) => a + b,
            0,
          )
        );
      },
      getAllocatedRanks: (attributeId) => {
        const { _getSelectedPartyMemberState } = get();

        const partyMemberState = _getSelectedPartyMemberState();

        const attributeName = getAttributeName(attributeId);

        let attributeRanks: number;
        if (partyMemberState.category === "story") {
          attributeRanks = partyMemberState.character[attributeName];
        } else {
          attributeRanks = partyMemberState.primaryAttributes[attributeId] ?? 0;
        }

        return (
          attributeRanks +
          (partyMemberState.category === "story"
            ? 0
            : partyMemberState.class[attributeName])
        );
      },
      getCalculatedRanks: (attributeId) => {
        const { selectedPartyMember } = get();

        return (
          selectedPartyMember.primaryAttributes.getAllocatedRanks(attributeId) +
          selectedPartyMember.feats.getAttributeBonus(attributeId)
        );
      },
      incrementRanks: (attributeId, topOut) => {
        const {
          selectedPartyMemberIndex,
          _getSelectedPartyMemberState,
          selectedPartyMember,
        } = get();

        const partyMemberState = _getSelectedPartyMemberState();

        if (partyMemberState.category === "story")
          throw new Error("Cannot Change Story Character Attributes.");

        const unallocatedRanks =
          selectedPartyMember.primaryAttributes.getUnallocatedRanks();

        if (unallocatedRanks <= 0) return;

        const partyMembers = [
          ...get()._partyLoadout,
        ] satisfies PartyLoadoutSchemaType;

        const { primaryAttributes } = partyMemberState;

        let attributeRanks = primaryAttributes[attributeId] ?? 0;

        if (topOut) {
          // add max ranks (or remaining unallocated ranks if less)
          attributeRanks = Math.min(
            MAX_PRIMARY_ATTRIBUTE_RANKS,
            attributeRanks + unallocatedRanks,
          );
        } else {
          attributeRanks = Math.min(
            MAX_PRIMARY_ATTRIBUTE_RANKS,
            attributeRanks + 1,
          );
        }

        partyMembers[selectedPartyMemberIndex] = {
          ...partyMemberState.base,
          primaryAttributes: {
            ...primaryAttributes,
            [attributeId]: attributeRanks,
          },
        };

        set({ _partyLoadout: partyMembers });
      },
      decrementRanks: (attributeId, bottomOut) => {
        const { selectedPartyMemberIndex, _getSelectedPartyMemberState } =
          get();

        const partyMemberState = _getSelectedPartyMemberState();

        if (partyMemberState.category === "story")
          throw new Error("Cannot Change Story Character Attributes.");

        const partyMembers = [
          ...get()._partyLoadout,
        ] satisfies PartyLoadoutSchemaType;

        const { primaryAttributes } = partyMemberState;

        let attributeRanks = primaryAttributes[attributeId] ?? 0;

        if (attributeRanks === 0) return;

        if (bottomOut) {
          attributeRanks = MIN_PRIMARY_ATTRIBUTE_RANKS;
        } else {
          attributeRanks -= 1;
        }

        partyMembers[selectedPartyMemberIndex] = {
          ...partyMemberState.base,
          primaryAttributes: {
            ...primaryAttributes,
            [attributeId]: attributeRanks,
          },
        };

        // remove key if zeroed out
        if (attributeRanks <= MIN_PRIMARY_ATTRIBUTE_RANKS)
          delete partyMembers[selectedPartyMemberIndex].primaryAttributes[
            attributeId
          ];

        set({ _partyLoadout: partyMembers });
      },
    },

    // skill configuration
    skills: {
      getUnallocatedRanks: () => {
        const { _getSelectedPartyMemberState } = get();

        const partyMemberState = _getSelectedPartyMemberState();

        if (partyMemberState.category === "story") return 0;

        return (
          ALLOTTED_SKILL_RANKS -
          Object.values(partyMemberState.skills).reduce((a, b) => a + b, 0)
        );
      },
      getAllocatedRanks: (skillId) => {
        const { _getSelectedPartyMemberState } = get();

        const partyMemberState = _getSelectedPartyMemberState();

        let skillRanks: number;
        if (partyMemberState.category === "story") {
          skillRanks = partyMemberState.character.abilityList
            .map((abilityId) => {
              const ability = ADDITION_ABILITY_MAP.get(abilityId);

              if (!ability)
                throw new Error(`No Ability Matches ID: ${abilityId}`);
              return ability;
            })
            .filter((ability) => {
              return ability.bonusAttributes.some(
                (attributeId) => attributeId === skillId,
              );
            })
            .reduce((a, b) => a + b.bonusMagnitude, 0);
        } else {
          skillRanks = partyMemberState.skills[skillId] ?? 0;
        }

        return skillRanks;
      },
      getCalculatedRanks: (skillId) => {
        const { selectedPartyMember } = get();

        let ranks = 0;

        const modifyingAttributes = PRIMARY_ATTRIBUTE_LIST.filter((attribute) =>
          attribute.influences.includes(skillId),
        );

        if (modifyingAttributes.length) {
          modifyingAttributes.forEach((attribute) => {
            ranks += selectedPartyMember.primaryAttributes.getCalculatedRanks(
              attribute.id,
            );
          });
        }

        ranks += selectedPartyMember.feats.getAttributeBonus(skillId);
        ranks += selectedPartyMember.getBackgroundBonus(skillId);

        return selectedPartyMember.skills.getAllocatedRanks(skillId) + ranks;
      },
      incrementRanks: (skillId, topOut) => {
        const {
          selectedPartyMemberIndex,
          _getSelectedPartyMemberState,
          selectedPartyMember,
        } = get();

        const partyMemberState = _getSelectedPartyMemberState();

        if (partyMemberState.category === "story")
          throw new Error("Cannot Change Story Character Attributes.");

        const unallocatedRanks =
          selectedPartyMember.skills.getUnallocatedRanks();

        if (unallocatedRanks <= 0) return;

        const partyMembers = [
          ...get()._partyLoadout,
        ] satisfies PartyLoadoutSchemaType;

        const { skills } = partyMemberState;

        let skillRanks = skills[skillId] ?? 0;

        if (topOut) {
          // add max ranks (or remaining unallocated ranks if less)
          skillRanks = Math.min(MAX_SKILL_RANKS, skillRanks + unallocatedRanks);
        } else {
          skillRanks = Math.min(MAX_SKILL_RANKS, skillRanks + 1);
        }

        partyMembers[selectedPartyMemberIndex] = {
          ...partyMemberState.base,
          skills: {
            ...skills,
            [skillId]: skillRanks,
          },
        };

        set({ _partyLoadout: partyMembers });
      },
      decrementRanks: (skillId, bottomOut) => {
        const { selectedPartyMemberIndex, _getSelectedPartyMemberState } =
          get();

        const partyMemberState = _getSelectedPartyMemberState();

        if (partyMemberState.category === "story")
          throw new Error("Cannot Change Story Character Attributes.");

        const partyMembers = [
          ...get()._partyLoadout,
        ] satisfies PartyLoadoutSchemaType;

        const { skills } = partyMemberState;

        let skillRanks = skills[skillId] ?? 0;

        if (skillRanks === MIN_SKILL_RANKS) return;

        if (bottomOut) {
          skillRanks = MIN_SKILL_RANKS;
        } else {
          skillRanks -= 1;
        }

        partyMembers[selectedPartyMemberIndex] = {
          ...partyMemberState.base,
          skills: {
            ...skills,
            [skillId]: skillRanks,
          },
        };

        // remove key if zeroed out
        if (skillRanks <= MIN_SKILL_RANKS)
          delete partyMembers[selectedPartyMemberIndex].skills[skillId];

        set({ _partyLoadout: partyMembers });
      },
    },

    // feat configuration
    feats: {
      getAllocatedRanks: (featId) => {
        const { _getSelectedPartyMemberState } = get();
        const partyMemberState = _getSelectedPartyMemberState();
        return partyMemberState.feats[featId] ?? 0;
      },
      getTotalAllocatedRanks: () => {
        const { _getSelectedPartyMemberState } = get();
        const partyMemberState = _getSelectedPartyMemberState();

        return Object.values(partyMemberState.feats).reduce((a, b) => a + b, 0);
      },
      getUnallocatedRanks: () => {
        const { _getSelectedPartyMemberState, selectedPartyMember } = get();
        const partyMemberState = _getSelectedPartyMemberState();

        return (
          partyMemberState.archetypeClass.bonusDP +
          partyMemberState.class.bonusDP +
          GAME_METADATA.startingDP +
          GAME_METADATA.levelUpDP * (partyMemberState.level - 1) -
          selectedPartyMember.feats.getTotalAllocatedRanks()
        );
      },
      incrementRanks: (featId, topOut) => {
        const {
          selectedPartyMemberIndex,
          _getSelectedPartyMemberState,
          selectedPartyMember,
        } = get();

        const partyMemberState = _getSelectedPartyMemberState();

        const unallocatedRanks =
          selectedPartyMember.feats.getUnallocatedRanks();

        if (unallocatedRanks <= 0) return;

        const partyMembers = [
          ...get()._partyLoadout,
        ] satisfies PartyLoadoutSchemaType;

        const { feats } = partyMemberState;

        let featRanks = feats[featId] ?? 0;

        const feat = FEAT_MAP.get(featId);

        if (!feat) throw new Error(`Invalid Feat. ID: ${featId}`);

        const maxRanks = feat.list.reduce(
          (max, curr) => (curr.rank > max ? curr.rank : max),
          0,
        );

        if (featRanks === maxRanks) return;

        if (topOut) {
          // add max ranks (or remaining unallocated ranks if less)
          featRanks = Math.min(maxRanks, featRanks + unallocatedRanks);
        } else {
          featRanks = Math.min(maxRanks, featRanks + 1);
        }

        partyMembers[selectedPartyMemberIndex] = {
          ...partyMemberState.base,
          feats: {
            ...feats,
            [featId]: featRanks,
          },
        };

        set({ _partyLoadout: partyMembers });
      },
      decrementRanks: (featId, bottomOut) => {
        const { selectedPartyMemberIndex, _getSelectedPartyMemberState } =
          get();

        const partyMemberState = _getSelectedPartyMemberState();

        const partyMembers = [
          ...get()._partyLoadout,
        ] satisfies PartyLoadoutSchemaType;

        const { feats } = partyMemberState;

        let featRanks = feats[featId] ?? 0;

        if (featRanks === 0) return;

        const feat = FEAT_MAP.get(featId);

        if (!feat) throw new Error(`Invalid Feat. ID: ${featId}`);

        if (bottomOut) {
          featRanks = 0;
        } else {
          featRanks -= 1;
        }

        partyMembers[selectedPartyMemberIndex] = {
          ...partyMemberState.base,
          feats: {
            ...feats,
            [featId]: featRanks,
          },
        };

        // remove key if zeroed out
        if (featRanks <= MIN_FEAT_RANKS)
          delete partyMembers[selectedPartyMemberIndex].feats[featId];

        set({ _partyLoadout: partyMembers });
      },
      areMinimumFeatRequirementsMet: (featId: string) => {
        const { selectedPartyMember } = get();
        const feat = FEAT_MAP.get(featId);

        if (!feat) throw new Error(`Invalid Feat ID: ${featId}`);

        const allocatedPoints = selectedPartyMember.feats.getAllocatedRanks(
          feat.id,
        );
        const minimumRank = Math.min(...feat.list.map((a) => a.rank));
        return allocatedPoints >= minimumRank;
      },
      getAttributeBonus: (attributeId) => {
        const { _getSelectedPartyMemberState } = get();
        const partyMemberState = _getSelectedPartyMemberState();

        let bonus = 0;

        [...Object.entries(partyMemberState.feats)].forEach(
          ([featId, allocatedRanks]) => {
            if (allocatedRanks <= 0) return;

            const feat = FEAT_MAP.get(featId);

            if (!feat) throw new Error(`Missing Feat for ID: ${featId}`);

            feat.list.forEach((tier) => {
              if (tier.rank > allocatedRanks) return;

              tier.abilities.forEach((abilityId) => {
                const ability = ADDITION_ABILITY_MAP.get(abilityId);

                if (!ability)
                  // ability doesn't provide addition bonus
                  return;

                // @ts-expect-error typing is insufficient from game data
                if (!ability.bonusAttributes.includes(attributeId)) return;

                bonus += ability.bonusMagnitude;
              });
            });
          },
        );
        return bonus;
      },
      resetRanks: () => {
        const { selectedPartyMemberIndex, _getSelectedPartyMemberState } =
          get();

        const partyMemberState = _getSelectedPartyMemberState();

        const partyMembers = [
          ...get()._partyLoadout,
        ] satisfies PartyLoadoutSchemaType;

        partyMembers[selectedPartyMemberIndex] = {
          ...partyMemberState.base,
          feats: {},
        };

        set({ _partyLoadout: partyMembers });
      },
    },
    reset: () => {
      const { selectedPartyMemberIndex, _getSelectedPartyMemberState } = get();

      const partyMemberState = _getSelectedPartyMemberState();

      const partyMembers = [
        ...get()._partyLoadout,
      ] satisfies PartyLoadoutSchemaType;

      partyMembers[selectedPartyMemberIndex] = {
        ...partyMemberState.base,
        ...(partyMemberState.category === "story"
          ? INITIAL_CHARACTER_STATE
          : INITIAL_CUSTOM_CHARACTER_STATE),
      };

      set({ _partyLoadout: partyMembers });
    },
  },
}));

export const importPartyLoadOut = usePartyEditorStore.getState().importLoadout;

export const usePartyLoadout = () => {
  // not exposing internal state/functions
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _partyLoadout, _getSelectedPartyMemberState, ...store } =
    usePartyEditorStore((store) => store);

  return store;
};
