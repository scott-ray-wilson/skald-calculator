import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorComponent } from "@/components/generic";
import { cn } from "@/components/utils";
import { TabPanel } from "react-aria-components";

type SectionContainerProps = {
  title: string | ReactNode;
  children: ReactNode;
  containerClassName?: string;
  actions?: ReactNode;
  id: string;
};

export const PanelContainer = ({
  title,
  children,
  containerClassName,
  actions,
  id,
}: SectionContainerProps) => {
  return (
    <TabPanel
      id={id}
      className={`col-span-full flex w-full flex-col gap-1 rounded-sm bg-brown p-1 shadow-[-3px_3px_0px] shadow-olive md:h-[100vh] md:max-h-[42rem] lg:col-span-1`}
    >
      <header
        className={`flex w-full items-start gap-1 rounded bg-red px-3 pb-2 pt-1`}
      >
        <h3 className={"text-xl text-yellow"}>{title}</h3>
        {actions}
      </header>
      <div
        className={cn(
          `flex w-full flex-1 flex-col gap-1 overflow-hidden md:flex-row`,
          containerClassName,
        )}
      >
        <ErrorBoundary fallbackRender={ErrorComponent}>
          {children}
        </ErrorBoundary>
      </div>
    </TabPanel>
  );
};
