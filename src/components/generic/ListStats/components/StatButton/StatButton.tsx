import { Button, ButtonProps } from "react-aria-components";
import { cn } from "@/components/utils";

type StatButtonProps = Omit<ButtonProps, "children"> & {
  operator: "plus" | "minus";
};

export const StatButton = ({
  className,
  operator,
  ...props
}: StatButtonProps) => {
  return (
    <Button
      className={cn(
        `focus:outline-none active:scale-[.80] transition-transform focus:ring-0`,
        className,
      )}
      {...props}
    >
      {({ isFocused, isHovered, isPressed }) =>
        operator === "minus" ? (
          <DecrementIcon
            isHovered={isHovered}
            isFocused={isFocused}
            isPressed={isPressed}
          />
        ) : (
          <IncrementIcon
            isHovered={isHovered}
            isFocused={isFocused}
            isPressed={isPressed}
          />
        )
      }
    </Button>
  );
};

type ClassNameProps = {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
};

const getClassNames = ({ isPressed, isFocused, isHovered }: ClassNameProps) => {
  const topBorderClassName = cn("fill-lime", {
    "fill-white": isHovered || isFocused,
    "opacity-0": isPressed,
  });

  const bodyClassName = cn("fill-green stroke-green", {
    "fill-blue stroke-blue": isFocused,
    "fill-lime stroke-lime": isHovered,
    "fill-green stroke-green": isPressed,
  });

  const bottomBorderClassName = cn("fill-navy", {
    // "fill-lime": isFocused,
    "fill-green": isHovered,
    "opacity-0": isPressed,
  });

  const operatorClassName = cn("fill-yellow", {
    "fill-white": isFocused,
    "fill-yellow": isPressed || isHovered,
  });

  return {
    topBorderClassName,
    bodyClassName,
    bottomBorderClassName,
    operatorClassName,
  };
};

const DecrementIcon = (props: ClassNameProps) => {
  const {
    topBorderClassName,
    operatorClassName,
    bodyClassName,
    bottomBorderClassName,
  } = getClassNames(props);

  return (
    <svg
      width="26"
      height="18"
      viewBox="0 0 26 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="7.71423"
        width="2.57143"
        height="2.57143"
        className={topBorderClassName}
      />
      <rect
        x="2.57153"
        y="5.14282"
        width="2.57143"
        height="2.57143"
        className={topBorderClassName}
      />
      <rect
        x="5.14282"
        y="5.14282"
        width="2.57143"
        height="7.71429"
        className={bodyClassName}
      />
      <rect
        x="2.57153"
        y="7.71423"
        width="2.57143"
        height="2.57143"
        className={bodyClassName}
      />
      <rect
        x="5.14282"
        y="2.57141"
        width="2.57143"
        height="2.57143"
        className={topBorderClassName}
      />
      <rect
        x="2.57153"
        y="10.2858"
        width="2.57143"
        height="2.57143"
        className={bottomBorderClassName}
      />
      <rect
        x="7.71436"
        y="15.4286"
        width="18"
        height="2.57143"
        className={bottomBorderClassName}
      />
      <rect
        x="7.71436"
        y="2.57141"
        width="18"
        height="12.8571"
        className={bodyClassName}
      />
      <rect
        x="7.71436"
        width="18"
        height="2.57143"
        className={topBorderClassName}
      />
      <rect
        x="5.14282"
        y="12.8572"
        width="2.57143"
        height="2.57143"
        className={bottomBorderClassName}
      />
      <rect
        x="10.2856"
        y="7.71423"
        width="7.71429"
        height="2.57143"
        className={operatorClassName}
      />
    </svg>
  );
};

const IncrementIcon = (props: ClassNameProps) => {
  const {
    topBorderClassName,
    operatorClassName,
    bodyClassName,
    bottomBorderClassName,
  } = getClassNames(props);
  return (
    <svg
      width="26"
      height="18"
      viewBox="0 0 26 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="2.57143"
        height="2.57143"
        transform="matrix(-1 0 0 1 25.7144 7.71423)"
        className={topBorderClassName}
      />
      <rect
        width="2.57143"
        height="2.57143"
        transform="matrix(-1 0 0 1 23.1429 5.14282)"
        className={topBorderClassName}
      />
      <rect
        width="2.57143"
        height="7.71429"
        transform="matrix(-1 0 0 1 20.5715 5.14282)"
        className={bodyClassName}
      />
      <rect
        width="2.57143"
        height="2.57143"
        transform="matrix(-1 0 0 1 23.1429 7.71423)"
        className={bodyClassName}
      />
      <rect
        width="2.57143"
        height="2.57143"
        transform="matrix(-1 0 0 1 20.5715 2.57147)"
        className={topBorderClassName}
      />
      <rect
        width="2.57143"
        height="2.57143"
        transform="matrix(-1 0 0 1 23.1429 10.2858)"
        className={bottomBorderClassName}
      />
      <rect
        width="18"
        height="2.57143"
        transform="matrix(-1 0 0 1 18 15.4285)"
        className={bottomBorderClassName}
      />
      <rect
        width="18"
        height="12.8571"
        transform="matrix(-1 0 0 1 18 2.57147)"
        className={bodyClassName}
      />
      <rect
        width="18"
        height="2.57143"
        transform="matrix(-1 0 0 1 18 0)"
        className={topBorderClassName}
      />
      <rect
        width="2.57143"
        height="2.57143"
        transform="matrix(-1 0 0 1 20.5715 12.8572)"
        className={bottomBorderClassName}
      />
      <rect
        width="7.71429"
        height="2.57143"
        transform="matrix(-1 0 0 1 15.4285 7.71423)"
        className={operatorClassName}
      />
      <rect
        width="2.57143"
        height="7.71429"
        transform="matrix(-1 0 0 1 12.8571 5.14282)"
        className={operatorClassName}
      />
    </svg>
  );
};
