import { ListOptionItems, ListOptions } from "@/components/generic";
import { Selection } from "react-aria-components";
import { BACKGROUND_LIST } from "@/resources";
import { usePartyLoadout } from "@/stores";

const BACKGROUND_SELECTION_LIST_ITEMS: ListOptionItems = BACKGROUND_LIST.map(
  ({ id, title }) => ({
    id,
    title: title,
    textValue: title,
  }),
);

export const BackgroundList = () => {
  const { selectedPartyMember } = usePartyLoadout();

  const handleSelectionChange = (selection: Selection) => {
    if (selection === "all")
      throw new Error(`Invalid Background Selection: ${selection}`);

    selectedPartyMember.setBackgroundId(selection.values().next().value);
  };

  return (
    <ListOptions
      className={`flex-1`}
      aria-label={"Character background selection list"}
      disallowEmptySelection
      selectionMode="single"
      shouldFocusWrap
      selectedKeys={[selectedPartyMember.getBackground().id]}
      onSelectionChange={handleSelectionChange}
      items={BACKGROUND_SELECTION_LIST_ITEMS}
    />
  );
};
