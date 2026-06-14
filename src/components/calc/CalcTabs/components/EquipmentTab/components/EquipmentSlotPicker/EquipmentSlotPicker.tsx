import { useMemo } from "react";
import {
  Input,
  Key,
  ListBox,
  ListBoxItem,
  Selection,
  TextField,
} from "react-aria-components";
import { useDebouncedCallback } from "use-debounce";
import { ItemIcon, SectionContainer } from "@/components/generic";
import {
  EQUIPMENT_SLOT_ITEMS,
  EQUIPMENT_SLOT_LABELS,
  getClassPermissions,
} from "@/resources";
import { getSlotLegality } from "@/stores/utils";
import { useEquipmentPanel, usePartyLoadout } from "@/stores";
import { cn } from "@/components/utils";

export const EquipmentSlotPicker = () => {
  const { selectedPartyMember } = usePartyLoadout();
  const {
    selectedSlotId,
    pickerItemId,
    setPickerItemId,
    pickerFilter,
    setPickerFilter,
    setWieldedSlotId,
  } = useEquipmentPanel();

  const debouncedSetFilter = useDebouncedCallback((value: string) => {
    setPickerFilter(value);
  }, 300);

  const characterClass = selectedPartyMember.getClass();
  const archetypeClass = selectedPartyMember.getArchetypeClass();

  const items = useMemo(() => {
    const permissions = getClassPermissions(characterClass, archetypeClass);

    return EQUIPMENT_SLOT_ITEMS[selectedSlotId]
      .filter((item) =>
        pickerFilter
          ? item.title.toLowerCase().includes(pickerFilter.toLowerCase())
          : true,
      )
      .map((item) => ({
        id: item.id,
        textValue: item.title,
        isLegal: getSlotLegality(permissions, selectedSlotId, item).allowed,
      }))
      .sort((a, b) => a.textValue.localeCompare(b.textValue));
  }, [characterClass, archetypeClass, selectedSlotId, pickerFilter]);

  // the worn item keeps its equipped marker even when class-illegal
  const equippedItemId =
    selectedPartyMember.equipment.getWorn(selectedSlotId)?.item.id;

  const handleSelection = (selection: Selection) => {
    if (selection === "all") throw new Error("Invalid Item Selection.");

    const itemId = selection.values().next().value as string | undefined;

    setPickerItemId(itemId ?? null);
  };

  const handleAction = (key: Key) => {
    const item = items.find((item) => item.id === key);

    if (!item) throw new Error(`Invalid Item Key: ${key}`);

    setPickerItemId(item.id);

    if (item.isLegal) {
      selectedPartyMember.equipment.equip(selectedSlotId, item.id);

      // equipping a weapon also wields it
      if (
        selectedSlotId === "meleeWeapon" ||
        selectedSlotId === "rangedWeapon"
      ) {
        setWieldedSlotId(selectedSlotId);
      }
    }
  };

  return (
    <SectionContainer
      title={EQUIPMENT_SLOT_LABELS[selectedSlotId]}
      className={`min-h-0 flex-1`}
      containerClassName={`min-h-0 gap-1 overflow-hidden bg-brown p-1`}
    >
      <TextField
        defaultValue={pickerFilter}
        onChange={debouncedSetFilter}
        aria-label={"Search equippable items"}
        className={`group flex flex-col px-1 pt-1 text-light-gray focus-within:text-white`}
      >
        <Input
          className={`w-full min-w-20 bg-brown text-white placeholder-light-gray focus:outline-hidden focus:ring-0`}
          placeholder={"Search Items..."}
        />
        {/* underline as its own element so it can drop the same -2px 2px
            shadow as the text (borders can't) */}
        <div
          aria-hidden
          className={`h-0.5 w-full bg-light-gray shadow-[-2px_2px_0px] shadow-black group-focus-within:bg-white`}
        />
      </TextField>
      <ListBox
        renderEmptyState={() => (
          <div className={`col-span-full mt-2 pl-2 text-yellow`}>
            No items match search.
          </div>
        )}
        items={items}
        // re-render cached collection items when the equipped marker moves
        dependencies={[equippedItemId]}
        aria-label={"Equippable items"}
        orientation={"horizontal"}
        selectionMode={"single"}
        selectionBehavior={"replace"}
        disallowEmptySelection
        selectedKeys={pickerItemId ? new Set([pickerItemId]) : new Set()}
        onSelectionChange={handleSelection}
        onAction={handleAction}
        className={`scrollbar grid max-h-84 min-h-0 flex-1 grid-cols-[repeat(auto-fill,3rem)] content-start gap-0.5 overflow-y-auto md:max-h-none md:pr-0.5`}
      >
        {({ id, isLegal, textValue }) => (
          <ListBoxItem
            textValue={textValue}
            className={({ isHovered, isFocused, isPressed, isSelected }) =>
              cn(
                `h-12 w-12 cursor-pointer border-[3px] border-medium-gray`,
                // unusable items sit on a red tile, like the game's inventory
                isLegal ? `bg-brown` : `bg-red`,
                {
                  // the equipped item carries a green marker, but interaction
                  // feedback (hover/selection/focus) takes precedence
                  "border-green": id === equippedItemId,
                  "border-light-gray": isHovered,
                  "border-white": isPressed || isSelected,
                  "border-blue": isFocused,
                },
              )
            }
          >
            <ItemIcon itemId={id} />
          </ListBoxItem>
        )}
      </ListBox>
    </SectionContainer>
  );
};
