import { ListStats } from "@/components/generic";
import { useAttributesPanel } from "@/stores";
import { useSecondaryAttributes } from "@/hooks";

export const SecondaryStatsList = () => {
  const { setSelectedAttributeId } = useAttributesPanel();
  const secondaryAttributes = useSecondaryAttributes();

  const SECONDARY_STATS_LIST_ITEMS = [...secondaryAttributes.values()].map(
    ({ attribute: { id, title }, values: { total } }) => {
      return {
        id: id,
        label: title,
        textValue: title,
        allocatedPoints: 0,
        calculatedPoints: total,
        onAction: () => setSelectedAttributeId(id),
      };
    },
  );

  return (
    <ListStats
      title={"Secondary Stats"}
      aria-label={"Character secondary attributes"}
      items={SECONDARY_STATS_LIST_ITEMS}
      className={`flex-1`}
    />
  );
};
