import { Button } from "react-aria-components";
import { GenericTooltip } from "@/components/generic";
import copy from "copy-to-clipboard";
import { cn } from "@/components/utils";

type CopyTextButtonProps = {
  children: string;
  className?: string;
};

export const CopyTextButton = ({
  children,
  className,
}: CopyTextButtonProps) => {
  return (
    <GenericTooltip placement={"right"} content={"Copy text to clipboard"}>
      <Button
        onPress={() => copy(children)}
        className={cn("text-light-gray w-fit text-xs", className)}
      >
        {children}
      </Button>
    </GenericTooltip>
  );
};
