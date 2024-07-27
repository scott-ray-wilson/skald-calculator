import { Button, ButtonProps } from "react-aria-components";
import { cn } from "@/components/utils";

export const IconButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(
        `text-white hover:text-yellow focus:text-blue focus:outline-none focus:ring-0`,
        className,
      )}
    />
  );
};
