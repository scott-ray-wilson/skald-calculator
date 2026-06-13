import { ListBox, ListBoxItem, Selection } from "react-aria-components";
import { ItemIcon } from "@/components/generic";
import { EQUIPMENT_SLOT_LABELS, EquipmentSlotId } from "@/resources";
import { useEquipmentPanel, usePartyLoadout } from "@/stores";
import { cn } from "@/components/utils";
import WornIconMelee from "@/assets/sprites/inventory/WornIconMelee.png";
import WornIconRanged from "@/assets/sprites/inventory/WornIconRanged.png";
import WornIconAmmo from "@/assets/sprites/inventory/WornIconAmmo.png";
import WornIconShield from "@/assets/sprites/inventory/WornIconShield.png";
import WornIconRing from "@/assets/sprites/inventory/WornIconRing.png";
import WornIconNecklace from "@/assets/sprites/inventory/WornIconNecklace.png";
import WornIconHead from "@/assets/sprites/inventory/WornIconHead.png";
import WornIconArmor from "@/assets/sprites/inventory/WornIconArmor.png";
import WornIconClothing from "@/assets/sprites/inventory/WornIconClothing.png";
import WornIconHands from "@/assets/sprites/inventory/WornIconHands.png";
import WornIconFeet from "@/assets/sprites/inventory/WornIconFeet.png";
import WornIconOffhand from "@/assets/sprites/inventory/WornIconOffhand.png";

// slot order, rows and placeholder sprites match the game's inventory sheet
// (UIInventorySheetBase) — the light slot uses the torch "Offhand" icon
const WORN_SLOTS: { id: EquipmentSlotId; placeholderIcon: string }[] = [
  { id: "meleeWeapon", placeholderIcon: WornIconMelee },
  { id: "rangedWeapon", placeholderIcon: WornIconRanged },
  { id: "armor", placeholderIcon: WornIconArmor },
  { id: "shield", placeholderIcon: WornIconShield },
  { id: "ammo", placeholderIcon: WornIconAmmo },
  { id: "ring", placeholderIcon: WornIconRing },
  { id: "head", placeholderIcon: WornIconHead },
  { id: "clothing", placeholderIcon: WornIconClothing },
  { id: "gloves", placeholderIcon: WornIconHands },
  { id: "boots", placeholderIcon: WornIconFeet },
  { id: "light", placeholderIcon: WornIconOffhand },
  { id: "necklace", placeholderIcon: WornIconNecklace },
];

export const WornItemsList = () => {
  const { selectedPartyMember } = usePartyLoadout();
  const { selectedSlotId, setSelectedSlotId, setWieldedSlotId } =
    useEquipmentPanel();

  const handleSelection = (selection: Selection) => {
    if (selection === "all") throw new Error("Invalid Slot Selection.");

    const slotId = selection.values().next().value as
      | EquipmentSlotId
      | undefined;

    if (slotId) setSelectedSlotId(slotId);
  };

  return (
    <ListBox
      items={WORN_SLOTS.map((slot) => ({
        ...slot,
        textValue: EQUIPMENT_SLOT_LABELS[slot.id],
      }))}
      aria-label={"Worn equipment slots"}
      orientation={"horizontal"}
      selectionMode={"single"}
      selectionBehavior={"replace"}
      disallowEmptySelection
      selectedKeys={new Set([selectedSlotId])}
      onSelectionChange={handleSelection}
      className={`grid h-fit grid-cols-6 gap-0.5`}
    >
      {({ id, placeholderIcon, textValue }) => {
        const worn = selectedPartyMember.equipment.getWorn(id);

        return (
          <ListBoxItem
            id={id}
            textValue={textValue}
            className={({ isHovered, isFocused, isPressed, isSelected }) =>
              cn(
                `flex h-12 w-12 cursor-pointer border-[3px] border-medium-gray`,
                // gear the class can't wear sits on a red tile, like the
                // game's inventory — it stays worn but grants nothing
                worn && !worn.legality.allowed ? `bg-red` : `bg-brown`,
                {
                  "border-light-gray": isHovered,
                  "border-white": isPressed || isSelected,
                  "border-blue": isFocused,
                },
              )
            }
          >
            {/* native dblclick on the slot content unequips the worn item;
                clicking a weapon slot wields it even when already selected
                (selection-change alone doesn't re-fire) */}
            <div
              className={`flex h-full w-full`}
              onClick={() => {
                if (id === "meleeWeapon" || id === "rangedWeapon") {
                  setWieldedSlotId(id);
                }
              }}
              onDoubleClick={() =>
                selectedPartyMember.equipment.unequip(id)
              }
            >
              {worn ? (
                <ItemIcon itemId={worn.item.id} />
              ) : (
                <img
                  alt={`Empty ${textValue} slot`}
                  style={{ imageRendering: "pixelated" }}
                  className={`m-auto h-10 w-10 select-none`}
                  src={placeholderIcon}
                />
              )}
            </div>
          </ListBoxItem>
        );
      }}
    </ListBox>
  );
};
