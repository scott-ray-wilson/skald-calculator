import { TabItem } from "@/components/generic";
import { TabList } from "react-aria-components";
import {
  FilterAccessoriesIcon,
  FilterAdventuringIcon,
  FilterAllIcon,
  FilterArmorIcon,
  FilterFoodIcon,
  FilterMiscIcon,
  FilterWeaponIcon,
} from "@/components/icons";
import { ReactElement } from "react";
import { FilterConsumableIcon } from "@/components/icons/FilterConsumableIcon";

const ICON_PROPS = {
  className: "md:mx-4 mx-1 mt-[0.21rem] mb-[0.04rem] h-5",
  outlineClassName: "",
  fillClassName: "fill-olive",
};

const ITEMS_TAB_LIST_ITEMS: {
  id: string;
  label: ReactElement;
  textValue: string;
}[] = [
  {
    id: "all",
    label: <FilterAllIcon {...ICON_PROPS} />,
    textValue: "All items",
  },
  {
    id: "weapons",
    label: <FilterWeaponIcon {...ICON_PROPS} />,
    textValue: "Weapons",
  },
  {
    id: "armor",
    label: <FilterArmorIcon {...ICON_PROPS} />,
    textValue: "Armor",
  },
  {
    id: "accessories",
    label: <FilterAccessoriesIcon {...ICON_PROPS} />,
    textValue: "Accessories",
  },
  {
    id: "consumables",
    label: <FilterConsumableIcon {...ICON_PROPS} />,
    textValue: "Consumables",
  },
  {
    id: "food",
    label: <FilterFoodIcon {...ICON_PROPS} />,
    textValue: "Food",
  },
  {
    id: "adventuring",
    label: <FilterAdventuringIcon {...ICON_PROPS} />,
    textValue: "Adventuring items",
  },
  {
    id: "misc",
    label: <FilterMiscIcon {...ICON_PROPS} />,
    textValue: "Misc items",
  },
];

export const ItemsTabList = () => {
  return (
    <TabList
      items={ITEMS_TAB_LIST_ITEMS}
      className={`mx-4 flex select-none gap-2`}
    >
      {(props) => <TabItem {...props} />}
    </TabList>
  );
};
