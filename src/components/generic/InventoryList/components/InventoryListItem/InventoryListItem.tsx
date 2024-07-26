import { ListBoxItem, ListBoxItemProps } from "react-aria-components";
import { cn } from "@/components/utils";
import { ItemIcon } from "@/components/generic";

type InventoryListItemProps = {
  itemId?: string;
  isSelected: boolean;
} & ListBoxItemProps;

export const InventoryListItem = ({
  itemId,
  className,
  isSelected,
  ...props
}: InventoryListItemProps) => {
  return (
    <ListBoxItem
      {...props}
      textValue={itemId}
      className={({ isHovered, isFocused, isPressed }) =>
        cn(
          `h-12 w-12 cursor-pointer border-[3px] border-medium-gray bg-brown`,
          {
            "border-light-gray": isHovered,
            // "border-yellow": isSelected,
            "border-white": isPressed || isSelected,
            "border-blue": isFocused,
          },
          className,
        )
      }
    >
      {itemId ? <ItemIcon itemId={itemId} /> : null}
    </ListBoxItem>
  );
};
