import { Button, ButtonRenderProps } from "react-aria-components";
import { cn } from "@/components/utils";
import { useCalcTabs } from "@/stores";

export const TabButtons = () => {
  const { getNextTab, getPreviousTab, onNextTab, onPreviousTab } =
    useCalcTabs();

  return (
    <div className={`flex mt-1.5 ml-auto md:hidden gap-1.5`}>
      <Button
        isDisabled={!getPreviousTab()}
        onPress={onPreviousTab}
        className={`active:scale-[.80] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-0`}
      >
        {(props) => <ButtonLeftIcon {...props} />}
      </Button>
      <Button
        isDisabled={!getNextTab()}
        onPress={onNextTab}
        className={`active:scale-[.80] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-0`}
      >
        {(props) => <ButtonRightIcon {...props} />}
      </Button>
    </div>
  );
};

const getClassNames = ({
  isPressed,
  isFocused,
  isHovered,
}: ButtonRenderProps) => {
  const borderClassName = cn("fill-light-gray", {
    "fill-light-gray": isHovered,
    "fill-medium-gray": isPressed,
  });

  const bodyClassName = cn("fill-medium-gray", {
    "fill-blue": isFocused,
    "fill-light-gray": isHovered,
    "fill-medium-gray": isPressed,
  });

  const shadowClassName = cn("fill-black", {
    "opacity-0": isPressed,
  });

  const ringClassName = cn("fill-dark-gray", {
    "fill-medium-gray": isHovered,
    "fill-dark-gray": isPressed,
  });

  return {
    borderClassName,
    bodyClassName,
    ringClassName,
    shadowClassName,
  };
};

const ButtonLeftIcon = (props: ButtonRenderProps) => {
  const { shadowClassName, ringClassName, borderClassName, bodyClassName } =
    getClassNames(props);
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="10" width="2" height="2" className={shadowClassName} />
      <rect x="2" y="12" width="2" height="2" className={shadowClassName} />
      <rect x="2" y="10" width="2" height="2" className={borderClassName} />
      <rect y="8" width="2" height="2" className={borderClassName} />
      <rect y="6" width="2" height="2" className={borderClassName} />
      <rect x="2" y="4" width="2" height="2" className={borderClassName} />
      <rect x="4" y="2" width="2" height="2" className={borderClassName} />
      <rect x="6" width="12" height="2" className={borderClassName} />
      <rect x="16" y="2" width="2" height="12" className={borderClassName} />
      <rect x="6" y="2" width="2" height="4" className={ringClassName} />
      <rect x="6" y="2" width="2" height="4" className={ringClassName} />
      <rect x="6" y="2" width="2" height="4" className={ringClassName} />
      <rect x="6" y="2" width="2" height="4" className={ringClassName} />
      <rect x="6" y="2" width="2" height="4" className={ringClassName} />
      <rect x="6" y="2" width="2" height="4" className={ringClassName} />
      <rect x="8" y="2" width="6" height="2" className={ringClassName} />
      <rect x="8" y="2" width="6" height="2" className={ringClassName} />
      <rect x="8" y="2" width="6" height="2" className={ringClassName} />
      <rect x="8" y="12" width="6" height="2" className={ringClassName} />
      <rect x="8" y="12" width="6" height="2" className={ringClassName} />
      <rect x="8" y="12" width="6" height="2" className={ringClassName} />
      <rect x="6" y="6" width="2" height="4" className={ringClassName} />
      <rect x="6" y="6" width="2" height="4" className={ringClassName} />
      <rect x="6" y="6" width="2" height="4" className={bodyClassName} />
      <rect x="8" y="4" width="2" height="8" className={ringClassName} />
      <rect x="8" y="4" width="2" height="8" className={ringClassName} />
      <rect x="8" y="4" width="2" height="8" className={bodyClassName} />
      <rect x="10" y="4" width="2" height="8" className={ringClassName} />
      <rect x="10" y="4" width="2" height="8" className={ringClassName} />
      <rect x="10" y="4" width="2" height="8" className={bodyClassName} />
      <rect x="12" y="4" width="2" height="8" className={ringClassName} />
      <rect x="12" y="4" width="2" height="8" className={ringClassName} />
      <rect x="12" y="4" width="2" height="8" className={bodyClassName} />
      <rect x="6" y="10" width="2" height="4" className={ringClassName} />
      <rect x="6" y="10" width="2" height="4" className={ringClassName} />
      <rect x="6" y="10" width="2" height="4" className={ringClassName} />
      <rect x="14" y="2" width="2" height="12" className={ringClassName} />
      <rect x="14" y="2" width="2" height="12" className={ringClassName} />
      <rect x="14" y="2" width="2" height="12" className={ringClassName} />
      <rect x="14" y="2" width="2" height="12" className={ringClassName} />
      <rect x="14" y="2" width="2" height="12" className={ringClassName} />
      <rect x="14" y="2" width="2" height="12" className={ringClassName} />
      <rect x="4" y="4" width="2" height="8" className={ringClassName} />
      <rect x="4" y="4" width="2" height="8" className={ringClassName} />
      <rect x="4" y="4" width="2" height="8" className={ringClassName} />
      <rect x="2" y="6" width="2" height="4" className={ringClassName} />
      <rect x="2" y="6" width="2" height="4" className={ringClassName} />
      <rect x="2" y="6" width="2" height="4" className={ringClassName} />
      <rect x="6" y="14" width="12" height="2" className={borderClassName} />
      <rect x="4" y="12" width="2" height="2" className={borderClassName} />
      <rect x="4" y="14" width="2" height="2" className={shadowClassName} />
      <rect x="6" y="16" width="12" height="2" className={shadowClassName} />
    </svg>
  );
};

