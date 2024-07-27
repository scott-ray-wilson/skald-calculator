import { COMBINED_ITEM_MAP } from "@/resources";
import { useItems } from "@/stores";
import {
  AccessoryDescription,
  AmmoDescription,
  ArmorDescription,
  BasicItemDescription,
  ConsumableDescription,
  FoodDescription,
  JewelryDescription,
  ReagentDescription,
  ShieldDescription,
  TomeDescription,
  WeaponDescription,
} from "@/components/items";

export const ItemDescription = () => {
  const { selectedItemId } = useItems();

  if (!selectedItemId)
    return <span className={`mt-4 text-yellow`}>Select an Item!</span>;

  const item = COMBINED_ITEM_MAP.get(selectedItemId);

  if (!item) throw new Error(`Missing Item for ID: ${selectedItemId}`);

  const { container } = item;

  switch (container) {
    // in game typo
    case "consumeables":
      return <ConsumableDescription consumableId={selectedItemId} />;
    case "meleeWeapons":
    case "rangedWeapons":
      return <WeaponDescription weaponId={selectedItemId} />;
    case "ammoContainer":
      return <AmmoDescription ammoId={selectedItemId} />;
    case "armor":
      return <ArmorDescription armorId={selectedItemId} />;
    case "shields":
      return <ShieldDescription shieldId={selectedItemId} />;
    case "reagents":
      return <ReagentDescription reagentId={selectedItemId} />;
    case "accessories":
      return <AccessoryDescription accessoryId={selectedItemId} />;
    case "jewelry":
      return <JewelryDescription jewelryId={selectedItemId} />;
    case "spellContainer":
      return <TomeDescription spellId={selectedItemId} />;
    case "foods":
      return <FoodDescription foodId={selectedItemId} />;
    default:
      return <BasicItemDescription itemId={selectedItemId} />;
  }
};
