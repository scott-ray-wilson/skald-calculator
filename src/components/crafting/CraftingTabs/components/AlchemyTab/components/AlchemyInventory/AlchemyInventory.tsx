import { useAlchemyPanel } from "@/stores";
import { CONSUMABLE_LIST, REAGENT_LIST } from "@/resources";
import { InventoryList } from "@/components/generic";

export const AlchemyInventory = () => {
  const {
    ingredients,
    addIngredient,
    setSelectedReagentId,
    selectedReagentId,
  } = useAlchemyPanel();

  return (
    <InventoryList
      selectedInventoryId={selectedReagentId}
      onSelectItem={setSelectedReagentId}
      onItemAction={addIngredient}
      excludeItems={ingredients}
      inventory={[...CONSUMABLE_LIST, ...REAGENT_LIST]}
    />
  );
};
