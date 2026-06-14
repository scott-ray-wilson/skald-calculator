import { CSSProperties } from "react";
import { Button } from "react-aria-components";
import { GenericTooltip } from "@/components/generic";
import { useEquipmentPanel } from "@/stores";
import { WieldedWeaponSlotId } from "@/stores/types";
import { cn } from "@/components/utils";
import WornIconMelee from "@/assets/sprites/inventory/WornIconMelee.png";
import WornIconRanged from "@/assets/sprites/inventory/WornIconRanged.png";

const WIELD_OPTIONS: {
  id: WieldedWeaponSlotId;
  icon: string;
  label: string;
}[] = [
  { id: "meleeWeapon", icon: WornIconMelee, label: "Wield Melee Weapon" },
  { id: "rangedWeapon", icon: WornIconRanged, label: "Wield Ranged Weapon" },
];

// the slot sprite as a currentColor mask, so the buttons reuse the exact
// text state colors (yellow selected, white hover, blue focus)
const maskStyle = (icon: string): CSSProperties => ({
  backgroundColor: "currentColor",
  maskImage: `url(${icon})`,
  WebkitMaskImage: `url(${icon})`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
});

export const WieldToggle = () => {
  const { wieldedSlotId, setWieldedSlotId } = useEquipmentPanel();

  return (
    <div className={`flex mt-0.5 items-center gap-2`}>
      {WIELD_OPTIONS.map(({ id, icon, label }) => (
        <GenericTooltip key={id} content={label}>
          <Button
            aria-label={label}
            aria-pressed={wieldedSlotId === id}
            onPress={() => setWieldedSlotId(id)}
            className={cn(`h-5 w-5 focus:text-blue focus:outline-hidden`, {
              "text-yellow": wieldedSlotId === id,
              "text-light-gray hover:text-white": wieldedSlotId !== id,
            })}
          >
            <span
              aria-hidden
              className={`block h-full w-full`}
              style={maskStyle(icon)}
            />
          </Button>
        </GenericTooltip>
      ))}
    </div>
  );
};
