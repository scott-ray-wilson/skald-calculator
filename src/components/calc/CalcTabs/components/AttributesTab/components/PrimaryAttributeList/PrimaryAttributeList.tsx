import { ListStats, ListStatsItem } from "@/components/generic";
import { PRIMARY_ATTRIBUTE_LIST } from "@/resources";
import {
  MAX_PRIMARY_ATTRIBUTE_RANKS,
  useAttributesPanel,
  usePartyLoadout,
} from "@/stores";

export const PrimaryAttributeList = () => {
  const {
    selectedPartyMember: {
      primaryAttributes,
      getMainAttribute,
      isStoryCharacter,
    },
  } = usePartyLoadout();

  const { setSelectedAttributeId } = useAttributesPanel();

  const PRIMARY_STATS_LIST_ITEMS: ListStatsItem[] = PRIMARY_ATTRIBUTE_LIST.map(
    ({ id, title }) => ({
      id,
      label: title,
      textValue: title,
      isPrimary: getMainAttribute() === id,
      allocatedPoints: primaryAttributes.getAllocatedRanks(id),
      calculatedPoints: primaryAttributes.getCalculatedRanks(id),
      ...(isStoryCharacter()
        ? {
            onIncrement: undefined,
            onDecrement: undefined,
          }
        : {
            onIncrement: () => {
              setSelectedAttributeId(id);
              primaryAttributes.incrementRanks(id);
            },
            onDecrement: () => {
              setSelectedAttributeId(id);
              primaryAttributes.decrementRanks(id);
            },
          }),
      onAction: () => setSelectedAttributeId(id),
    }),
  );

  return (
    <ListStats
      title={`Primary Stats`}
      unallocatedPoints={
        isStoryCharacter() ? undefined : primaryAttributes.getUnallocatedRanks()
      }
      aria-label={"Character primary attributes"}
      items={PRIMARY_STATS_LIST_ITEMS}
      maxValue={isStoryCharacter() ? undefined : MAX_PRIMARY_ATTRIBUTE_RANKS}
    />
  );
};
