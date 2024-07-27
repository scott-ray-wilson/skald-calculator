import { ReactNode } from "react";
import { ErrorComponent, PanelButton } from "@/components/generic";
import { cn } from "@/components/utils";
import { CalcTabsType, useCalcTabs } from "@/stores";
import { ErrorBoundary } from "react-error-boundary";

type DescriptionContainerProps = {
  prevTab?: CalcTabsType;
  nextTab?: CalcTabsType;
  children: ReactNode;
  className?: string;
  buttonContainerClassName?: string;
};

export const DescriptionContainer = ({
  nextTab,
  prevTab,
  children,
  className,
  buttonContainerClassName,
}: DescriptionContainerProps) => {
  const { setSelectedTab } = useCalcTabs();

  const handleNext = () => {
    if (!nextTab) throw new Error("Missing Next Tab");

    setSelectedTab(nextTab);
  };

  const handlePrev = () => {
    if (!prevTab) throw new Error("Missing Prev Tab");

    setSelectedTab(prevTab);
  };

  return (
    <div
      className={cn(
        `scrollbar flex flex-1 flex-col gap-4 overflow-y-auto rounded bg-olive p-4`,
        className,
      )}
    >
      <ErrorBoundary fallbackRender={ErrorComponent}>
        {children}
        {nextTab || prevTab ? (
          <div
            className={cn(
              `mt-auto flex flex-col items-center gap-2 pt-1 md:pt-0`,
              buttonContainerClassName,
            )}
          >
            {nextTab ? (
              <PanelButton isDisabled={!nextTab} onPress={handleNext}>
                Continue
              </PanelButton>
            ) : null}
            {prevTab ? (
              <PanelButton isDisabled={!prevTab} onPress={handlePrev}>
                Back
              </PanelButton>
            ) : null}
          </div>
        ) : null}
      </ErrorBoundary>
    </div>
  );
};
