import {
  AdventuringItemType,
  COMBINED_ITEM_MAP,
  CONSUMABLE_MAP,
  ConsumableType,
  FOOD_MAP,
  FoodType,
  RecipeType,
} from "@/resources";
import { useItems } from "@/stores";
import {
  AccessoryDescription,
  AmmoDescription,
  ArmorDescription,
  ConsumableDescription,
  FoodDescription,
  JewelryDescription,
  ShieldDescription,
  TomeDescription,
  WeaponDescription,
  ReagentDescription,
} from "@/components/items";
import { Fragment } from "react";
import { Paragraph } from "@/components/generic";

export const ItemDescription = () => {
  const { selectedItemId } = useItems();

  if (!selectedItemId)
    return <span className={`mt-4 text-yellow`}>Select an Item!</span>;

  const item = COMBINED_ITEM_MAP.get(selectedItemId);

  if (!item) throw new Error(`Missing Item for ID: ${selectedItemId}`);

  const { container, weight, value, description } = item;

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
      // eslint-disable-next-line no-case-declarations
      let category: string;
      // eslint-disable-next-line no-case-declarations
      let title = item.title;
      // eslint-disable-next-line no-case-declarations
      let yieldedItem: FoodType | ConsumableType | undefined;

      switch (item.container) {
        case "adventuringItems":
          category = (item as AdventuringItemType).light
            ? "Light"
            : "Adventuring";
          break;
        case "foodRecipes":
          category = "Book";

          yieldedItem = FOOD_MAP.get((item as RecipeType).yields[0]);

          if (!yieldedItem)
            throw new Error(
              `Missing Yielded Item for Recipe: ${selectedItemId}`,
            );

          title = `Recipe: ${yieldedItem.title}`;
          break;
        case "alchemyRecipes":
          category = "Book";

          yieldedItem = CONSUMABLE_MAP.get((item as RecipeType).yields[0]);

          if (!yieldedItem)
            throw new Error(
              `Missing Yielded Item for Recipe: ${selectedItemId}`,
            );
          title = `Recipe: ${yieldedItem.title}`;
          break;
        case "miscItems":
          category = "Misc";
          break;
        case "keys":
          category = "Key";
          break;
        case "books":
          category = "Book";
          break;
        case "trinkets":
          category = "Trinket";
          break;
        case "clothing":
          category = "Clothing";
          break;
        default:
          category = "????";
      }

      return (
        <>
          <div className={`flex flex-col`}>
            <span className={`text-lg uppercase text-blue`}>{title}</span>
            <span className={"-mt-1 leading-5 text-light-gray"}>
              [{category}]
            </span>
          </div>
          <div className={`grid w-fit grid-cols-2 gap-x-4`}>
            {[
              { title: "Value", value: `${value ?? 5} GP` },
              { title: "Weight", value: `${weight.toFixed(2)} lb` },
            ].map(({ title, value }) => (
              <Fragment key={title}>
                <span className={"text-light-gray"}>{title}</span>
                <span className={`text-white`}>{value}</span>
              </Fragment>
            ))}
          </div>
          {description ? (
            <Paragraph className={`text-yellow`}>{description}</Paragraph>
          ) : null}
        </>
      );
  }
};
