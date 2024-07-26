import { FilterIconType } from "@/components/icons";

export const FilterArmorIcon = ({
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
      <rect x="6" y="7" width="1" height="1" className={outlineClassName} />
      <rect x="5" y="8" width="1" height="1" className={outlineClassName} />
      <rect x="2" y="8" width="1" height="1" className={outlineClassName} />
      <rect x="1" y="7" width="1" height="1" className={outlineClassName} />
      <rect x="3" y="9" width="2" height="1" className={outlineClassName} />
      <rect x="1" width="6" height="1" className={outlineClassName} />
      <rect x="7" y="1" width="1" height="6" className={outlineClassName} />
      <rect y="1" width="1" height="6" className={outlineClassName} />
      <rect x="1" width="6" height="1" className={outlineClassName} />
      <path d="M1 1H7V7H1V1Z" className={fillClassName} />
      <path d="M2 7H6V8H2V7Z" className={fillClassName} />
      <path d="M3 8H5V9H3V8Z" className={fillClassName} />
    </svg>
  );
};
