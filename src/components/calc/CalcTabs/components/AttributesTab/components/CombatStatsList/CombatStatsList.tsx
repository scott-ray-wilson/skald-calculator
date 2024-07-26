import { ListStats } from "@/components/generic";
import { useAttributesPanel } from "@/stores";
import { useCombatAttributes } from "@/hooks";

export const CombatStatsList = () => {
  const { setSelectedAttributeId } = useAttributesPanel();
  const combatAttributes = useCombatAttributes();

  const COMBAT_STATS_LIST_ITEMS = [...combatAttributes.values()].map(
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
      title={"Combat Stats"}
      aria-label={"Character combat stats"}
      items={COMBAT_STATS_LIST_ITEMS}
      className={`flex-1`}
    />
  );
};
