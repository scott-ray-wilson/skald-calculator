import { cn } from "@/components/utils";
import { Button, ButtonProps } from "react-aria-components";
import { PORTRAIT_MAP } from "@/resources";

type PortraitButtonProps = {
  portrait?: string;
  isSelected?: boolean;
  size?: "lg";
} & Omit<ButtonProps, "children">;

export const CharacterPortraitButton = ({
  portrait,
  isSelected,
  className,
  size,
  ...props
}: PortraitButtonProps) => {
  return (
    <Button
      {...props}
      aria-label={"Select a party member"}
      className={({ isHovered, isFocused }) =>
        cn(
          `relative flex h-12 w-12 select-none flex-col items-center justify-center rounded-sm border-2 bg-black hover:border-white focus:border-blue aria-[expanded=true]:border-blue lg:h-20 lg:w-20`,
          {
            "border-yellow": isSelected,
            "border-blue": isFocused,
            "border-white": isHovered,
            "h-20 w-20": size === "lg",
          },
          className,
        )
      }
    >
      <img
        alt={"character portrait"}
        height={80}
        width={80}
        style={{
          imageRendering: "pixelated",
        }}
        src={PORTRAIT_MAP.get(portrait)}
      />
      {portrait ? null : (
        <svg
          className={`absolute bottom-1.5 left-1.5 h-2 w-2 lg:h-4 lg:w-4`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="24"
            height="8"
            transform="matrix(-1 0 0 1 24 8)"
            fill="#EDF171"
          />
          <rect
            width="8"
            height="24"
            transform="matrix(-1 0 0 1 16 0)"
            fill="#EDF171"
          />
        </svg>
      )}
    </Button>
  );
};
