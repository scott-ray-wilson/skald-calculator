import { ReactElement } from "react";
import { Tooltip, TooltipProps, TooltipTrigger } from "react-aria-components";

type GenericTooltipProps = {
  children: ReactElement;
  content: string;
} & TooltipProps;

export const GenericTooltip = ({
  children,
  content,
  ...props
}: GenericTooltipProps) => {
  return (
    <TooltipTrigger>
      {children}
      <Tooltip
        offset={4}
        className={`bg-dark-gray crt shadow-[-1px_1px_0px_black] border-black border  text-xs px-1 py-0.5 text-white`}
        {...props}
      >
        {content}
      </Tooltip>
    </TooltipTrigger>
  );
};
