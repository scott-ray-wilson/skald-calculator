import { FilterIconType } from "@/components/icons";

export const FilterAccessoriesIcon = ({
  className,
  outlineClassName,
  fillClassName,
}: FilterIconType) => {
  return (
    <svg
      className={className}
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="1" width="3" height="1" className={fillClassName} />
      <rect x="3" width="3" height="1" className={outlineClassName} />
      <rect x="2" y="5" width="5" height="1" className={outlineClassName} />
      <rect x="4" y="6" width="1" height="3" className={outlineClassName} />
      <rect x="6" y="1" width="1" height="1" className={outlineClassName} />
      <rect x="7" y="7" width="1" height="1" className={outlineClassName} />
      <rect x="6" y="8" width="1" height="1" className={outlineClassName} />
      <rect x="5" y="9" width="1" height="1" className={outlineClassName} />
      <rect x="2" y="1" width="1" height="1" className={outlineClassName} />
      <rect x="1" y="7" width="1" height="1" className={outlineClassName} />
      <rect x="2" y="8" width="1" height="1" className={outlineClassName} />
      <rect x="3" y="9" width="1" height="1" className={outlineClassName} />
      <rect x="7" y="2" width="1" height="2" className={outlineClassName} />
      <rect x="1" y="2" width="1" height="2" className={outlineClassName} />
      <rect x="8" y="4" width="1" height="3" className={outlineClassName} />
      <rect y="4" width="1" height="3" className={outlineClassName} />
      <rect x="3" y="8" width="1" height="1" className={fillClassName} />
      <rect x="5" y="8" width="1" height="1" className={fillClassName} />
      <rect x="5" y="6" width="3" height="1" className={fillClassName} />
      <rect x="1" y="6" width="3" height="1" className={fillClassName} />
      <rect x="2" y="7" width="2" height="1" className={fillClassName} />
      <rect x="5" y="7" width="2" height="1" className={fillClassName} />
      <rect x="2" y="2" width="5" height="1" className={fillClassName} />
      <rect x="2" y="3" width="5" height="1" className={fillClassName} />
      <rect x="1" y="4" width="7" height="1" className={fillClassName} />
      <rect x="1" y="5" width="1" height="1" className={fillClassName} />
      <rect x="7" y="5" width="1" height="1" className={fillClassName} />
    </svg>
  );
};
