import {
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  ListBoxProps,
} from "react-aria-components";
import { cn } from "@/components/utils";
import { SectionContainer, SectionContainerProps } from "@/components/generic";

export type GenericListItemProps = Omit<ListBoxItemProps, "children"> & {
  title: string;
  id: string;
  textValue: string;
};

type GenericListProps = Omit<SectionContainerProps, "children"> &
  ListBoxProps<GenericListItemProps>;

export const GenericList = ({
  className,
  containerClassName,
  title,
  ...props
}: GenericListProps) => {
  return (
    <SectionContainer
      title={title}
      containerClassName={containerClassName}
      className={className}
    >
      <ListBox
        className={`flex flex-1 flex-col gap-1 px-2 py-2 pb-10 md:gap-0 md:py-1`}
        {...props}
      >
        {({ title, ...itemProps }) => (
          <ListBoxItem
            className={({ isFocused, isSelected, isHovered }) =>
              cn(
                `line-clamp-1 cursor-pointer select-none capitalize text-light-gray focus:outline-none focus:ring-0`,
                {
                  "text-yellow": isSelected,
                  "text-blue": isFocused,
                  "text-white": isHovered,
                },
              )
            }
            {...itemProps}
          >
            {title}
          </ListBoxItem>
        )}
      </ListBox>
    </SectionContainer>
  );
};
