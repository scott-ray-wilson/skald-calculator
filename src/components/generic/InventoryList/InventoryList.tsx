import { Key, ListBox, Selection } from "react-aria-components";
import { ItemType } from "@/resources";
import { InventoryListItem, SectionContainer } from "@/components/generic";
import { useState } from "react";
import { cn } from "@/components/utils";

type InventoryListProps = {
  excludeItems?: string[];
  filterItems?: string;
  inventory: ItemType[];
  selectedInventoryId: string | null;
  onItemAction?: (itemId: string) => void;
  onSelectItem: (itemId: string | null) => void;
  className?: string;
  allowMobileScroll?: boolean;
};

export const InventoryList = ({
  selectedInventoryId,
  excludeItems = [],
  filterItems,
  inventory,
  onItemAction,
  onSelectItem,
  className,
  allowMobileScroll,
}: InventoryListProps) => {
  const [selection, setSelection] = useState<Selection>(new Set());

  const handleSelection = (selection: Selection) => {
    setSelection(selection);

    if (selection === "all") {
      throw new Error(`Invalid Item Selection: ${selection}`);
    }
    const item = items[selection.values().next().value];

    if (!item) throw new Error(`Invalid Item Key: ${selection}`);

    onSelectItem(item.itemId);
  };

  // TODO: refactor out and memoize
  const filteredItems = inventory.filter(
    (item) =>
      !excludeItems.includes(item.id) &&
      (filterItems
        ? item.title.toLowerCase().includes(filterItems.toLowerCase())
        : true),
  );

  const items = filteredItems.map((item, index) => ({
    id: index,
    itemId: item?.id,
    textValue: item?.title,
  }));

  const handleItemAction = (key: Key) => {
    if (!onItemAction) return;

    const item = items.find((item) => item.id === key);

    if (!item) throw new Error(`Invalid Item Key: ${key}`);

    onItemAction(item.itemId);
  };

  const handleBlur = () => {
    setSelection(new Set());
  };

  return (
    <SectionContainer
      className={`overflow-y-hidden`}
      title={"Inventory"}
      containerClassName={
        allowMobileScroll ? "overflow-y-scroll" : `md:overflow-y-scroll`
      }
    >
      <ListBox
        renderEmptyState={() => (
          <>
            <div
              className={`col-span-full mt-2 pl-2 text-yellow md:min-w-[21.75rem] lg:min-w-[34.25rem]`}
            >
              No items match search.
            </div>
          </>
        )}
        onBlur={handleBlur}
        items={items}
        aria-label={"Inventory list"}
        orientation={"horizontal"}
        selectionMode={"single"}
        selectionBehavior={"replace"}
        disallowEmptySelection
        selectedKeys={selection}
        onSelectionChange={handleSelection}
        onAction={onItemAction ? handleItemAction : undefined}
        className={cn(
          `grid grid-cols-[repeat(auto-fill,3rem)] gap-0.5 md:grid-cols-5 md:pr-0.5`,
          className,
        )}
      >
        {({ itemId, ...props }) => (
          <InventoryListItem
            itemId={itemId}
            isSelected={selectedInventoryId === itemId}
            {...props}
          />
        )}
      </ListBox>
    </SectionContainer>
  );
};
