import { DescriptionContainer, PanelContainer } from "@/components/generic";
import { ItemDescription, ItemsInventory } from "@/components/items";

export const ArmorTab = () => {
  return (
    <PanelContainer id={"armor"} title={"Armor"}>
      <ItemsInventory filter={"armor"} />
      <DescriptionContainer className={`flex-[2]`}>
        <ItemDescription />
      </DescriptionContainer>
    </PanelContainer>
  );
};
