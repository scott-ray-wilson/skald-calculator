import { DescriptionContainer, PanelContainer } from "@/components/generic";
import { ItemDescription, ItemsInventory } from "@/components/items";

export const AccessoriesTab = () => {
  return (
    <PanelContainer id={"accessories"} title={"Accessories"}>
      <ItemsInventory filter={"accessories"} />
      <DescriptionContainer className={`flex-[2]`}>
        <ItemDescription />
      </DescriptionContainer>
    </PanelContainer>
  );
};
