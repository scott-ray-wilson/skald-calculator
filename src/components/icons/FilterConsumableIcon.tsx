import { FilterIconType } from "@/components/icons";

export const FilterConsumableIcon = ({
  className,
  outlineClassName,
  fillClassName,
}: FilterIconType) => {
  return (
    <svg
      className={className}
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="8" width="1" height="1" className={outlineClassName} />
      <rect x="1" y="8" width="1" height="1" className={outlineClassName} />
      <rect y="7" width="1" height="1" className={outlineClassName} />
      <rect x="1" y="3" width="1" height="1" className={outlineClassName} />
      <rect x="6" y="3" width="1" height="1" className={outlineClassName} />
      <rect x="7" y="7" width="1" height="1" className={outlineClassName} />
      <rect x="7" y="4" width="1" height="2" className={outlineClassName} />
      <rect x="5" y="1" width="1" height="2" className={outlineClassName} />
      <rect x="2" y="1" width="1" height="2" className={outlineClassName} />
      <rect y="4" width="1" height="2" className={outlineClassName} />
      <rect x="3" width="2" height="1" className={outlineClassName} />
      <rect x="2" y="9" width="4" height="1" className={outlineClassName} />
      <rect x="1" y="6" width="6" height="1" className={outlineClassName} />
      <rect x="3" y="1" width="2" height="5" className={fillClassName} />
      <rect x="1" y="7" width="6" height="1" className={fillClassName} />
      <rect x="2" y="8" width="4" height="1" className={fillClassName} />
      <rect x="5" y="4" width="2" height="2" className={fillClassName} />
      <rect x="1" y="4" width="2" height="2" className={fillClassName} />
      <rect x="2" y="3" width="1" height="1" className={fillClassName} />
      <rect x="5" y="3" width="1" height="1" className={fillClassName} />
    </svg>
  );
};
