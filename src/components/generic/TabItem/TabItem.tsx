import { Tab } from "react-aria-components";
import { cn } from "@/components/utils";
import { ReactElement } from "react";

type TabItemProps = {
  id: string;
  label: string | ReactElement;
  textValue?: string;
};

export const TabItem = ({ id, label, textValue }: TabItemProps) => {
  return (
    <Tab
      className={({ isSelected, isFocused, isHovered }) =>
        cn(
          `flex cursor-pointer items-center justify-center rounded-t border-b-[3px] px-1 pb-0.5 capitalize leading-6 text-light-gray shadow-[-3px_0px_0px] focus:outline-none focus:ring-0 [&>svg]:fill-light-gray`,
          {
            "border-brown bg-brown text-white shadow-olive": isSelected,
            "border-black bg-olive shadow-black": !isSelected,
            "text-yellow": isHovered,
            "text-blue [&>svg]:fill-blue": isFocused,
          },
        )
      }
      id={id}
      aria-label={textValue}
    >
      {label}
    </Tab>
  );
};
