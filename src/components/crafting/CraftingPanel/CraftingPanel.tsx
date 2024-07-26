import { CraftingTabs } from "@/components/crafting";
import { GameVersionDetails } from "@/components/generic";

export const CraftingPanel = () => {
  return (
    <div className={`flex w-full flex-1 flex-col`}>
      <CraftingTabs />
      <GameVersionDetails />
    </div>
  );
};
