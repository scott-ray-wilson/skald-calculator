import { DescriptionContainer, PanelContainer } from "@/components/generic";
import { ItemDescription, ItemsInventory } from "@/components/items";

export const MiscItemsTab = () => {
  return (
    <PanelContainer id={"misc"} title={"Trinkets"}>
      <ItemsInventory filter={"misc"} />
      <DescriptionContainer className={`flex-[2]`}>
        <ItemDescription />
      </DescriptionContainer>
    </PanelContainer>
  );
};
