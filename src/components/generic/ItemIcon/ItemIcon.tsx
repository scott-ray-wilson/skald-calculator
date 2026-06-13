import { COMBINED_ITEM_MAP, EQUIPPABLE_ITEM_MAP } from "@/resources";

type ItemButtonProps = {
  itemId: string;
};

const getImageUrl = (path: string) => {
  return new URL(`/src/assets/sprites/items/${path}.png`, import.meta.url).href;
};

export const ItemIcon = ({ itemId }: ItemButtonProps) => {
  // generated enchanted items only exist in the equippable map
  const item =
    COMBINED_ITEM_MAP.get(itemId) ?? EQUIPPABLE_ITEM_MAP.get(itemId)?.item;

  if (!item) throw new Error(`No Item matches ID: ${itemId}`);

  let imagePath = item.imagePath;

  if (imagePath.match(/hander/)) {
    imagePath = imagePath.replace("hander", "Hander");
  } else if (imagePath.match(/Bead/)) {
    imagePath = imagePath.replace("Bead", "bead");
  }

  return (
    <img
      alt={item.title}
      style={{
        imageRendering: "pixelated",
      }}
      className={`m-auto h-10 w-10`}
      src={getImageUrl(imagePath || "Generic")}
    />
  );
};
