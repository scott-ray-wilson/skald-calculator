import { ReactNode } from "react";
import { GameVersionDetails } from "@/components/generic";

type PanelWrapperProps = {
  children: ReactNode;
};

export const PanelWrapper = ({ children }: PanelWrapperProps) => {
  return (
    <div className={`flex w-full flex-1 flex-col`}>
      {children}
      <GameVersionDetails />
    </div>
  );
};
