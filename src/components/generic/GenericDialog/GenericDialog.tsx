import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { PanelButton } from "@/components/generic";
import { ReactElement, ReactNode } from "react";
import { cn } from "@/components/utils";

type GenericDialogProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  trigger?: ReactElement;
  children: ReactNode;
  containerClassName?: string;
  onConfirm?: () => void;
  ["aria-label"]: string;
  disableClose?: boolean;
};

export const GenericDialog = ({
  children,
  containerClassName,
  trigger,
  onConfirm,
  isOpen,
  onOpenChange,
  disableClose,
  ...props
}: GenericDialogProps) => {
  const DialogComponent = (
    <ModalOverlay
      {...(trigger
        ? {}
        : {
            isOpen,
            onOpenChange,
          })}
      isDismissable={!disableClose}
      className={`fixed crt inset-0 p-4 z-10 min-h-full flex items-center justify-center`}
    >
      <Modal
        className={`shadow-[-3px_3px_0px_black] focus:outline-none focus:ring-0 bg-dark-gray max-w-xl w-full border-2 border-black`}
      >
        <Dialog
          {...props}
          className={`border-brown border-2 min-h-[14rem] m-0.5 flex flex-col focus:outline-none ring-black outline-black focus:ring-0 bg-dark-gray`}
        >
          {({ close }) => (
            <>
              <div
                className={cn(
                  `flex-1 justify-center text-center text-white flex flex-col gap-3 py-8 px-4 w-full border-black border-2`,
                  containerClassName,
                )}
              >
                {children}
              </div>
              <div
                className={`w-full p-2 bg-red flex mt-auto border-2 border-t-0 border-black gap-4 justify-center`}
              >
                {onConfirm ? (
                  <PanelButton
                    onPress={() => {
                      onConfirm();
                      close();
                    }}
                    className={`w-min`}
                  >
                    Yes
                  </PanelButton>
                ) : null}
                <PanelButton
                  isDisabled={disableClose}
                  autoFocus
                  onPress={close}
                  className={`w-min`}
                >
                  {onConfirm ? "No" : "Continue"}
                </PanelButton>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );

  if (!trigger) return <>{DialogComponent}</>;

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger}
      {DialogComponent}
    </DialogTrigger>
  );
};
