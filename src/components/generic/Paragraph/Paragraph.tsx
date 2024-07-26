import { Fragment, ReactNode } from "react";
import { Keyword } from "@/components/generic";
import { KEYWORD_MAP, KEYWORD_REGEX } from "@/resources";
import { cn } from "@/components/utils";

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
  // split paragraphs within in-game text
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

        let text: ReactNode = segment;

        // handle quotations being white, matching in-game text
        if (segment.match(/["“]/g)) {
          text = (
            <>
              {segment.split(/(["“].*?["”])/g).map((part, index) => {
                return part ? (
                  <span
                    className={cn(className, {
                      "text-white": part.trim().match(/["“]/g),
                    })}
                    key={index}
                  >
                    {part}
                  </span>
                ) : null;
              })}
            </>
          );
        }

        return (
          <Fragment key={`${segment}_${index}`}>
            {keyword && !shouldIgnore ? (
              <Keyword shouldOverride={shouldOverride}>{segment}</Keyword>
            ) : (
              text
            )}
          </Fragment>
        );
      })}
    </p>
  );
};
