import { DescriptionContainer, PanelContainer } from "@/components/generic";
import { ItemDescription, ItemsInventory } from "@/components/items";

export const FoodTab = () => {
  return (
    <PanelContainer id={"food"} title={"Food"}>
      <ItemsInventory filter={"food"} />
      <DescriptionContainer className={`flex-[2]`}>
        <ItemDescription />
      </DescriptionContainer>
    </PanelContainer>
  );
};
