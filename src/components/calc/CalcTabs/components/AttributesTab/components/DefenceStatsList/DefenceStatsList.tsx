import { ListStats } from "@/components/generic";
import { useAttributesPanel } from "@/stores";
import { useDefenceAttributes } from "@/hooks";

export const DefenceStatsList = () => {
  const { setSelectedAttributeId } = useAttributesPanel();
  const defenceAttributes = useDefenceAttributes();

  const DEFENCE_STATS_LIST_ITEMS = [...defenceAttributes.values()].map(
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
      title={"Defences"}
      aria-label={"Character defence stats"}
      items={DEFENCE_STATS_LIST_ITEMS}
      className={`flex-1`}
    />
  );
};
