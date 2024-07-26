import { Button, ButtonProps } from "react-aria-components";
import { cn } from "@/components/utils";

type PanelButtonProps = ButtonProps;

export const PanelButton = ({ className, ...props }: PanelButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(
        "h-7 w-full max-w-sm border-[3px] border-medium-gray bg-dark-gray px-6 leading-[1px] text-light-gray shadow-[-3px_3px_0px_black] hover:text-yellow focus:text-blue focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:opacity-70",
        className,
      )}
    />
  );
};
