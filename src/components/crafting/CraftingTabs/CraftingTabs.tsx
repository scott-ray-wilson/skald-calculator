import { Tabs } from "react-aria-components";
import { AlchemyTab, CookingTab, CraftingTabList } from "@/components/crafting";

export const CraftingTabs = () => (
  <Tabs defaultSelectedKey={"cooking"} className={`flex flex-col`}>
    <CraftingTabList />
    <CookingTab />
    <AlchemyTab />
  </Tabs>
);
