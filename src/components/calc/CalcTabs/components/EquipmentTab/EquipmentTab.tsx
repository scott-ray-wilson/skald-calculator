import {
  PanelContainer,
  SectionContainer,
  TabButtons,
} from "@/components/generic";
import { usePartyLoadout } from "@/stores";
import {
  EquipmentDescription,
  EquipmentSlotPicker,
  EquipmentSummary,
  WieldToggle,
  WornItemsList,
} from "@/components/calc/CalcTabs/components/EquipmentTab/components";

export const EquipmentTab = () => {
  const { selectedPartyMember } = usePartyLoadout();

  const isStoryCharacter = selectedPartyMember.isStoryCharacter();

  return (
    <PanelContainer
      id={"equipment"}
      actions={<TabButtons />}
      title={
        isStoryCharacter
          ? `${selectedPartyMember.getCharacter().title}: Inventory`
          : "Inventory"
      }
    >
      {/* worn slots with the combat summary inline, item picker beneath —
          mirroring the game's inventory sheet; the picker flexes into the
          remaining panel height and scrolls internally */}
      {/* 31rem fits nine 3rem picker columns beside the 20px scrollbar */}
      <div
        className={`flex min-h-0 flex-col gap-1 w-full md:max-w-[27.2rem] lg:max-w-[30.3rem]`}
      >
        <SectionContainer
          title={"Items Worn"}
          actions={<WieldToggle />}
          containerClassName={`flex-row flex-wrap gap-2 bg-brown p-1`}
        >
          <WornItemsList />
          <EquipmentSummary />
        </SectionContainer>
        <EquipmentSlotPicker />
      </div>
      <EquipmentDescription />
    </PanelContainer>
  );
};
