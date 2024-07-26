import { DescriptionContainer, PanelContainer } from "@/components/generic";
import { ItemDescription, ItemsInventory } from "@/components/items";

export const AllItemsTab = () => {
  return (
    <PanelContainer id={"all"} title={"All Items"}>
      <ItemsInventory filter={"all"} />
      <DescriptionContainer className={`flex-[2]`}>
        <ItemDescription />
      </DescriptionContainer>
    </PanelContainer>
  );
};
