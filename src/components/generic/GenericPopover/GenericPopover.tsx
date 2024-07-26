import { ReactElement, ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
  Popover,
  PopoverProps,
} from "react-aria-components";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorComponent } from "@/components/generic";
import { useBreakpoint } from "@/hooks";

type GenericPopoverProps = {
  trigger: ReactElement;
  children: ReactNode;
} & Omit<PopoverProps, "trigger">;

export const GenericPopover = ({
  trigger,
  children,
  ...props
}: GenericPopoverProps) => {
  const shouldUseDialog = useBreakpoint("sm");

  if (shouldUseDialog) {
    return (
      <DialogTrigger>
        {trigger}
        <ModalOverlay
          isDismissable
          className={`crt fixed inset-0 z-10 flex min-h-full items-center justify-center bg-black/25 p-10`}
        >
          <Modal className={`bg-black p-[0.18rem]`}>
            <Dialog
              className={`bg-brown p-0.5 focus:outline-none focus:ring-0`}
            >
              <div className="scrollbar flex max-h-[70vh] flex-col gap-3 overflow-y-auto border-[3px] border-red px-3 py-2.5">
                <ErrorBoundary fallbackRender={ErrorComponent}>
                  {children}
                </ErrorBoundary>
              </div>
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    );
  }

  return (
    <DialogTrigger>
      {trigger}
      <Popover
        {...props}
        className={`crt max-w-sm rounded-sm bg-black p-[0.18rem]`}
      >
        <Dialog className={`bg-brown p-0.5 focus:outline-none focus:ring-0`}>
          <div className="scrollbar flex max-h-[60vh] flex-col gap-3 overflow-y-auto border-[3px] border-red px-3 py-2.5">
            <ErrorBoundary fallbackRender={ErrorComponent}>
              {children}
            </ErrorBoundary>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
