import { ListStats, ListStatsItems } from "@/components/generic";
import { SKILL_LIST } from "@/resources";
import { MAX_SKILL_RANKS, useAttributesPanel, usePartyLoadout } from "@/stores";

export const SkillList = () => {
  const {
    selectedPartyMember: { skills, isStoryCharacter },
  } = usePartyLoadout();

  const { setSelectedAttributeId } = useAttributesPanel();

  const SKILL_LIST_ITEMS: ListStatsItems = SKILL_LIST.map(({ id, title }) => ({
    id,
    label: title,
    textValue: title,
    allocatedPoints: skills.getAllocatedRanks(id),
    calculatedPoints: skills.getCalculatedRanks(id),
    ...(isStoryCharacter()
      ? {
          onIncrement: undefined,
          onDecrement: undefined,
        }
      : {
          onIncrement: () => {
            setSelectedAttributeId(id);
            skills.incrementRanks(id);
          },
          onDecrement: () => {
            setSelectedAttributeId(id);
            skills.decrementRanks(id);
          },
        }),
    onAction: () => setSelectedAttributeId(id),
  }));

  return (
    <ListStats
      title={"Skills"}
      unallocatedPoints={
        isStoryCharacter() ? undefined : skills.getUnallocatedRanks()
      }
      aria-label={"Character skills"}
      items={SKILL_LIST_ITEMS}
      maxValue={isStoryCharacter() ? undefined : MAX_SKILL_RANKS}
      className={`flex-1`}
    />
  );
};
