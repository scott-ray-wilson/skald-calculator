import { Keyword, Paragraph } from "@/components/generic";
import { COMBINED_ITEM_MAP, COMBINED_RECIPE_MAP } from "@/resources";

export const RecipeDescription = ({ recipeId }: { recipeId: string }) => {
  const recipe = COMBINED_RECIPE_MAP.get(recipeId);

  if (!recipe) throw new Error(`Invalid Recipe ID: ${recipeId}`);

  const { yields, componentList, multiComponentList, multiNumber, difficulty } =
    recipe;

  const recipeYield = COMBINED_ITEM_MAP.get(yields[0]);

  if (!recipeYield) throw new Error(`Invalid Food ID: ${yields[0]}`);

  const { title } = recipeYield;

  return (
    <>
      <span className={`text-lg uppercase text-blue`}>{title} Recipe</span>
      <Paragraph
        className={`text-yellow`}
      >{`A recipe for crafting ${title}.`}</Paragraph>
      <span className={"text-yellow"}>Ingredients:</span>
      <div className={`flex flex-col`}>
        {[...componentList, ...multiComponentList].map((itemId) => {
          const food = COMBINED_ITEM_MAP.get(itemId);

          if (!food) throw new Error(`Missing Item for ID: ${itemId}`);

          return (
            <div key={itemId}>
              <span className={`text-lime`}>
                {multiComponentList.includes(itemId) ? multiNumber : 1} x
              </span>{" "}
              <Keyword>{food.title}</Keyword>
            </div>
          );
        })}
      </div>
      <p className={`text-yellow`}>
        Character has a <Keyword>Crafting</Keyword> skill of{" "}
        <Keyword>2d6</Keyword>{" "}
        <span className={`text-blue`}>+ [Character Crafting Skill]</span> versus
        Difficulty <span className={`text-white`}>{difficulty}</span> to produce
        a larger amount.
      </p>
    </>
  );
};
