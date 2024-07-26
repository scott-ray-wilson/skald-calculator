import { cn } from "@/components/utils";
import { ReactNode } from "react";

export type SectionContainerProps = {
  title: string;
  className?: string;
  children: ReactNode;
  containerClassName?: string;
};

export const SectionContainer = ({
  className,
  title,
  children,
  containerClassName,
}: SectionContainerProps) => {
  return (
    <div className={cn(`flex flex-col`, className)}>
      <div
        className={`flex items-baseline justify-between gap-2 rounded-t-md bg-olive pl-2 pr-3`}
      >
        <span className={`whitespace-nowrap text-blue`}>{title}</span>
      </div>
      <div
        className={cn(
          `scrollbar flex flex-col flex-1 rounded-b border-[3px] border-olive bg-olive`,
          containerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};
