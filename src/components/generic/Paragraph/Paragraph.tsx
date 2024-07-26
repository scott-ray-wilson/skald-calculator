import { Fragment } from "react";
import { Keyword } from "@/components/generic";
import { KEYWORD_MAP, KEYWORD_REGEX } from "@/resources";

type ParagraphProps = {
  children: string;
  className?: string;
  ignoreIds?: string[];
  shouldOverride?: boolean;
};

const NEW_LINE_REGEX = /\r\n/g;

export const Paragraph = ({
  children,
  className,
  ignoreIds = [],
  shouldOverride = false,
}: ParagraphProps) => {
  if (children.match(NEW_LINE_REGEX)) {
    return children.split(NEW_LINE_REGEX).map((segment, index) =>
      segment ? (
        <Paragraph
          className={className}
          shouldOverride={shouldOverride}
          key={index}
        >
          {segment}
        </Paragraph>
      ) : null,
    );
  }

  return (
    <p className={className}>
      {children.split(KEYWORD_REGEX).map((segment = "", index) => {
        const keyword = KEYWORD_MAP.get(segment.toLowerCase());

        const shouldIgnore = keyword ? ignoreIds.includes(keyword.id) : false;

        return (
          <Fragment key={`${segment}_${index}`}>
            {keyword && !shouldIgnore ? (
              <Keyword shouldOverride={shouldOverride}>{segment}</Keyword>
            ) : (
              segment
            )}
          </Fragment>
        );
      })}
    </p>
  );
};
