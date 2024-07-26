import { InventoryList } from "@/components/generic";
import {
  ACCESSORY_LIST,
  AMMO_LIST,
  ARMOR_LIST,
  COMBINED_ADVENTURING_ITEMS_LIST,
  COMBINED_CONSUMABLES_LIST,
  COMBINED_ITEM_LIST,
  COMBINED_WEAPON_LIST,
  FOOD_LIST,
  ItemType,
  JEWELRY_LIST,
  SHIELD_LIST,
  TRINKET_LIST,
} from "@/resources";
import { useItems } from "@/stores";

type ItemsInventoryProps = {
  filter:
    | "all"
    | "accessories"
    | "weapons"
    | "armor"
    | "consumables"
    | "food"
    | "adventuring"
    | "misc";
};

export const ItemsInventory = ({ filter }: ItemsInventoryProps) => {
  const { setSelectedItemId, selectedItemId, itemFilter } = useItems();

  let items: ItemType[];

  switch (filter) {
    case "all":
      items = COMBINED_ITEM_LIST;
      break;
    case "accessories":
      items = [...ACCESSORY_LIST, ...JEWELRY_LIST];
      break;
    case "weapons":
      items = [...COMBINED_WEAPON_LIST, ...AMMO_LIST];
      break;
    case "armor":
      items = [...ARMOR_LIST, ...SHIELD_LIST];
      break;
    case "consumables":
      items = COMBINED_CONSUMABLES_LIST;
      break;
    case "food":
      items = FOOD_LIST;
      break;
    case "adventuring":
      items = COMBINED_ADVENTURING_ITEMS_LIST;
      break;
    case "misc":
      items = TRINKET_LIST;
      break;
    default:
      throw new Error("Unhandled Item Filter Type");
  }

  return (
    <InventoryList
      className={`md:grid-cols-7 max-h-[50vh] md:max-h-auto lg:grid-cols-11`}
      selectedInventoryId={selectedItemId}
      onSelectItem={setSelectedItemId}
      inventory={items}
      filterItems={itemFilter}
      allowMobileScroll
    />
  );
};
