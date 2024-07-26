import { Tabs } from "react-aria-components";
import {
  AccessoriesTab,
  AllItemsTab,
  FoodTab,
  ConsumablesTab,
  ItemSearchBar,
  ItemsTabList,
  AdventuringItemsTab,
  MiscItemsTab,
  WeaponsTab,
  ArmorTab,
} from "@/components/items";

export const ItemsTabs = () => (
  <Tabs defaultSelectedKey={"all"} className={`flex flex-col`}>
    <div className={"flex flex-col-reverse lg:flex-row"}>
      <ItemsTabList />
      <ItemSearchBar />
    </div>
    <AllItemsTab />
    <AccessoriesTab />
    <WeaponsTab />
    <ArmorTab />
    <ConsumablesTab />
    <FoodTab />
    <AdventuringItemsTab />
    <MiscItemsTab />
  </Tabs>
);
