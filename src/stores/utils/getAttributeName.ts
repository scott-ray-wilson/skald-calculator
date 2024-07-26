export const getAttributeName = (attributeId: string) => {
  return attributeId.split("_")[1].toLowerCase() as
    | "agility"
    | "fortitude"
    | "intellect"
    | "presence"
    | "strength";
};
