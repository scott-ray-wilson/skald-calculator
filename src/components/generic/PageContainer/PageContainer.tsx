import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorComponent } from "@/components/generic";

type PageContainerProps = { children: ReactNode };

export const PageContainer = ({ children }: PageContainerProps) => (
  <div
    className={`mx-auto flex w-full max-w-[70rem] flex-col-reverse gap-3 md:my-auto md:gap-4 lg:flex-row`}
  >
    <ErrorBoundary fallbackRender={ErrorComponent}>{children}</ErrorBoundary>
  </div>
);
