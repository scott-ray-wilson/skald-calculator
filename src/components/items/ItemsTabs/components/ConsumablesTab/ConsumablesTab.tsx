import { DescriptionContainer, PanelContainer } from "@/components/generic";
import { ItemDescription, ItemsInventory } from "@/components/items";

export const ConsumablesTab = () => {
  return (
    <PanelContainer id={"consumables"} title={"Consumables"}>
      <ItemsInventory filter={"consumables"} />
      <DescriptionContainer className={`flex-[2]`}>
        <ItemDescription />
      </DescriptionContainer>
    </PanelContainer>
  );
};
