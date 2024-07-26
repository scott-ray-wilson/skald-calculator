import { DescriptionContainer, PanelContainer } from "@/components/generic";
import { ItemDescription, ItemsInventory } from "@/components/items";

export const WeaponsTab = () => {
  return (
    <PanelContainer id={"weapons"} title={"Weapons"}>
      <ItemsInventory filter={"weapons"} />
      <DescriptionContainer className={`flex-[2]`}>
        <ItemDescription />
      </DescriptionContainer>
    </PanelContainer>
  );
};
