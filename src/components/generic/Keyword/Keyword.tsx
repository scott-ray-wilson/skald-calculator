import { cn } from "@/components/utils";
import { GenericPopover } from "@/components/generic";
import { Link } from "react-aria-components";
import { KEYWORD_MAP } from "@/resources";
import { useKeywordOverride } from "@/stores";
import { KeywordContent } from "@/components/generic";

type Keyword = {
  className?: string;
  children: string;
  shouldOverride?: boolean;
};

export const Keyword = ({ className, children, shouldOverride }: Keyword) => {
  const { keywordOverride, setKeywordOverride } = useKeywordOverride();
  const keyword = KEYWORD_MAP.get(keywordOverride ?? children.toLowerCase());

  if (!keyword) throw new Error(`Invalid Keyword: ${children}`);

  const Component = (
    <Link
      onPress={
        shouldOverride
          ? () => setKeywordOverride(children.toLowerCase())
          : undefined
      }
      className={cn(
        className,
        `cursor-pointer text-green focus:text-blue focus:outline-none focus:ring-0`,
      )}
    >
      {children}
    </Link>
  );

  if (shouldOverride) return Component;

  return (
    <GenericPopover trigger={Component}>
      <KeywordContent keyword={keyword} />
    </GenericPopover>
  );
};