const ButtonRightIcon = (props: ButtonRenderProps) => {
  const { shadowClassName, ringClassName, borderClassName, bodyClassName } =
    getClassNames(props);
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="2"
        height="2"
        transform="matrix(-1 0 0 1 18 10)"
        className={shadowClassName}
      />
      <rect
        width="2"
        height="2"
        transform="matrix(-1 0 0 1 16 12)"
        className={shadowClassName}
      />
      <rect
        width="2"
        height="2"
        transform="matrix(-1 0 0 1 16 10)"
        className={borderClassName}
      />
      <rect
        width="2"
        height="2"
        transform="matrix(-1 0 0 1 18 8)"
        className={borderClassName}
      />
      <rect
        width="2"
        height="2"
        transform="matrix(-1 0 0 1 18 6)"
        className={borderClassName}
      />
      <rect
        width="2"
        height="2"
        transform="matrix(-1 0 0 1 16 4)"
        className={borderClassName}
      />
      <rect
        width="2"
        height="2"
        transform="matrix(-1 0 0 1 14 2)"
        className={borderClassName}
      />
      <rect
        width="12"
        height="2"
        transform="matrix(-1 0 0 1 12 0)"
        className={borderClassName}
      />
      <rect
        width="2"
        height="12"
        transform="matrix(-1 0 0 1 2 2)"
        className={borderClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 2)"
        className={ringClassName}
      />
      <rect
        width="6"
        height="2"
        transform="matrix(-1 0 0 1 10 2)"
        className={ringClassName}
      />
      <rect
        width="6"
        height="2"
        transform="matrix(-1 0 0 1 10 2)"
        className={ringClassName}
      />
      <rect
        width="6"
        height="2"
        transform="matrix(-1 0 0 1 10 2)"
        className={ringClassName}
      />
      <rect
        width="6"
        height="2"
        transform="matrix(-1 0 0 1 10 12)"
        className={ringClassName}
      />
      <rect
        width="6"
        height="2"
        transform="matrix(-1 0 0 1 10 12)"
        className={ringClassName}
      />
      <rect
        width="6"
        height="2"
        transform="matrix(-1 0 0 1 10 12)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 6)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 6)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 6)"
        className={bodyClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 10 4)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 10 4)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 10 4)"
        className={bodyClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 8 4)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 8 4)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 8 4)"
        className={bodyClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 6 4)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 6 4)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 6 4)"
        className={bodyClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 10)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 10)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 12 10)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="12"
        transform="matrix(-1 0 0 1 4 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="12"
        transform="matrix(-1 0 0 1 4 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="12"
        transform="matrix(-1 0 0 1 4 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="12"
        transform="matrix(-1 0 0 1 4 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="12"
        transform="matrix(-1 0 0 1 4 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="12"
        transform="matrix(-1 0 0 1 4 2)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 14 4)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 14 4)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="8"
        transform="matrix(-1 0 0 1 14 4)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 16 6)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 16 6)"
        className={ringClassName}
      />
      <rect
        width="2"
        height="4"
        transform="matrix(-1 0 0 1 16 6)"
        className={ringClassName}
      />
      <rect
        width="12"
        height="2"
        transform="matrix(-1 0 0 1 12 14)"
        className={borderClassName}
      />
      <rect
        width="2"
        height="2"
        transform="matrix(-1 0 0 1 14 12)"
        className={borderClassName}
      />
      <rect
        width="2"
        height="2"
        transform="matrix(-1 0 0 1 14 14)"
        className={shadowClassName}
      />
      <rect
        width="12"
        height="2"
        transform="matrix(-1 0 0 1 12 16)"
        className={shadowClassName}
      />
    </svg>
  );
};
