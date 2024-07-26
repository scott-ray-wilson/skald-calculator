import { DescriptionContainer, PanelContainer } from "@/components/generic";
import { ItemDescription, ItemsInventory } from "@/components/items";

export const AdventuringItemsTab = () => {
  return (
    <PanelContainer id={"adventuring"} title={"Adventuring"}>
      <ItemsInventory filter={"adventuring"} />
      <DescriptionContainer className={`flex-[2]`}>
        <ItemDescription />
      </DescriptionContainer>
    </PanelContainer>
  );
};
