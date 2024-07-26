import {
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  ListBoxProps,
} from "react-aria-components";
import { cn } from "@/components/utils";

export type ListOptionItem = Omit<ListBoxItemProps, "children"> & {
  title: string;
};
export type ListOptionItems = ListOptionItem[];

type ListOptionsProps = ListBoxProps<ListOptionItem>;

export const ListOptions = ({ className, ...props }: ListOptionsProps) => {
  return (
    <ListBox
      className={cn(
        `border-[3px] rounded px-4 py-4 border-olive flex flex-col`,
        className,
      )}
      {...props}
    >
      {({ title, ...itemProps }) => (
        <ListBoxItem
          className={({ isFocused, isHovered, isSelected }) =>
            cn(
              `cursor-pointer whitespace-nowrap focus:outline-none text-lg focus:ring-0 capitalize select-none text-light-gray`,
              {
                "text-yellow": isSelected,
                "text-white": isHovered,
                "text-blue": isFocused,
              },
            )
          }
          {...itemProps}
        >
          {title}
        </ListBoxItem>
      )}
    </ListBox>
  );
};
