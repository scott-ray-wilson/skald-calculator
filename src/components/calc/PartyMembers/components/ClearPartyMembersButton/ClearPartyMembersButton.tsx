import { Button } from "react-aria-components";
import {
  GenericDialog,
  GenericTooltip,
  IconButton,
} from "@/components/generic";
import { usePartyLoadout } from "@/stores";
import { useState } from "react";

export const ClearPartyMembersButton = () => {
  const { removeAllPartyMembers } = usePartyLoadout();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClear = () => {
    removeAllPartyMembers();
  };

  return (
    <>
      <GenericTooltip placement={"right"} content={"Remove All Party Members"}>
        <IconButton onPress={() => setOpenDialog(true)}>
          <svg
            className={`h-6 w-6`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z"
              fill="currentColor"
            />
          </svg>
        </IconButton>
      </GenericTooltip>
      <GenericDialog
        aria-label={"Confirm clear all party members"}
        isOpen={openDialog}
        onOpenChange={setOpenDialog}
        onConfirm={handleClear}
      >
        <p>Are you sure you want to remove all party members?</p>
        <p className={`text-yellow`}>This action cannot be undone.</p>
      </GenericDialog>
    </>
  );
};
