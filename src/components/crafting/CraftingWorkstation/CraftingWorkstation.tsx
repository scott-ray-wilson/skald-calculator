import { PanelButton, SectionContainer } from "@/components/generic";
import { Key, ListBox, Selection } from "react-aria-components";
import { useBreakpoint } from "@/hooks";
import { CraftItemButton } from "@/components/crafting";
import { useState } from "react";
import { InventoryListItem } from "@/components/generic";

type CraftingWorkstationProps = {
  workstationImagePath: string;
  ingredients: string[];
  onClearIngredients: () => void;
  onRemoveIngredient: (ingredientId: string) => void;
  onSelectIngredient: (ingredientId: string | null) => void;
  selectedIngredientId: string | null;
};

export const CraftingWorkstation = ({
  workstationImagePath,
  ingredients,
  onSelectIngredient,
  onClearIngredients,
  onRemoveIngredient,
  selectedIngredientId,
}: CraftingWorkstationProps) => {
  const [selection, setSelection] = useState<Selection>(new Set());
  const minIngredientLength = useBreakpoint("sm") ? 7 : 6;

  const items = [...ingredients]
    .concat(
      ingredients.length < minIngredientLength
        ? Array.from(Array(minIngredientLength - ingredients.length))
        : [],
    )
    .map((item, index) => ({
      id: index,
      itemId: item,
      textValue: item ?? "empty slot",
    }));

  const handleSelection = (selection: Selection) => {
    setSelection(selection);

    if (selection === "all") {
      throw new Error(`Invalid Recipe Selection: ${selection}`);
    }

    const item = items[selection.values().next().value];

    onSelectIngredient(item.itemId);
  };

  const handleBlur = () => {
    setSelection(new Set());
  };

  const handleRemoveIngredient = (key: Key) => {
    const item = items.find((item) => item.id === key);

    if (!item) throw new Error(`Invalid Item Key: ${key}`);

    onRemoveIngredient(item.itemId);
  };

  return (
    <SectionContainer className={`relative w-full`} title={"Workstation"}>
      <div
        className={`scrollbar relative flex gap-0.5 md:h-[6.15rem] md:overflow-y-scroll`}
      >
        <div
          className={`hidden h-12 w-12 flex-col border-[3px] border-brown bg-black md:sticky md:left-0 md:top-0 md:flex md:h-[6.15rem] md:w-[6.15rem]`}
        >
          <img
            alt={"Alchemy workstation"}
            className={`m-auto`}
            src={workstationImagePath}
          />
        </div>
        <ListBox
          items={items}
          onBlur={handleBlur}
          aria-label={"Selected recipe ingredient list"}
          orientation={"horizontal"}
          selectionMode={"single"}
          selectionBehavior={"replace"}
          disallowEmptySelection
          onSelectionChange={handleSelection}
          onAction={handleRemoveIngredient}
          selectedKeys={selection}
          className={`grid flex-1 grid-cols-[repeat(auto-fill,3rem)] gap-0.5 bg-olive md:grid-cols-3 md:pr-0.5`}
        >
          {({ itemId, ...props }) => (
            <InventoryListItem
              {...props}
              itemId={itemId}
              textValue={itemId ?? "Empty workstation slot"}
              isSelected={!!itemId && selectedIngredientId === itemId}
            />
          )}
        </ListBox>
      </div>
      <div className={`flex gap-2.5 py-2 pl-1 pr-0.5`}>
        <CraftItemButton ingredients={ingredients} />
        <PanelButton onPress={onClearIngredients}>Clear</PanelButton>
      </div>
    </SectionContainer>
  );
};
