import { TabItem } from "@/components/generic";
import { TabList } from "react-aria-components";

const CRAFTING_TAB_LIST_ITEMS: { id: string; title: string }[] = [
  { id: "cooking", title: "Cooking" },
  { id: "alchemy", title: "Alchemy" },
];

export const CraftingTabList = () => {
  return (
    <TabList
      items={CRAFTING_TAB_LIST_ITEMS}
      className={`mx-4 flex select-none gap-2`}
    >
      {({ title, id }) => <TabItem id={id} label={title} />}
    </TabList>
  );
};
