import { Button } from "react-aria-components";
import { GenericDialog, GenericTooltip } from "@/components/generic";
import { useFeatsPanel, usePartyLoadout } from "@/stores";
import { useState } from "react";

export const ResetFeatsButton = () => {
  const {
    selectedPartyMember: { feats },
  } = usePartyLoadout();
  const { setActiveFeatId } = useFeatsPanel();

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleConfirmReset = () => {
    setShowConfirmationDialog(true);
  };

  const handleConfirm = () => {
    feats.resetRanks();
    setActiveFeatId(null);
  };

  return (
    <>
      <GenericDialog
        aria-label={"Confirm reset feats"}
        isOpen={showConfirmationDialog}
        onOpenChange={setShowConfirmationDialog}
        onConfirm={handleConfirm}
      >
        <p>Are you sure you want to reset your Feat Ranks?</p>
        <p>All distributed Ranks will be removed.</p>
      </GenericDialog>
      <GenericTooltip content={"Reset Feats"}>
        <Button
          isDisabled={feats.getTotalAllocatedRanks() === 0}
          onPress={handleConfirmReset}
          className={`focus:outline-none disabled:pointer-events-none disabled:opacity-40 focus:ring-0 focus:text-blue text-olive hover:text-red`}
        >
          <svg
            className={`h-6 w-6`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M2 3h20v18H2V3zm18 16V7H4v12h16zM9 10h2v2H9v-2zm4 2h-2v2H9v2h2v-2h2v2h2v-2h-2v-2zm0 0v-2h2v2h-2z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </GenericTooltip>
    </>
  );
};
