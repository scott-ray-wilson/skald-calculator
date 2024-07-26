import { GenericDialog, Keyword, PanelButton } from "@/components/generic";
import { ReactNode, useState } from "react";
import { COMBINED_ITEM_MAP, COMBINED_RECIPE_LIST, ItemType } from "@/resources";

type CraftItemButtonProps = {
  ingredients: string[];
};

export const CraftItemButton = ({ ingredients }: CraftItemButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [yields, setYields] = useState<ItemType | "invalid" | null>(null);

  const handleCraftItem = () => {
    setIsOpen(true);

    if (!ingredients.length) {
      setYields(null);
      return;
    }

    const sortedIngredients = [...ingredients].sort();

    const recipe = COMBINED_RECIPE_LIST.find((recipe) => {
      const recipeIngredients = [
        ...recipe.componentList,
        ...recipe.multiComponentList,
      ].sort();

      if (recipeIngredients.length !== sortedIngredients.length) return false;

      return recipeIngredients.every((ingredient) =>
        sortedIngredients.includes(ingredient),
      );
    });

    if (!recipe) {
      setYields("invalid");
      return;
    }

    const recipeYield = COMBINED_ITEM_MAP.get(recipe.yields[0]);

    if (!recipeYield)
      throw new Error(`Missing Item for ID: ${recipe.yields[0]}`);

    setYields(recipeYield);
  };

  let Component: ReactNode;
  let label: string;

  if (yields === null) {
    label = "Crafting instructions";
    Component = (
      <>
        <p>To craft items, you must add ingredients to the crafting grid.</p>
        <p>Do this by double-clicking on ingredients from your inventory.</p>
        <p>Click a recipe to view the required ingredients.</p>
      </>
    );
  } else if (yields === "invalid") {
    label = "Invalid recipe";
    Component = <p>This is not a valid recipe!</p>;
  } else {
    label = "Valid recipe";
    Component = (
      <p>
        Crafted: <Keyword>{yields.title}</Keyword>
      </p>
    );
  }

  return (
    <>
      <PanelButton onPress={handleCraftItem}>Craft</PanelButton>
      <GenericDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        aria-label={label}
        containerClassName={"text-white"}
      >
        {Component}
      </GenericDialog>
    </>
  );
};
